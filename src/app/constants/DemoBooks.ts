import { Book } from "./Books";
import { slugify } from "../utils";

// Use existing book images for demo purposes
import HauntedBook from "../../../public/images/books/haunted-locker-carousel.png";
import PhantomGround from "../../../public/images/books/phantom-playground-carousel.png";
import LivingVine from "../../../public/images/books/living-vines-carousel.png";

import HauntedBookFlat from "../../../public/images/books/haunted-locker-flat.png";
import PhantomGroundFlat from "../../../public/images/books/phantom-playground-flat.png";
import LivingVineFlat from "../../../public/images/books/living-vines-flat.png";

// Demo books for "Mystery Manor" series
const DemoBooks: Book[] = [
  {
    bookNumber: 1,
    bookTitle: "The Whispering Attic",
    bookSlug: slugify("The Whispering Attic"),
    seriesId: "mystery-manor",
    bookImage: {
      open: HauntedBookFlat,
      close: HauntedBook,
    },
    bookSubHeading: "Some secrets are better left buried",
    purchaseLink: "#",
    bookDescription: `
When the Blackwood family inherits their great-aunt's Victorian mansion, twelve-year-old Sophie discovers that the attic holds more than dusty furniture and old photographs. Every night, whispers drift down from above, speaking of hidden treasure and ancient mysteries.

But as Sophie investigates, she realizes the whispers aren't just echoes from the past—they're warnings about a presence that has been waiting in the shadows for decades, and it's been watching the family since the day they arrived.

*A spine-tingling mystery perfect for readers who love puzzles and supernatural thrills.*
    `.trim(),
  },
  {
    bookNumber: 2,
    bookTitle: "The Missing Portrait",
    bookSlug: slugify("The Missing Portrait"),
    seriesId: "mystery-manor",
    bookImage: {
      open: PhantomGroundFlat,
      close: PhantomGround,
    },
    bookSubHeading: "When the painting vanished, so did the truth",
    purchaseLink: "#",
    bookDescription: `
The portrait of Lady Margaret Blackwood has hung in the mansion's main hall for over a century. But when Sophie wakes up one morning, it's gone—leaving only an empty frame and more questions than answers.

As she searches the mansion's hidden passages and secret rooms, Sophie uncovers a web of family secrets that someone has been desperate to keep buried. But the deeper she digs, the more dangerous the truth becomes.

*A mysterious adventure that will keep readers guessing until the very end.*
    `.trim(),
  },
  {
    bookNumber: 3,
    bookTitle: "The Locked Garden",
    bookSlug: slugify("The Locked Garden"),
    seriesId: "mystery-manor",
    bookImage: {
      open: LivingVineFlat,
      close: LivingVine,
    },
    bookSubHeading: "What grows in darkness never sees the light",
    purchaseLink: "#",
    bookDescription: `
Behind the mansion lies a garden that has been locked and abandoned for decades. When Sophie finally finds the key, she discovers that the garden holds the final piece of the Blackwood family mystery.

But some secrets were meant to stay buried, and as Sophie explores the overgrown paths and forgotten greenhouse, she realizes that she's not alone among the twisted vines and forgotten flowers.

*The thrilling conclusion to the Mystery Manor series that reveals all the mansion's secrets.*
    `.trim(),
  },
];

export default DemoBooks;