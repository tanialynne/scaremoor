import Image from "next/image";
import Link from "next/link";

import Button from "../Button";

import Graveyard from "../../../../public/images/graveyard.png";
import HunterHouse from "../../../../public/images/hunterhouse.svg";
import YellowTag from "../../../../public/images/tag.svg";
import BatImage from "../../../../public/images/bat.svg";
import OrangeBackground from "../../../../public/images/orangeBackground.png";

const Society = () => {
  return (
    <section
      className="flex flex-col  justify-center px-8 md:px-20 py-20 min-h-180 h-full relative text-white"
      style={{
        backgroundImage: `url(${Graveyard.src})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}>
      <div className="space-y-5 relative z-50">
        <h2 className="font-(family-name:--trickOrDead) font-normal text-4xl sm:text-6xl capitalize bg-gradient-to-b from-white from-[30%] to-[#A4A4A4] bg-clip-text text-transparent">
          Scaremoor Society
        </h2>

        <div
          className="max-w-[70ch] space-y-6"
          style={{
            textShadow: "13px 13px 13px rgba(0, 0, 0, 0.8)",
          }}>
          <p>Want secret stories, creepy wallpapers, and insider-only chills?</p>
          <p>Join the Scaremoor Society—our free reader club—and get exclusive content, bonus books, and early sneak peeks. It’s like a haunted library card. But cooler.</p>
        </div>

        <div className="pt-12">
          <Link href="/society">
            <Button buttonImage={OrangeBackground} altText="join-club" text="Join The Club" />
          </Link>
        </div>
      </div>
      <div className="absolute  top-25 -rotate-18">
        <Button buttonImage={YellowTag} altText="join-club-tag" text="Join The" textColor="text-black" />
      </div>

      <div className="absolute bottom-0 right-0">
        <Image src={HunterHouse} alt="hunter-house" className="" />
        <Image src={BatImage} alt="bat" className="absolute top-40 right-0" />
        <Image src={BatImage} alt="bat" className="absolute top-0 left-0" />
        <Image src={BatImage} alt="bat" className="absolute top-40 left-0" />
        <Image src={BatImage} alt="bat" className="absolute top-80 -left-30 -rotate-60" />
      </div>
    </section>
  );
};

export default Society;
