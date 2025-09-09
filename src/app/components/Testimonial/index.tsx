import type { Testimony } from "@/app/constants/Testimonies";
import StarRating from "../StarRating";

type TestimonyProps = Testimony;

const Testimony: React.FC<TestimonyProps> = ({ name, message, rating = 2.5 }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:gap-8 ">
      {rating && <StarRating ratingValue={rating} />}
      <h4 className=" leading-8 max-w-[38ch] text-xl sm:text-2xl">{message}</h4>
      <h3 className="font-trickordead text-xl tracking-wider">{name}</h3>
    </div>
  );
};

export default Testimony;
