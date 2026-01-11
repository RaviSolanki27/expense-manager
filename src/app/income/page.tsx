"use client"

import React, { useState } from 'react'

const IncomePage = () => {
  const [incomes, setIncomes] = useState([
    { id: 1, description: 'Salary', amount: 3000, source: 'Job', date: '2024-01-01' },
    { id: 2, description: 'Freelance', amount: 500, source: 'Side Project', date: '2024-01-15' },
  ])

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    source: '',
    date: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.description && formData.amount && formData.source && formData.date) {
      const newIncome = {
        id: incomes.length + 1,
        ...formData,
        amount: parseFloat(formData.amount)
      }
      setIncomes(prev => [...prev, newIncome])
      setFormData({ description: '', amount: '', source: '', date: '' })
    }
  }

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0)

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Income</h2>

      {/* Add Income Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Income</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter income description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                step="0.01"
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
              <select
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select source</option>
                <option value="Job">Job</option>
                <option value="Freelance">Freelance</option>
                <option value="Investment">Investment</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Add Income
          </button>
        </form>
      </div>

      {/* Income List */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Income History</h3>
          <p className="text-lg font-semibold text-green-600">Total: ${totalIncome.toLocaleString()}</p>
        </div>
        <div className="space-y-3">
          {incomes.map((income) => (
            <div key={income.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  💰
                </div>
                <div>
                  <p className="font-medium text-gray-800">{income.description}</p>
                  <p className="text-sm text-gray-500">{income.source} • {income.date}</p>
                </div>
              </div>
              <p className="font-semibold text-green-600">${income.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IncomePage