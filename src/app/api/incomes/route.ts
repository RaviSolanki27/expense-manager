export const runtime = "nodejs";
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type IncomeData = {
  description: string
  amount: string | number
  source: string
  date: string
  userId?: string // Make userId optional for development
}

export async function GET() {
  try {
    // For now, return all incomes (we'll add user filtering later)
    const incomes = await prisma.income.findMany({
      orderBy: {
        date: 'desc'
      }
    })
    return NextResponse.json(incomes)
  } catch (error) {
    console.error('Error fetching incomes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch incomes' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data: IncomeData = await request.json()

    // Validate required fields
    if (!data.description || !data.amount || !data.source || !data.date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // For development, use a default user if not provided
    let userId = data.userId;
    if (!userId) {
      // Create or find a default user
      const defaultUser = await prisma.user.upsert({
        where: { email: 'default@example.com' },
        update: {},
        create: {
          email: 'default@example.com',
          password: 'password123',
          name: 'Default User',
        },
      });
      userId = defaultUser.id;
    }

    const income = await prisma.income.create({
      data: {
        description: data.description,
        amount: parseFloat(data.amount.toString()),
        source: data.source,
        date: new Date(data.date),
        userId: userId
      }
    })

    return NextResponse.json(income, { status: 201 })
  } catch (error) {
    console.error('Error creating income:', error)
    return NextResponse.json(
      { error: 'Failed to create income' },
      { status: 500 }
    )
  }
}