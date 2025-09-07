import Image from "next/image";
import Link from "next/link";

import type { Book } from "@/app/constants/Books";
import Button from "../Button";

import YellowBackground from "../../../../public/images/yellowBackgroundSmall.png";
import OrangeBackground from "../../../../public/images/orangeBackground.png";
import CircleOrange from "../../../../public/images/circle-orange.svg";
import CircleYellow from "../../../../public/images/circle-yellow.svg";
import YellowTag from "../../../../public/images/tag.svg";

type BookCardProps = Book & {
  buttonText?: string;
  type: "open" | "close";
  cardWidth?: string;
};

const BookCard: React.FC<BookCardProps> = ({
  bookImage,
  bookNumber,
  bookSlug,
  bookTitle,
  bookSubHeading,
  purchaseLink,
  type,
  cardWidth = "max-w-sm",
}) => {
  return (
    <figure
      className={`group relative ${cardWidth} rounded-xl overflow-hidden shadow-lg mx-auto w-full flex flex-col justify-between min-h-[280px] sm:min-h-[400px] md:min-h-[400px] lg:min-h-[500px]`}
    >
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] flex items-center justify-center p-5">
        {/* Book Number Tag */}
        <div className="absolute top-0 left-0 z-10 -rotate-12 transform -translate-x-2 -translate-y-2">
          <Button
            buttonImage={YellowTag}
            altText={`Book ${bookNumber}`}
            text={`Book #${bookNumber}`}
            textColor="text-black"
          />
        </div>
        
        {bookImage[type] && (
          <Image
            src={bookImage[type]}
            alt={`${bookTitle} - ${bookSubHeading}`}
            className="w-full h-full object-contain"
          />
        )}

        {/* Overlay buttons for closed type (scroller) */}
        {type === "close" && (
          <div className="absolute bottom-2 right-8 flex gap-2">
            {purchaseLink && (
              <Link href={purchaseLink} rel="noreferrer" target="_blank">
                <div className="relative w-10 h-10 group/button">
                  <Image
                    src={CircleOrange}
                    alt="Buy book"
                    className="w-full h-full transition-all duration-300 group-hover/button:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className="fa-brands fa-amazon text-white text-sm"></i>
                  </div>
                </div>
              </Link>
            )}
            <Link href={`/book/${bookSlug}`}>
              <div className="relative w-10 h-10 group/button">
                <Image
                  src={CircleYellow}
                  alt="Book details"
                  className="w-full h-full transition-all duration-300 group-hover/button:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className="fa-solid fa-circle-info text-black text-sm"></i>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>

      <figcaption className="flex flex-col flex-grow justify-between text-center px-4 py-4 space-y-3">
        <div>
          <h3 className="text-2xl md:text-3xl font-(family-name:--trickOrDead) font-normal">
            {bookTitle}
          </h3>
          <p className="text-[#808080] text-sm mt-2">{bookSubHeading}</p>
        </div>

        {type === "open" && (
          <div className="mt-auto flex flex-row justify-center gap-3 pt-4 pb-10">
            {purchaseLink && (
              <Link href={purchaseLink} rel="noreferrer" target="_blank">
                <Button buttonImage={OrangeBackground} altText="buy-book">
                  Get the Book
                </Button>
              </Link>
            )}
            <Link href={`/book/${bookSlug}`}>
              <Button
                buttonImage={YellowBackground}
                altText="learn-more"
                textColor="text-black"
              >
                Details
              </Button>
            </Link>
          </div>
        )}
      </figcaption>
    </figure>
  );
};

export default BookCard;
