import LargeStatCard from '@/components/cards/LargeStatCard'
import React from 'react'

const Dashboard = () => {
  // Mock data
  const totalIncome = 5000
  const totalExpenses = 3200
  const balance = totalIncome - totalExpenses

  const recentTransactions = [
    { id: 1, type: 'expense', description: 'Groceries', amount: 150, date: '2024-01-10' },
    { id: 2, type: 'income', description: 'Salary', amount: 3000, date: '2024-01-01' },
    { id: 3, type: 'expense', description: 'Rent', amount: 1200, date: '2024-01-01' },
    { id: 4, type: 'expense', description: 'Utilities', amount: 200, date: '2024-01-05' },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <LargeStatCard  amount={1200} title='Total Balance' type='BALANCE' />
        <LargeStatCard  amount={1300} title='Total Income' type='INCOME' />
        <LargeStatCard  amount={1000} title='Total Expenses' type='EXPENSE'/>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {transaction.type === 'income' ? '💰' : '💸'}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <p className={`font-semibold ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard