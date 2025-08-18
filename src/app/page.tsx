import Image from "next/image";
import Link from "next/link";

import Herobox from "./components/Herobox";
import Button from "./components/Button";
import BookList from "./components/BookList";
import { Testimonials } from "./components/Testimonials";
import Society from "./components/Society";
import BookDetails from "./components/BookDetails";

import BackgroundImage from "../../public/images/landingpage-Image.png";
import BookImageRight from "../../public/images/home-hero-comingsoon.png";
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
      <Herobox backgroundImage={BackgroundImage} landingAssets={true} fogEffect={true} contentPaddingTop="lg:pt-4">
        <div className="lg:grid lg:grid-cols-2 items-start space-y-12">
          <div className="space-y-5 lg:pt-10">
            <div className="font-(family-name:--trickOrDead) font-normal ">
              <p className="text-3xl md:text-6xl">Middle Grade Horror.</p>
              <h1 className="text-5xl md:text-7xl">Maximum Grade Chills.</h1>
            </div>

            <p
              className=" max-w-[62ch] font-light"
              style={{
                textShadow: "13px 13px 13px rgba(0, 0, 0, 0.8)",
              }}>
              Spine-tingling stories that keep kids hooked—and looking over their shoulder. Perfect for fans of Goosebumps, Scary Stories to Tell in the Dark, and anyone who never outgrew the fun of
              being scared.
            </p>

            <div className="flex flex-col sm:flex-row pt-8 gap-5">
              <Link href="/free-story">
                <Button buttonImage={OrangeBackgroundMd} altText="read-story" text="Read a Free Story" />
              </Link>

              <Link href="/scaremoor">
                <Button buttonImage={YellowBackground} altText="see-series" text="See the Full Series" />
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center items-center ">
            <Image src={BookImageRight} alt="book-image" className="inline-block w-4/5 md:w-3/5 lg:w-4/5 " />
          </div>
        </div>
      </Herobox>
      <main className="text-white relative z-50">
        <section
          className="px-8 md:px-20 py-20 min-h-180 h-full bg-black grid grid-cols-1 lg:grid-cols-2 items-center gap-8"
          style={{
            backgroundImage: `url(${MonsterBackground.src})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
          }}>
          <BookDetails bookDetailImage={HunterLockerBook} imageAltText="haunted-locker-book">
            <div>
              <h2 className="font-(family-name:--trickOrDead) font-normal text-4xl sm:text-6xl capitalize">
                Where Middle School <span className="block bg-gradient-to-b from-white from-[10%] to-[#A4A4A4] bg-clip-text text-transparent">Meets Monsters.</span>
              </h2>

              <div className="max-w-[58ch] pt-8">
                <p>
                  SCAREMOOR is a creepy, cinematic book series for readers ages 8–12+ (and fearless 7s, too). Every story is a standalone scare—a haunted locker, a phantom playground, a whispering
                  mirror—with suspense that keeps them turning pages and twists they won’t see coming.
                </p>
                <p className="pt-5">You never forget your first ghost story. Scaremoor makes sure of that.</p>

                <div className="pt-12">
                  <Link href="/scaremoor">
                    <Button buttonImage={OrangeBackground} altText="learn-more" text="Learn More" />
                  </Link>
                </div>
              </div>
            </div>
          </BookDetails>
        </section>

        <section className="px-8 md:px-20 py-20 min-h-180 h-full text-center relative overflow-hidden space-y-6">
          <h2 className="font-(family-name:--trickOrDead) font-normal text-4xl sm:text-6xl capitalize bg-gradient-to-b from-white from-[10%] to-[#A4A4A4] bg-clip-text text-transparent">
            Monster Must Reads
          </h2>
          <p>Explore a world of stories, creepy creatures, and fun frights — perfect for young readers who love little thrill!</p>

          <div className="relative z-50">
            <BookList />
          </div>
          <Link href="/books">
            <Button buttonImage={OrangeBackgroundMd} altText="look-inside" text="Explore The Series" />
          </Link>

          <Image src={CloudRight} alt="cloud" className="absolute top-10 right-0 -z-10" />
          <Image src={CloudBottom} alt="cloud" className="absolute bottom-0 left-0 -z-10" />
        </section>

        <Society />

        <Testimonials title="What Customers Are Saying" description="See what little readers (and their grown-ups!) say about our spine-tingling, just-spooky-enough stories!" />
      </main>
    </>
  );
};

export default HomePage;
