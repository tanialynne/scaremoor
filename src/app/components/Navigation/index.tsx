"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { NAV_ITEMS } from "@/app/constants/NavLinks";
import NavLink from "./NavLink";

import { AlignRight, X } from "lucide-react";

import Logo from "../../../../public/images/logo.png";
import ShopIcon from "../../../../public/images/shop.svg";
import EmailIcon from "../../../../public/images/email.svg";
import HandGrab from "../../../../public/images/hand_grab.svg";
import Star from "../../../../public/images/starsIcon.svg";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <div>
      <div
        className={`flex justify-between bg-transparent  relative z-[100] transition-transform duration-500 ease-in-out`}
      >
        <Link href="/" className="w-25 lg:w-30 ">
          <Image
            src={Logo}
            alt="brand logo"
            className="inline-block object-cover w-full h-full"
          />
        </Link>

        <div className="flex items-center ml-auto">
          <div className="hidden lg:flex gap-6 mr-16">
            {NAV_ITEMS.map((link, idx) => (
              <NavLink
                key={link.name}
                text={link.name}
                href={link.href}
                index={idx + 1}
              />
            ))}
          </div>

          <button
            onClick={toggleMenu}
            className="lg:hidden ml-8 text-white hover:text-gray-300 focus:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black rounded-lg p-2 transition-colors z-[100] cursor-pointer relative"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            type="button"
          >
            <AlignRight className="text-white cursor-pointer" size={35} aria-hidden="true" />
          </button>

          <div className="flex items-center gap-1.5">
            <Link
              href="https://www.amazon.com/dp/B0DKLDSJBC"
              className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black rounded-lg p-1 transition-transform hover:scale-110 focus:scale-110"
              rel="noopener"
              target="_blank"
              aria-label="Shop books on Amazon (opens in new tab)"
            >
              <Image src={ShopIcon} alt="Shop on Amazon" className="w-10" />
            </Link>
            <Link 
              href="/contact" 
              className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black rounded-lg p-1 transition-transform hover:scale-110 focus:scale-110"
              aria-label="Contact us"
            >
              <Image src={EmailIcon} alt="Contact us" className="w-10" />
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`fixed lg:hidden inset-0 z-[999999] 
        transition-all duration-700 ease-in-out 
        ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ backgroundColor: isMenuOpen ? '#000000' : 'transparent' }}
      >
        {/* Solid black background overlay */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Decorative star animation */}
        <div
          className={`absolute rounded-full transition-all duration-700 ease-in-out z-[1]
            ${isMenuOpen ? "w-[200vmax] h-[100vmax] -top-[100vmax] -right-[100vmax]" : "w-0 h-0 top-8 right-8"}`}
          style={{
            transformOrigin: "top right",
            backgroundImage: `url(${Star.src})`,
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div
          className={`relative z-[10] flex flex-col items-center justify-center h-full 
            transition-all duration-500 ease-in-out
            ${isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-8 right-8 text-white hover:text-gray-300 transition-colors z-[9999999] cursor-pointer"
          >
            <X size={35} />
          </button>

          <div className="flex flex-col items-center space-y-8">
            {NAV_ITEMS.map((link, idx) => (
              <div
                key={link.name}
                className={`transform transition-all duration-500 ease-in-out
                  ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{
                  transitionDelay: `${(idx + 1) * 80 + 300}ms`,
                }}
              >
                <NavLink text={link.name} href={link.href} index={idx + 1} />
              </div>
            ))}

            <div
              className={`flex items-center gap-6 mt-12 transition-all duration-500 ease-in-out
                ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{
                transitionDelay: `${NAV_ITEMS.length * 80 + 500}ms`,
              }}
            >
              <Link
                className="cursor-pointer p-3 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300"
                href="https://www.amazon.com/dp/B0DKLDSJBC"
                rel="noopener"
              >
                <Image src={ShopIcon} alt="shopIcon" className="w-8" />
              </Link>
              <Link
                href="/contact"
                className="cursor-pointer p-3 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                <Image src={EmailIcon} alt="emailIcon" className="w-8" />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0">
          <Image src={HandGrab} alt="star" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
