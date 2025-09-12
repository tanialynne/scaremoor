"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { getFilteredNavigation, getFlatNavItems } from "@/app/constants/NavigationStructure";
import NavLink from "./NavLink";
import NavigationDropdown from "./NavigationDropdown";
import MobileNavSection from "./MobileNavSection";

import { AlignRight, X } from "lucide-react";
import CartIcon from "../CartIcon";

import Logo from "../../../../public/images/logo.png";
import ShopIcon from "../../../../public/images/shop.svg";
import EmailIcon from "../../../../public/images/email.svg";
import HandGrab from "../../../../public/images/hand_grab.svg";
import Star from "../../../../public/images/starsIcon.svg";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigationGroups = getFilteredNavigation();
  const flatNavItems = getFlatNavItems();

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
        <Link href="/" className="w-25 xl:w-30 ">
          <Image
            src={Logo}
            alt="brand logo"
            className="inline-block object-cover w-full h-full"
          />
        </Link>

        <div className="flex items-center ml-auto">
          <div className="hidden xl:flex gap-2 mr-8">
            {navigationGroups.map((group, idx) => (
              <NavigationDropdown
                key={group.name}
                group={group}
                index={idx}
              />
            ))}
          </div>

          <button
            onClick={toggleMenu}
            className="xl:hidden ml-8 text-white hover:text-gray-300 focus:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black rounded-lg p-2 transition-colors z-[100] cursor-pointer relative"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            type="button"
          >
            <AlignRight className="text-white cursor-pointer" size={35} aria-hidden="true" />
          </button>

          <div className="flex items-center gap-1.5">
            <CartIcon />
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
        className={`fixed xl:hidden inset-0 z-[999999] 
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
          className={`relative z-[10] flex flex-col h-full 
            transition-all duration-500 ease-in-out
            ${isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-8 right-8 text-white hover:text-gray-300 focus:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black rounded-lg p-2 transition-colors z-[9999999] cursor-pointer"
            aria-label="Close navigation menu"
            type="button"
          >
            <X size={35} aria-hidden="true" />
          </button>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto px-8 py-20 mt-16">
            <div className="flex flex-col space-y-3 w-full max-w-sm mx-auto">
              {navigationGroups.map((group, idx) => (
                <MobileNavSection
                  key={group.name}
                  group={group}
                  onLinkClick={() => setIsMenuOpen(false)}
                  animationDelay={(idx + 1) * 100 + 300}
                />
              ))}
            </div>
          </div>

          {/* Fixed bottom social icons */}
          <div className="flex-shrink-0 p-8">
            <div
              className={`flex items-center justify-center gap-6 transition-all duration-500 ease-in-out
                ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{
                transitionDelay: `${navigationGroups.length * 100 + 500}ms`,
              }}
            >
              <Link
                className="cursor-pointer p-3 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300"
                href="https://www.amazon.com/dp/B0DKLDSJBC"
                rel="noopener"
                target="_blank"
                aria-label="Shop books on Amazon (opens in new tab)"
              >
                <Image src={ShopIcon} alt="Shop on Amazon" className="w-8" />
              </Link>
              <Link
                href="/contact"
                className="cursor-pointer p-3 rounded-full border border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300"
                aria-label="Contact us"
              >
                <Image src={EmailIcon} alt="Contact us" className="w-8" />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0">
          <Image src={HandGrab} alt="Decorative illustration" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
