import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';


interface Booking {
  id: string;
  litres: number;
  name: string;
  date: string;
}

let bookings: Booking[] = []; // In-memory storage for bookings

// GET /api/bookings
export async function GET(request: NextRequest) {
    const bookings = await prisma.booking.findMany();
    return NextResponse.json(bookings);
 }