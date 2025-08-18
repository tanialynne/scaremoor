import Image from "next/image";
import Link from "next/link";

import { NAV_ITEMS } from "@/app/constants/NavLinks";
import { getCurrentYear } from "@/app/utils";
import FooterIcon from "./FooterIcon";
import NavLink from "../Navigation/NavLink";
import RandomMessage from "../RandomMessage";

import footerBg from "../../../../public/images/footerBackground.png";
import LeftGhosted from "../../../../public/images/ghost-animated.svg";
import RightGhosted from "../../../../public/images/ghost-animation-doubled.svg";
import Eye from "../../../../public/images/eye.svg";

const Footer = () => {
  return (
    <div
      className={`relative flex flex-col justify-end  bg-cover bg-repeat leading-none min-h-screen text-white overflow-hidden after:content-[" "] after:bg-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-40`}
      style={{ backgroundImage: `url(${footerBg.src})` }}
    >
      <div className="p-8 md:p-20 ">
        <Image src={Eye} alt="eye" className="absolute top-3/4 right-2/5" />
        <Image src={Eye} alt="eye" className="absolute top-20" />
        <Image src={Eye} alt="eye" className="absolute top-1/5 left-1/2" />
        <Image src={Eye} alt="eye" className="absolute right-20 bottom-2/5" />
        <div className="relative flex items-start gap-x-20  pb-12 z-50">
          <div className="relative isolate">
            <Image
              src={LeftGhosted}
              alt="ghost"
              className="absolute -left-10 -top-30 md:-top-50 -z-10 w-2/4"
            />
            <Image
              src={RightGhosted}
              alt="ghost"
              className="absolute -right-10 -top-30 md:-top-50 -z-10 w-2/4"
            />
            <RandomMessage />
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-y-4">
            {NAV_ITEMS.map((link, idx) => (
              <NavLink
                key={link.name}
                text={link.name}
                href={link.href}
                index={idx + 1}
              />
            ))}
          </div>
        </div>

        <div className="relative flex justify-between flex-col md:flex-row md:items-end gap-12 z-50">
          <p className="order-3 md:order-1">©{getCurrentYear()} Scaremoor.</p>
          <div className="tracking-wide order-2 flex flex-col gap-4">
            {/* <Link
              href="/contact"
              className="text-lg transition-colors duration-300 ease-in-out hover:text-[#F54F02]"
            >
              Contact Us
            </Link> */}
            <Link
              href="mailto:tania@scaremoor.com"
              className="text-lg transition-colors duration-300 ease-in-out hover:text-[#F54F02]"
            >
              Contact Us
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row gap-1.5 order-1 md:order-3">
            <FooterIcon
              text="Instagram"
              href="https://www.instagram.com/scaremoor/"
            />
            <FooterIcon
              text="Facebook"
              href="https://www.facebook.com/scaremoor/"
            />
            <FooterIcon
              text="Amazon"
              href="https://www.amazon.com/dp/B0DKLDSJBC"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
