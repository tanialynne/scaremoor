import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Herobox from "../components/Herobox";
import Button from "../components/Button";
import BookCollection from "../components/BookCollection";
import { Testimonials } from "../components/Testimonials";

import BackgroundImage from "../../../public/images/bookspage-image.png";
import OrangeBackgroundMd from "../../../public/images/orangeBackgroundMd.png";
import CloudRight from "../../../public/images/cloudRightTop.png";
import CloudBottom from "../../../public/images/cloudBottomLeft.png";
import CloudBottomMiddle from "../../../public/images/cloudBottomMiddle.png";
import OrangeBackground from "../../../public/images/orangeBackground.png";
import Graveyard from "../../../public/images/booksBackgroundGuy.png";

export const metadata: Metadata = {
  title: "Books",
};

const BooksPage = () => {
  return (
    <>
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-22">
        <div className=" items-center">
          <div className="space-y-5">
            <div className="font-(family-name:--trickOrDead) font-normal space-y-4 [text-shadow:0_0_13px_rgba(0,0,0,0.8)]">
              <p className="text-3xl md:text-6xl">Every Book a New Scare.</p>
              <h1 className="text-5xl md:text-7xl max-w-[20ch]">Every Story a Standalone Shiver.</h1>
            </div>

            <p
              className=" max-w-[80ch] font-light "
              style={{
                textShadow: "13px 13px 13px rgba(0, 0, 0, 0.8)",
              }}>
              Welcome to SCAREMOOR—a middle-grade horror series full of haunted objects, cursed doors, and creepy school secrets. <br /> Each book is its own eerie adventure, perfect for curious kids
              and grown-ups who still love a good spine-tingling read.
            </p>
            <div className="pt-8">
              <Link href="/scaremoor">
                <Button buttonImage={OrangeBackgroundMd} altText="about-series" text="About The Series" />
              </Link>
            </div>
          </div>
        </div>
      </Herobox>
      <main className="text-white">
        <section className="px-8 md:px-20 py-20 min-h-180 h-full text-center relative overflow-hidden space-y-6">
          <h2 className="font-(family-name:--trickOrDead) font-normal text-4xl sm:text-6xl capitalize flex flex-col relative z-50">
            <span>Start anywhere. Read in any order.</span>
            <span className="bg-gradient-to-b from-white from-[10%] to-[#A4A4A4] bg-clip-text text-transparent">Just don’t read with the lights off…</span>
          </h2>

          <BookCollection />

          <Image src={CloudRight} alt="cloud" className="absolute top-10 right-0" />
          <Image src={CloudBottom} alt="cloud" className="absolute bottom-0 left-0" />
          <Image src={CloudBottomMiddle} alt="cloud" className="absolute bottom-0 right-0" />
        </section>

        <section
          className="flex flex-col justify-center px-8 md:px-20 py-20 min-h-180 h-full relative overflow-hidden"
          style={{
            backgroundImage: `url(${Graveyard.src})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
          }}>
          <div className="space-y-5 relative z-50 pt-32 md:pt-28">
            <h2 className="font-(family-name:--trickOrDead) font-normal text-4xl sm:text-6xl capitalize bg-gradient-to-b from-white from-[30%] to-[#A4A4A4] bg-clip-text text-transparent">
              More stories are <br /> creeping in soon
            </h2>

            <p className="max-w-[45ch]">Sign up for the Scaremoor Society to get early access, bonus reads, and secret scares.</p>

            <div className="pt-5 ">
              <Link href="/club">
                <Button buttonImage={OrangeBackground} altText="join-club" text="Join The Club" />
              </Link>
            </div>
          </div>
        </section>

        <Testimonials title="What Customers Are Saying" description="See what little readers (and their grown-ups!) say about our spine-tingling, just-spooky-enough stories!" />
      </main>
    </>
  );
};

export default BooksPage;
