'use client';

import { useEffect, useState } from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getWorksheetStoryBySlug, WorksheetStory } from "../../../../../../constants/Worksheets";
import { getOnlineWorksheet } from "../../../../../../constants/OnlineWorksheets";
import { isFeatureEnabled } from "../../../../../../constants/FeatureFlags";
import Herobox from "../../../../../../components/Herobox";
import Button from "../../../../../../components/Button";
import WorksheetFooter from "../../../../../../components/WorksheetLayout/WorksheetFooter";

import BackgroundImage from "../../../../../../../../public/images/bookspage-image.png";
import OrangeBackground from "../../../../../../../../public/images/orangeBackground.png";
import YellowBackground from "../../../../../../../../public/images/yellowBackground.png";
import { OnlineWorksheet, WorksheetSection } from "../../../../../../components/Worksheets/types";

interface AnswerItem {
  question?: string;
  answer?: string;
  order?: number;
  word?: string;
  cause?: string;
  effect?: string;
  trait?: string;
  evidence?: string;
  note?: string;
}

interface AnswerContent {
  title: string;
  answers: AnswerItem[];
}

type Props = {
  params: Promise<{ slug: string; grade: string }>;
};

const AnswerKeyPage = ({ params }: Props) => {
  const [story, setStory] = useState<WorksheetStory | null>(null);
  const [worksheet, setWorksheet] = useState<OnlineWorksheet | null>(null);

  useEffect(() => {
    const loadData = async () => {
      // Redirect if worksheets are disabled
      if (!isFeatureEnabled("WORKSHEETS_ENABLED")) {
        redirect("/");
        return;
      }

      const { slug: paramSlug, grade: paramGrade } = await params;
      const gradeNum = parseInt(paramGrade) as 3 | 4 | 5;

      // Validate grade
      if (![3, 4, 5].includes(gradeNum)) {
        notFound();
        return;
      }

      const storyData = getWorksheetStoryBySlug(paramSlug);
      const worksheetData = getOnlineWorksheet(paramSlug, gradeNum);

      if (!storyData || !worksheetData) {
        notFound();
        return;
      }

      setStory(storyData);
      setWorksheet(worksheetData);

      // Set page title
      document.title = `${storyData.title} - Grade ${paramGrade} Answer Key`;
    };

    loadData();
  }, [params]);

  const getGradeColor = (grade: number) => {
    switch (grade) {
      case 3: return 'from-blue-600 to-blue-800';
      case 4: return 'from-purple-600 to-purple-800';
      case 5: return 'from-red-600 to-red-800';
      default: return 'from-gray-600 to-gray-800';
    }
  };

  const getAnswerKeyContent = (section: WorksheetSection): AnswerContent | undefined => {
    switch (section.type) {
      case 'story-elements':
        return {
          title: 'Story Elements Answer Key',
          answers: [
            { question: 'Characters', answer: 'Dani (main character), Ava (friend), Trevor (classmate)' },
            { question: 'Setting', answer: 'Middle school classroom and supply closet, mysterious hallway of drawers' },
            { question: 'Problem', answer: 'Dani discovers a magical door that lets her change things about her life, but each change has unexpected consequences' },
            { question: 'Solution', answer: 'Dani realizes the danger when her identity starts disappearing and runs back to the real world, choosing to accept her life as it is' }
          ]
        };

      case 'sequencing':
        return {
          title: 'Sequencing Answer Key',
          answers: [
            { order: 1, answer: 'Dani goes to the supply closet to get a microscope kit' },
            { order: 2, answer: 'Dani discovers a mysterious wooden door in the closet' },
            { order: 3, answer: 'Ava is back in class and Trevor has disappeared' },
            { order: 4, answer: 'Dani finds pizza in her lunch bag instead of her usual sandwich' },
            { order: 5, answer: 'Dani discovers a brass key in her lunch bag' },
            { order: 6, answer: 'Dani unlocks the door and enters the hallway of drawers' },
            { order: 7, answer: 'Dani realizes her name is missing from everything' },
            { order: 8, answer: 'Dani runs from the hallway back to the real world' }
          ]
        };

      case 'vocabulary':
        return {
          title: 'Vocabulary Answer Key',
          answers: [
            { word: 'forgotten', answer: 'Something that has been left behind or not remembered; lost from memory' },
            { word: 'not quite', answer: 'Almost but not exactly; close to being right but something is still missing or wrong' },
            { word: 'shimmered', answer: 'Shone with a soft, flickering light; appeared to move or change slightly' }
          ]
        };

      case 'cause-effect':
        return {
          title: 'Cause and Effect Answer Key',
          answers: [
            { cause: 'Dani enters the supply closet looking for a microscope kit', effect: 'A mysterious door appears that wasn&apos;t there before' },
            { cause: 'Dani touches the drawer labeled &quot;Lunchtime&quot;', effect: 'Her lunch changes and reality shifts around her' },
            { cause: 'Dani continues to use the door to make her life &quot;better&quot;', effect: 'Parts of her identity start disappearing' },
            { cause: 'Dani sees her name drawer is empty', effect: 'She realizes the danger and runs back to reality' }
          ]
        };

      case 'custom':
        const lowerTitle = section.title.toLowerCase();
        if (lowerTitle.includes('theme') || lowerTitle.includes('detective')) {
          return {
            title: 'Theme Detective Answer Key',
            answers: [
              { question: 'Theme', answer: 'Be careful what you wish for; changing things about your life can have unexpected consequences; accepting yourself is important' },
              { question: 'Supporting Evidence', answer: 'Each time Dani uses the door, something unexpected happens; she loses parts of her identity; she must choose between a &quot;perfect&quot; life and being herself' }
            ]
          };
        }
        if (lowerTitle.includes('character')) {
          return {
            title: 'Character Analysis Answer Key',
            answers: [
              { trait: 'Curious', evidence: 'She investigates the mysterious door instead of leaving it alone' },
              { trait: 'Dissatisfied', evidence: 'She wants to change things about her life (lunch, friends, etc.)' },
              { trait: 'Brave', evidence: 'She enters the mysterious hallway despite being scared' },
              { trait: 'Self-aware', evidence: 'She realizes the danger and chooses to return to her real life' }
            ]
          };
        }
        if (lowerTitle.includes('inference')) {
          return {
            title: 'Inference Questions Answer Key',
            answers: [
              { question: 'Why did the door only appear for Dani?', answer: 'Possible answers: She was unhappy with her life; she was looking for change; the door appears to people who are dissatisfied' },
              { question: 'What did the whisper &quot;Make it better&quot; really want?', answer: 'Possible answers: To tempt her; to make her dependent on the door; to eventually take her identity' },
              { question: 'What will happen after the story ends?', answer: 'Possible answers: Dani will appreciate her real life more; she&apos;ll be more careful about wishing for changes; the door might appear again when she&apos;s older' }
            ]
          };
        }
        break;

      case 'drawing':
        return {
          title: 'Drawing Activity Answer Key',
          answers: [
            { note: 'This is a creative activity - answers will vary based on student imagination' },
            { note: 'Look for: Clear illustration of a scene from the story' },
            { note: 'Three complete sentences describing the drawing' },
            { note: 'Connection between drawing and story events' }
          ]
        };

      case 'creative-writing':
        return {
          title: 'Creative Writing Answer Key',
          answers: [
            { note: 'This is a creative activity - answers will vary' },
            { note: 'Look for: Original story with beginning, middle, and end' },
            { note: 'Similar themes to the original (consequences, choices)' },
            { note: 'Appropriate length (5-8 sentences for Grade 4, longer for Grade 5)' },
            { note: 'Proper grammar and spelling' }
          ]
        };

      default:
        return {
          title: 'Answer Key',
          answers: [
            { note: 'Answer key content not available for this activity type' }
          ]
        };
    }
  };

  if (!story || !worksheet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-gray-600">Answer key not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-22">
        <div className="items-center">
          <div className="space-y-5 lg:pt-10">
            <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <h2 className="hero-text-large">Grade {worksheet.grade} Answer Key</h2>
              <h1 className="hero-text-xlarge max-w-[20ch]">
                {story.title}
              </h1>
            </div>

            <p
              className="max-w-[80ch] font-light"
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              Complete answer key for all Grade {worksheet.grade} activities. Use this as a reference for grading student work.
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-orange-700/30">
                📚 Grade {worksheet.grade}
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-orange-700/30">
                🎯 {worksheet.sections.length} Activities
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-orange-700/30">
                🔑 Answer Key
              </div>
            </div>
          </div>
        </div>
      </Herobox>

      <main className="text-white">
        <section className="px-8 md:px-20 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-trickordead font-normal text-4xl sm:text-5xl gradient-text-accessible mb-4">
                📋 Complete Answer Key
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Detailed answers and grading guidelines for all activities in this grade level.
              </p>
            </div>

            {/* Answer Key Sections */}
            <div className="space-y-8">
              {worksheet.sections.map((section) => {
                const answerContent = getAnswerKeyContent(section);
                if (!answerContent) return null;
                return (
                  <div key={section.id} className={`bg-gradient-to-br ${getGradeColor(worksheet.grade)} bg-opacity-10 rounded-xl p-6 border border-gray-700/30`}>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">🔑</span>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {section.title.replace(/[📖🔢📝🧠⛰️🎨➡️✍️🔍📋]/g, '').trim()}
                        </h3>
                        <p className="text-gray-400">
                          {answerContent.title} • {section.timeEstimate}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {answerContent.answers.map((item: AnswerItem, answerIndex: number) => (
                        <div key={answerIndex} className="bg-black/20 rounded-lg p-4">
                          {item.question && (
                            <>
                              <h4 className="font-semibold text-white mb-2">{item.question}</h4>
                              <p className="text-gray-300">{item.answer}</p>
                            </>
                          )}
                          {item.order && (
                            <p className="text-gray-300">
                              <span className="font-semibold text-white">{item.order}.</span> {item.answer}
                            </p>
                          )}
                          {item.word && (
                            <>
                              <h4 className="font-semibold text-white mb-2">&quot;{item.word}&quot;</h4>
                              <p className="text-gray-300">{item.answer}</p>
                            </>
                          )}
                          {item.cause && (
                            <>
                              <p className="text-gray-300 mb-1">
                                <span className="font-semibold text-orange-400">Cause:</span> {item.cause}
                              </p>
                              <p className="text-gray-300">
                                <span className="font-semibold text-blue-400">Effect:</span> {item.effect}
                              </p>
                            </>
                          )}
                          {item.trait && (
                            <>
                              <h4 className="font-semibold text-white mb-2">{item.trait}</h4>
                              <p className="text-gray-300">Evidence: {item.evidence}</p>
                            </>
                          )}
                          {item.note && (
                            <p className="text-gray-300 italic">{item.note}</p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-500/20">
                      <div className="flex flex-wrap gap-2">
                        {section.solStandards.map((standard: string) => (
                          <span key={standard} className="text-sm bg-gray-700/50 text-gray-300 px-2 py-1 rounded">
                            SOL {standard}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Extension Activities */}
            <div className="mt-12 bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-xl p-8 border border-gray-600/30">
              <h3 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                Extension Activities & Ideas
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">📚 Cross-Curricular Extensions:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Create a class book of &quot;If I Could Change One Thing&quot; stories</li>
                    <li>• Research myths and stories about wishes with consequences (King Midas, The Monkey&apos;s Paw)</li>
                    <li>• Design your own hallway of drawers art project with construction paper</li>
                    <li>• Write diary entries from Dani&apos;s perspective before and after finding the door</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">🎭 Drama & Discussion:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Act out key scenes from the story with different character interpretations</li>
                    <li>• Hold a class debate: &quot;Should Dani have kept some of her changes?&quot;</li>
                    <li>• Create a news report about the &quot;strange happenings&quot; at school</li>
                    <li>• Interview classmates about what they would change about their lives</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">✍️ Advanced Writing:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Write a sequel where the door appears to a different student</li>
                    <li>• Create a &quot;Choose Your Own Adventure&quot; version of the story</li>
                    <li>• Write warning signs for dangerous changes (like medicine labels)</li>
                    <li>• Develop a prequel explaining how the door came to be in the school</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">🎨 Creative Projects:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Draw a detailed map of the hallway showing different drawers and their labels</li>
                    <li>• Design book covers for stories about other magical doors</li>
                    <li>• Create a storyboard showing the key events in sequence</li>
                    <li>• Make a collage representing the theme &quot;be careful what you wish for&quot;</li>
                  </ul>
                </div>

                <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-700/30">
                  <h4 className="text-lg font-semibold text-orange-400 mb-3">💡 Teaching Tips:</h4>
                  <ul className="space-y-2 text-orange-200">
                    <li>• Pause after Dani discovers the door to build suspense and predict what might happen</li>
                    <li>• Discuss &quot;be careful what you wish for&quot; before reading to activate prior knowledge</li>
                    <li>• Connect to students&apos; own experiences with wanting to change things about their lives</li>
                    <li>• Use this as a mentor text for teaching theme, consequences, and character development</li>
                    <li>• Perfect introduction to science fiction/fantasy genre elements</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Print Button */}
            <div className="mt-12 text-center">
              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium"
              >
                🖨️ Print Answer Key
              </button>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="px-8 md:px-20 py-20 space-y-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-lg p-8 border border-gray-700/30">
              <h3 className="font-trickordead text-3xl mb-4 text-orange-400">
                Ready to Use These Activities?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Return to the activities or explore other grade levels.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/worksheets/${story.slug}/online/grade/${worksheet.grade}`}>
                  <Button
                    buttonImage={OrangeBackground}
                    altText="back-to-activities"
                    text="Back to Activities"
                  />
                </Link>
                <Link href={`/worksheets/${story.slug}`}>
                  <Button
                    buttonImage={YellowBackground}
                    altText="view-all-materials"
                    text="All Materials"
                    textColor="text-black"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <WorksheetFooter />
    </>
  );
};

export default AnswerKeyPage;