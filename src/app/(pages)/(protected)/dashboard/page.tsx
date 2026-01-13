"use client";
import { useState, useEffect } from 'react';
import LargeStatCard from "@/components/cards/LargeStatCard";
import PieChart from "@/components/charts/PieChart";
import { TrendingDown, TrendingUp, Loader2 } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { formatCurrency } from "@/utils";
import Card from '@/components/cards/Card';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category: string;
}

interface DashboardData {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  recentTransactions: Transaction[];
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { locale, code } = useAppSelector((state) => state.currency);
  const { currency: currencyCode, showDecimals } = useAppSelector(
    (state) => state.settings
  );
  const displayCurrency = currencyCode || code;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dashboard', {
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch dashboard data');
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return <div className="p-6">No data available</div>;
  }

  const { balance, totalIncome, totalExpenses, recentTransactions } = dashboardData;

  return (
    <div className="space-y-6">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
        <LargeStatCard amount={balance} title="Total Balance" type="BALANCE" percentage="10.1" />
        <LargeStatCard
          amount={totalIncome}
          title="Total Income"
          type="INCOME"
          percentage="-12.0"
        />
        <LargeStatCard
          amount={totalExpenses}
          title="Total Expenses"
          type="EXPENSE"
          percentage="10.1"
        />
        <LargeStatCard
          amount={totalExpenses}
          title="Total Savings"
          type="SAVING"
          percentage="10.1"
        />
      </div>

      {/* Charts and Transactions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
          <div className="lg:col-span-2">
        <Card applyHover={false}>

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Recent Transactions
            </h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer">
              View All
            </button>
          </div>
          <div className="space-y-1">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <div
                  key={`${transaction.type}-${transaction.id}`}
                  className="flex items-center justify-between px-3 py-1 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-2 rounded-lg ${
                        transaction.type === "income"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : (
                        <TrendingDown className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`px-2 py-1 rounded-md flex items-center space-x-1 ${
                        transaction.type === "income"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      <span className="text-sm font-medium ml-1">
                        {formatCurrency(
                          transaction.amount,
                          locale,
                          displayCurrency,
                          showDecimals
                        )}
                      </span>
                      {transaction.type === "income" ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No recent transactions</p>
            )}
          </div>

        </Card>
          </div>

        {/* Pie Chart */}
        <Card>
          <PieChart
            balance={balance}
            income={totalIncome}
            expenses={totalExpenses}
          />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
