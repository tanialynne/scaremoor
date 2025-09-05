import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import Markdown from "react-markdown";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import Books from "@/app/constants/Books";
import Button from "@/app/components/Button";
import Herobox from "@/app/components/Herobox";
import VideoPreview from "@/app/components/VideoPreview";
import ChapterLeadMagnet from "@/app/components/ChapterLeadMagnet";

import BackgroundImage from "../../../../public/images/singleBookBackground.png";
import CloudRight from "../../../../public/images/cloudRightTop.png";
import CloudBottom from "../../../../public/images/cloudBottomLeft.png";
import YellowBackground from "../../../../public/images/yellowBackground.png";
import OrangeBackground from "../../../../public/images/orangeBackground.png";
import OrangeBackgroundLg from "../../../../public/images/orangeBackgroundLg.png";
import BlurLayer from "../../../../public/images/blurLayer.png";
import PumpkinSpooky from "../../../../public/images/pumpkinSpooky.svg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const selectedBook = Books.find((book) => book.bookSlug === slug);

  if (!selectedBook) {
    return {
      title: "Book Not Found | Scaremoor",
      description: "The book you're looking for could not be found.",
    };
  }

  const bookUrl = `https://www.scaremoor.com/book/${selectedBook.bookSlug}`;
  const bookDescription = selectedBook.bookDescription?.replace(/\*/g, "").trim() || 
    `${selectedBook.bookSubHeading} - A spine-chilling middle grade horror book by T.L. Griffith, perfect for kids aged 8-13.`;

  return {
    title: selectedBook.bookTitle,
    description: bookDescription.substring(0, 160),
    canonical: bookUrl,
    openGraph: {
      title: `${selectedBook.bookTitle} | Scaremoor`,
      description: bookDescription.substring(0, 160),
      url: bookUrl,
      siteName: "Scaremoor",
      images: [
        {
          url: `https://www.scaremoor.com/images/books/${selectedBook.bookSlug}-share.jpg`,
          width: 1200,
          height: 630,
          alt: selectedBook.bookTitle,
        },
      ],
      type: "book",
    },
    twitter: {
      card: "summary_large_image",
      title: `${selectedBook.bookTitle} | Scaremoor`,
      description: bookDescription.substring(0, 160),
      images: [`https://www.scaremoor.com/images/books/${selectedBook.bookSlug}-share.jpg`],
    },
  };
}

export async function generateStaticParams() {
  return Books.map((book) => ({
    slug: book.bookSlug,
  }));
}

const BookPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const selectedBook = Books.find((book) => book.bookSlug === slug);

  if (!selectedBook) {
    notFound();
  }

  const bookImage = selectedBook.bookImage.close as StaticImageData;
  
  const bookStructuredData = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: selectedBook.bookTitle,
    description: selectedBook.bookDescription?.replace(/\*/g, "").trim() || selectedBook.bookSubHeading,
    author: {
      "@type": "Person",
      name: "T.L. Griffith",
      url: "https://www.scaremoor.com/author"
    },
    publisher: {
      "@type": "Organization",
      name: "Scaremoor Books"
    },
    genre: ["Middle Grade Horror", "Children's Fiction", "Horror"],
    audience: {
      "@type": "Audience",
      audienceType: "Children",
      suggestedMinAge: 8,
      suggestedMaxAge: 13
    },
    url: `https://www.scaremoor.com/book/${selectedBook.bookSlug}`,
    image: `https://www.scaremoor.com/images/books/${selectedBook.bookSlug}-cover.jpg`,
    offers: {
      "@type": "Offer",
      url: selectedBook.purchaseLink,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Amazon"
      }
    },
    isPartOf: {
      "@type": "BookSeries",
      name: "Scaremoor",
      url: "https://www.scaremoor.com/scaremoor"
    }
  };

  return (
    <>
      <Script
        id={`book-structured-data-${selectedBook.bookSlug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookStructuredData),
        }}
      />
      <Herobox
        backgroundImage={BackgroundImage}
        contentPaddingTop=" lg:pt-22 xl:pt-2"
      >
        <div className="relative overflow-hidden grid grid-cols-1 lg:grid-cols-[2fr_1fr] xl:grid-cols-[1fr_500px] gap-8 items-start z-10">
          <div className="space-y-5 ">
            {selectedBook?.leadMagnetId ? (
              <ChapterLeadMagnet
                bookTitle={selectedBook.bookTitle}
                leadMagnetId={selectedBook.leadMagnetId}
              />
            ) : (
              <>
                <div className="font-(family-name:--trickOrDead) font-normal space-y-4 [text-shadow:0_0_13px_rgba(0,0,0,0.8)]">
                  <p className="text-3xl md:text-5xl leading-10">
                    {selectedBook?.bookSubHeading}
                  </p>
                  <h1 className="text-5xl md:text-7xl">
                    {selectedBook?.bookTitle}
                  </h1>
                </div>

                <div className="text-lg max-w-[80ch] font-light space-y-4">
                  <Markdown>{selectedBook?.bookDescription}</Markdown>
                </div>
                <div className="mt-8">
                  <Link
                    href={selectedBook?.purchaseLink}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Button
                      buttonImage={OrangeBackground}
                      altText="get-book"
                      text="Get The Book"
                    />
                  </Link>
                </div>
              </>
            )}
          </div>
          <div className="relative w-full max-w-[500px] lg:max-w-[400px] xl:max-w-[500px] mx-auto">
            <Image
              src={bookImage}
              alt={`${selectedBook.bookTitle} - ${selectedBook.bookSubHeading}`}
              className="inline-block h-auto w-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
              priority={true}
            />
          </div>
        </div>
        <Image
          src={PumpkinSpooky}
          alt="pumpkin-spooky"
          className="hidden lg:inline-block absolute bottom-0 left-1/2 -translate-x-1/2 -z-2 max-w-3xs"
          loading="lazy"
        />
        <Image
          src={BlurLayer}
          alt="blur-layer"
          className="absolute -bottom-0 left-0 right-0"
          loading="lazy"
        />
      </Herobox>
      <main className=" text-white relative overflow-hidden px-8">
        <Image
          src={CloudRight}
          alt="cloud"
          className="absolute top-10 right-0"
          loading="lazy"
        />
        <Image
          src={CloudBottom}
          alt="cloud"
          className="absolute bottom-0 left-0"
          loading="lazy"
        />
        <section className="relative flex flex-col justify-center items-center text-center space-y-12 min-h-150 z-50 py-20">
          {selectedBook?.leadMagnetId && selectedBook?.videoPreview ? (
            <div className="w-full max-w-7xl mx-auto mb-16">
              <div className="font-(family-name:--trickOrDead) font-normal space-y-4 [text-shadow:0_0_13px_rgba(0,0,0,0.8)] text-center mb-12">
                <p className="text-3xl md:text-5xl leading-10">
                  {selectedBook?.bookSubHeading}
                </p>
                <h2 className="text-5xl md:text-7xl">
                  {selectedBook?.bookTitle}
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                <div className="text-left space-y-6">
                  <div className="text-lg max-w-[80ch] font-light space-y-4">
                    <Markdown>{selectedBook?.bookDescription}</Markdown>
                  </div>
                </div>

                <div>
                  <VideoPreview
                    videoSrc={selectedBook.videoPreview}
                    title={`${selectedBook.bookTitle} Preview`}
                  />
                  <div className="text-center mt-8">
                    <Link
                      href={selectedBook?.purchaseLink}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Button
                        buttonImage={OrangeBackground}
                        altText="get-book"
                        text="Get The Book"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {selectedBook?.videoPreview && !selectedBook?.leadMagnetId && (
                <div className="w-full max-w-4xl mx-auto mb-32">
                  <VideoPreview
                    videoSrc={selectedBook.videoPreview}
                    title={`${selectedBook.bookTitle} Preview`}
                  />
                </div>
              )}

              {selectedBook?.leadMagnetId && !selectedBook?.videoPreview && (
                <div className="max-w-4xl mx-auto mb-32 text-left">
                  <div className="space-y-6">
                    <div className="font-(family-name:--trickOrDead) font-normal space-y-4 [text-shadow:0_0_13px_rgba(0,0,0,0.8)] text-center">
                      <p className="text-3xl md:text-5xl leading-10">
                        {selectedBook?.bookSubHeading}
                      </p>
                      <h2 className="text-5xl md:text-7xl">
                        {selectedBook?.bookTitle}
                      </h2>
                    </div>

                    <div className="text-lg max-w-[80ch] font-light space-y-4 mx-auto">
                      <Markdown>{selectedBook?.bookDescription}</Markdown>
                    </div>

                    <div className="text-center mt-8">
                      <Link
                        href={selectedBook?.purchaseLink}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <Button
                          buttonImage={OrangeBackground}
                          altText="get-book"
                          text="Get The Book"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <div>
            <h2 className="font-(family-name:--trickOrDead) font-normal  text-4xl md:text-7xl text-center block bg-gradient-to-b from-white from-[10%] to-[#A4A4A4] bg-clip-text text-transparent">
              Perfect for fans of
            </h2>

            <p>
              Goosebumps, Coraline, mysterious wishes gone wrong, and twisty
              hallway horror.
            </p>
          </div>

          <div className="flex gap-5 items-center justify-center flex-col lg:flex-row">
            <Link href="/free-story">
              <Button
                buttonImage={OrangeBackground}
                altText="read-story"
                text="READ A FREE STORY"
              />
            </Link>
            <Link href="/scaremoor">
              <Button
                buttonImage={YellowBackground}
                altText="see-more"
                text="See More Scaremoor Books"
              />
            </Link>
            <Link href="/society">
              <Button
                buttonImage={OrangeBackgroundLg}
                altText="join-scaremoor"
                text="Join the Scaremoor Society"
              />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default BookPage;
