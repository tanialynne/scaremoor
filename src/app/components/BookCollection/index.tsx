import Books from "@/app/constants/Books";
import BookCard from "../BookCard";

const BookCollection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 relative z-50">
      {Books.length > 0 &&
        Books.map((book) => (
          <BookCard
            key={book.bookTitle}
            type="open"
            cardWidth="max-w-lg"
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
