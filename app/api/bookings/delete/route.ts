import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import prisma from "../../../../lib/prisma"



interface Booking {
  id: string;
  name: string;
  date: string;
}
let bookings: Booking[] = []; // In-memory storage for bookings

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (id) {
      const index = bookings.findIndex((b) => b.id === id);
      if (index !== -1) {
        const deletedBooking = bookings.splice(index, 1)[0];
        return NextResponse.json(deletedBooking);
      } else {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }
  }