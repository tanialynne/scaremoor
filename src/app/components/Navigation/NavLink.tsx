"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  text: string;
  href?: string;
  index: number;
};

const NavLink: React.FC<NavLinkProps> = ({ text, href = "#", index }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className="flex items-center space-x-1 group focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black rounded-lg px-1 py-1 transition-all"
      aria-current={isActive ? "page" : undefined}
      aria-label={`Navigate to ${text}`}
    >
      <span className="text-xs align-top -mt-2 text-white font-medium transition-colors duration-300 ease-in-out">{index}.</span>

      {[
        { text, font: "font-light" },
        { text: "/", font: "text-sm" },
      ].map((item, i) => (
        <span key={i} className={`${item.font} transition-colors duration-300 ease-in-out ${isActive ? "text-[#F54F02]" : "text-white group-hover:text-[#F54F02] group-focus:text-[#F54F02]"}`}>
          {item.text}
        </span>
      ))}
    </Link>
  );
};

export default NavLink;
