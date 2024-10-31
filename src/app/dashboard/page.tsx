'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// Mock data - will be replaced with actual data from database
const mockUserData = {
  name: "John Doe",
  email: "john@example.com",
  joinDate: "2024-01-15",
  activeTickets: 12,
  totalSpent: 156,
  activeRaffles: [
    {
      id: 1,
      title: "MacBook Pro 16\"",
      ticketCount: 5,
      drawDate: "2024-12-31",
      status: "active"
    },
    {
      id: 2,
      title: "PlayStation 5",
      ticketCount: 7,
      drawDate: "2024-12-25",
      status: "active"
    }
  ],
  pastRaffles: [
    {
      id: 3,
      title: "iPhone 15 Pro",
      ticketCount: 3,
      drawDate: "2023-12-01",
      status: "lost"
    },
    {
      id: 4,
      title: "Nintendo Switch",
      ticketCount: 2,
      drawDate: "2023-11-15",
      status: "won"
    }
  ]
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 rounded-full p-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{mockUserData.name}</h1>
              <p className="text-gray-600">Member since {new Date(mockUserData.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-gray-500 mb-2">Active Tickets</h3>
            <p className="text-3xl font-bold">{mockUserData.activeTickets}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-gray-500 mb-2">Total Spent</h3>
            <p className="text-3xl font-bold">${mockUserData.totalSpent}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-gray-500 mb-2">Active Raffles</h3>
            <p className="text-3xl font-bold">{mockUserData.activeRaffles.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'active'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Active Raffles
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'past'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Past Raffles
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'settings'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Settings
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {mockUserData.activeRaffles.map(raffle => (
                      <div key={raffle.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium">{raffle.title}</h3>
                          <p className="text-sm text-gray-500">
                            {raffle.ticketCount} tickets • Drawing on {new Date(raffle.drawDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Link
                          href={`/raffles/${raffle.id}`}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          View Raffle
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'active' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Active Raffles</h2>
                <div className="space-y-4">
                  {mockUserData.activeRaffles.map(raffle => (
                    <div key={raffle.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">{raffle.title}</h3>
                        <p className="text-sm text-gray-500">
                          {raffle.ticketCount} tickets • Drawing on {new Date(raffle.drawDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Link
                        href={`/raffles/${raffle.id}`}
                        className="text-purple-600 hover:text-purple-700"
                      >
                        View Raffle
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'past' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Past Raffles</h2>
                <div className="space-y-4">
                  {mockUserData.pastRaffles.map(raffle => (
                    <div key={raffle.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">{raffle.title}</h3>
                        <p className="text-sm text-gray-500">
                          {raffle.ticketCount} tickets • Drawn on {new Date(raffle.drawDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        raffle.status === 'won' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {raffle.status === 'won' ? 'Winner!' : 'Better luck next time'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-2xl">
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={mockUserData.name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={mockUserData.email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
