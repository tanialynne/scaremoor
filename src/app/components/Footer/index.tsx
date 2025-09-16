'use client';

import OptimizedImage from "../OptimizedImage";
import { usePathname } from "next/navigation";

import { getFlatNavItemsForFooter } from "@/app/constants/NavigationStructure";
import { getCurrentYear } from "@/app/utils";
import FooterIcon from "./FooterIcon";
import FooterNavLink from "./FooterNavLink";
import RandomMessage from "../RandomMessage";

import footerBg from "../../../../public/images/footerBackground.png";
import LeftGhosted from "../../../../public/images/ghost-animated.svg";
import RightGhosted from "../../../../public/images/ghost-animation-doubled.svg";
import Eye from "../../../../public/images/eye.svg";

const Footer = () => {
  const pathname = usePathname();

  // Hide footer only on individual worksheet section pages (printable pages)
  const isWorksheetSectionPage = pathname?.includes('/worksheets/') && pathname?.includes('/online') && pathname?.includes('/section/');

  if (isWorksheetSectionPage) {
    return null;
  }

  const flatNavItems = getFlatNavItemsForFooter();

  return (
    <div
      className={`relative flex flex-col justify-end bg-cover bg-no-repeat bg-bottom leading-none min-h-screen text-white`}
      style={{ backgroundImage: `url(${footerBg.src})` }}
    >
      <div className="p-8 md:p-20 ">
        <OptimizedImage src={Eye} alt="eye" className="absolute top-3/4 right-2/5" />
        <OptimizedImage src={Eye} alt="eye" className="absolute top-20" />
        <OptimizedImage src={Eye} alt="eye" className="absolute top-1/5 left-1/2" />
        <OptimizedImage src={Eye} alt="eye" className="absolute right-20 bottom-2/5" />
        <div className="relative flex items-start gap-x-20 pb-12 z-50">
          <div className="relative isolate">
            <OptimizedImage
              src={LeftGhosted}
              alt="ghost"
              className="absolute -left-10 -top-30 md:-top-50 -z-10 w-2/4"
              style={{ height: "320px !important" }}
            />
            <OptimizedImage
              src={RightGhosted}
              alt="ghost"
              className="absolute -right-10 -top-30 md:-top-50 -z-10 w-2/4"
              style={{ height: "320px !important" }}
            />
            <RandomMessage />
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-x-8 gap-y-3 max-w-md">
            {flatNavItems.map((item) => (
              <FooterNavLink
                key={item.href}
                text={item.name}
                href={item.href}
              />
            ))}
          </div>
        </div>

        <div className="relative flex justify-between flex-col md:flex-row md:items-end gap-12 z-50">
          <p className="order-3 md:order-1 footer-text-small">
            ©{getCurrentYear()} Scaremoor.
          </p>
          <div className="tracking-wide order-2 flex flex-col gap-4">
            <FooterNavLink text="Contact Us" href="/contact" />
            <FooterNavLink text="Privacy Policy" href="/privacy" />
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
