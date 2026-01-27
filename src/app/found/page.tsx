'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Eye, BookOpen, Users, Clock, AlertTriangle } from 'lucide-react';
import BookMap from '@/app/components/BookMap';

interface BookLocation {
  id: string;
  secretWord: string;
  foundBy: string;
  foundAt: string;
  location: string;
  coordinates?: [number, number];
  timestamp: string;
  clueRevealed: boolean;
  newLocation?: string;
  newCoordinates?: [number, number];
}

interface ClueData {
  nextClue: string;
  progress: number;
  totalBooks: number;
  personalClue: string;
}

const BookTrackingPage: React.FC = () => {
  const [secretWord, setSecretWord] = useState('');
  const [finderName, setFinderName] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [stage, setStage] = useState<'entry' | 'success' | 'tracking' | 'error'>('entry');
  const [errorMessage, setErrorMessage] = useState('');
  const [bookData, setBookData] = useState<BookLocation | null>(null);
  const [allBooks, setAllBooks] = useState<BookLocation[]>([]);
  const [clueData, setClueData] = useState<ClueData | null>(null);
  const [showMap, setShowMap] = useState(false);

  // Valid secret words for the 5 advance copies
  const validWords = ['WHISPER', 'SHADOW', 'MIRROR', 'PHANTOM', 'EMBER'];

  useEffect(() => {
    // Load existing book tracking data
    loadBookData();
  }, []);

  const loadBookData = async () => {
    try {
      const response = await fetch('/api/books/tracking');
      if (response.ok) {
        const data = await response.json();
        setAllBooks(data.books || []);
      }
    } catch (error) {
      console.error('Error loading book data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!secretWord.trim() || !finderName.trim()) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    const upperWord = secretWord.toUpperCase().trim();
    if (!validWords.includes(upperWord)) {
      setErrorMessage('Invalid secret word. Check the book again...');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      // Submit the book finding
      const response = await fetch('/api/books/found', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secretWord: upperWord,
          finderName,
          currentLocation,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setBookData(data.book);
        setClueData(data.clue);
        setStage('success');
        loadBookData(); // Refresh the tracking data
      } else {
        const error = await response.json();
        setErrorMessage(error.message || 'Something went wrong');
        setStage('error');
      }
    } catch (error) {
      console.error('Error submitting:', error);
      setErrorMessage('Connection error. Please try again.');
      setStage('error');
    } finally {
      setSubmitting(false);
    }
  };

  const renderEntryForm = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <Eye className="w-16 h-16 text-orange-400 mx-auto mb-4 animate-pulse" />
        <h1 className="text-4xl font-trickordead text-orange-400 mb-4">
          You Found It
        </h1>
        <p className="text-gray-300 text-lg">
          This book escaped from The Mask Room before its official release...
        </p>
        <p className="text-orange-300 mt-2">
          That means you're part of this story now.
        </p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 border border-orange-500/20">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-orange-400 font-medium mb-2">
              Secret Word from the Book:
            </label>
            <input
              type="text"
              value={secretWord}
              onChange={(e) => setSecretWord(e.target.value)}
              placeholder="Enter the secret word..."
              className="w-full p-3 bg-black/40 border border-orange-500/30 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-orange-400 font-medium mb-2">
              Your Name (or alias):
            </label>
            <input
              type="text"
              value={finderName}
              onChange={(e) => setFinderName(e.target.value)}
              placeholder="How should we call you?"
              className="w-full p-3 bg-black/40 border border-orange-500/30 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-orange-400 font-medium mb-2">
              Where did you find it?
            </label>
            <input
              type="text"
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              placeholder="Coffee shop, park bench, library..."
              className="w-full p-3 bg-black/40 border border-orange-500/30 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-400 focus:outline-none"
            />
          </div>

          {errorMessage && (
            <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm">{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {submitting ? 'Verifying...' : 'Enter the Story'}
          </button>
        </form>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <BookOpen className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h1 className="text-4xl font-trickordead text-green-400 mb-4">
          Welcome to the Mystery
        </h1>
        <p className="text-gray-300 text-lg">
          Congratulations, {bookData?.foundBy}! You've claimed book #{bookData?.id}
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-green-500/20">
          <h2 className="text-xl font-bold text-white mb-4">Your Personal Clue</h2>
          <div className="bg-black/40 rounded-lg p-4 border border-green-500/30">
            <p className="text-green-400 font-mono text-sm">
              {clueData?.personalClue || "🎭 Behind the Mask: The real inspiration for The Mask Room came from a recurring nightmare I had as a child. Every night, I'd dream of walking through a theater where all the masks on the walls would follow me with their empty eyes..."}
            </p>
          </div>
        </div>

        {clueData && (
          <div className="bg-gray-900 rounded-xl p-6 border border-orange-500/20">
            <h2 className="text-xl font-bold text-white mb-4">
              Progress: {clueData.progress}/{clueData.totalBooks} Books Found
            </h2>

            <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
              <div
                className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(clueData.progress / clueData.totalBooks) * 100}%` }}
              />
            </div>

            <div className="bg-orange-900/30 rounded-lg p-4 border border-orange-500/30">
              <h3 className="text-orange-400 font-bold mb-2">Want to really know what's behind the curtain?</h3>
              <p className="text-orange-300 mb-4">
                Leave the book somewhere new. If someone else finds it and survives... the next clue will appear.
              </p>

              {clueData.nextClue && (
                <div className="bg-black/40 rounded p-3">
                  <p className="text-green-400 font-mono text-sm">{clueData.nextClue}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-center space-y-4">
          <button
            onClick={() => setShowMap(!showMap)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors mr-4"
          >
            <MapPin className="w-4 h-4 inline mr-2" />
            {showMap ? 'Hide Map' : 'Track All Books'}
          </button>

          <button
            onClick={() => setStage('tracking')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            View Book Journey
          </button>
        </div>
      </div>
    </div>
  );

  const renderTracking = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <Users className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h1 className="text-4xl font-trickordead text-blue-400 mb-4">
          The Book's Journey
        </h1>
        <p className="text-gray-300">
          Track the path of all 5 advance copies as they make their way through the world
        </p>
      </div>

      <div className="grid gap-4 mb-8">
        {allBooks.map((book, index) => (
          <div key={book.id} className="bg-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">
                Book #{book.id} - "{book.secretWord}"
              </h3>
              <div className="text-sm text-gray-400 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(book.timestamp).toLocaleDateString()}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Found by:</span>
                <span className="text-white">{book.foundBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Location:</span>
                <span className="text-orange-400">{book.location}</span>
              </div>
              {book.clueRevealed && (
                <div className="bg-green-900/30 rounded p-3 mt-3">
                  <p className="text-green-400 text-sm">
                    ✓ Clue revealed! This finder unlocked part of the mystery.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => setStage('entry')}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Found Another Book?
        </button>
      </div>
    </div>
  );

  const renderMap = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h2 className="text-3xl font-trickordead text-blue-400 mb-4">
          Book Locations Map
        </h2>
      </div>

      {/* Live Google Maps integration */}
      <div className="bg-gray-900 rounded-xl p-8 border border-blue-500/20">
        <BookMap books={allBooks} height="400px" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {allBooks.map((book) => (
            <div key={book.id} className="bg-black/40 rounded p-3 text-left">
              <div className="text-orange-400 font-bold">Book #{book.id}</div>
              <div className="text-white text-sm">{book.location}</div>
              <div className="text-gray-400 text-xs">Found by {book.foundBy}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => setShowMap(false)}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Back to Story
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      {showMap ? renderMap() : (
        <>
          {stage === 'entry' && renderEntryForm()}
          {stage === 'success' && renderSuccess()}
          {stage === 'tracking' && renderTracking()}
          {stage === 'error' && (
            <div className="max-w-lg mx-auto text-center">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h1 className="text-3xl font-trickordead text-red-400 mb-4">
                Something Went Wrong
              </h1>
              <p className="text-gray-300 mb-6">{errorMessage}</p>
              <button
                onClick={() => setStage('entry')}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookTrackingPage;