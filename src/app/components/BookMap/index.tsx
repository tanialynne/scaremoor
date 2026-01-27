'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface BookLocation {
  id: string;
  secretWord: string;
  foundBy: string;
  location: string;
  coordinates: [number, number];
  timestamp: string;
  status: 'found' | 'relocated' | 'active';
}

interface BookMapProps {
  books: BookLocation[];
  height?: string;
}

const BookMap: React.FC<BookMapProps> = ({ books, height = '400px' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
          version: 'weekly',
          libraries: ['places'],
        });

        const { Map } = await loader.importLibrary('maps');
        const { AdvancedMarkerElement } = await loader.importLibrary('marker');

        if (!mapRef.current) return;

        // Center map on your city or first book location
        const defaultCenter = books.length > 0
          ? { lat: books[0].coordinates[0], lng: books[0].coordinates[1] }
          : { lat: 40.7128, lng: -74.0060 }; // NYC default

        const mapInstance = new Map(mapRef.current, {
          zoom: books.length > 0 ? 12 : 10,
          center: defaultCenter,
          mapId: 'BOOK_TRACKING_MAP',
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
        });

        // Add markers for each book location
        books.forEach((book, index) => {
          // Create custom marker with book info
          const markerElement = document.createElement('div');
          markerElement.className = 'book-marker';
          markerElement.innerHTML = `
            <div style="
              background: ${book.status === 'found' ? '#f97316' : book.status === 'active' ? '#10b981' : '#6b7280'};
              color: white;
              padding: 8px 12px;
              border-radius: 20px;
              font-weight: bold;
              font-size: 12px;
              border: 2px solid white;
              box-shadow: 0 2px 10px rgba(0,0,0,0.3);
              cursor: pointer;
              min-width: 40px;
              text-align: center;
            ">
              📖 ${book.id}
            </div>
          `;

          const marker = new AdvancedMarkerElement({
            map: mapInstance,
            position: { lat: book.coordinates[0], lng: book.coordinates[1] },
            content: markerElement,
            title: `Book #${book.id} - ${book.secretWord}`,
          });

          // Create info window
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 10px; font-family: system-ui;">
                <h3 style="margin: 0 0 10px 0; color: #f97316;">Book #${book.id} - "${book.secretWord}"</h3>
                <p><strong>Found by:</strong> ${book.foundBy}</p>
                <p><strong>Location:</strong> ${book.location}</p>
                <p><strong>Date:</strong> ${new Date(book.timestamp).toLocaleDateString()}</p>
                <p><strong>Status:</strong>
                  <span style="
                    background: ${book.status === 'found' ? '#f97316' : book.status === 'active' ? '#10b981' : '#6b7280'};
                    color: white;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 11px;
                  ">
                    ${book.status.toUpperCase()}
                  </span>
                </p>
              </div>
            `,
          });

          // Add click listener
          marker.addListener('click', () => {
            infoWindow.open(mapInstance, marker);
          });
        });

        setMap(mapInstance);
        setLoading(false);

      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to load map. Please check your internet connection.');
        setLoading(false);
      }
    };

    if (books.length > 0 || !loading) {
      initMap();
    }
  }, [books]);

  if (loading) {
    return (
      <div
        className="bg-gray-800 rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400 mx-auto mb-2"></div>
          <p>Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-gray-800 rounded-lg flex items-center justify-center border border-red-500/20"
        style={{ height }}
      >
        <div className="text-center text-red-400">
          <p>{error}</p>
          <p className="text-sm text-gray-500 mt-2">
            Add your Google Maps API key to see live locations
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className="w-full rounded-lg border border-gray-600"
        style={{ height }}
      />

      {/* Map legend */}
      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur rounded-lg p-3 text-white text-xs">
        <div className="font-bold mb-2">Book Status:</div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
          Recently Found
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
          Currently Active
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-500 rounded mr-2"></div>
          Relocated
        </div>
      </div>
    </div>
  );
};

export default BookMap;