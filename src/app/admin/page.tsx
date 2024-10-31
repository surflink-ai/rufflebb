'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// Mock data - will be replaced with actual data from database
const mockStats = {
  totalUsers: 1234,
  activeRaffles: 8,
  totalRevenue: 45678,
  ticketsSold: 9876
}

const mockRecentRaffles = [
  {
    id: 1,
    title: "MacBook Pro 16\"",
    status: "active",
    ticketsSold: 456,
    totalTickets: 1000,
    revenue: 2280,
    endDate: "2024-12-31"
  },
  {
    id: 2,
    title: "PlayStation 5",
    status: "active",
    ticketsSold: 324,
    totalTickets: 800,
    revenue: 972,
    endDate: "2024-12-25"
  },
  {
    id: 3,
    title: "iPhone 15 Pro",
    status: "completed",
    ticketsSold: 750,
    totalTickets: 750,
    revenue: 3750,
    endDate: "2023-12-01"
  }
]

const mockRecentUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    joinDate: "2024-01-15",
    ticketsPurchased: 12
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    joinDate: "2024-01-14",
    ticketsPurchased: 8
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@example.com",
    joinDate: "2024-01-13",
    ticketsPurchased: 15
  }
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Admin Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Link
            href="/admin/raffles/new"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Create New Raffle
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-gray-500 mb-2">Total Users</h3>
            <p className="text-3xl font-bold">{mockStats.totalUsers}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-gray-500 mb-2">Active Raffles</h3>
            <p className="text-3xl font-bold">{mockStats.activeRaffles}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-gray-500 mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold">${mockStats.totalRevenue}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-gray-500 mb-2">Tickets Sold</h3>
            <p className="text-3xl font-bold">{mockStats.ticketsSold}</p>
          </div>
        </div>

        {/* Main Content */}
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
                onClick={() => setActiveTab('raffles')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'raffles'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Manage Raffles
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'users'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Manage Users
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
              <div className="space-y-8">
                {/* Recent Raffles */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Recent Raffles</h2>
                    <Link href="/admin/raffles" className="text-purple-600 hover:text-purple-700">
                      View all
                    </Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tickets Sold
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Revenue
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            End Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockRecentRaffles.map(raffle => (
                          <tr key={raffle.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{raffle.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                raffle.status === 'active'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {raffle.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {raffle.ticketsSold} / {raffle.totalTickets}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">${raffle.revenue}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {new Date(raffle.endDate).toLocaleDateString()}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Users */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Recent Users</h2>
                    <Link href="/admin/users" className="text-purple-600 hover:text-purple-700">
                      View all
                    </Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Join Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tickets Purchased
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockRecentUsers.map(user => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {new Date(user.joinDate).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{user.ticketsPurchased}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'raffles' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Manage Raffles</h2>
                {/* Add raffle management UI here */}
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Manage Users</h2>
                {/* Add user management UI here */}
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Platform Settings</h2>
                {/* Add settings UI here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
