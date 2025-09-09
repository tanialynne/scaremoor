import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

import Herobox from "../components/Herobox";
import InfoCard from "../components/InfoCard";
import { MembershipBenefits } from "../constants/Benefits";
import { Testimonials } from "../components/Testimonials";
import RequestForm from "../components/RequestForm";

import BackgroundImage from "../../../public/images/JoinTheClub.png";
import ListCheckIcon from "../../../public/images/icons/list.svg";
import HunterIcon from "../../../public/images/icons/hunterIcon.svg";
import PlantIcon from "../../../public/images/icons/plantIcon.svg";
import SwingIcon from "../../../public/images/icons/swingIcon.svg";
import PaintIcon from "../../../public/images/icons/paintIcon.svg";
import ScaremoorGate from "../../../public/images/scaremoordoor.png";

export const metadata: Metadata = {
  title: "Join Club",
};

const JoinClub = () => {
  return (
    <>
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-22">
        <div className=" space-y-12">
          <div className="space-y-5 lg:pt-10 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
            <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <h2 className="hero-text-large">Want Creepy Stories?</h2>
              <h1 className="hero-text-xlarge">Join the Club.</h1>
            </div>

            <div
              className=" max-w-[62ch] font-light space-y-6"
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              <p>
                A secret society for spooky story lovers, brave readers, and
                anyone who thinks haunted lockers are cool.
              </p>
              <p>
                Get your first scary short story{" "}
                <span className="font-bold">FREE</span> when you join.
              </p>
            </div>

            <div className="w-4/5 sm:w-1/2 md:w-11/12 lg:w-[700px]">
              <RequestForm requestId="8409068" />
            </div>

            <ul className=" flex gap-4 pt-4 flex-col md:flex-row">
              <li className="inline-flex items-center gap-2">
                <Image src={ListCheckIcon} alt="list-icon" />
                <span>No spam</span>
              </li>
              <li className="inline-flex items-center gap-2">
                <Image src={ListCheckIcon} alt="list-icon" />
                <span>No stress</span>
              </li>
              <li className="inline-flex items-center gap-2">
                <Image src={ListCheckIcon} alt="list-icon" />
                <span>Just spooky stories and exclusive bonuses.</span>
              </li>
            </ul>
          </div>
        </div>
      </Herobox>
      <main className="text-white">
        <section className="px-8 md:px-20 py-20 min-h-180 h-full relative overflow-hidden space-y-6">
          <div className="space-y-4 md:space-y-6 text-center">
            <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize bg-gradient-to-b from-white from-[30%] to-[#A4A4A4] bg-clip-text text-transparent">
              Why Join The Scaremoor Society?
            </h2>
            <p className="max-w-[50ch] mx-auto">
              Because spooky books shouldnʼt end when the last page turns <br />{" "}
              <b>When you join, youʼll get:</b>
            </p>
          </div>

          <div className="mt-18 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {MembershipBenefits.map((benefit) => (
              <InfoCard
                key={benefit.cardDescription}
                cardIcon={benefit.cardIcon}
                cardDescription={benefit.cardDescription}
                descriptionTextSize="text-xl sm:text-2xl"
                cardWidth="max-w-full w-full"
              />
            ))}
          </div>

          <div className="pt-20 space-y-4">
            <h4 className="text-xl font-bold text-center">Perfect For:</h4>

            <ul className=" flex gap-4 pt-4items-center justify-between flex-col md:flex-row">
              <li className="inline-flex items-center gap-2">
                <Image src={ListCheckIcon} alt="list-icon" />
                <span>Kids 8–12 who love a good scare</span>
              </li>
              <li className="inline-flex items-center gap-2">
                <Image src={ListCheckIcon} alt="list-icon" />
                <span>
                  Teachers & librarians looking for classroom-safe chills
                </span>
              </li>
              <li className="inline-flex items-center gap-2">
                <Image src={ListCheckIcon} alt="list-icon" />
                <span>Grown-ups who never outgrew Goosebumps</span>
              </li>
            </ul>
          </div>
          
          {/* <div className="space-y-4 text-center mt-30">
            <h3 className="font-trickordead font-normal text-3xl sm:text-4xl capitalize bg-gradient-to-b from-white from-[30%] to-[#A4A4A4] bg-clip-text text-transparent">
              Pick Your First Fright
            </h3>
            <p>
              When you join, we’ll send you a creepy Scaremoor short story to
              start your collection.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 text-xl pt-12 text-start">
              <li className="inline-flex items-center gap-3">
                <Image src={HunterIcon} alt="list-icon" className="w-20 h-20" />
                <span>
                  Want haunted <br /> hallways?
                </span>
              </li>
              <li className="inline-flex items-center gap-3">
                <Image src={PlantIcon} alt="list-icon" className="w-20 h-20" />
                <span>
                  Whispering <br /> gardens?
                </span>
              </li>
              <li className="inline-flex items-center gap-3">
                <Image src={SwingIcon} alt="list-icon" className="w-20 h-20" />
                <span>
                  Ghostly <br /> playgrounds?
                </span>
              </li>
              <li className="inline-flex items-center gap-3">
                <Image src={PaintIcon} alt="list-icon" className="w-20 h-20" />
                <span>
                  Changing <br /> paintings?
                </span>
              </li>
            </ul>
          </div> */}

        </section>
        <Testimonials
          title="Reader Quotes"
          description="See what little readers say about our spine-tingling, just-spooky-enough stories!"
        />

        <section className="px-8 md:px-20 py-20 min-h-180 h-full relative overflow-hidden">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 items-center justify-center">
            <div className="space-y-10 order-2 xl:order-1">
              <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize bg-gradient-to-b from-white from-[30%] to-[#A4A4A4] bg-clip-text text-transparent">
                Ready to Enter?
              </h2>
              <div className="w-4/5 sm:w-1/2 md:w-11/12 lg:w-[700px]">
                <RequestForm requestId="8409068" />
              </div>
              <ul className=" flex gap-4 pt-4 flex-col md:flex-row">
                <li className="inline-flex items-center gap-2">
                  <Image src={ListCheckIcon} alt="list-icon" />
                  <span>No spam</span>
                </li>
                <li className="inline-flex items-center gap-2">
                  <Image src={ListCheckIcon} alt="list-icon" />
                  <span>No stress</span>
                </li>
                <li className="inline-flex items-center gap-2">
                  <Image src={ListCheckIcon} alt="list-icon" />
                  <span>Just spooky stories and exclusive bonuses.</span>
                </li>
              </ul>

              <p>
                <Link
                  href="#"
                  className="underline hover:text-[#F54F02] duration-400 transition-all"
                >
                  Unsubscribe
                </Link>{" "}
                anytime if you dare.
              </p>
            </div>

            <div className="w-full flex justify-center items-center order-1 xl:order-2  xl:w-full ">
              <Image
                src={ScaremoorGate}
                alt="scaremoor-gate"
                className="w-full md:w-2/3 xl:w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default JoinClub;
