import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Herobox from "../../../components/Herobox";
import Button from "../../../components/Button";
import BookCollection from "../../../components/BookCollection";
import { Testimonials } from "../../../components/Testimonials";
import { getSeriesBySlug } from "../../../utils/seriesUtils";

import BackgroundImage from "../../../../../public/images/bookspage-image.png";
import OrangeBackgroundMd from "../../../../../public/images/orangeBackgroundMd.png";
import OrangeBackground from "../../../../../public/images/orangeBackground.png";
import CloudRight from "../../../../../public/images/cloudRightTop.png";
import CloudBottom from "../../../../../public/images/cloudBottomLeft.png";
import CloudBottomMiddle from "../../../../../public/images/cloudBottomMiddle.png";
import Graveyard from "../../../../../public/images/booksBackgroundGuy.png";

type Props = {
  params: { seriesSlug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const series = getSeriesBySlug(params.seriesSlug);
  
  if (!series) {
    return {
      title: "Series Not Found",
    };
  }

  return {
    title: `${series.seriesTitle} Books`,
    description: `All books in the ${series.seriesTitle} series. ${series.seriesDescription}`,
  };
}

const SeriesBooksPage = ({ params }: Props) => {
  const series = getSeriesBySlug(params.seriesSlug);

  if (!series) {
    notFound();
  }

  const { seriesTitle, seriesSubtitle, seriesDescription, books } = series;

  return (
    <>
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-22">
        <div className="items-center">
          <div className="space-y-5 lg:pt-10">
            <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <h2 className="hero-text-large">All {seriesTitle} Books</h2>
              <h1 className="hero-text-xlarge max-w-[20ch]">
                {seriesSubtitle || "Every Story a Standalone Adventure"}
              </h1>
            </div>

            <p
              className="max-w-[80ch] font-light"
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              {seriesDescription} Each book is a complete adventure that can be read independently.
            </p>
            
            <div className="pt-8">
              <Link href={`/series/${params.seriesSlug}`}>
                <Button
                  buttonImage={OrangeBackgroundMd}
                  altText="about-series"
                  text="About The Series"
                />
              </Link>
            </div>
          </div>
        </div>
      </Herobox>
      
      <main className="text-white">
        <section className="px-8 md:px-20 py-20 min-h-180 h-full text-center relative overflow-hidden space-y-6">
          <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize flex flex-col relative z-50">
            <span>Start anywhere. Read in any order.</span>
            <span className="gradient-text-accessible">
              {books.length} {books.length === 1 ? 'Book' : 'Books'} Available
            </span>
          </h2>

          <BookCollection seriesId={series.seriesId} />

          <Image
            src={CloudRight}
            alt="cloud"
            className="absolute top-10 right-0 -z-10"
            loading="lazy"
          />
          <Image
            src={CloudBottom}
            alt="cloud"
            className="absolute bottom-0 left-0 -z-10"
            loading="lazy"
          />
          <Image
            src={CloudBottomMiddle}
            alt="cloud"
            className="absolute bottom-0 right-0 -z-10"
            loading="lazy"
          />
        </section>

        <section
          className="flex flex-col justify-center px-8 md:px-20 py-20 min-h-180 h-full relative overflow-hidden"
          style={{
            backgroundImage: `url(${Graveyard.src})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="space-y-5 relative z-50 pt-32 md:pt-28 w-full max-w-[1280px] pl-8 md:pl-20">
            <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize bg-gradient-to-b from-white from-[30%] to-[#A4A4A4] bg-clip-text text-transparent">
              More {seriesTitle} stories <br /> are creeping in soon
            </h2>

            <p className="max-w-[45ch]">
              Sign up to get notified when new {seriesTitle} books are released, plus get access to bonus content and early previews.
            </p>

            <div className="pt-5">
              <Link href="/society">
                <Button
                  buttonImage={OrangeBackground}
                  altText="join-club"
                  text="Join The Club"
                />
              </Link>
            </div>
          </div>
        </section>

        <Testimonials
          title={`What Readers Say About ${seriesTitle}`}
          description={`See what young readers and their families say about the ${seriesTitle} series!`}
        />
      </main>
    </>
  );
};

export default SeriesBooksPage;