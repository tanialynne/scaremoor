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

// In-memory database (will be replaced with proper database)
let booksDatabase: BookData[] = [];

// Predefined secret words and their corresponding clues
export const BOOK_DATA = {
  'WHISPER': {
    id: '1',
    clue: 'The theater masks weren\'t just decoration... they were watching. Always watching.',
    defaultCoordinates: [40.7128, -74.0060] // NYC default
  },
  'SHADOW': {
    id: '2',
    clue: 'In my nightmare, the shadows moved independently of their owners, reaching for me with inky fingers.',
    defaultCoordinates: [40.7589, -73.9851] // Central Park
  },
  'MIRROR': {
    id: '3',
    clue: 'The mirror in the dressing room showed reflections of people who had never stood before it.',
    defaultCoordinates: [40.7505, -73.9934] // Times Square
  },
  'PHANTOM': {
    id: '4',
    clue: 'Sometimes I could hear phantom applause echoing through empty halls, clapping for shows that ended decades ago.',
    defaultCoordinates: [40.7734, -73.9857] // Lincoln Center
  },
  'EMBER': {
    id: '5',
    clue: 'The final secret: The theater burned down in 1943, but in my dreams... it\'s still performing every night.',
    defaultCoordinates: [40.7282, -73.9942] // Brooklyn Bridge
  }
};

export const getBooksDatabase = (): BookData[] => {
  return [...booksDatabase];
};

export const addBookToDatabase = (book: BookData): void => {
  booksDatabase.push(book);
};

export const findBookBySecretWord = (secretWord: string): BookData | undefined => {
  return booksDatabase.find(book => book.secretWord === secretWord);
};

export const getBookStats = () => {
  const totalBooks = Object.keys(BOOK_DATA).length;
  const foundBooks = booksDatabase.length;
  return {
    found: foundBooks,
    total: totalBooks,
    remaining: totalBooks - foundBooks
  };
};

// Convert location string to approximate coordinates (for demo purposes)
// In production, you'd use a geocoding service
export const getCoordinatesForLocation = (location: string): [number, number] => {
  // Simple location matching for common NYC locations
  const locationMap: { [key: string]: [number, number] } = {
    'central park': [40.7829, -73.9654],
    'times square': [40.7580, -73.9855],
    'brooklyn bridge': [40.7061, -73.9969],
    'empire state': [40.7484, -73.9857],
    'statue of liberty': [40.6892, -74.0445],
    'cafe': [40.7128, -74.0060],
    'library': [40.7532, -73.9822],
    'park': [40.7829, -73.9654],
    'bookstore': [40.7505, -73.9934],
    'coffee shop': [40.7128, -74.0060]
  };

  const lowerLocation = location.toLowerCase();

  // Find matching location
  for (const [key, coords] of Object.entries(locationMap)) {
    if (lowerLocation.includes(key)) {
      return coords;
    }
  }

  // Default to NYC with slight random offset
  return [
    40.7128 + (Math.random() - 0.5) * 0.02,
    -74.0060 + (Math.random() - 0.5) * 0.02
  ];
};