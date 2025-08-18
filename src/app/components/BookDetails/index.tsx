import Image, { StaticImageData } from "next/image";

import { ReactNode } from "react";

type BookDetailsProp = {
  bookDetailImage: StaticImageData;
  imageAltText: string;
  children: ReactNode;
};

const BookDetails: React.FC<BookDetailsProp> = ({ bookDetailImage, imageAltText, children }) => {
  return (
    <>
      <div className="flex justify-center">
        <Image src={bookDetailImage} alt={imageAltText} className="w-full  h-auto" />
      </div>

      <div>{children}</div>
    </>
  );
};

export default BookDetails;
