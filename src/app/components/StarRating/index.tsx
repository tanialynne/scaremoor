import { Star, StarHalf } from "lucide-react";

type StarRating = {
  ratingValue: number;
};

const StarRating: React.FC<StarRating> = ({ ratingValue }) => {
  const totalStars = 5;

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;

        if (ratingValue >= starNumber) {
          return <Star key={index} color="#ffc107" fill="#ffc107" size={20} />;
        } else if (ratingValue >= starNumber - 0.5) {
          return <StarHalf key={index} color="#ffc107" fill="#ffc107" size={20} />;
        }
      })}
    </div>
  );
};

export default StarRating;
