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
      <div onClick={scrollToTop} className="fixed bottom-40 right-8 w-10 sm:w-14 cursor-pointer transition-transform hover:scale-110 z-50">
        <Image src={ScrollTop} alt="scroll-to-top" className="inline-block w-full" />
      </div>
    )
  );
}
