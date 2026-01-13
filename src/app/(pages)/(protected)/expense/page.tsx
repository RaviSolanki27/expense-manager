"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency } from "@/utils";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";

import {
  fetchExpenses,
  createExpense,
  removeExpense,
} from "@/store/slices/expenseSlice";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import CustomDatePicker from "@/components/common/CustomDatePicket";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
// import { RootState } from "@/store";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const ExpenseSchema = Yup.object().shape({
  description: Yup.string()
    .min(3, "Description must be at least 3 characters")
    .max(100, "Description is too long")
    .required("Description is required"),
  amount: Yup.number()
    .min(0.01, "Amount must be greater than 0")
    .required("Amount is required"),
  category: Yup.string().required("Category is required"),
  date: Yup.date().required("Date is required"),
});

const categories = [
  "Food",
  "Transportation",
  "Housing",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Education",
  "Other",
];

const ExpensePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { expenses, loading } = useSelector((state: RootState) => state.expenses);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  // Fetch expenses on component mount
  useEffect(() => {
    dispatch(fetchExpenses()).unwrap();
  }, []);

  // const fetchExpenses = async () => {
  //   try {
  //     const response = await fetch("/api/expenses");
  //     if (response.ok) {
  //       const data = await response.json();
  //       setExpenses(data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching expenses:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      setIsSubmitting(true);
      await dispatch(createExpense(values)).unwrap();
      await dispatch(fetchExpenses()).unwrap();
      resetForm();
    } catch (error) {
      console.error("Failed to add expense:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await dispatch(removeExpense(id)).unwrap();
      } catch (error) {
        console.error("Failed to delete expense:", error);
      }
    }
  };
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Expenses</h2>

      {/* Add Expense Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Add New Expense
        </h3>
        <Formik
          initialValues={{
            description: "",
            amount: "",
            category: "",
            date: new Date().toISOString().split("T")[0],
          }}
          validationSchema={ExpenseSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched,values, handleChange, handleBlur }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomInput
                  name="description"
                  label="Description"
                  type="text"
                  placeholder="Enter expense description"
                  required
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={touched.description ? errors.description : undefined}
                />
                <CustomInput
                  label="Amount"
                  name="amount"
                  type="text"
                  placeholder="Enter expense amount"
                  required
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={touched.amount ? errors.amount : undefined}
                />
                  <CustomSelect
                    label="Category"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    options={categories.map((category) => ({
                      value: category,
                      label: category,
                    }))}
                    errorText={touched.category ? errors.category : undefined}
                    required
                  />
                <CustomDatePicker
                  label="Date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={touched.date ? errors.date : undefined}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]}
                  min={new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0]}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Adding..." : "Add Expense"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Expenses List */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Expense History
          </h3>
          <p className="text-lg font-semibold text-red-600">
            Total: ${totalExpenses.toLocaleString()}
          </p>
        </div>
        <div className="space-y-3">
          {loading ? (
            <p className="text-center text-gray-500">Loading expenses...</p>
          ) : expenses.length === 0 ? (
            <p className="text-center text-gray-500">No expenses yet</p>
          ) : (
            expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 group"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    💸
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-gray-800 truncate pr-2">
                        {expense.description}
                      </p>
                      <p className="font-semibold text-red-600 whitespace-nowrap ml-2">
                        ${expense.amount.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-gray-500">
                        {expense.category} •{" "}
                        {new Date(expense.date as string).toLocaleDateString()}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(expense.id);
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                        aria-label="Delete expense"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
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
  );
};

export default ExpensePage;
