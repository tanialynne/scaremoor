import { NextResponse } from 'next/server';
import {
  getBooksDatabase,
  getBookStats
} from '@/app/lib/bookDatabase';

export async function GET() {
  try {
    // Get books from the shared database
    const books = getBooksDatabase();
    const stats = getBookStats();

    // Books already have coordinates and status from the shared database
    return NextResponse.json({
      books: books.sort((a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      ),
      stats
    });
  } catch (error) {
    console.error('Error getting tracking data:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}