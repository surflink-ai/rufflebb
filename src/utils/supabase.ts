import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types based on our schema
export type User = {
  id: string
  email: string
  full_name: string
  created_at: string
  role: 'user' | 'admin'
}

export type Raffle = {
  id: string
  title: string
  description: string
  image_url: string
  ticket_price: number
  total_tickets: number
  sold_tickets: number
  end_date: string
  status: 'draft' | 'active' | 'completed'
  features: string[]
  rules: string[]
  created_at: string
  updated_at: string
}

export type Ticket = {
  id: string
  raffle_id: string
  user_id: string
  ticket_number: number
  purchase_date: string
  status: 'active' | 'won' | 'lost'
}

// Auth helper functions
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: 'user'
      }
    }
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Raffle helper functions
export const createRaffle = async (raffle: Omit<Raffle, 'id' | 'created_at' | 'updated_at' | 'sold_tickets'>) => {
  const { data, error } = await supabase
    .from('raffles')
    .insert([
      {
        ...raffle,
        sold_tickets: 0,
        status: 'draft'
      }
    ])
    .select()
  return { data, error }
}

export const getRaffles = async (status?: Raffle['status']) => {
  let query = supabase
    .from('raffles')
    .select('*')
  
  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query
  return { data, error }
}

export const getRaffleById = async (id: string) => {
  const { data, error } = await supabase
    .from('raffles')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

// Ticket helper functions
export const purchaseTickets = async (raffleId: string, userId: string, quantity: number) => {
  // Start a transaction to ensure data consistency
  const { data: raffle, error: raffleError } = await getRaffleById(raffleId)
  
  if (raffleError || !raffle) {
    return { error: raffleError || new Error('Raffle not found') }
  }

  if (raffle.sold_tickets + quantity > raffle.total_tickets) {
    return { error: new Error('Not enough tickets available') }
  }

  const tickets = Array.from({ length: quantity }, (_, i) => ({
    raffle_id: raffleId,
    user_id: userId,
    ticket_number: raffle.sold_tickets + i + 1,
    status: 'active'
  }))

  const { data: ticketData, error: ticketError } = await supabase
    .from('tickets')
    .insert(tickets)
    .select()

  if (ticketError) {
    return { error: ticketError }
  }

  // Update the sold tickets count
  const { error: updateError } = await supabase
    .from('raffles')
    .update({ sold_tickets: raffle.sold_tickets + quantity })
    .eq('id', raffleId)

  if (updateError) {
    return { error: updateError }
  }

  return { data: ticketData }
}

export const getUserTickets = async (userId: string) => {
  const { data, error } = await supabase
    .from('tickets')
    .select(`
      *,
      raffles (
        id,
        title,
        end_date,
        status
      )
    `)
    .eq('user_id', userId)
  return { data, error }
}
