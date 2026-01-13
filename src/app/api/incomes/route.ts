export const runtime = "nodejs";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type IncomeData = {
  description: string
  amount: string | number
  source: string
  date: string
  userId?: string // Make userId optional for development
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const incomes = await prisma.income.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(incomes);
  } catch (error) {
    console.error('Error fetching incomes:', error);
    return NextResponse.json(
      { message: 'Failed to fetch incomes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { description, amount, source, date } = await request.json();

    if (!description || amount === undefined || !source) {
      return NextResponse.json(
        { 
          message: 'Missing required fields',
          required: ['description', 'amount', 'source']
        },
        { status: 400 }
      );
    }

    const income = await prisma.income.create({
      data: {
        description,
        amount: parseFloat(amount),
        source,
        date: date ? new Date(date) : new Date(),
        userId,
      },
    });

    return NextResponse.json(income, { status: 201 });
  } catch (error) {
    console.error('Error creating income:', error);
    return NextResponse.json(
      { 
        message: 'Failed to create income',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { message: 'Income ID is required' },
        { status: 400 }
      );
    }

    // Verify the income belongs to the user
    const income = await prisma.income.findUnique({
      where: { id },
    });

    if (!income) {
      return NextResponse.json(
        { message: 'Income not found' },
        { status: 404 }
      );
    }

    if (income.userId !== userId) {
      return NextResponse.json(
        { message: 'Not authorized to delete this income' },
        { status: 403 }
      );
    }

    await prisma.income.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Income deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting income:', error);
    return NextResponse.json(
      { 
        message: 'Failed to delete income',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}