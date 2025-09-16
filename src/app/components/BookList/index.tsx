"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import Books from "@/app/constants/Books";
import { getBooksForSeries } from "@/app/utils/seriesUtils";
import BookCard from "../BookCard";

type BookListProps = {
  seriesId?: string;
};

const BookList = ({ seriesId }: BookListProps) => {
  const books = seriesId ? getBooksForSeries(seriesId) : Books;
  
  return (
    <>
      {books.length > 0 && (
        <Swiper
          modules={[Mousewheel]}
          direction="horizontal"
          slidesPerView={3.5}
          spaceBetween={10}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: true,
          }}
          grabCursor={true}
          breakpoints={{
            320: { slidesPerView: 1.3 },
            768: { slidesPerView: 2.3 },
            1024: { slidesPerView: 3.5 },
          }}>
          {books.map((book) => (
            <SwiperSlide key={book.bookTitle}>
              <BookCard type="close" bookNumber={book.bookNumber} bookTitle={book.bookTitle} bookImage={book.bookImage} bookSlug={book.bookSlug} purchaseLink={book.purchaseLink} bookSubHeading={book.bookSubHeading} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default BookList;
