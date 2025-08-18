import { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";

type BookInfoProps = {
  title: string;
  bookImage: StaticImageData;
  children: ReactNode;
};

const BookInfo: React.FC<BookInfoProps> = ({ title, bookImage, children }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center  gap-12">
      <div className=" shrink-0">
        <Image src={bookImage} alt="book" className="inline-block" />
      </div>
      <div className="text-white text-start max-w-3xl">
        <h3 className="font-(family-name:--trickOrDead) font-normal text-3xl sm:text-5xl capitalize bg-gradient-to-b from-white from-[10%] to-[#A4A4A4] bg-clip-text text-transparent">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default BookInfo;
