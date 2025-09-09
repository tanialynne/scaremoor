import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Herobox from "../components/Herobox";
import Button from "../components/Button";

import BackgroundImage from "../../../public/images/authorpage-image.png";
import AuthorImage from "../../../public/images/authorTania.png";
import YellowBackground from "../../../public/images/yellowBackground.png";
import OrangeBackground from "../../../public/images/orangeBackground.png";
import CloudRight from "../../../public/images/cloudRightTop.png";
import CloudBottom from "../../../public/images/cloudBottomLeft.png";

export const metadata: Metadata = {
  title: "About",
};

const AuthorPage = () => {
  return (
    <>
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-22">
        <div className="relative overflow-hidden grid grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-[1fr_400px] items-center">
          <div className="space-y-5 lg:pt-10">
            <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <h2 className="hero-text-large">About the Author.</h2>
              <h1 className="hero-text-xlarge">T.L. Griffith</h1>
            </div>

            <div
              className=" max-w-[80ch] font-light space-y-3"
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              <p>
                Tania writes spooky stories for brave kids—and secretly hopes
                every attic hides a cursed mirror, and every old house has at
                least one painting that blinks.{" "}
              </p>
              <p>
                She grew up on a steady diet of Goosebumps,
                flashlight-under-the-blanket nights, and the kind of creepy
                books you read even though you’re not supposed to. Now she
                writes stories that make you shiver, smile, and check the closet
                one more time… just in case.
              </p>
              <p>
                She lives with her family, a growing hoard of horror paperbacks,
                and probably a ghost dog.
              </p>
              <p>
                When she’s not writing, she’s lifting heavy things, drinking
                coffee on her porch like a cryptid in training, or plotting how
                to turn <i className="font-bold">Scaremoor</i> into an entire
                universe of middle grade horror that keeps kids (and adults)
                delightfully disturbed.
              </p>
            </div>
          </div>
          <div className="relative mx-auto max-w-[400px] md:max-w-[300px] lg:max-w-[400px]">
            <Image
              src={AuthorImage}
              alt="Tania Griffith"
              className="inline-block h-auto w-full object-contain "
            />
          </div>
        </div>
      </Herobox>
      <main className=" text-white relative overflow-hidden px-8">
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
        <section className="relative flex flex-col justify-center items-center text-center space-y-12 h-180 z-50">
          <h2 className="font-trickordead font-normal text-4xl md:text-6xl text-center gradient-text-accessible">
            Want to ask her a question{" "}
            <span className="block">
              or share a spooky idea?
            </span>
          </h2>

          <div className="flex gap-5 items-center justify-center flex-col md:flex-row">
            <Link href="/contact">
              <Button
                buttonImage={OrangeBackground}
                altText="send-email"
                text="Send an Email "
              />
            </Link>

            <Link href="/society">
              <Button
                buttonImage={YellowBackground}
                altText="join-scaremoor"
                text="Join the Scaremoor Society"
                textColor="text-black"
              />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default AuthorPage;
