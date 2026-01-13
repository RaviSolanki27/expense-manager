"use client"

import React, { useState, useEffect } from 'react';

interface Income {
  id: string;
  description: string;
  amount: number;
  source: string;
  date: string;
}

const IncomePage = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    source: 'Job',
    date: new Date().toISOString().split('T')[0]
  });

  // Fetch incomes on component mount
  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const response = await fetch('/api/incomes', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setIncomes(data);
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch incomes:', errorData.message);
      }
    } catch (error) {
      console.error('Error fetching incomes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.description && formData.amount && formData.source && formData.date) {
      setSubmitting(true);
      try {
        const response = await fetch('/api/incomes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            ...formData,
            amount: parseFloat(formData.amount),
          }),
        });

        if (response.ok) {
          const newIncome = await response.json();
          setIncomes(prev => [newIncome, ...prev]);
          setFormData({
            description: '',
            amount: '',
            source: 'Job',
            date: new Date().toISOString().split('T')[0]
          });
        } else {
          const errorData = await response.json();
          console.error('Failed to create income:', errorData.message);
          alert(`Failed to create income: ${errorData.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error creating income:', error);
        alert('An error occurred while creating the income. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleDeleteIncome = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this income?')) {
      return;
    }

    try {
      const response = await fetch(`/api/incomes?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        // Remove the deleted income from the local state
        setIncomes(prev => prev.filter(income => income.id !== id));
      } else {
        const errorData = await response.json();
        console.error('Failed to delete income:', errorData.message);
        alert(`Failed to delete income: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting income:', error);
      alert('An error occurred while deleting the income. Please try again.');
    }
  };

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

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
            disabled={submitting}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Adding...' : 'Add Income'}
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
          {loading ? (
            <p className="text-center text-gray-500">Loading incomes...</p>
          ) : incomes.length === 0 ? (
            <p className="text-center text-gray-500">No incomes yet</p>
          ) : (
            incomes.map((income) => (
              <div key={income.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 group">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    💰
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-gray-800 truncate pr-2">{income.description}</p>
                      <p className="font-semibold text-green-600 whitespace-nowrap ml-2">${income.amount.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-gray-500">
                        {income.source} • {new Date(income.date).toLocaleDateString()}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteIncome(income.id);
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                        aria-label="Delete income"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default IncomePage