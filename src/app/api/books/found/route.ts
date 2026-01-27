import { NextRequest, NextResponse } from 'next/server';
import {
  getBooksDatabase,
  addBookToDatabase,
  findBookBySecretWord,
  getBookStats,
  BOOK_DATA,
  getCoordinatesForLocation
} from '@/app/lib/bookDatabase';

interface BookData {
  id: string;
  secretWord: string;
  foundBy: string;
  location: string;
  timestamp: string;
  clueRevealed: boolean;
  coordinates?: [number, number];
  status?: 'found' | 'relocated' | 'active';
}

export async function POST(req: NextRequest) {
  try {
    const { secretWord, finderName, currentLocation } = await req.json();

    if (!secretWord || !finderName) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if this is a valid secret word
    const bookInfo = BOOK_DATA[secretWord as keyof typeof BOOK_DATA];
    if (!bookInfo) {
      return NextResponse.json(
        { message: 'Invalid secret word' },
        { status: 400 }
      );
    }

    // Check if this book has already been found
    const existingBook = findBookBySecretWord(secretWord);
    if (existingBook) {
      return NextResponse.json(
        { message: 'This book has already been claimed!' },
        { status: 409 }
      );
    }

    // Get coordinates for the location
    const coordinates = getCoordinatesForLocation(currentLocation || 'Unknown location');

    // Create new book entry
    const newBook: BookData = {
      id: bookInfo.id,
      secretWord,
      foundBy: finderName,
      location: currentLocation || 'Unknown location',
      timestamp: new Date().toISOString(),
      clueRevealed: true,
      coordinates,
      status: 'found'
    };

    addBookToDatabase(newBook);

    // Calculate progress
    const stats = getBookStats();
    const { found: foundBooks, total: totalBooks } = stats;

    // Determine next clue based on progress
    let nextClue = '';
    if (foundBooks === 1) {
      nextClue = 'One mask has been lifted. Four more secrets remain hidden in the darkness...';
    } else if (foundBooks === 2) {
      nextClue = 'Two souls have entered the theater. The shadows grow restless...';
    } else if (foundBooks === 3) {
      nextClue = 'Half the mystery is revealed. The mirror reflects deeper truths...';
    } else if (foundBooks === 4) {
      nextClue = 'Only one secret remains. The phantom grows impatient...';
    } else if (foundBooks === 5) {
      nextClue = 'All masks have fallen. The theater\'s final secret burns bright: You are ready for the full story. Watch your email for the complete manuscript...';
    }

    // Add Kit integration for book finders
    try {
      const response = await fetch(`${req.nextUrl.origin}/api/add-to-kit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `${finderName.toLowerCase().replace(/\s+/g, '')}@found.book`, // Placeholder email
          firstName: finderName,
          lastName: 'BookFinder',
        }),
      });
      console.log('Kit integration result:', response.ok ? 'Success' : 'Failed');
    } catch (kitError) {
      console.error('Kit integration error:', kitError);
    }

    return NextResponse.json({
      success: true,
      book: newBook,
      clue: {
        nextClue,
        progress: foundBooks,
        totalBooks,
        personalClue: bookInfo.clue
      }
    });

  } catch (error) {
    console.error('Error processing book found:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get current book finding status
export async function GET() {
  try {
    const books = getBooksDatabase();
    const stats = getBookStats();

    return NextResponse.json({
      books: books.sort((a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      ),
      stats
    });
  } catch (error) {
    console.error('Error getting book data:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}