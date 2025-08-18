import React from "react";
import Image, { StaticImageData } from "next/image";

type ButtonProps = {
  buttonImage: StaticImageData;
  altText: string;
  text: string;
  textColor?: string;
  onClick?: (e: React.FormEvent) => void;
  loading?: boolean;
};
const Button: React.FC<ButtonProps> = ({ buttonImage, altText, text, textColor = "text-white", onClick, loading }) => {
  return (
    <button type="submit" className={`${textColor} relative text-center w-fit cursor-pointer group`} onClick={onClick} disabled={loading}>
      <div className="relative inline-block h-14 sm:h-16 transition-transform duration-300 group-hover:scale-[101%]">
        <span className="invisible block text-lg sm:text-2xl font-(family-name:--trickOrDead)  capitalize px-8 py-4">{text}</span>
        <Image src={buttonImage} alt={altText} className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-[102%] group-hover:brightness-105" />
        <span className="absolute inset-0 flex items-center justify-center text-lg sm:text-2xl font-(family-name:--trickOrDead)  capitalize transition-colors duration-300 ">
          {loading ? <span className="animate-pulse">Summoning…</span> : text}
        </span>
      </div>
    </button>
  );
};

export default Button;
