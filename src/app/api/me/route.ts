import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface UserResponse {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
}

export async function GET(request: Request) {
  try {
    const userId = request.headers.get('x-user-id');
    console.log(userId, "=================================");
    
    
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        // image: true
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const response: UserResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
    //   image: user.image,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
