import { Metadata } from "next";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Which Scaremoor Book Should You Read First? | Interactive Quiz",
  description: "Discover the perfect Scaremoor horror book for young readers with our interactive quiz. Get personalized book recommendations and exclusive content!",
  keywords: "middle grade horror quiz, book recommendation, Scaremoor series, interactive quiz, children's horror books",
  openGraph: {
    title: "Which Scaremoor Book Should You Read First?",
    description: "Take our interactive quiz to find your perfect horror book match!",
    type: "website",
  },
};

const QuizPage = () => {
  return <QuizClient />;
};

export default QuizPage;