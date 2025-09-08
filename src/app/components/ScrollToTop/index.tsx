"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import ScrollTop from "../../../../public/images/scrollToTop.png";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button 
        onClick={scrollToTop} 
        className="fixed bottom-40 right-8 w-10 sm:w-14 cursor-pointer transition-transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black rounded-lg z-50"
        aria-label="Scroll to top of page"
        type="button"
      >
        <Image src={ScrollTop} alt="scroll-to-top" className="inline-block w-full" />
      </button>
    )
  );
}
