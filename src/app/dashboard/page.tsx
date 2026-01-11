"use client";
import LargeStatCard from "@/components/cards/LargeStatCard";
import PieChart from "@/components/charts/PieChart";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { formatCurrency } from "@/utils";

const Dashboard = () => {
  // Mock data
  const totalIncome = 5000;
  const totalExpenses = 3200;
  const balance = 1800;

  const recentTransactions = [
    {
      id: 1,
      type: "expense",
      description: "Groceries",
      amount: 150,
      date: "2024-01-10",
      category: "Shopping",
    },
    {
      id: 2,
      type: "income",
      description: "Salary",
      amount: 3000,
      date: "2024-01-01",
      category: "Salary",
    },
    {
      id: 3,
      type: "expense",
      description: "Rent",
      amount: 1200,
      date: "2024-01-01",
      category: "Housing",
    },
    {
      id: 4,
      type: "expense",
      description: "Utilities",
      amount: 200,
      date: "2024-01-05",
      category: "Bills",
    },
  ];

  const { locale, code } = useAppSelector((state) => state.currency);
  const { currency: currencyCode, showDecimals } = useAppSelector(
    (state) => state.settings
  );
  const displayCurrency = currencyCode || code;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <LargeStatCard amount={balance} title="Total Balance" type="BALANCE" />
        <LargeStatCard
          amount={totalIncome}
          title="Total Income"
          type="INCOME"
        />
        <LargeStatCard
          amount={totalExpenses}
          title="Total Expenses"
          type="EXPENSE"
        />
      </div>

      {/* Charts and Transactions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Recent Transactions
            </h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-800">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
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
                      {transaction.category} • {transaction.date}
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
            ))}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="lg:col-span-1">
          <PieChart
            balance={balance}
            income={totalIncome}
            expenses={totalExpenses}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
