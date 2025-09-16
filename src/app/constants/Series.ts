import { StaticImageData } from "next/image";
import { Book } from "./Books";

export type Series = {
  seriesId: string;
  seriesSlug: string;
  seriesTitle: string;
  seriesDescription: string;
  seriesSubtitle?: string;
  seriesImage?: StaticImageData;
  seriesGenre: string;
  seriesAgeRange: string;
  isActive: boolean;
  books: Book[];
  seriesOrder: number;
};

// Import existing SCAREMOOR books and demo books
import Books from "./Books";
import DemoBooks from "./DemoBooks";

// Define all series
const SeriesData: Series[] = [
  {
    seriesId: "scaremoor",
    seriesSlug: "scaremoor",
    seriesTitle: "SCAREMOOR",
    seriesDescription: "Spine-tingling stories that keep kids hooked—and looking over their shoulder. Perfect for fans of Goosebumps, Scary Stories to Tell in the Dark, and anyone who never outgrew the fun of being scared.",
    seriesSubtitle: "Middle Grade Horror. Maximum Grade Chills.",
    seriesGenre: "Middle Grade Horror",
    seriesAgeRange: "Ages 8-12+",
    isActive: true,
    books: Books,
    seriesOrder: 1,
  },
  // Second series for demo
  {
    seriesId: "mystery-manor",
    seriesSlug: "mystery-manor",
    seriesTitle: "Mystery Manor",
    seriesDescription: "A thrilling mystery series where young detectives solve supernatural puzzles in an old Victorian mansion. Each book uncovers another piece of the Blackwood family's dark history.",
    seriesSubtitle: "Where Every Room Holds a Secret",
    seriesGenre: "Mystery/Supernatural",
    seriesAgeRange: "Ages 10-14",
    isActive: true, // Activate for demo
    books: DemoBooks,
    seriesOrder: 2,
  }
];

export default SeriesData;