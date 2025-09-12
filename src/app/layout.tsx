import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import Script from "next/script";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SpookyToast from "./components/SpookyToast";
import { CartProvider } from "./contexts/CartContext";

// Shopping cart components
const ShoppingCart = dynamic(() => import("./components/ShoppingCart"));
// Lazy load the background animation to reduce initial bundle size
const StarryBackground = dynamic(() => import("./components/Starfield"), {
  loading: () => <div className="fixed inset-0 bg-black -z-50" />,
});

// Exit intent popup for lead capture
const ExitIntentPopup = dynamic(() => import("./components/ExitIntentPopup"));

// Preload critical images
const ImagePreloader = dynamic(() => import("./components/ImagePreloader"));

// Web Vitals tracking
const WebVitalsTracker = dynamic(() => import("./components/WebVitalsTracker"));

// Critical images to preload for better Core Web Vitals
const criticalImages = [
  "/images/landingpage-Image.png",
  "/images/monsterBackground.png",
  "/images/bookspage-image.png",
];
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

// Use optimized webfonts with fallbacks
const TrickOrDead = localFont({
  src: [
    {
      path: "../../public/fonts/TrickOrDeadRegular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/TrickOrDeadRegular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/TrickOrDead.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--trickOrDead",
  display: "swap", // Improve loading performance
  fallback: ["serif"], // Fallback fonts
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "Scaremoor | %s",
    default: "Scaremoor | Creepy Middle Grade Horror Books for Kids 8–13",
  },
  description:
    "Cinematic. Creepy. Kid-safe horror books that hook readers 8–13. Perfect for fans of Goosebumps and Coraline.",
  icons: {
    icon: "/favicon_io/favicon.ico",
    shortcut: "/shortcut-icon.png",
    apple: "/favicon_io/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon",
      url: "/favicon_io/apple-touch-icon.png",
    },
  },
  openGraph: {
    title: "Scaremoor | Creepy Middle Grade Horror Books for Kids 8–13",
    description:
      "Cinematic. Creepy. Kid-safe horror books that hook readers 8–13. Perfect for fans of Goosebumps and Coraline.",
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
      "Creepy, kid-safe horror books for ages 8–13. One read and you're hooked.",
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
              author: { "@type": "Person", name: "T.L. Griffith" },
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
            gtag('config', 'G-4TBCBRHFNR', {
              // Enhanced ecommerce
              send_page_view: true,
              
              // User engagement
              engagement_time_msec: 1000,
              
              // Content grouping
              content_group1: 'Page Type',
              content_group2: 'Book Category',
              content_group3: 'User Journey Stage',
              
              // Enhanced measurement
              enhanced_measurement: {
                scrolls: true,
                outbound_clicks: true,
                site_search: true,
                video_engagement: true,
                file_downloads: true
              },
              
              // Custom parameters
              custom_map: {
                dimension1: 'user_type',
                dimension2: 'book_preference', 
                dimension3: 'engagement_level'
              }
            });

            // Set up enhanced ecommerce
            gtag('config', 'G-4TBCBRHFNR', {
              currency: 'USD',
              country: 'US'
            });
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "t65inyrz32"}");
            }
          `}
        </Script>

        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '228729539194546'); 
              fbq('track', 'PageView');
            }
          `}
        </Script>
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=228729539194546&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body
        className={`${poppins.className} ${TrickOrDead.variable} antialiased relative bg-black`}
      >
        <CartProvider>
          <ImagePreloader images={criticalImages} priority />
          <WebVitalsTracker />
          <StarryBackground starCount={300} />
          {children}
          <Footer />
          <ScrollToTop />
          <SpookyToast />
          <ExitIntentPopup />
          <ShoppingCart />
        </CartProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
