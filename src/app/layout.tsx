import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SpookyToast from "./components/SpookyToast";
import StarryBackground from "./components/Starfield";

const TrickOrDead = localFont({
  src: "../../public/fonts/TrickOrDead.otf",
  variable: "--trickOrDead",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "Scaremoor | %s",
    default: "Scaremoor | Creepy Middle Grade Horror Books for Kids 10–13",
  },
  description:
    "Cinematic. Creepy. Kid-safe horror books that hook readers 10–13. Perfect for fans of Goosebumps and Coraline.",
  icons: {
    icon: "favicon_io/favicon.ico",
    shortcut: "/shortcut-icon.png",
    apple: "favicon_io/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon",
      url: "favicon_io/apple-touch-icon.png",
    },
  },
  openGraph: {
    title: "Scaremoor | Creepy Middle Grade Horror Books for Kids 10–13",
    description:
      "Cinematic. Creepy. Kid-safe horror books that hook readers 10–13. Perfect for fans of Goosebumps and Coraline.",
    url: "https://www.scaremoor.com",
    siteName: "Scaremoor",
    images: [
      {
        url: "https://www.scaremoor.com/images/share-image.png",
        width: 1200,
        height: 630,
        alt: "Scaremoor Book Series",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scaremoor | Middle Grade Horror Books",
    description:
      "Creepy, kid-safe horror books for ages 10–13. One read and you're hooked.",
    images: ["https://www.scaremoor.com/images/share-image.png"],
  },
  metadataBase: new URL("https://www.scaremoor.com"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="x-build"
          content={process.env.VERCEL_GIT_COMMIT_SHA ?? "local"}
        />
        <meta name="x-layout" content="ROOT-LAYOUT-2025-08-20-A" />
        <link rel="canonical" href="https://www.scaremoor.com/" />
        <Script
          id="ld-bookseries-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BookSeries",
              name: "Scaremoor",
              url: "https://www.scaremoor.com",
              genre: "Middle Grade Horror",
              author: { "@type": "Person", name: "Tania Lynne" },
              publisher: "Scaremoor Books",
            }),
          }}
        />

        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4TBCBRHFNR"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4TBCBRHFNR');
          `}
        </Script>
      </head>
      <body
        className={`${poppins.className} ${TrickOrDead.variable} antialiased relative bg-black`}
      >
        <StarryBackground starCount={300} />
        {children}
        <Footer />
        <ScrollToTop />
        <SpookyToast />
      </body>
    </html>
  );
}
