import SeriesData, { Series } from "../constants/Series";
import { Book } from "../constants/Books";
import { isFeatureEnabled } from "../constants/FeatureFlags";

// Get all active series
export const getActiveSeries = (): Series[] => {
  return SeriesData.filter(series => series.isActive).sort((a, b) => a.seriesOrder - b.seriesOrder);
};

// Get all series (including inactive)
export const getAllSeries = (): Series[] => {
  return SeriesData.sort((a, b) => a.seriesOrder - b.seriesOrder);
};

// Get series by slug
export const getSeriesBySlug = (slug: string): Series | undefined => {
  return SeriesData.find(series => series.seriesSlug === slug);
};

// Get series by ID
export const getSeriesById = (seriesId: string): Series | undefined => {
  return SeriesData.find(series => series.seriesId === seriesId);
};

// Get books for a specific series
export const getBooksForSeries = (seriesId: string): Book[] => {
  const series = getSeriesById(seriesId);
  return series ? series.books : [];
};

// Get book by slug within a series
export const getBookBySlug = (bookSlug: string, seriesId?: string): Book | undefined => {
  if (seriesId) {
    const series = getSeriesById(seriesId);
    return series?.books.find(book => book.bookSlug === bookSlug);
  }
  
  // Search across all series if no seriesId provided
  for (const series of SeriesData) {
    const book = series.books.find(book => book.bookSlug === bookSlug);
    if (book) return book;
  }
  return undefined;
};

// Get all books across all series
export const getAllBooks = (): Book[] => {
  return SeriesData.flatMap(series => series.books);
};

// Check if author has multiple series AND multi-series feature is enabled
export const hasMultipleSeries = (): boolean => {
  return isFeatureEnabled("MULTI_SERIES_ENABLED") && getActiveSeries().length > 1;
};