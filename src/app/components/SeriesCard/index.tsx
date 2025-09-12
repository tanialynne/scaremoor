import Image from "next/image";
import Link from "next/link";

import type { Series } from "@/app/constants/Series";
import Button from "../Button";

import OrangeBackground from "../../../../public/images/orangeBackground.png";
import YellowBackground from "../../../../public/images/yellowBackgroundSmall.png";

type SeriesCardProps = {
  series: Series;
  cardWidth?: string;
};

const SeriesCard: React.FC<SeriesCardProps> = ({
  series,
  cardWidth = "max-w-lg",
}) => {
  const { seriesTitle, seriesSubtitle, seriesDescription, seriesSlug, seriesImage, seriesGenre, seriesAgeRange, books } = series;
  
  return (
    <figure
      className={`group relative ${cardWidth} rounded-xl overflow-hidden shadow-lg mx-auto w-full flex flex-col justify-between min-h-[400px] bg-gradient-to-b from-gray-900 to-black border border-gray-800`}
    >
      {/* Series Image or Books Preview */}
      <div className="relative w-full h-[250px] flex items-center justify-center p-5">
        {seriesImage ? (
          <Image
            src={seriesImage}
            alt={`${seriesTitle} series`}
            className="w-full h-full object-contain"
          />
        ) : (
          // Show first few book covers if no series image
          <div className="flex justify-center items-center space-x-2">
            {books.slice(0, 3).map((book, index) => (
              <div key={book.bookSlug} className={`transform ${index === 1 ? 'scale-110 z-10' : 'scale-90'}`}>
                {book.bookImage.close && (
                  <Image
                    src={book.bookImage.close}
                    alt={book.bookTitle}
                    className="w-16 h-20 object-contain"
                  />
                )}
              </div>
            ))}
            {books.length > 3 && (
              <div className="text-white text-sm opacity-70">
                +{books.length - 3} more
              </div>
            )}
          </div>
        )}

        {/* Series Info Badge */}
        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-xs text-white/90">{seriesGenre}</span>
        </div>
        
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-xs text-white/90">{seriesAgeRange}</span>
        </div>
      </div>

      <figcaption className="flex flex-col flex-grow justify-between text-center px-6 py-4 space-y-4">
        <div>
          <h3 className="text-3xl md:text-4xl font-trickordead font-normal text-white mb-2">
            {seriesTitle}
          </h3>
          {seriesSubtitle && (
            <p className="text-orange-400 text-lg font-medium mb-3">{seriesSubtitle}</p>
          )}
          <p className="text-gray-300 text-sm leading-relaxed">{seriesDescription}</p>
        </div>

        <div className="text-center mb-4">
          <span className="text-white/70 text-sm">
            {books.length} {books.length === 1 ? 'Book' : 'Books'} Available
          </span>
        </div>

        <div className="mt-auto flex flex-row justify-center gap-3">
          <Link href={`/series/${seriesSlug}`}>
            <Button
              buttonImage={OrangeBackground}
              altText="explore-series"
              text="Explore Series"
            />
          </Link>
          <Link href={`/series/${seriesSlug}/books`}>
            <Button
              buttonImage={YellowBackground}
              altText="view-books"
              textColor="text-black"
              text="View Books"
            />
          </Link>
        </div>
      </figcaption>
    </figure>
  );
};

export default SeriesCard;