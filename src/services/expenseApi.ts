const API_BASE_URL = '/api';

export interface ExpenseData {
  id?: string;
  description: string;
  amount: number;
  category: string;
  date?: string;
  userId: string;
}

export const expenseApi = {
  // Get all expenses
  async getExpenses() {
    const response = await fetch(`${API_BASE_URL}/expenses`);
    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }
    return await response.json();
  },

  // Add a new expense
  async addExpense(expenseData: Omit<ExpenseData, 'id'>) {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...expenseData,
        amount: Number(expenseData.amount), // Ensure amount is a number
      }),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to add expense');
    }
    
    return await response.json();
  },

  // Update an existing expense
  async updateExpense(id: string, expenseData: Partial<ExpenseData>) {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to update expense');
    }
    
    return await response.json();
  },

  // Delete an expense
  async deleteExpense(id: string) {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to delete expense');
    }
    
    return id;
  },
};
