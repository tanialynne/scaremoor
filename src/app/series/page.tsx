import { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Herobox from "../components/Herobox";
import Button from "../components/Button";
import SeriesList from "../components/SeriesList";
import { hasMultipleSeries } from "../utils/seriesUtils";
import { isFeatureEnabled } from "../constants/FeatureFlags";

import BackgroundImage from "../../../public/images/landingpage-Image.png";
import OrangeBackgroundMd from "../../../public/images/orangeBackgroundMd.png";
import CloudRight from "../../../public/images/cloudRightTop.png";
import CloudBottom from "../../../public/images/cloudBottomLeft.png";

export const metadata: Metadata = {
  title: "Book Series",
  description: "Explore our collection of spine-tingling book series perfect for young readers who love a good scare.",
};

const SeriesPage = () => {
  // Redirect to books page if multi-series is disabled
  if (!isFeatureEnabled("MULTI_SERIES_ENABLED")) {
    redirect("/books");
  }
  
  const multipleSeriesActive = hasMultipleSeries();
  
  return (
    <>
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-22">
        <div className="items-center">
          <div className="space-y-5 lg:pt-10">
            <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <h2 className="hero-text-large">
                {multipleSeriesActive ? "Multiple Worlds of Fear" : "A World of Fear"}
              </h2>
              <h1 className="hero-text-xlarge max-w-[20ch]">
                {multipleSeriesActive ? "Every Series, A New Adventure" : "Every Book, A New Scare"}
              </h1>
            </div>

            <p
              className="max-w-[80ch] font-light"
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              {multipleSeriesActive 
                ? "Discover multiple captivating series, each offering its own unique blend of mystery, horror, and adventure. From haunted schools to supernatural mysteries, find the perfect series for every young reader's taste."
                : "Welcome to our spine-tingling book series, crafted for curious kids and grown-ups who still love a good scare. Each story is designed to thrill without overwhelming."
              }
            </p>
            
            <div className="pt-8">
              <Link href="/author">
                <Button
                  buttonImage={OrangeBackgroundMd}
                  altText="about-author"
                  text="About the Author"
                />
              </Link>
            </div>
          </div>
        </div>
      </Herobox>
      
      <main className="text-white">
        <section className="px-8 md:px-20 py-20 min-h-180 h-full text-center relative overflow-hidden space-y-12">
          <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize flex flex-col relative z-50">
            <span>{multipleSeriesActive ? "Choose Your Adventure" : "Start Your Journey"}</span>
            <span className="gradient-text-accessible">
              {multipleSeriesActive ? "Every Series Tells a Different Story" : "Every Story Standalone"}
            </span>
          </h2>

          <SeriesList />

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
        </section>
      </main>
    </>
  );
};

export default SeriesPage;