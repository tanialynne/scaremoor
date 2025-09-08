import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Herobox from "../components/Herobox";
import Button from "../components/Button";
import { Testimonials } from "../components/Testimonials";
import PodcastCard from "../components/PodcastCard";

import BackgroundImage from "../../../public/images/singleBookBackground.png";
import OrangeBackgroundMd from "../../../public/images/orangeBackgroundMd.png";
import YellowBackground from "../../../public/images/yellowBackground.png";
import CloudRight from "../../../public/images/cloudRightTop.png";
import CloudBottom from "../../../public/images/cloudBottomLeft.png";
import CircleYellow from "../../../public/images/circle-yellow.svg";
import InfoCardBackground from "../../../public/images/infoCardBackground.png";

export const metadata: Metadata = {
  title: "Podcasts",
};

const PodcastsPage = () => {
  return (
    <>
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-22">
        <div className="items-center">
          <div className="space-y-5">
            <div className="font-(family-name:--trickOrDead) font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <p className="text-3xl md:text-6xl">Stories That Come Alive.</p>
              <h1 className="text-5xl md:text-7xl max-w-[20ch]">
                Audio Adventures Await.
              </h1>
            </div>

            <p
              className="max-w-[80ch] font-light"
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              Experience the spine-tingling world of SCAREMOOR like never
              before. Our podcast series brings each haunting tale to life with
              immersive storytelling, perfect for car rides, bedtime (if you
              dare), or anytime you want a good scare.
            </p>

            <div className="flex flex-col sm:flex-row pt-8 gap-5">
              <Link href="#episodes">
                <Button
                  buttonImage={OrangeBackgroundMd}
                  altText="browse-episodes"
                  text="Browse Episodes"
                />
              </Link>

              <Link href="/books">
                <Button
                  buttonImage={YellowBackground}
                  altText="read-books"
                  text="Read the Books"
                  textColor="text-black"
                />
              </Link>
            </div>
          </div>
        </div>
      </Herobox>

      <main className="text-white">
        <section
          id="episodes"
          className="px-8 md:px-20 py-20 min-h-180 h-full relative overflow-hidden space-y-6"
        >
          <div className="text-center space-y-6 relative z-50">
            <h2 className="font-(family-name:--trickOrDead) font-normal text-4xl sm:text-6xl capitalize bg-gradient-to-b from-white from-[10%] to-[#A4A4A4] bg-clip-text text-transparent">
              Free Episodes Available Now
            </h2>
            <p className="max-w-[60ch] mx-auto">
              Get a taste of terror with our free podcast episodes.
              <br />
              Each story is carefully crafted to deliver the perfect amount of
              spine-tingling suspense for young listeners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12 relative z-50">
            <PodcastCard
              title="The Mask Room - Chapter 1"
              description="Something sinister lurks behind the old theater masks. When the drama club finds the forgotten mask room, they discover some costumes are meant to stay hidden..."
              episode="Episode 1"
              duration="23 min"
              audioSrc="/audio/The%20Mask%20Room_01.mp3"
            />

            <PodcastCard
              title="The Mask Room - Chapter 2"
              description="The masks are whispering secrets, and Sarah can't ignore their calls. As the mystery deepens, she realizes the masks may be more alive than anyone thought..."
              episode="Episode 2"
              duration="25 min"
              audioSrc="/audio/The%20Mask%20Room%202_01.mp3"
            />

            <PodcastCard
              title="The Mask Room - Chapter 3"
              description="The final chapter reveals the terrifying truth about the mask room. Will Sarah and her friends escape, or will they become part of the collection forever?"
              episode="Episode 3"
              duration="26 min"
              audioSrc="/audio/The%20Mask%20Room%203_01.mp3"
            />
          </div>

          {/* <div className="text-center pt-12 space-y-6 relative z-50">
            <div className="bg-gradient-to-r from-orange-900/20 to-yellow-900/20 rounded-lg p-8 border border-orange-700/30">
              <h3 className="font-(family-name:--trickOrDead) text-3xl mb-4">
                Want the Complete Stories?
              </h3>
              <p className="text-gray-300 mb-6 max-w-[60ch] mx-auto">
                These free episodes are just the beginning! Get the complete
                audiobook experience with full stories, bonus content, and
                exclusive behind-the-scenes material.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/books">
                  <Button
                    buttonImage={OrangeBackgroundMd}
                    altText="buy-audiobooks"
                    text="Buy Complete Audiobooks"
                  />
                </Link>
              </div>
            </div>
          </div> */}

          <Image
            src={CloudRight}
            alt="cloud"
            className="absolute top-10 right-0 -z-10"
          />
          <Image
            src={CloudBottom}
            alt="cloud"
            className="absolute bottom-0 left-0 -z-10"
          />
        </section>

        <section className="px-8 md:px-20 py-20 space-y-8">
          <div className="text-center space-y-6">
            <h2 className="font-(family-name:--trickOrDead) font-normal text-4xl sm:text-6xl capitalize bg-gradient-to-b from-white from-[10%] to-[#A4A4A4] bg-clip-text text-transparent pb-12">
              Perfect for On-the-Go Scares
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row justify-center items-center gap-20">
            <div className="relative flex flex-col justify-center items-center text-center text-white max-w-xl isolate pb-8 pt-15 px-8 space-y-3 mx-auto h-full min-h-60">
              <Image
                src={InfoCardBackground}
                alt="background-image"
                className="absolute inset-0 -z-10 w-full h-full"
              />
              <div className="w-20 h-20 absolute -top-10 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <Image
                  src={CircleYellow}
                  alt="circle background"
                  className="w-full h-full"
                />
                <i className="fa-solid fa-car-side absolute text-black text-2xl"></i>
              </div>
              <h3 className="font-(family-name:--trickOrDead) font-medium text-xl">
                Road Trip Ready
              </h3>
              <p className="text-white">
                Keep kids entertained during long drives with spine-tingling
                stories that make the miles fly by.
              </p>
            </div>

            <div className="relative flex flex-col justify-center items-center text-center text-white max-w-xl isolate pb-8 pt-15 px-8 space-y-3 mx-auto h-full min-h-60">
              <Image
                src={InfoCardBackground}
                alt="background-image"
                className="absolute inset-0 -z-10 w-full h-full"
              />
              <div className="w-20 h-20 absolute -top-10 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <Image
                  src={CircleYellow}
                  alt="circle background"
                  className="w-full h-full"
                />
                <i className="fa-solid fa-headphones absolute text-black text-2xl"></i>
              </div>
              <h3 className="font-(family-name:--trickOrDead) font-medium text-xl">
                Headphone Adventures
              </h3>
              <p className="text-white">
                Immersive audio experiences that transport young listeners into
                the eerie world of Scaremoor.
              </p>
            </div>

            <div className="relative flex flex-col justify-center items-center text-center text-white max-w-xl isolate pb-8 pt-15 px-8 space-y-3 mx-auto h-full min-h-60">
              <Image
                src={InfoCardBackground}
                alt="background-image"
                className="absolute inset-0 -z-10 w-full h-full"
              />
              <div className="w-20 h-20 absolute -top-10 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <Image
                  src={CircleYellow}
                  alt="circle background"
                  className="w-full h-full"
                />
                <i className="fa-solid fa-bed absolute text-black text-2xl"></i>
              </div>
              <h3 className="font-(family-name:--trickOrDead) font-medium text-xl">
                Bedtime Chills
              </h3>
              <p className="text-white">
                Just scary enough to thrill without keeping them up all night
                (we hope!).
              </p>
            </div>
          </div>
        </section>

        <Testimonials
          title="What Listeners Are Saying"
          description="Parents and kids love our audio adventures—see what they have to say about our spine-tingling podcast series!"
        />
      </main>
    </>
  );
};

export default PodcastsPage;
