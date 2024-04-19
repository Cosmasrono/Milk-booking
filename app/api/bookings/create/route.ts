// app/api/bookings/create/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  console.log('Request body:', body);
  const { name, date, Nid, litres } = body;

  try {
    const booking = await prisma.booking.create({
      data: {
        name,
        litres,
        date,
        Nid,
      },
    });
    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}