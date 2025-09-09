import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Herobox from "../components/Herobox";
import ListCard from "../components/ListCard";
import InfoCard from "../components/InfoCard";
import Society from "../components/Society";
import BookInfo from "../components/BookInfo";
import Button from "../components/Button";

import { ListItems } from "../constants/Lists";

import BackgroundImage from "../../../public/images/scaremoorpage-image.png";
import CloudRight from "../../../public/images/cloudRightTop.png";
import CloudBottom from "../../../public/images/cloudBottomLeft.png";
import CloudBottomMiddle from "../../../public/images/cloudBottomMiddle.png";
import BookIcon from "../../../public/images/icons/bookIcon.svg";
import FamilyIcon from "../../../public/images/icons/family-icon.png";
import HauntedBook from "../../../public/images/more-stories.png";
import HunterLockerBook from "../../../public/images/forgotten-door-free.png";
import OrangeBackgroundLg from "../../../public/images/orangeBackgroundLg.png";

export const metadata: Metadata = {};

const ScaremoorPage = () => {
  return (
    <>
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop=" lg:pt-22">
        <div className=" items-center">
          <div className="space-y-5 lg:pt-10">
            <div className="font-trickordead font-normal [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <h1 className="hero-text-xlarge">What is SCAREMOOR?</h1>
            </div>

            <p
              className=" max-w-[58ch] font-light space-y-6 "
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              <span className="block">
                Scaremoor is a spooky, suspenseful book series for brave middle
                grade readers—especially kids ages 8–12—who love page-turning
                stories, eerie mysteries, and just the right amount of scare.
              </span>
              <span className="block">
                Think Goosebumps, Coraline, and Stranger Things—but written in a
                smart, cinematic voice that speaks directly to today’s readers.
              </span>
              <span className="block">
                Each story is standalone. But they’re all part of the same
                strange universe, where doors whisper, portraits shift, vines
                creep, and something is always watching.
              </span>
            </p>
          </div>
        </div>
      </Herobox>

      <main>
        <section className="px-8 md:px-20 py-20 min-h-180 h-full text-center relative overflow-hidden ">
          <div className="space-y-30 relative z-50 mb-40">
            <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize flex flex-col gradient-text-accessible">
              Who’s it for?
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto px-8 lg:px-16">
              <InfoCard
                cardIcon={BookIcon}
                cardTitle="Readers Ages 8–12+"
                cardDescription="For kids who love creepy stories but don't want nightmares. Whether they're confident readers or just starting to fall in love with books, Scaremoor delivers suspense, mystery, and unforgettable twists."
                cardWidth="w-full"
              />
              <InfoCard
                cardIcon={FamilyIcon}
                cardTitle="Parents, Teachers & Librarians"
                cardDescription="Each story is age-appropriate (no gore, no trauma), with emotionally rich characters, strong vocabulary, and high relatability. They're safe for classrooms and perfect for read-alouds."
                cardWidth="w-full"
              />
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
            src={CloudBottomMiddle}
            alt="cloud"
            className="absolute bottom-1/2 -translate-y-1/2 right-60"
          />

          <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize flex flex-col gradient-text-accessible">
            What makes it different?
          </h2>
          <div className="flex flex-col justify-center items-center mt-10">
            <div className="flex flex-col gap-8">
              {ListItems.length > 0 &&
                ListItems.map((list) => (
                  <ListCard
                    key={list.cardTitle}
                    cardIcon={list.cardIcon}
                    cardTitle={list.cardTitle}
                    cardDescription={list.cardDescription}
                  />
                ))}
            </div>
          </div>
          <div className="py-30 relative z-50">
            <BookInfo title="Sample Storylines" bookImage={HauntedBook}>
              <ul className="mt-4 list-disc space-y-4 text-xl pl-5">
                <li>
                  A girl opens a mysterious supply closet door—and starts
                  disappearing from her own life.
                </li>
                <li>
                  A school locker holds a secret so dark… it never should’ve
                  been opened.
                </li>
                <li>
                  Two best friends discover vines in the garden that move.
                </li>
                <li>
                  A forgotten playground in the woods calls to the living—but it
                  was never meant to be found again.
                </li>
                <li>
                  {" "}
                  An old painting in a mansion museum begins changing. And
                  watching.
                </li>
              </ul>
            </BookInfo>
          </div>
        </section>

        <Society />

        <section className="px-8 md:px-20 py-20 h-full  relative  overflow-hidden">
          <div className="relative z-50">
            <BookInfo
              title="Start With a Free Story"
              bookImage={HunterLockerBook}
            >
              <div className="space-y-8 pt-5">
                <p className="font-bold">Want to try it out?</p>
                <p className="max-w-[50ch]">
                  Read <span className="font-bold">“The Forgotten Door”</span>—a
                  creepy short story about a girl, a glowing hallway, and the
                  price of wanting a better life.
                </p>
              </div>

              <div className="mt-10">
                <Link href="/free-story">
                  <Button
                    buttonImage={OrangeBackgroundLg}
                    altText="free-story"
                    text="Get the free story here"
                  />
                </Link>
              </div>
            </BookInfo>
          </div>
        </section>
      </main>
    </>
  );
};

export default ScaremoorPage;
