"use client";

import { ABTest } from "../ABTest";
import { useABTest } from "@/app/utils/abTesting";
import RequestForm from "../RequestForm";
import Image from "next/image";
import ListCheckIcon from "../../../../public/images/icons/list.svg";

interface LeadMagnetTestProps {
  bookTitle: string;
  leadMagnetId: string;
  className?: string;
}

/**
 * A/B Test for Lead Magnet Form Layout
 * Tests different positioning and copy for the free chapter form
 */
export const LeadMagnetTest: React.FC<LeadMagnetTestProps> = ({
  bookTitle,
  leadMagnetId,
  className = "",
}) => {
  useABTest("lead_magnet_layout");

  return (
    <div className={`${className}`}>
      <ABTest
        testId="lead_magnet_layout"
        variants={{
          control: (
            // Original layout
            <>
              <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
                <h3 className="text-2xl md:text-4xl">Get Chapter One…</h3>
                <h1 className="text-5xl md:text-7xl">If You Dare.</h1>
              </div>

              <div
                className="max-w-[62ch] font-light space-y-6"
                style={{
                  textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
                }}
              >
                <p>Want a taste of the terror before you buy?</p>
                <p>
                  Get the first chapter of{" "}
                  <span className="font-bold">{bookTitle}</span>{" "}
                  <span className="font-bold">FREE</span> and dive into the
                  world of <span className="font-bold">SCAREMOOR</span>.
                </p>
              </div>

              <div className="w-full max-w-[300px] sm:max-w-1/2 md:max-w-[700px]">
                <RequestForm
                  buttonText="Send My Chapter"
                  requestId={leadMagnetId}
                  bookTitle={bookTitle}
                />
              </div>

              <ul className="flex gap-4 pt-4 flex-col md:flex-row">
                <li className="inline-flex items-center gap-2">
                  <Image src={ListCheckIcon} alt="list-icon" />
                  <span>
                    Perfect for ages 8–12 (and brave grown-ups too). No spam,
                    just stories.
                  </span>
                </li>
              </ul>
            </>
          ),
          variant_a: (
            // Urgency-focused layout
            <>
              <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
                <h3 className="text-2xl md:text-4xl text-orange-400">
                  FREE Chapter!
                </h3>
                <h1 className="text-5xl md:text-7xl">Get Yours Now</h1>
              </div>

              <div
                className="max-w-[62ch] font-light space-y-6"
                style={{
                  textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
                }}
              >
                <p className="text-lg">
                  🎃 <strong>Limited Time:</strong> Get the spine-chilling first
                  chapter of{" "}
                  <span className="font-bold text-orange-400">{bookTitle}</span>{" "}
                  absolutely FREE!
                </p>
                <p>
                  Join thousands of young readers who can’t put these books
                  down. Perfect for fans of Goosebumps!
                </p>
              </div>

              <div className="w-full max-w-[300px] sm:max-w-1/2 md:max-w-[700px]">
                <RequestForm
                  buttonText="Get My FREE Chapter"
                  requestId={leadMagnetId}
                  bookTitle={bookTitle}
                />
              </div>

              <ul className="flex gap-4 pt-4 flex-col md:flex-row">
                <li className="inline-flex items-center gap-2">
                  <Image src={ListCheckIcon} alt="list-icon" />
                  <span>✨ Instant download • Ages 8–12 • No spam ever</span>
                </li>
              </ul>
            </>
          ),
          variant_b: (
            // Social proof focused layout
            <>
              <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
                <h3 className="text-2xl md:text-4xl">Readers Love</h3>
                <h1 className="text-5xl md:text-7xl">{bookTitle}</h1>
              </div>

              <div
                className="max-w-[62ch] font-light space-y-6"
                style={{
                  textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
                }}
              >
                <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-orange-400">
                  <p className="italic">
                    &quot;My kids devoured this book in one sitting! Perfect
                    scary story for middle schoolers.&quot;
                  </p>
                  <p className="text-sm text-gray-300 mt-2">
                    — Sarah M., Parent
                  </p>
                </div>
                <p>
                  Want to see why kids can’t stop reading? Get Chapter 1 of{" "}
                  <span className="font-bold">{bookTitle}</span> FREE.
                </p>
              </div>

              <div className="w-full max-w-[300px] sm:max-w-1/2 md:max-w-[700px]">
                <RequestForm
                  buttonText="Start Reading Free"
                  requestId={leadMagnetId}
                  bookTitle={bookTitle}
                />
              </div>

              <ul className="flex gap-4 pt-4 flex-col md:flex-row">
                <li className="inline-flex items-center gap-2">
                  <Image src={ListCheckIcon} alt="list-icon" />
                  <span>
                    Loved by 1000+ families • Perfect for ages 8–12 •
                    Email-only, no spam
                  </span>
                </li>
              </ul>
            </>
          ),
        }}
      />
    </div>
  );
};

export default LeadMagnetTest;
