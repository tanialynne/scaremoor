import Image from "next/image";
import { Metadata } from "next";

import Herobox from "../components/Herobox";
import { LoveItReasons } from "../constants/Benefits";
import InfoCard from "../components/InfoCard";
import { Testimonials } from "../components/Testimonials";
import RequestForm from "../components/RequestForm";

import BackgroundImage from "../../../public/images/LeadManageBackground.png";
import ListCheckIcon from "../../../public/images/icons/list.svg";
import HeroImage from "../../../public/images/forgotten-door-free.png";
import BookDetails from "../components/BookDetails";
import HauntedBook from "../../../public/images/books/HuntedLockerBook-info.png";
import BlurLayer from "../../../public/images/blurLayer.png";
import HandGrab from "../../../public/images/hand_grab.svg";
import CloudRight from "../../../public/images/cloudRightTop.png";
import CloudBottom from "../../../public/images/cloudBottomLeft.png";
import CloudMiddle from "../../../public/images/cloudBottomMiddle.png";

export const metadata: Metadata = {
  title: "Lead Magnet",
};

const LeadMagnet = () => {
  return (
    <>
      <div className="relative">
        <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-22">
          <div className="lg:grid lg:grid-cols-2 space-y-12">
            <div className=" space-y-12">
              <div className="space-y-5 lg:pt-10">
                <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
                  <h2 className="hero-text-large">Open the Door…</h2>
                  <h1 className="hero-text-xlarge">If You Dare.</h1>
                </div>

                <div
                  className=" max-w-[62ch] font-light space-y-6"
                  style={{
                    textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  <p>
                    A spooky short story for curious kids who love creepy
                    mysteries and twist endings.
                  </p>
                  <p>
                    Get The Forgotten Door <span className="font-bold">FREE</span>{" "}
                    and discover the world of{" "}
                    <span className="font-bold">SCAREMOOR</span>.
                  </p>
                </div>
                <div className="w-full max-w-[300px] sm:max-w-1/2 md:max-w-[700px]">
                  <RequestForm buttonText="Send my Story" requestId="8174135" />
                </div>

                <ul className=" flex gap-4 pt-4 flex-col md:flex-row">
                  <li className="inline-flex items-center gap-2">
                    <Image src={ListCheckIcon} alt="list-icon" />
                    <span>
                      Perfect for ages 8–12 (and brave grown-ups too). No spam,
                      just stories.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative flex justify-center items-center ">
              <Image
                src={HeroImage}
                alt="book-image"
                className="inline-block w-full max-w-[580px] "
              />
            </div>
          </div>
        </Herobox>
        <div className="absolute -bottom-0 md:-bottom-6 left-0 right-0 w-full">
          <Image
            src={BlurLayer}
            alt="blur-layer"
            className="w-full h-auto"
          />
        </div>
      </div>

      <main className="text-white overflow-hidden">
        <section className="relative px-8 md:px-20 text-center flex flex-col justify-center items-center py-20 min-h-80 h-full ">
          <h2 className="font-trickordead font-normal block gradient-text-accessible text-4xl sm:text-6xl capitalize">
            What’s The Forgotten Door About?
          </h2>

          <p className="pt-8 max-w-[800px] mx-auto">
            Dani wasn’t looking for trouble—just a microscope kit. Instead, she
            found a strange door in the school supply closet. No knob. Just a
            keyhole. And a whisper: Make it better. At first, everything does
            get better. Until people stop remembering her name Some doors change
            your life. Others erase it
          </p>
        </section>

        <section
          className="relative px-8 md:px-20 py-20 min-h-180 h-full flex justify-center items-center"
          style={{
            backgroundImage: `url(${HandGrab.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h3 className="text-white font-trickordead font-normal text-3xl md:text-5xl leading-15 max-w-[38ch] text-center pt-20">
            It’s spooky, mysterious, and safe-for-school scary—perfect for fans
            of Goosebumps, Scary Stories to Tell in the Dark, and creepy tales
            with heart.
          </h3>
        </section>

        <section className="relative px-8 md:px-20 py-20 min-h-180 h-full">
          <h3 className=" font-trickordead font-normal text-3xl text-center md:text-5xl gradient-text-accessible">
            Why Kids (and Parents) Love It
          </h3>
          <div className="mt-18 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {LoveItReasons.map((benefit) => (
              <InfoCard
                key={benefit.cardDescription}
                cardIcon={benefit.cardIcon}
                cardDescription={benefit.cardDescription}
                descriptionTextSize="text-xl sm:text-2xl"
                cardWidth="max-w-full w-full"
              />
            ))}
          </div>

          <Testimonials />

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
            <BookDetails
              bookDetailImage={HauntedBook}
              imageAltText="haunted-locker-book"
            >
              <div>
                <h2 className="font-trickordead font-normal block gradient-text-accessible text-4xl sm:text-6xl capitalize">
                  Love It? There’s More.
                </h2>

                <div className="max-w-[58ch] pt-8">
                  <p>The Forgotten Door is just the beginning.</p>
                  <p className="pt-5">
                    Once you’re in, you’ll get early access to more spooky short
                    stories, sneak peeks, and full-length books from the
                    SCAREMOOR universe.
                  </p>
                  <p className="pt-5">
                    Next up? A haunted locker, a garden that wont stop growing,
                    and a playground that never wants you to leave...
                  </p>
                </div>
              </div>
            </BookDetails>
          </div>

          <div className="flex flex-col justify-center items-center pt-30 pb-20 text-center space-y-4">
            <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize gradient-text-accessible">
              Ready to get creeped out—in the best way?
            </h2>
            <p>
              When you join, we’ll send you a creepy Scaremoor short story to
              start your collection.
            </p>

            <div className="w-4/5 sm:w-1/2 md:w-11/12 lg:w-[700px]">
              <RequestForm buttonText="Send my story" requestId="8174135" />
            </div>
          </div>
          <Image
            src={CloudRight}
            alt="cloud"
            className="absolute top-10 right-0"
          />
          <Image
            src={CloudBottom}
            alt="cloud"
            className="absolute bottom-0 left-0"
          />
          <Image
            src={CloudMiddle}
            alt="cloud"
            className="absolute top-1/2 -translate-y-1/2 left-0"
          />
        </section>
      </main>
    </>
  );
};

export default LeadMagnet;
