'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// Mock data - will be replaced with database fetch
const mockRaffle = {
  id: 1,
  title: "MacBook Pro 16\"",
  description: "Win a brand new MacBook Pro with M2 chip. This powerful laptop features a stunning Liquid Retina XDR display, up to 12-core CPU, and up to 38-core GPU. Perfect for creative professionals and power users.",
  image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
  ticketPrice: 5,
  endDate: "2024-12-31",
  totalTickets: 1000,
  soldTickets: 456,
  features: [
    "16-inch Liquid Retina XDR display",
    "Apple M2 Pro or M2 Max chip",
    "Up to 96GB unified memory",
    "Up to 8TB SSD storage",
    "Up to 22 hours battery life",
    "1080p FaceTime HD camera"
  ],
  rules: [
    "Must be 18 or older to participate",
    "One person can purchase up to 100 tickets",
    "Winner will be selected randomly",
    "Winner will be notified via email",
    "Prize must be claimed within 30 days",
    "Shipping included worldwide"
  ]
}

export default function RafflePage({ params }: { params: { id: string } }) {
  const [ticketCount, setTicketCount] = useState(1)
  const maxTickets = 100

  const handleIncrement = () => {
    if (ticketCount < maxTickets) {
      setTicketCount(prev => prev + 1)
    }
  }

  const handleDecrement = () => {
    if (ticketCount > 1) {
      setTicketCount(prev => prev - 1)
    }
  }

  const handlePurchase = () => {
    // TODO: Implement purchase logic with Stripe
    console.log(`Purchasing ${ticketCount} tickets`)
  }

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 py-12">
        <Link 
          href="/raffles"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Raffles
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Image and Details */}
          <div>
            <div className="rounded-xl overflow-hidden mb-8">
              <img 
                src={mockRaffle.image} 
                alt={mockRaffle.title}
                className="w-full h-auto"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Prize Details</h2>
                <ul className="space-y-2">
                  {mockRaffle.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Raffle Rules</h2>
                <ul className="space-y-2">
                  {mockRaffle.rules.map((rule, index) => (
                    <li key={index} className="flex items-start text-gray-600">
                      <svg className="w-5 h-5 mr-2 mt-1 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Section */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 sticky top-24">
              <h1 className="text-3xl font-bold mb-2">{mockRaffle.title}</h1>
              <p className="text-gray-600 mb-6">{mockRaffle.description}</p>

              <div className="space-y-6">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Ticket Price:</span>
                  <span className="font-semibold">${mockRaffle.ticketPrice}</span>
                </div>

                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">End Date:</span>
                  <span className="font-semibold">{new Date(mockRaffle.endDate).toLocaleDateString()}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Tickets Remaining:</span>
                    <span className="font-semibold">
                      {mockRaffle.totalTickets - mockRaffle.soldTickets} / {mockRaffle.totalTickets}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-purple-600 h-3 rounded-full"
                      style={{ width: `${(mockRaffle.soldTickets / mockRaffle.totalTickets) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="border-t border-b border-gray-200 py-6">
                  <label className="block text-lg font-semibold mb-4">
                    Select Number of Tickets
                  </label>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                    <button 
                      onClick={handleDecrement}
                      className="p-2 rounded-lg hover:bg-gray-200 transition"
                      disabled={ticketCount <= 1}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="text-xl font-semibold">{ticketCount}</span>
                    <button 
                      onClick={handleIncrement}
                      className="p-2 rounded-lg hover:bg-gray-200 transition"
                      disabled={ticketCount >= maxTickets}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-xl">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold">${(ticketCount * mockRaffle.ticketPrice).toFixed(2)}</span>
                  </div>

                  <button
                    onClick={handlePurchase}
                    className="w-full bg-purple-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
                  >
                    Purchase Tickets
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    By purchasing tickets, you agree to the raffle rules and terms of service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
