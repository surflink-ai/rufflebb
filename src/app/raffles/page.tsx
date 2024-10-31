'use client'

import React from 'react'
import Link from 'next/link'

// Mock data for development - will be replaced with actual data from database
const mockRaffles = [
  {
    id: 1,
    title: "MacBook Pro 16\"",
    description: "Win a brand new MacBook Pro with M2 chip",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    ticketPrice: 5,
    endDate: "2024-12-31",
    totalTickets: 1000,
    soldTickets: 456,
  },
  {
    id: 2,
    title: "PlayStation 5",
    description: "Latest gaming console with two controllers",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
    ticketPrice: 3,
    endDate: "2024-12-25",
    totalTickets: 800,
    soldTickets: 324,
  },
  {
    id: 3,
    title: "Weekend Getaway",
    description: "Luxury weekend for two at Ocean View Resort",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500",
    ticketPrice: 10,
    endDate: "2024-12-20",
    totalTickets: 500,
    soldTickets: 289,
  }
]

export default function RafflesPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Current Raffles</h1>
        
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <button className="px-4 py-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition">
            All Raffles
          </button>
          <button className="px-4 py-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition">
            Ending Soon
          </button>
          <button className="px-4 py-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition">
            Price: Low to High
          </button>
          <button className="px-4 py-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition">
            Most Popular
          </button>
        </div>

        {/* Raffle Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockRaffles.map(raffle => (
            <div key={raffle.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="h-48 overflow-hidden">
                <img 
                  src={raffle.image} 
                  alt={raffle.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{raffle.title}</h3>
                <p className="text-gray-600 mb-4">{raffle.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Ticket Price:</span>
                    <span className="font-semibold">${raffle.ticketPrice}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">End Date:</span>
                    <span className="font-semibold">{new Date(raffle.endDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tickets Sold:</span>
                      <span className="font-semibold">{raffle.soldTickets} / {raffle.totalTickets}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${(raffle.soldTickets / raffle.totalTickets) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/raffles/${raffle.id}`}
                  className="mt-6 block w-full bg-purple-600 text-white text-center py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Buy Tickets
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
