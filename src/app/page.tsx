"use client";

import Image from "next/image";
import Link from "next/link";
import { trackButtonClick } from "./utils/analytics";
import { isFeatureEnabled } from "./constants/FeatureFlags";

import Herobox from "./components/Herobox";
import Button from "./components/Button";
import BookList from "./components/BookList";
import { Testimonials } from "./components/Testimonials";
import Society from "./components/Society";
import BookDetails from "./components/BookDetails";
import { HomeHeroTest } from "./components/ABTestExamples/HomeHeroTest";
import ABTestDebug from "./components/ABTestDebug";
import OptimizedSection from "./components/OptimizedSection";
/*import SocialProof from "./components/SocialProof";*/

import BackgroundImage from "../../public/images/landingpage-Image.png";
import HunterLockerBook from "../../public/images/books/hunterlocker-book.png";
import MonsterBackground from "../../public/images/monsterBackground.png";
import OrangeBackground from "../../public/images/orangeBackground.png";
import OrangeBackgroundMd from "../../public/images/orangeBackgroundMd.png";
import CloudRight from "../../public/images/cloudRightTop.png";
import CloudBottom from "../../public/images/cloudBottomLeft.png";
import YellowBackground from "../../public/images/yellowBackground.png";

const HomePage = () => {
  return (
    <>
      <ABTestDebug testId="home_hero_layout" />
      <Herobox
        backgroundImage={BackgroundImage}
        landingAssets={true}
        fogEffect={true}
        contentPaddingTop="lg:pt-22"
      >
        <div className="lg:grid lg:grid-cols-2 items-center space-y-12">
          <div className="space-y-5 lg:pt-10">
            <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <h2 className="hero-text-large">Middle Grade Horror.</h2>
              <h1 className="hero-text-xlarge">Maximum Grade Chills.</h1>
            </div>

            <p
              className=" max-w-[62ch] font-light"
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              Spine-tingling stories that keep kids hooked—and looking over
              their shoulder. Perfect for fans of Goosebumps, Scary Stories to
              Tell in the Dark, and anyone who never outgrew the fun of being
              scared.
            </p>

            <div className="flex flex-col sm:flex-row pt-8 gap-5">
              <Link href="/free-story">
                <Button
                  buttonImage={OrangeBackgroundMd}
                  altText="read-story"
                  text="Read a Free Story"
                />
              </Link>

              {isFeatureEnabled("QUIZ_ENABLED") && (
                <Link
                  href="/quiz"
                  onClick={() =>
                    trackButtonClick(
                      "Find Your Perfect Scare",
                      "Homepage Hero",
                      "/quiz"
                    )
                  }
                >
                  <Button
                    buttonImage={YellowBackground}
                    altText="take-quiz"
                    text="Find Your Perfect Scare"
                    textColor="text-black"
                  />
                </Link>
              )}
            </div>
          </div>
          <HomeHeroTest className="relative flex justify-center items-center" />
        </div>
      </Herobox>
      <main id="main-content" className="text-white relative">
        <OptimizedSection
          backgroundImage={MonsterBackground}
          className="px-8 md:px-20 py-20 min-h-180 h-full bg-black grid grid-cols-1 lg:grid-cols-2 items-center gap-8"
          backgroundStyle={{
            backgroundPosition: "bottom",
          }}
        >
          <BookDetails
            bookDetailImage={HunterLockerBook}
            imageAltText="haunted-locker-book"
          >
            <div>
              <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize">
                Where Middle School{" "}
                <span className="block gradient-text-accessible">
                  Meets Monsters.
                </span>
              </h2>

              <div className="max-w-[58ch] pt-8">
                <p>
                  SCAREMOOR is a creepy, cinematic book series for readers ages
                  8–12+ (and fearless 7s, too). Every story is a standalone
                  scare—a haunted locker, a phantom playground, a whispering
                  mirror—with suspense that keeps them turning pages and twists
                  they won’t see coming.
                </p>
                <p className="pt-5">
                  You never forget your first ghost story. Scaremoor makes sure
                  of that.
                </p>

                <div className="flex flex-col md:flex-row gap-4 pt-8">
                  <Link href="/scaremoor">
                    <Button
                      buttonImage={OrangeBackground}
                      altText="learn-more"
                      text="Learn More"
                    />
                  </Link>
                  <Link href="/books">
                    <Button
                      buttonImage={YellowBackground}
                      altText="the-books"
                      textColor="text-black"
                      text="Explore the series"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </BookDetails>
        </OptimizedSection>

        <section className="px-8 md:px-20 py-30 min-h-180 h-full text-center relative overflow-hidden space-y-6">
          <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize gradient-text-accessible">
            Monster Must Reads
          </h2>
          <p>
            Explore a world of stories, creepy creatures, and fun frights —
            perfect for young readers who love little thrill!
          </p>

          <div className="relative z-50 pt-8">
            <BookList />
          </div>
          {/*<Link href="/books">
            <Button
              buttonImage={OrangeBackgroundMd}
              altText="look-inside"
              text="Explore The Series"
            />
          </Link>*/}

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

        <Society />

        {/* <SocialProof /> */}

        <Testimonials
          title="What Customers Are Saying"
          description="See what little readers (and their grown-ups!) say about our spine-tingling, just-spooky-enough stories!"
        />
      </main>
    </>
  );
};

export default HomePage;
