export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const expenses = await prisma.expense.findMany({
      // where: {
      //   // type: "EXPENSE",

      // },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);

    return new Response(
      JSON.stringify({ message: "Failed to fetch expenses" }),
      { status: 500 }
    );
  }
}
