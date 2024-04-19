import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  const { id } = await request.json();

  try {
    const updatedBooking = await prisma.booking.update({
      where: {
        id,
      },
      data: {
        approved: true,
      },
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error('Error approving booking:', error);
    return NextResponse.json({ error: 'Failed to approve booking' }, { status: 500 });
  }
}