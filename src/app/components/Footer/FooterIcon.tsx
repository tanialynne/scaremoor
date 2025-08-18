import Link from "next/link";
import React from "react";

type FooterIconProps = {
  text: string;
  href?: string;
};

const FooterIcon: React.FC<FooterIconProps> = ({ text, href = "#" }) => {
  return (
    <Link href={href} target="_blank" className="py-2 px-7 border border-white/30 rounded-full w-fit hover:bg-[#F54F02] transition-colors duration-200">
      {text}
    </Link>
  );
};

export default FooterIcon;
