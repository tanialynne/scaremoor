"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MobileNavLinkProps = {
  text: string;
  href: string;
  onClick?: () => void;
  isSubItem?: boolean;
};

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ text, href, onClick, isSubItem = false }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`block transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black rounded-lg px-2 py-1 ${
        isActive 
          ? "text-[#F54F02] font-semibold" 
          : "text-white hover:text-[#F54F02] focus:text-[#F54F02]"
      } ${isSubItem ? "pl-6 text-sm opacity-90" : ""}`}
      aria-current={isActive ? "page" : undefined}
    >
      {isSubItem && <span className="text-orange-500 mr-2">📖</span>}
      {text}
    </Link>
  );
};

export default MobileNavLink;