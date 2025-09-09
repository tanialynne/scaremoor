import { StaticImageData } from "next/image";

import TestimonialList from "../TestimonialList";

type TestimonialsProp = {
  backgroundImage?: StaticImageData;
  title?: string;
  description?: string;
};

export const Testimonials: React.FC<TestimonialsProp> = ({ backgroundImage, title, description }) => {
  return (
    <section
      className=" px-8 md:px-20 py-10  h-full relative z-10 overflow-hidden mt-20"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage.src})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}>
      <div className="space-y-6 text-center relative z-50">
        {title && (
          <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize gradient-text-accessible">{title}</h2>
        )}
        {description && <p>{description}</p>}

        <div className="py-16">
          <TestimonialList />
        </div>
      </div>
    </section>
  );
};
