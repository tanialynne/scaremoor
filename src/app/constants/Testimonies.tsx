export type Testimony = {
  message: string;
  name: string;
  rating?: number;
};

export const testimonials: Testimony[] = [
  {
    name: "Amelia Greene",
    message: "My daughter devoured this book in one sitting. It's her new favorite spooky series.",
    rating: 5,
  },
  {
    name: "Liam Turner",
    message: "Perfect mix of spooky and fun! My 9-year-old couldn’t stop reading until bedtime.",
    rating: 4,
  },
  {
    name: "Sophie Martinez",
    message: "This book gave my 10-year-old just the right amount of chills without being too scary.",
    rating: 5,
  },
  {
    name: "Ethan Brooks",
    message: "A thrilling adventure that kept my 8-year-old hooked from the first chapter.",
    rating: 4,
  },
  {
    name: "Chloe Richardson",
    message: "The perfect spooky story for kids! My son is already asking for the next in the series.",
    rating: 5,
  },
];
