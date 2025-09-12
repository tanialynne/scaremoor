import Books from "@/app/constants/Books";
import { getBooksForSeries } from "@/app/utils/seriesUtils";
import BookCard from "../BookCard";

type BookCollectionProps = {
  seriesId?: string;
};

const BookCollection = ({ seriesId }: BookCollectionProps) => {
  const books = seriesId ? getBooksForSeries(seriesId) : Books;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 relative z-50">
      {books.length > 0 &&
        books.map((book) => (
          <BookCard
            key={book.bookTitle}
            type="open"
            cardWidth="max-w-lg"
            bookNumber={book.bookNumber}
            bookTitle={book.bookTitle}
            bookImage={book.bookImage}
            bookSlug={book.bookSlug}
            bookSubHeading={book.bookSubHeading}
            buttonText="Start"
            purchaseLink={book.purchaseLink}
          />
        ))}
    </div>
  );
};

export default BookCollection;
