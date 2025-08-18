import Image from "next/image";

import type { Book } from "@/app/constants/Books";
import Button from "../Button";

import YellowBackground from "../../../../public/images/yellowBackgroundSmall.png";
import OrangeBackground from "../../../../public/images/orangeBackground.png";
import Link from "next/link";

type BookCardProps = Book & {
  buttonText?: string;
  type: "open" | "close";
  cardWidth?: string;
};

const BookCard: React.FC<BookCardProps> = ({ bookImage, bookSlug, bookTitle, bookSubHeading, buttonText, type, purchaseLink, cardWidth = "max-w-sm" }) => {
  return (
    <figure className={`group relative ${cardWidth} rounded-xl overflow-hidden shadow-lg mx-auto w-full`}>
      <div className={`${!buttonText && "rounded-md  hover:p-2  active:border-white active:p-2"} transition-transform duration-500 `}>
        {bookImage[type] && (
          <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] relative ">
            <Image src={bookImage[type]} alt={bookSlug} fill className="w-auto h-auto object-contain" />
          </div>
        )}

        {!buttonText && (
          <Link href={`/book/${bookSlug}`} className="md:hidden absolute top-1/2 -translate-y-1/2 -translate-x-3/5 left-1/2 flex flex-col justify-center items-center p-4 text-center">
            <Button buttonImage={YellowBackground} altText="learn-more" text="Learn More" textColor="text-black" />
          </Link>
        )}

        {!buttonText && (
          <div className="hidden md:block">
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-2xl"></div>
            <Link
              href={`/book/${bookSlug}`}
              className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 p-4 text-center">
              <Button buttonImage={YellowBackground} altText="learn-more" text="Learn More" textColor="text-black" />
            </Link>
          </div>
        )}
      </div>

      <figcaption className=" text-center md:space-y-3 pt-2">
        <h3 className="text-2xl md:text-3xl font-(family-name:--trickOrDead) font-normal">{bookTitle}</h3>
        <p className="text-[#808080] text-sm">{bookSubHeading}</p>
      </figcaption>

      {buttonText && (
        <div className="pt-4 pb-8">
          {purchaseLink ? (
            <Link href={purchaseLink} rel="noreferrer">
              <Button buttonImage={OrangeBackground} altText="get-the-book" text="GET THE BOOK" />
            </Link>
          ) : (
            <Button buttonImage={OrangeBackground} altText="get-the-book" text="GET THE BOOK" />
          )}
        </div>
      )}
    </figure>
  );
};

export default BookCard;
