"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Herobox from "../components/Herobox";
import Button from "../components/Button";
import RequestForm from "../components/RequestForm";
import Books from "../constants/Books";
import {
  trackButtonClick,
  trackFormStart,
  trackQuizStart,
  trackQuizAnswer,
  trackQuizComplete,
  trackQuizEmailSignup,
  trackQuizBookPurchase,
} from "../utils/analytics";

import BackgroundImage from "../../../public/images/scaremoorpage-image.png";
import OrangeBackground from "../../../public/images/orangeBackground.png";
import YellowBackground from "../../../public/images/yellowBackground.png";
import OrangeBackgroundLg from "../../../public/images/orangeBackgroundLg.png";

// Quiz data structure
interface QuizQuestion {
  id: number;
  question: string;
  answers: {
    id: string;
    text: string;
    points: {
      the_haunted_locker: number;
      the_night_of_the_living_vines: number;
      the_phantom_playground: number;
      the_changing_portrait: number;
      the_vanishing_words: number;
      the_mask_room: number;
    };
  }[];
}

interface BookRecommendation {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  purchaseLink: string;
  leadMagnetId?: string;
  themes: string[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What kind of scary story setting gets your heart racing?",
    answers: [
      {
        id: "a",
        text: "🏫 School hallways and mysterious lockers",
        points: {
          the_haunted_locker: 3,
          the_night_of_the_living_vines: 0,
          the_phantom_playground: 1,
          the_changing_portrait: 0,
          the_vanishing_words: 2,
          the_mask_room: 1,
        },
      },
      {
        id: "b",
        text: "🌿 Overgrown gardens and creeping vines",
        points: {
          the_haunted_locker: 0,
          the_night_of_the_living_vines: 3,
          the_phantom_playground: 1,
          the_changing_portrait: 1,
          the_vanishing_words: 0,
          the_mask_room: 0,
        },
      },
      {
        id: "c",
        text: "🎠 Abandoned playgrounds in dark woods",
        points: {
          the_haunted_locker: 1,
          the_night_of_the_living_vines: 1,
          the_phantom_playground: 3,
          the_changing_portrait: 1,
          the_vanishing_words: 0,
          the_mask_room: 0,
        },
      },
      {
        id: "d",
        text: "🏛️ Old mansions with watchful paintings",
        points: {
          the_haunted_locker: 0,
          the_night_of_the_living_vines: 0,
          the_phantom_playground: 0,
          the_changing_portrait: 3,
          the_vanishing_words: 1,
          the_mask_room: 1,
        },
      },
      {
        id: "e",
        text: "🎭 Backstage rooms with forgotten props",
        points: {
          the_haunted_locker: 1,
          the_night_of_the_living_vines: 0,
          the_phantom_playground: 1,
          the_changing_portrait: 1,
          the_vanishing_words: 1,
          the_mask_room: 3,
        },
      },
    ],
  },
  {
    id: 2,
    question: "Pick your perfect spooky mood:",
    answers: [
      {
        id: "a",
        text: "👻 Ghostly supernatural encounters",
        points: {
          the_haunted_locker: 3,
          the_night_of_the_living_vines: 1,
          the_phantom_playground: 3,
          the_changing_portrait: 2,
          the_vanishing_words: 1,
          the_mask_room: 2,
        },
      },
      {
        id: "b",
        text: "🌱 Nature turned sinister and alive",
        points: {
          the_haunted_locker: 1,
          the_night_of_the_living_vines: 3,
          the_phantom_playground: 1,
          the_changing_portrait: 0,
          the_vanishing_words: 0,
          the_mask_room: 0,
        },
      },
      {
        id: "c",
        text: "🎭 Mind-bending identity confusion",
        points: {
          the_haunted_locker: 1,
          the_night_of_the_living_vines: 0,
          the_phantom_playground: 1,
          the_changing_portrait: 2,
          the_vanishing_words: 2,
          the_mask_room: 3,
        },
      },
      {
        id: "d",
        text: "📚 Reality-warping word magic",
        points: {
          the_haunted_locker: 1,
          the_night_of_the_living_vines: 1,
          the_phantom_playground: 1,
          the_changing_portrait: 1,
          the_vanishing_words: 3,
          the_mask_room: 1,
        },
      },
      {
        id: "e",
        text: "🔍 Historical mysteries and secrets",
        points: {
          the_haunted_locker: 2,
          the_night_of_the_living_vines: 1,
          the_phantom_playground: 2,
          the_changing_portrait: 3,
          the_vanishing_words: 2,
          the_mask_room: 1,
        },
      },
    ],
  },
  {
    id: 3,
    question: "What kind of main character do you relate to most?",
    answers: [
      {
        id: "a",
        text: "🎭 The performer who loses themselves in their role",
        points: {
          the_haunted_locker: 1,
          the_night_of_the_living_vines: 0,
          the_phantom_playground: 1,
          the_changing_portrait: 2,
          the_vanishing_words: 1,
          the_mask_room: 3,
        },
      },
      {
        id: "b",
        text: "🌿 The nature lover who gets in over their head",
        points: {
          the_haunted_locker: 0,
          the_night_of_the_living_vines: 3,
          the_phantom_playground: 1,
          the_changing_portrait: 1,
          the_vanishing_words: 0,
          the_mask_room: 0,
        },
      },
      {
        id: "c",
        text: "📚 The bookworm who finds dangerous knowledge",
        points: {
          the_haunted_locker: 1,
          the_night_of_the_living_vines: 1,
          the_phantom_playground: 1,
          the_changing_portrait: 2,
          the_vanishing_words: 3,
          the_mask_room: 1,
        },
      },
      {
        id: "d",
        text: "👻 The brave kid who helps trapped spirits",
        points: {
          the_haunted_locker: 3,
          the_night_of_the_living_vines: 1,
          the_phantom_playground: 3,
          the_changing_portrait: 2,
          the_vanishing_words: 1,
          the_mask_room: 1,
        },
      },
      {
        id: "e",
        text: "🏛️ The history buff fascinated by old places",
        points: {
          the_haunted_locker: 2,
          the_night_of_the_living_vines: 0,
          the_phantom_playground: 2,
          the_changing_portrait: 3,
          the_vanishing_words: 1,
          the_mask_room: 1,
        },
      },
    ],
  },
  {
    id: 4,
    question: "What scares you the most (in a fun way)?",
    answers: [
      {
        id: "a",
        text: "🎭 Losing your identity and becoming someone else",
        points: {
          the_haunted_locker: 1,
          the_night_of_the_living_vines: 1,
          the_phantom_playground: 1,
          the_changing_portrait: 2,
          the_vanishing_words: 2,
          the_mask_room: 3,
        },
      },
      {
        id: "b",
        text: "👁️ Being watched by things that shouldn't exist",
        points: {
          the_haunted_locker: 2,
          the_night_of_the_living_vines: 2,
          the_phantom_playground: 3,
          the_changing_portrait: 3,
          the_vanishing_words: 1,
          the_mask_room: 2,
        },
      },
      {
        id: "c",
        text: "🌿 Nature turning against you",
        points: {
          the_haunted_locker: 0,
          the_night_of_the_living_vines: 3,
          the_phantom_playground: 1,
          the_changing_portrait: 0,
          the_vanishing_words: 0,
          the_mask_room: 0,
        },
      },
      {
        id: "d",
        text: "📝 Words having dangerous power",
        points: {
          the_haunted_locker: 1,
          the_night_of_the_living_vines: 0,
          the_phantom_playground: 1,
          the_changing_portrait: 1,
          the_vanishing_words: 3,
          the_mask_room: 1,
        },
      },
      {
        id: "e",
        text: "🚪 Trapped spirits trying to escape",
        points: {
          the_haunted_locker: 3,
          the_night_of_the_living_vines: 1,
          the_phantom_playground: 3,
          the_changing_portrait: 2,
          the_vanishing_words: 1,
          the_mask_room: 1,
        },
      },
    ],
  },
  {
    id: 5,
    question: "How do you like your scares served?",
    answers: [
      {
        id: "a",
        text: "🎢 Quick jolts and ghostly encounters",
        points: {
          the_haunted_locker: 3,
          the_night_of_the_living_vines: 1,
          the_phantom_playground: 3,
          the_changing_portrait: 1,
          the_vanishing_words: 1,
          the_mask_room: 2,
        },
      },
      {
        id: "b",
        text: "🕯️ Slow-building environmental dread",
        points: {
          the_haunted_locker: 1,
          the_night_of_the_living_vines: 3,
          the_phantom_playground: 1,
          the_changing_portrait: 3,
          the_vanishing_words: 1,
          the_mask_room: 2,
        },
      },
      {
        id: "c",
        text: "🧩 Mystery-solving with dark history",
        points: {
          the_haunted_locker: 2,
          the_night_of_the_living_vines: 1,
          the_phantom_playground: 2,
          the_changing_portrait: 3,
          the_vanishing_words: 2,
          the_mask_room: 1,
        },
      },
      {
        id: "d",
        text: "💭 Reality-bending magic and consequences",
        points: {
          the_haunted_locker: 1,
          the_night_of_the_living_vines: 0,
          the_phantom_playground: 1,
          the_changing_portrait: 1,
          the_vanishing_words: 3,
          the_mask_room: 3,
        },
      },
    ],
  },
];

