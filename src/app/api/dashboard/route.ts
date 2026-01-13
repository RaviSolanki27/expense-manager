// src/app/api/dashboard/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get current date range (last 30 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    // Fetch total income
    const incomes = await prisma.income.aggregate({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        amount: true,
      },
    });

    // Fetch total expenses
    const expenses = await prisma.expense.aggregate({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        amount: true,
      },
    });

    // Fetch recent transactions (last 10)
    const recentTransactions = await prisma.$queryRaw`
      (SELECT 
        id,
        description,
        amount,
        'income' as type,
        date,
        source as category
      FROM "Income"
      WHERE "userId" = ${userId}
      ORDER BY date DESC
      LIMIT 10)
      
      UNION ALL
      
      (SELECT 
        id,
        description,
        amount,
        'expense' as type,
        date,
        category
      FROM "Expense"
      WHERE "userId" = ${userId}
      ORDER BY date DESC
      LIMIT 10)
      
      ORDER BY date DESC
      LIMIT 10
    `;

    const totalIncome = Number(incomes._sum.amount) || 0;
    const totalExpenses = Number(expenses._sum.amount) || 0;
    const balance = totalIncome - totalExpenses;

    return NextResponse.json({
      balance,
      totalIncome,
      totalExpenses,
      recentTransactions,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { 
        message: 'Failed to fetch dashboard data',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}