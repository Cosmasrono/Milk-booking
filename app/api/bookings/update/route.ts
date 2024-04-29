// PUT /api/bookings
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import prisma from '../../../../lib/prisma';


interface Booking {
  id: string;
  name: string;
  date: string;
}

let bookings: Booking[] = []; // In-memory storage for bookings

export async function PUT(request: NextRequest) {
    const body: Booking = await request.json();
    const index = bookings.findIndex((b) => b.id === body.id);
    if (index !== -1) {
      bookings[index] = body;
      return NextResponse.json(body);
    } else {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
  }