// Convert Books data to quiz-compatible format
const BOOK_RECOMMENDATIONS: BookRecommendation[] = Books.map((book) => ({
  id: book.bookSlug.replace(/-/g, "_"),
  title: book.bookTitle,
  subtitle: book.bookSubHeading,
  description: book.bookDescription || "",
  image: book.bookImage.close?.src || "",
  purchaseLink: book.purchaseLink,
  leadMagnetId: book.leadMagnetId,
  themes: getBookThemes(book.bookTitle),
}));

function getBookThemes(bookTitle: string): string[] {
  switch (bookTitle) {
    case "The Haunted Locker":
      return ["School Horror", "Supernatural", "Trapped Spirits"];
    case "The Night of the Living Vines":
      return ["Nature Horror", "Environmental Thriller", "Ancient Forces"];
    case "The Phantom Playground":
      return ["Ghost Story", "Woodland Horror", "Childhood Terror"];
    case "The Changing Portrait":
      return ["Historical Mystery", "Art Horror", "Mansion Secrets"];
    case "The Vanishing Words":
      return ["Word Magic", "Reality Warping", "Library Mystery"];
    case "The Mask Room":
      return ["Identity Horror", "Theater Mystery", "Transformation"];
    default:
      return ["Horror", "Mystery", "Supernatural"];
  }
}

