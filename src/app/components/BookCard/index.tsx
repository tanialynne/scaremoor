import Image from "next/image";
import Link from "next/link";

import type { Book } from "@/app/constants/Books";
import Button from "../Button";

import YellowBackground from "../../../../public/images/yellowBackgroundSmall.png";
import OrangeBackground from "../../../../public/images/orangeBackground.png";

type BookCardProps = Book & {
  buttonText?: string;
  type: "open" | "close";
  cardWidth?: string;
};

const BookCard: React.FC<BookCardProps> = ({
  bookImage,
  bookSlug,
  bookTitle,
  bookSubHeading,
  purchaseLink,
  type,
  cardWidth = "max-w-sm",
}) => {
  return (
    <figure
      className={`group relative ${cardWidth} rounded-xl overflow-hidden shadow-lg mx-auto w-full flex flex-col justify-between min-h-[280px] sm:min-h-[400px] md:min-h-[520px] lg:min-h-[660px]`}
    >
      <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] flex items-center justify-center p-5">
        {bookImage[type] && (
          <Image
            src={bookImage[type]}
            alt={`${bookTitle} - ${bookSubHeading}`}
            className="w-full h-full object-contain"
          />
        )}
      </div>

      <figcaption className="flex flex-col flex-grow justify-between text-center px-4 py-6 space-y-3">
        <div>
          <h3 className="text-2xl md:text-3xl font-(family-name:--trickOrDead) font-normal">
            {bookTitle}
          </h3>
          <p className="text-[#808080] text-sm mt-2">{bookSubHeading}</p>
        </div>

        <div className="mt-auto flex flex-col flex-row justify-center gap-4 pt-6">
          {type === "open" ? (
            <>
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
            </>
          ) : (
            <>
              {purchaseLink && (
                <Link href={purchaseLink} rel="noreferrer" target="_blank">
                  <Button buttonImage={OrangeBackground} altText="buy-book">
                    <i className="fa-brands fa-amazon"></i>
                  </Button>
                </Link>
              )}
              <Link href={`/book/${bookSlug}`}>
                <Button
                  buttonImage={YellowBackground}
                  altText="learn-more"
                  textColor="text-black"
                >
                  <i className="fa-solid fa-circle-info"></i>
                </Button>
              </Link>
            </>
          )}
        </div>
      </figcaption>
    </figure>
  );
};

export default BookCard;
