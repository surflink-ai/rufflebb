'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface RaffleFormData {
  title: string
  description: string
  imageUrl: string
  ticketPrice: number
  totalTickets: number
  endDate: string
  features: string[]
  rules: string[]
}

export default function NewRafflePage() {
  const [formData, setFormData] = useState<RaffleFormData>({
    title: '',
    description: '',
    imageUrl: '',
    ticketPrice: 0,
    totalTickets: 0,
    endDate: '',
    features: [''],
    rules: ['']
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleArrayChange = (index: number, value: string, field: 'features' | 'rules') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field: 'features' | 'rules') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayItem = (index: number, field: 'features' | 'rules') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement raffle creation logic
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Create New Raffle</h1>
            <Link
              href="/admin"
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Basic Information</h2>
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Raffle Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., MacBook Pro"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Detailed description of the prize..."
                />
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Ticket Information */}
            <div className="space-y-4 pt-4">
              <h2 className="text-lg font-semibold">Ticket Information</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Ticket Price ($)
                  </label>
                  <input
                    type="number"
                    id="ticketPrice"
                    name="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="totalTickets" className="block text-sm font-medium text-gray-700 mb-1">
                    Total Tickets
                  </label>
                  <input
                    type="number"
                    id="totalTickets"
                    name="totalTickets"
                    value={formData.totalTickets}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Prize Features */}
            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Prize Features</h2>
                <button
                  type="button"
                  onClick={() => addArrayItem('features')}
                  className="text-purple-600 hover:text-purple-700"
                >
                  + Add Feature
                </button>
              </div>
              
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'features')}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter prize feature"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'features')}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Raffle Rules */}
            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Raffle Rules</h2>
                <button
                  type="button"
                  onClick={() => addArrayItem('rules')}
                  className="text-purple-600 hover:text-purple-700"
                >
                  + Add Rule
                </button>
              </div>
              
              {formData.rules.map((rule, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={rule}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'rules')}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter raffle rule"
                  />
                  {formData.rules.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'rules')}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
              >
                Create Raffle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
