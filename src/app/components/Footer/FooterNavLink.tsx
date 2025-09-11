"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type FooterNavLinkProps = {
  text: string;
  href: string;
};

const FooterNavLink: React.FC<FooterNavLinkProps> = ({ text, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={`transition-colors duration-300 ease-in-out hover:text-[#F54F02] focus:text-[#F54F02] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black rounded px-1 py-1 ${
        isActive ? "text-[#F54F02] font-medium" : "text-white"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {text}
    </Link>
  );
};

export default FooterNavLink;