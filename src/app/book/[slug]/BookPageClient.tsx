"use client";

import { useEffect } from "react";
import Link from "next/link";
import { StaticImageData } from "next/image";
import OptimizedImage from "@/app/components/OptimizedImage";
import Markdown from "react-markdown";

import { Book } from "@/app/constants/Books";
import Button from "@/app/components/Button";
import Herobox from "@/app/components/Herobox";
import VideoPreview from "@/app/components/VideoPreview";
import BookPurchaseOptions from "@/app/components/BookPurchaseOptions";
import { LeadMagnetTest } from "@/app/components/ABTestExamples/LeadMagnetTest";
import ABTestDebug from "@/app/components/ABTestDebug";
import {
  trackBookPageView,
  trackPurchaseClick,
  trackButtonClick,
  trackLeadMagnetView,
} from "@/app/utils/analytics";

import BackgroundImage from "../../../../public/images/bookspage-image.png";
import CloudRight from "../../../../public/images/cloudRightTop.png";
import CloudBottom from "../../../../public/images/cloudBottomLeft.png";
import YellowBackground from "../../../../public/images/yellowBackground.png";
import OrangeBackground from "../../../../public/images/orangeBackground.png";
import OrangeBackgroundLg from "../../../../public/images/orangeBackgroundLg.png";
import BlurLayer from "../../../../public/images/blurLayer.png";

interface BookPageClientProps {
  selectedBook: Book;
}

const BookPageClient: React.FC<BookPageClientProps> = ({ selectedBook }) => {
  const bookImage = selectedBook.bookImage.close as StaticImageData;

  useEffect(() => {
    // Track book page view
    trackBookPageView(selectedBook.bookTitle, selectedBook.bookSlug);

    // Track lead magnet view if present
    if (selectedBook.leadMagnetId) {
      trackLeadMagnetView(selectedBook.leadMagnetId, selectedBook.bookTitle);
    }
  }, [selectedBook]);

  const handlePurchaseClick = () => {
    trackPurchaseClick(
      selectedBook.bookTitle,
      selectedBook.bookSlug,
      selectedBook.purchaseLink
    );
  };

  const handleButtonClick = (buttonText: string, destination: string) => {
    trackButtonClick(
      buttonText,
      `Book Page - ${selectedBook.bookTitle}`,
      destination
    );
  };

  return (
    <>
      <ABTestDebug testId="book_cta_buttons" position="fixed" />
      {selectedBook?.leadMagnetId && (
        <ABTestDebug
          testId="lead_magnet_layout"
          position="fixed"
          className="top-64"
        />
      )}
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-22">
        <div className="relative overflow-hidden grid grid-cols-1 lg:grid-cols-[2fr_1fr] xl:grid-cols-[1fr_500px] gap-8 items-start z-10">
          <div className="space-y-5 lg:pt-10">
            {selectedBook?.leadMagnetId ? (
              <LeadMagnetTest
                bookTitle={selectedBook.bookTitle}
                leadMagnetId={selectedBook.leadMagnetId}
              />
            ) : (
              <>
                <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
                  <h3 className="text-2xl md:text-4xl">
                    {selectedBook?.bookSubHeading}
                  </h3>
                  <h1 className="text-5xl md:text-7xl">
                    {selectedBook?.bookTitle} #{selectedBook?.bookNumber}
                  </h1>
                </div>

                <div className="text-lg max-w-[80ch] font-light space-y-4">
                  <Markdown>{selectedBook?.bookDescription}</Markdown>
                </div>
                <div className="mt-8">
                  <BookPurchaseOptions
                    book={selectedBook}
                    onPurchaseClick={handlePurchaseClick}
                  />
                </div>
              </>
            )}
          </div>
          <div className="relative w-full max-w-[500px] lg:max-w-[400px] xl:max-w-[500px] mx-auto">
            <OptimizedImage
              src={bookImage}
              alt={`${selectedBook.bookTitle} - ${selectedBook.bookSubHeading}`}
              className="inline-block h-auto w-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
              priority={true}
            />
          </div>
        </div>
        <OptimizedImage
          src={BlurLayer}
          alt="blur-layer"
          className="absolute -bottom-0 left-0 right-0"
          loading="lazy"
        />
      </Herobox>
      <main className=" text-white relative overflow-hidden px-8">
        <OptimizedImage
          src={CloudRight}
          alt="cloud"
          className="absolute top-10 right-0"
          loading="lazy"
        />
        <OptimizedImage
          src={CloudBottom}
          alt="cloud"
          className="absolute bottom-0 left-0"
          loading="lazy"
        />
        <section className="relative flex flex-col justify-center items-center text-center space-y-12 min-h-150 z-50 py-20">
          {selectedBook?.leadMagnetId && selectedBook?.videoPreview ? (
            <div className="w-full max-w-7xl mx-auto mb-16">
              <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)] text-center mb-12">
                <h3 className="text-2xl md:text-4xl">
                  {selectedBook?.bookSubHeading}
                </h3>
                <h2 className="text-5xl md:text-7xl">
                  {selectedBook?.bookTitle} #{selectedBook?.bookNumber}
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
                    bookTitle={selectedBook.bookTitle}
                  />
                  <div className="text-center mt-8">
                    <BookPurchaseOptions
                      book={selectedBook}
                      onPurchaseClick={handlePurchaseClick}
                    />
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
                    bookTitle={selectedBook.bookTitle}
                  />
                </div>
              )}

              {selectedBook?.leadMagnetId && !selectedBook?.videoPreview && (
                <div className="max-w-4xl mx-auto mb-32 text-left">
                  <div className="space-y-6">
                    <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)] text-center">
                      <p className="text-3xl md:text-5xl leading-10">
                        {selectedBook?.bookSubHeading}
                      </p>
                      <h2 className="">
                        {selectedBook?.bookTitle} #{selectedBook?.bookNumber}
                      </h2>
                    </div>

                    <div className="text-lg max-w-[80ch] font-light space-y-4 mx-auto">
                      <Markdown>{selectedBook?.bookDescription}</Markdown>
                    </div>

                    <div className="text-center mt-8">
                      <BookPurchaseOptions
                        book={selectedBook}
                        onPurchaseClick={handlePurchaseClick}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <div>
            <h2 className="font-trickordead font-normal text-4xl md:text-7xl text-center block gradient-text-accessible">
              Perfect for fans of
            </h2>

            <p>
              Goosebumps, Coraline, mysterious wishes gone wrong, and twisty
              hallway horror.
            </p>
          </div>

          <div className="flex gap-5 items-center justify-center flex-col lg:flex-row">
            <Link
              href="/free-story"
              onClick={() =>
                handleButtonClick("READ A FREE STORY", "/free-story")
              }
            >
              <Button
                buttonImage={OrangeBackground}
                altText="read-story"
                text="READ A FREE STORY"
              />
            </Link>
            <Link
              href="/books"
              onClick={() =>
                handleButtonClick("See More Scaremoor Books", "/books")
              }
            >
              <Button
                buttonImage={YellowBackground}
                altText="see-more"
                text="See More Scaremoor Books"
                textColor="text-black"
              />
            </Link>
            <Link
              href="/society"
              onClick={() =>
                handleButtonClick("Join the Scaremoor Society", "/society")
              }
            >
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

export default BookPageClient;
