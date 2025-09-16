'use client';

import { useEffect, useState } from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getWorksheetStoryBySlug, WorksheetStory } from "../../../../../constants/Worksheets";
import { getOnlineWorksheet } from "../../../../../constants/OnlineWorksheets";
import { isFeatureEnabled } from "../../../../../constants/FeatureFlags";
// import WorksheetRenderer from "../../../../../components/Worksheets/WorksheetRenderer"; // Replaced with section links
import Herobox from "../../../../../components/Herobox";
import Button from "../../../../../components/Button";

import BackgroundImage from "../../../../../../../public/images/bookspage-image.png";
import OrangeBackground from "../../../../../../../public/images/orangeBackground.png";
import YellowBackground from "../../../../../../../public/images/yellowBackground.png";
import { WorksheetResponse, OnlineWorksheet } from "../../../../../components/Worksheets/types";

type Props = {
  params: Promise<{ slug: string; grade: string }>;
};

// Since this is now a client component, we'll handle metadata differently

const OnlineWorksheetPage = ({ params }: Props) => {
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
      document.title = `${storyData.title} - Grade ${paramGrade} Online Worksheet`;
    };

    loadData();
  }, [params]);

  const handleSave = async (responses: WorksheetResponse) => {
    // Log responses for debugging
    console.log('Worksheet responses:', responses);

    // Create a more user-friendly save notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
    notification.textContent = 'Progress saved! ✓';
    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  if (!story || !worksheet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-gray-600">Worksheet not found</p>
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
              <h2 className="hero-text-large">Grade {worksheet.grade} Activities</h2>
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
              Interactive worksheets and activities designed for Grade {worksheet.grade} students.
              Complete activities online or print them for traditional use.
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-orange-700/30">
                📚 Grade {worksheet.grade}
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-orange-700/30">
                🎯 {worksheet.sections.length} Activities
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-orange-700/30">
                📋 SOL Aligned
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
                Interactive Activities
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Choose an activity to begin. Each worksheet is designed to be completed individually
                and can be printed with or without answers.
              </p>
            </div>

            {/* Section Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {worksheet.sections.map((section, index) => (
                <div key={section.id} className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl p-6 border border-orange-700/30 hover:border-orange-500/50 transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-orange-400 mb-2">
                        {section.title}
                      </h3>
                      <p className="text-gray-300 text-base mb-3">
                        {section.instructions}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-orange-900/30 text-orange-300 px-2 py-1 rounded text-sm">
                          ⏱️ {section.timeEstimate}
                        </span>
                        {section.solStandards.map(standard => (
                          <span
                            key={standard}
                            className="bg-blue-900/30 text-blue-300 px-2 py-1 rounded text-sm"
                          >
                            SOL {standard}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-2xl text-orange-400/60 ml-4">
                      {index + 1}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/worksheets/${story.slug}/online/grade/${worksheet.grade}/section/${section.id}`}
                      className="flex-1"
                    >
                      <Button
                        buttonImage={OrangeBackground}
                        altText={`Start ${section.title}`}
                        text="Start Activity"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Quick Actions */}
        <section className="px-8 md:px-20 py-20 space-y-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-orange-900/20 to-yellow-900/20 rounded-lg p-8 border border-orange-700/30">
              <h3 className="font-trickordead text-3xl mb-4 text-orange-400">
                Ready to Start Learning?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Begin with the first activity or explore our complete collection of educational materials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/worksheets/${story.slug}/online/grade/${worksheet.grade}/section/${worksheet.sections[0].id}`}>
                  <Button
                    buttonImage={OrangeBackground}
                    altText="start-first-activity"
                    text="Start First Activity"
                  />
                </Link>
                <Link href={`/worksheets/${story.slug}`}>
                  <Button
                    buttonImage={YellowBackground}
                    altText="view-all-materials"
                    text="View All Materials"
                    textColor="text-black"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OnlineWorksheetPage;