import { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Herobox from "../components/Herobox";
import Button from "../components/Button";
import ProductGrid from "../components/ProductGrid";
import InfoCard from "../components/InfoCard";
import { Testimonials } from "../components/Testimonials";
import { isFeatureEnabled } from "../constants/FeatureFlags";

import BackgroundImage from "../../../public/images/bookspage-image.png";
import OrangeBackgroundMd from "../../../public/images/orangeBackgroundMd.png";
import CloudRight from "../../../public/images/cloudRightTop.png";
import CloudBottom from "../../../public/images/cloudBottomLeft.png";
import CloudBottomMiddle from "../../../public/images/cloudBottomMiddle.png";

export const metadata: Metadata = {
  title: "Shop Books",
  description: "Shop our spine-tingling book collection directly from the author. Get signed copies, exclusive editions, and instant digital downloads.",
};

const ShopPage = () => {
  // Redirect if direct sales is disabled
  if (!isFeatureEnabled("DIRECT_SALES_ENABLED")) {
    redirect("/books");
  }

  return (
    <>
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-22">
        <div className="items-center">
          <div className="space-y-5 lg:pt-10">
            <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <h2 className="hero-text-large">Shop Direct from the Author</h2>
              <h1 className="hero-text-xlarge max-w-[20ch]">
                Get Signed Books & Instant Downloads
              </h1>
            </div>

            <p
              className="max-w-[80ch] font-light"
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              Get your spine-tingling reads directly from the source! Choose from 
              paperback, hardcover, eBooks, and audiobooks. All physical books can 
              be signed and personalized. Digital downloads are delivered instantly 
              to your email.
            </p>
            
            <div className="pt-8">
              <Link href="/author">
                <Button
                  buttonImage={OrangeBackgroundMd}
                  altText="about-author"
                  text="About the Author"
                />
              </Link>
            </div>
          </div>
        </div>
      </Herobox>
      
      <main className="text-white relative overflow-hidden">
        <section className="px-8 md:px-20 py-20 min-h-180 h-full text-center relative space-y-6">
          <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize flex flex-col relative z-50">
            <span>Shop All Formats</span>
            <span className="gradient-text-accessible">
              Physical Books, eBooks & Audiobooks
            </span>
          </h2>

          <div className="max-w-6xl mx-auto">
            <ProductGrid />
          </div>
        </section>

        <section className="px-8 md:px-20 py-20 space-y-8">
          <div className="text-center space-y-6">
            <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize gradient-text-accessible pb-12">
              Why Shop Direct?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-8 lg:px-12">
            <InfoCard
              cardIconFa="fa-solid fa-pen-nib"
              cardTitle="Signed Copies"
              cardDescription="Get your physical books signed and personalized by the author."
              cardWidth="w-full"
            />
            
            <InfoCard
              cardIconFa="fa-solid fa-bolt"
              cardTitle="Instant Digital"
              cardDescription="eBooks and audiobooks delivered immediately to your email."
              cardWidth="w-full"
            />
            
            <InfoCard
              cardIconFa="fa-solid fa-truck"
              cardTitle="Free Shipping"
              cardDescription="Free shipping on orders over $35. Fast, secure delivery worldwide."
              cardWidth="w-full"
            />
          </div>
        </section>

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
        <Image
          src={CloudBottomMiddle}
          alt="cloud"
          className="absolute bottom-0 right-0 -z-10"
          loading="lazy"
        />

        <Testimonials
          title="What Readers Are Saying"
          description="See what readers say about getting books directly from the author!"
        />
      </main>
    </>
  );
};

export default ShopPage;