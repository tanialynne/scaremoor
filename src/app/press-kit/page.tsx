import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Herobox from "../components/Herobox";
import Button from "../components/Button";
import InfoCard from "../components/InfoCard";

import BackgroundImage from "../../../public/images/singleBookBackground.png";
import OrangeBackgroundMd from "../../../public/images/orangeBackgroundMd.png";
import YellowBackground from "../../../public/images/yellowBackground.png";
import CloudRight from "../../../public/images/cloudRightTop.png";
import CloudBottom from "../../../public/images/cloudBottomLeft.png";

export const metadata: Metadata = {
  title: "Press Kit",
  description: "Download high-resolution photos, author bios, and book covers for media coverage of Scaremoor horror books for kids.",
  openGraph: {
    title: "Scaremoor Press Kit | Media Resources",
    description: "Download high-resolution photos, author bios, and book covers for media coverage.",
  },
};

interface DownloadItem {
  title: string;
  description: string;
  downloadUrl: string;
  fileSize: string;
  format: string;
}

const downloadItems: DownloadItem[] = [
  {
    title: "Author Photo - High Resolution",
    description: "Professional headshot of T.L. Griffith",
    downloadUrl: "/press-kit/author-photo-high-res.jpg",
    fileSize: "2.4 MB",
    format: "JPG"
  },
  {
    title: "Author Bio - Short",
    description: "50-word author biography",
    downloadUrl: "/press-kit/author-bio-short.txt",
    fileSize: "1 KB",
    format: "TXT"
  },
  {
    title: "Author Bio - Long",
    description: "Extended author biography with background",
    downloadUrl: "/press-kit/author-bio-long.txt",
    fileSize: "2 KB",
    format: "TXT"
  },
  {
    title: "Book Cover - The Twisted Tree",
    description: "High-resolution book cover image",
    downloadUrl: "/press-kit/twisted-tree-cover-high-res.jpg",
    fileSize: "1.8 MB",
    format: "JPG"
  },
  {
    title: "Book Cover - Death's Door",
    description: "High-resolution book cover image",
    downloadUrl: "/press-kit/deaths-door-cover-high-res.jpg",
    fileSize: "1.9 MB",
    format: "JPG"
  },
  {
    title: "Series Logo",
    description: "Scaremoor series logo with transparent background",
    downloadUrl: "/press-kit/scaremoor-logo.png",
    fileSize: "856 KB",
    format: "PNG"
  },
  {
    title: "Promotional Images Pack",
    description: "Collection of promotional images and graphics",
    downloadUrl: "/press-kit/promotional-pack.zip",
    fileSize: "12.5 MB",
    format: "ZIP"
  }
];

const DownloadCard = ({ item }: { item: DownloadItem }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-orange-700/30 rounded-lg p-6 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 backdrop-blur-sm">
      <h3 className="text-xl font-semibold text-white mb-2 font-trickordead">{item.title}</h3>
      <p className="text-gray-300 mb-4 text-sm">{item.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">{item.format} • {item.fileSize}</span>
      </div>
      <a
        href={item.downloadUrl}
        download
        className="inline-flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 hover:scale-105"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download
      </a>
    </div>
  );
};

export default function PressKitPage() {
  return (
    <>
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-22">
        <div className="items-center">
          <div className="space-y-5 lg:pt-10">
            <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <h2 className="hero-text-large">Media Resources.</h2>
              <h1 className="hero-text-xlarge max-w-[20ch]">
                Press Kit Downloads.
              </h1>
            </div>

            <p
              className="max-w-[80ch] font-light"
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              Download high-resolution photos, author bios, and book covers for 
              media coverage. All materials are available for editorial use in 
              connection with coverage of Scaremoor books.
            </p>

            <div className="flex flex-col sm:flex-row pt-8 gap-5">
              <Link href="#downloads">
                <Button
                  buttonImage={OrangeBackgroundMd}
                  altText="browse-downloads"
                  text="Browse Downloads"
                />
              </Link>

              <Link href="/contact">
                <Button
                  buttonImage={YellowBackground}
                  altText="media-contact"
                  text="Media Contact"
                  textColor="text-black"
                />
              </Link>
            </div>
          </div>
        </div>
      </Herobox>

      <main className="text-white">
        <section
          id="downloads"
          className="px-8 md:px-20 py-20 min-h-180 h-full relative overflow-hidden space-y-6"
        >
          <div className="text-center space-y-6 relative z-50">
            <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize gradient-text-accessible">
              Media Resources Available Now
            </h2>
            <p className="max-w-[60ch] mx-auto">
              Professional-quality assets for journalists, bloggers, and media outlets.
              <br />
              Everything you need to cover the spine-tingling world of Scaremoor.
            </p>
          </div>

          <div className="pt-12 relative z-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {downloadItems.map((item, index) => (
                <DownloadCard key={index} item={item} />
              ))}
            </div>
          </div>

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
            <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize gradient-text-accessible pb-12">
              Perfect for Media Coverage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-8 lg:px-12">
            <InfoCard
              cardIconFa="fa-solid fa-newspaper"
              cardTitle="Print & Digital Media"
              cardDescription="High-resolution images and comprehensive author information for newspaper and magazine features."
              cardWidth="w-full"
            />
            
            <InfoCard
              cardIconFa="fa-solid fa-microphone"
              cardTitle="Podcast & Radio"
              cardDescription="Interview-ready author bios and talking points for podcast appearances and radio shows."
              cardWidth="w-full"
            />
            
            <InfoCard
              cardIconFa="fa-solid fa-video"
              cardTitle="Video Content"
              cardDescription="Professional imagery and branding assets perfect for book trailers and video reviews."
              cardWidth="w-full"
            />
          </div>
        </section>

        <section className="px-8 md:px-20 py-20 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-orange-900/20 to-yellow-900/20 rounded-lg p-8 border border-orange-700/30">
              <h3 className="font-trickordead text-3xl mb-4 text-orange-400">
                Media Contact
              </h3>
              <div className="space-y-3 text-gray-300">
                <p><strong className="text-white">Author:</strong> T.L. Griffith</p>
                <p><strong className="text-white">Email:</strong> media@scaremoor.com</p>
                <p><strong className="text-white">Website:</strong> www.scaremoor.com</p>
                <p><strong className="text-white">Series:</strong> Scaremoor</p>
                <p><strong className="text-white">Genre:</strong> Middle Grade Horror</p>
                <p><strong className="text-white">Target Age:</strong> 8-13 years</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-lg p-8 border border-gray-700/30">
              <h3 className="font-trickordead text-3xl mb-4 text-orange-400">
                Usage Guidelines
              </h3>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• All materials are provided for editorial use in connection with coverage of Scaremoor books</p>
                <p>• Please credit images as "Courtesy of Scaremoor Books" when possible</p>
                <p>• High-resolution versions are available upon request</p>
                <p>• For additional materials or interview requests, please contact media@scaremoor.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}