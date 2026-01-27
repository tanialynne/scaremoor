import { NextResponse } from 'next/server';
import {
  addBookToDatabase,
  getBooksDatabase,
  getBookStats,
  BOOK_DATA,
  getCoordinatesForLocation
} from '@/app/lib/bookDatabase';

// Add sample data to demonstrate the system
export async function POST() {
  try {
    // Check if we already have data
    const existingBooks = getBooksDatabase();
    if (existingBooks.length > 0) {
      return NextResponse.json({
        message: 'Sample data already exists',
        books: existingBooks,
        stats: getBookStats()
      });
    }

    // Add sample book findings
    const sampleFindings = [
      {
        secretWord: 'WHISPER',
        finderName: 'Sarah M.',
        location: 'Central Park Bench',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
      },
      {
        secretWord: 'SHADOW',
        finderName: 'Mike K.',
        location: 'Brooklyn Coffee Shop',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
      }
    ];

    for (const finding of sampleFindings) {
      const bookInfo = BOOK_DATA[finding.secretWord as keyof typeof BOOK_DATA];
      if (bookInfo) {
        const coordinates = getCoordinatesForLocation(finding.location);

        const newBook = {
          id: bookInfo.id,
          secretWord: finding.secretWord,
          foundBy: finding.finderName,
          location: finding.location,
          timestamp: finding.timestamp,
          clueRevealed: true,
          coordinates,
          status: 'found' as const
        };

        addBookToDatabase(newBook);
      }
    }

    return NextResponse.json({
      message: 'Sample data added successfully',
      books: getBooksDatabase(),
      stats: getBookStats()
    });

  } catch (error) {
    console.error('Error adding sample data:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}