import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-09-30.acacia'
})

export const createPaymentIntent = async (amount: number) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return {
      clientSecret: paymentIntent.client_secret,
    }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    throw error
  }
}

export const createCheckoutSession = async ({
  raffleId,
  ticketCount,
  ticketPrice,
  userId,
  successUrl,
  cancelUrl,
}: {
  raffleId: string
  ticketCount: number
  ticketPrice: number
  userId: string
  successUrl: string
  cancelUrl: string
}) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Raffle Tickets`,
              description: `${ticketCount} ticket${ticketCount > 1 ? 's' : ''} for raffle #${raffleId}`,
            },
            unit_amount: ticketPrice * 100, // Convert to cents
          },
          quantity: ticketCount,
        },
      ],
      mode: 'payment',
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      metadata: {
        raffleId,
        userId,
        ticketCount: ticketCount.toString(),
      },
    })

    return { sessionId: session.id }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

export const handleWebhook = async (
  req: Request,
  secret: string
) => {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    throw new Error('No stripe signature found')
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      secret
    )

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Extract metadata
        const raffleId = session.metadata?.raffleId
        const userId = session.metadata?.userId
        const ticketCount = parseInt(session.metadata?.ticketCount || '0')

        if (!raffleId || !userId || !ticketCount) {
          throw new Error('Missing required metadata')
        }

        // TODO: Call your purchaseTickets function here
        // await purchaseTickets(raffleId, userId, ticketCount)
        
        break
      }
      // Add handling for other events as needed
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
    })
  } catch (err) {
    console.error('Error processing webhook:', err)
    return new Response(
      JSON.stringify({
        error: {
          message: 'Webhook error',
        },
      }),
      { status: 400 }
    )
  }
}

// Helper function to format amount for display
export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}
