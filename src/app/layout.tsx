import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
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
    template: "Scaremoor | %s ",
    default: "Scaremoor",
  },
  description: "Spine-tingling stories that keep kids hooked—and looking over their should",
  icons: {
    icon: "favicon_io/favicon.ico",
    shortcut: "/shortcut-icon.png",
    apple: "favicon_io/apple-touch-icon.png",

    other: {
      rel: "apple-touch-icon",
      url: "favicon_io/apple-touch-icon.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${TrickOrDead.variable} antialiased relative bg-black`}>
        <StarryBackground starCount={300} />
        {children}
        <Footer />
        <ScrollToTop />
        <SpookyToast />
      </body>
    </html>
  );
}