// QUIZ CONFIGURATION
// ==================
// Choose your quiz results mode:
//
// Option 1: 'instant_results' - Show results immediately + optional lead magnet form
//   - User completes quiz → sees book recommendation → can optionally join email list for more content
//   - Good for: Higher engagement, instant gratification, optional email capture
//
// Option 2: 'email_gated' - Require email before showing results
//   - User completes quiz → must enter email → then sees book recommendation
//   - Good for: Higher email capture rate, lead generation focus
//
const QUIZ_MODE = "email_gated" as "instant_results" | "email_gated";

// Get form ID for a book - uses leadMagnetId from Books data or falls back to default
const getFormIdForBook = (bookTitle: string): string => {
  const book = Books.find((book) => book.bookTitle === bookTitle);
  return book?.leadMagnetId || "8174135"; // Default fallback form ID (forgotten door)
};

const QuizClient = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [recommendation, setRecommendation] =
    useState<BookRecommendation | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setStartTime(Date.now());
    trackQuizStart();
    trackButtonClick("Start Quiz", "Quiz Page", "/quiz");
  };

  const handleAnswer = (questionId: number, answerId: string) => {
    const question = QUIZ_QUESTIONS.find((q) => q.id === questionId);
    if (!question) return;

    const answer = question.answers.find((a) => a.id === answerId);
    if (!answer) return;

    // Update answers
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));

    // Update scores
    setScores((prev) => {
      const newScores = { ...prev };
      Object.entries(answer.points).forEach(([bookId, points]) => {
        newScores[bookId] = (newScores[bookId] || 0) + points;
      });
      return newScores;
    });

    // Move to next question or show results
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Calculate final recommendation
      const topBook = Object.entries(scores).reduce(
        (max, [bookId, score]) => {
          const finalScore =
            score + (answer.points[bookId as keyof typeof answer.points] || 0);
          return finalScore > max.score ? { bookId, score: finalScore } : max;
        },
        { bookId: "", score: -1 }
      );

      const finalRecommendation = BOOK_RECOMMENDATIONS.find(
        (book) => book.id === topBook.bookId
      );
      setRecommendation(finalRecommendation || BOOK_RECOMMENDATIONS[0]);

      // Show results based on mode
      if (QUIZ_MODE === "instant_results") {
        setShowResult(true);
      } else {
        setShowEmailCapture(true);
      }

      // Track quiz completion
      const timeSpent = startTime
        ? Math.round((Date.now() - startTime) / 1000)
        : undefined;
      trackQuizComplete(finalRecommendation?.title || "Unknown", timeSpent);
    }

    trackQuizAnswer(questionId, question.question, answer.text);
    trackButtonClick(
      `Answer: ${answer.text}`,
      `Quiz Question ${questionId}`,
      `/quiz/question-${questionId}`
    );
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setScores({});
    setShowResult(false);
    setShowEmailCapture(false);
    setEmailSubmitted(false);
    setRecommendation(null);
    setQuizStarted(false);
    setStartTime(null);
    trackButtonClick("Restart Quiz", "Quiz Results", "/quiz");
  };

  const handleEmailSignup = () => {
    trackFormStart("Quiz Result Email Signup", "Quiz Results Page");
    if (recommendation) {
      trackQuizEmailSignup(recommendation.title);
    }
  };

  const handleEmailGatedSignup = (success: boolean = true) => {
    if (success) {
      setEmailSubmitted(true);
      trackFormStart("Quiz Email Gate", "Quiz Email Capture");
      if (recommendation) {
        trackQuizEmailSignup(recommendation.title);
      }
      // Show results after email is submitted
      setTimeout(() => {
        setShowEmailCapture(false);
        setShowResult(true);
      }, 2000); // 2 second delay to show success message
    }
  };

  if (!quizStarted) {
    return (
      <>
        <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="font-(family-name:--trickOrDead) font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <p className="text-3xl md:text-5xl text-orange-400">
                Ready for a Scare?
              </p>
              <h1 className="text-5xl md:text-7xl">
                Which Scaremoor Book Should You Read First?
              </h1>
            </div>

            <div
              className="max-w-[70ch] mx-auto font-light space-y-6 text-lg"
              style={{ textShadow: "0 0 10px rgba(0, 0, 0, 0.8)" }}
            >
              <p>
                <strong>Not all scares are created equal.</strong>
              </p>
              <p>
                Do you love ghostly whispers that follow you down the hall?
                <br />
                Do twisting mysteries keep your heart racing long after
                midnight?
                <br />
                Or does the thought of nature turning against you send chills
                crawling up your spine?
              </p>
              <p>
                Take our <strong>5-question quiz</strong> to uncover which
                Scaremoor story is your perfect match—then unlock the first
                chapter of your book and step into the scare for yourself.
              </p>
            </div>

            <div className="pt-8">
              <Button
                buttonImage={OrangeBackgroundLg}
                altText="start-quiz"
                text="🎯 Start the Quiz"
                onClick={handleStartQuiz}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-12 text-sm opacity-80">
              <div className="text-center space-y-2">
                <div className="text-3xl">👻</div>
                <p>Ghostly Encounters</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl">🌿</div>
                <p>Living Nature</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl">🎭</div>
                <p>Identity Horror</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl">🏛️</div>
                <p>Historical Mysteries</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl">📚</div>
                <p>Word Magic</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl">🏫</div>
                <p>School Secrets</p>
              </div>
            </div>
          </div>
        </Herobox>
      </>
    );
  }

  // Email capture screen (for email_gated mode)
  if (showEmailCapture && recommendation) {
    return (
      <>
        <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-4">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            {!emailSubmitted ? (
              <>
                <div className="font-(family-name:--trickOrDead) font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
                  <div className="text-6xl mb-4">🎯</div>
                  <h1 className="text-4xl md:text-6xl">
                    Your Perfect Book Match is Ready!
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300">
                    Get your personalized recommendation delivered instantly
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-600/20 to-orange-700/30 border border-orange-400/50 rounded-xl p-8 max-w-3xl mx-auto shadow-lg">
                  <div className="text-center space-y-6">
                    <div className="text-4xl mb-4">📧</div>
                    <h3 className="text-2xl font-bold text-orange-300">
                      Enter Your Email to See Your Results
                    </h3>
                    <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                      We'll instantly send you your personalized book
                      recommendation plus the first chapter to read in your
                      inbox! You'll also get exclusive Scaremoor content and
                      updates on new releases!
                    </p>
                  </div>

                  <div className="max-w-md mx-auto mt-6">
                    <RequestForm
                      buttonText="🎉 Get My Book Recommendation"
                      requestId={getFormIdForBook(recommendation.title)}
                      bookTitle={`Quiz Result: ${recommendation.title}`}
                      onSubmitSuccess={() => handleEmailGatedSignup(true)}
                      layout="stacked"
                    />
                  </div>

                  <p className="text-sm text-gray-300 mt-4 text-center">
                    ✨ Instant results • No spam • Exclusive content •
                    Unsubscribe anytime
                  </p>
                </div>

                <div className="text-sm text-gray-400">
                  💡 Your quiz answers are saved - results will appear
                  immediately after signup
                </div>
              </>
            ) : (
              <div className="space-y-8">
                <div className="font-(family-name:--trickOrDead) font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
                  <div className="text-6xl mb-4">✅</div>
                  <h1 className="text-4xl md:text-6xl text-green-400">
                    Thank You!
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300">
                    Your book recommendation is on its way to your inbox
                  </p>
                </div>

                <div className="bg-green-600/20 border border-green-400/50 rounded-xl p-6 max-w-2xl mx-auto">
                  <p className="text-lg text-green-200">
                    📬 Check your email for your personalized recommendation
                  </p>
                  <p className="text-sm text-green-300 mt-2">
                    Your results will also appear below in just a moment...
                  </p>
                </div>
              </div>
            )}
          </div>
        </Herobox>
      </>
    );
  }

  if (showResult && recommendation) {
    return (
      <>
        <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-4">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <div className="font-(family-name:--trickOrDead) font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <p className="text-2xl md:text-4xl text-green-400">
                🎉 Your Perfect Match!
              </p>
              <h1 className="text-4xl md:text-6xl">{recommendation.title}</h1>
              <p className="text-xl md:text-2xl text-gray-300 italic">
                {recommendation.subtitle}
              </p>
            </div>

            <div className="bg-black/60 rounded-lg p-8 max-w-4xl mx-auto">
              {/* Book Cover - Centered at top */}
              <div className="text-center mb-8">
                <div className="inline-block rounded-lg">
                  <Image
                    src={recommendation.image}
                    alt={recommendation.title}
                    width={250}
                    height={375}
                    className="w-auto h-auto max-w-[200px] max-h-[300px] mx-auto rounded shadow-lg"
                  />
                </div>
              </div>

              {/* Full-width text content */}
              <div className="space-y-6 text-center max-w-3xl mx-auto">
                <p className="text-lg leading-relaxed text-left">
                  {recommendation.description}
                </p>

                <div>
                  <h3 className="font-bold text-orange-400 mb-4 text-xl">
                    Perfect for readers who love:
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {recommendation.themes.map((theme) => (
                      <span
                        key={theme}
                        className="bg-orange-600/30 px-4 py-2 rounded-full text-sm font-medium border border-orange-500/20"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div
                className="font-(family-name:--trickOrDead) text-2xl md:text-3xl"
                style={{ textShadow: "0 0 10px rgba(0, 0, 0, 0.8)" }}
              >
                Want to Read {recommendation.title}?
              </div>

              {QUIZ_MODE === "instant_results" &&
                (recommendation.leadMagnetId || true) && (
                  <div className="bg-gradient-to-br from-orange-600/20 to-orange-700/30 border border-orange-400/50 rounded-xl p-8 max-w-3xl mx-auto shadow-lg">
                    <div className="text-center space-y-4">
                      <div className="text-4xl mb-2">
                        {recommendation.leadMagnetId ? "🎁" : "📚"}
                      </div>
                      <h3 className="text-2xl font-bold text-orange-300 mb-3">
                        {recommendation.leadMagnetId
                          ? "Get Chapter 1 FREE!"
                          : "Get Exclusive Content!"}
                      </h3>
                      <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                        {recommendation.leadMagnetId ? (
                          <>
                            Want to dive right into{" "}
                            <strong>{recommendation.title}</strong>? Get the
                            spine-chilling first chapter plus exclusive
                            Scaremoor content when you join our reader
                            community!
                          </>
                        ) : (
                          <>
                            Love <strong>{recommendation.title}</strong>? Join
                            our reader community to get exclusive stories, book
                            updates, and be the first to know when new Scaremoor
                            books are released!
                          </>
                        )}
                      </p>
                    </div>

                    <div
                      className="max-w-md mx-auto mt-6"
                      onClick={handleEmailSignup}
                    >
                      <RequestForm
                        buttonText={
                          recommendation.leadMagnetId
                            ? "📖 Get My Free Chapter"
                            : "🎃 Join the Scaremoor Society"
                        }
                        requestId={
                          recommendation.leadMagnetId ||
                          getFormIdForBook(recommendation.title)
                        }
                        bookTitle={recommendation.title}
                        layout="stacked"
                      />
                    </div>

                    <p className="text-sm text-gray-300 mt-4 text-center">
                      ✨ No spam, just stories • Unsubscribe anytime • Instant
                      download
                    </p>
                  </div>
                )}

              {QUIZ_MODE === "email_gated" && (
                <div className="bg-gradient-to-br from-green-600/20 to-green-700/30 border border-green-400/50 rounded-xl p-6 max-w-3xl mx-auto shadow-lg">
                  <div className="text-center space-y-4">
                    <div className="text-4xl mb-2">✅</div>
                    <h3 className="text-2xl font-bold text-green-300">
                      Perfect Match Found!
                    </h3>
                    <p className="text-lg text-green-200">
                      Your first chapter is already on its way to your inbox.
                      Check your email in the next few minutes!
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link
                  href={recommendation.purchaseLink}
                  target="_blank"
                  rel="noopener"
                >
                  <Button
                    buttonImage={YellowBackground}
                    altText="buy-book"
                    text="🛒 Buy the Full Book"
                    textColor="text-black"
                    onClick={() => {
                      trackQuizBookPurchase(
                        recommendation.title,
                        recommendation.purchaseLink
                      );
                      trackButtonClick(
                        "Buy Book",
                        `Quiz Result - ${recommendation.title}`,
                        recommendation.purchaseLink
                      );
                    }}
                  />
                </Link>

                <Button
                  buttonImage={OrangeBackground}
                  altText="retake-quiz"
                  text="🔄 Take Quiz Again"
                  onClick={restartQuiz}
                />
              </div>
            </div>

            <div className="pt-8 border-t border-gray-700 space-y-4">
              <p className="text-lg font-bold">
                Want to explore more Scaremoor books?
              </p>
              <Link href="/books">
                <Button
                  buttonImage={OrangeBackground}
                  altText="see-all-books"
                  text="📖 See All Books"
                  onClick={() =>
                    trackButtonClick("See All Books", "Quiz Results", "/books")
                  }
                />
              </Link>
            </div>
          </div>
        </Herobox>
      </>
    );
  }

  // Quiz questions
  const question = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <>
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-3 mb-8">
            <div
              className="bg-orange-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="text-center space-y-6">
            <div className="font-(family-name:--trickOrDead) font-normal [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <p className="text-sm md:text-base text-orange-400 mb-2">
                Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
              </p>
              <h2 className="text-3xl md:text-5xl leading-tight">
                {question.question}
              </h2>
            </div>
          </div>

          <div className="grid gap-4 max-w-2xl mx-auto">
            {question.answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => handleAnswer(question.id, answer.id)}
                className="bg-black/60 hover:bg-black/80 border border-gray-600 hover:border-orange-500 rounded-lg p-6 text-left transition-all duration-200 hover:scale-105"
              >
                <span className="text-lg font-medium">{answer.text}</span>
              </button>
            ))}
          </div>

          <div className="text-center pt-8">
            <p className="text-gray-300 text-sm">
              💡 Choose the answer that sounds most appealing to you
            </p>
          </div>
        </div>
      </Herobox>
    </>
  );
};

export default QuizClient;
