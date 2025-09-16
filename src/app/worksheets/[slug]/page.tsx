'use client';

import { useState, useEffect } from 'react';
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

import Herobox from "../../components/Herobox";
import Button from "../../components/Button";
import WorksheetAnalytics from "../../components/WorksheetAnalytics";
import WorksheetAccordion from "../../components/WorksheetAccordion";
import { OnlineWorksheetLink, ContactLink } from "../../components/WorksheetAnalytics/WorksheetLink";
import { DownloadLink } from "../../components/WorksheetAnalytics/DownloadLink";
import { getWorksheetStoryBySlug, WorksheetActivity, DownloadableResource } from "../../constants/Worksheets";
import { getStoryWorksheets } from "../../constants/OnlineWorksheets";
import { isFeatureEnabled } from "../../constants/FeatureFlags";

import BackgroundImage from "../../../../public/images/bookspage-image.png";
import OrangeBackground from "../../../../public/images/orangeBackground.png";
import YellowBackground from "../../../../public/images/yellowBackground.png";

type Props = {
  params: Promise<{ slug: string }>;
};

// Note: generateMetadata removed because this is now a client component
// The page title will be set dynamically in useEffect

interface ActivityCardProps {
  activity: WorksheetActivity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'comprehension': return '📚';
      case 'vocabulary': return '📝';
      case 'creative-writing': return '✍️';
      case 'analysis': return '🔍';
      case 'art': return '🎨';
      case 'game': return '🎯';
      default: return '📋';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'comprehension': return 'border-blue-700/50 bg-blue-900/20';
      case 'vocabulary': return 'border-green-700/50 bg-green-900/20';
      case 'creative-writing': return 'border-purple-700/50 bg-purple-900/20';
      case 'analysis': return 'border-orange-700/50 bg-orange-900/20';
      case 'art': return 'border-pink-700/50 bg-pink-900/20';
      case 'game': return 'border-yellow-700/50 bg-yellow-900/20';
      default: return 'border-gray-700/50 bg-gray-900/20';
    }
  };

  return (
    <div className={`rounded-lg p-6 border ${getTypeColor(activity.type)} hover:border-opacity-70 transition-all duration-300`}>
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">{getActivityIcon(activity.type)}</span>
        <div className="flex-1">
          <h4 className="font-semibold text-white mb-1">{activity.title}</h4>
          <p className="text-base text-gray-400 capitalize">{activity.type.replace('-', ' ')} • {activity.timeEstimate}</p>
        </div>
      </div>

      <p className="text-gray-300 text-base mb-4">{activity.description}</p>

      <div className="space-y-2">
        <p className="text-base text-gray-400">
          <strong>Instructions:</strong> {activity.instructions}
        </p>

        {activity.materials && (
          <p className="text-base text-gray-400">
            <strong>Materials:</strong> {activity.materials.join(', ')}
          </p>
        )}

        <div className="flex flex-wrap gap-1 mt-3">
          {activity.solStandards.map((standard) => (
            <span key={standard} className="text-sm bg-gray-700/50 text-gray-300 px-2 py-1 rounded">
              SOL {standard}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ResourceCardProps {
  resource: DownloadableResource;
  storySlug: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, storySlug }) => {
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf': return '📄';
      case 'docx': return '📝';
      case 'png': return '🖼️';
      case 'zip': return '📦';
      default: return '📁';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'educator-packet': return 'bg-orange-900/30 border-orange-700/50';
      case 'student-worksheet': return 'bg-blue-900/30 border-blue-700/50';
      case 'answer-key': return 'bg-green-900/30 border-green-700/50';
      case 'extension-activity': return 'bg-purple-900/30 border-purple-700/50';
      default: return 'bg-gray-900/30 border-gray-700/50';
    }
  };

  return (
    <div className={`rounded-lg p-4 border ${getCategoryColor(resource.category)} hover:border-opacity-70 transition-all duration-300`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{getFileIcon(resource.fileType)}</span>
        <div className="flex-1">
          <h4 className="font-semibold text-white text-base">{resource.title}</h4>
          <p className="text-sm text-gray-400 uppercase">{resource.fileType}</p>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4">{resource.description}</p>

      <DownloadLink
        href={resource.url}
        resourceTitle={resource.title}
        resourceType={resource.category}
        storySlug={storySlug}
        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded transition-colors duration-200"
      >
        📥 Download
      </DownloadLink>
    </div>
  );
};

const WorksheetStoryPage = ({ params }: Props) => {
  const [story, setStory] = useState<any>(null);
  const [onlineWorksheets, setOnlineWorksheets] = useState<any[]>([]);
  const [openAccordions, setOpenAccordions] = useState<Record<number, boolean>>({});
  const [slug, setSlug] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Redirect if worksheets are disabled
      if (!isFeatureEnabled("WORKSHEETS_ENABLED")) {
        redirect("/");
        return;
      }

      const { slug: paramSlug } = await params;
      const storyData = getWorksheetStoryBySlug(paramSlug);
      setSlug(paramSlug);

      if (!storyData) {
        notFound();
        return;
      }

      const worksheetData = getStoryWorksheets(paramSlug);
      setStory(storyData);
      setOnlineWorksheets(worksheetData);
      setLoading(false);

      // Set page title dynamically
      document.title = `${storyData.title} - Educational Worksheets | Scaremoor`;
    };

    loadData();
  }, [params]);

  const toggleAccordion = (grade: number) => {
    setOpenAccordions(prev => ({
      ...prev,
      [grade]: !prev[grade]
    }));
  };

  if (loading || !slug) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-600">Loading worksheet...</p>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-gray-600">Worksheet not found</p>
        </div>
      </div>
    );
  }

  const { title, description, storyText, gradeRange, subjects, themes, readingTime, activities, downloadableResources, solStandards } = story;

  return (
    <>
      <WorksheetAnalytics pageType="story" storyTitle={title} storySlug={slug} />
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-22">
        <div className="items-center">
          <div className="space-y-5 lg:pt-10">
            <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <h2 className="hero-text-large">Educational Worksheet</h2>
              <h1 className="hero-text-xlarge max-w-[20ch]">
                {title}
              </h1>
            </div>

            <p
              className="max-w-[80ch] font-light"
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              {description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-orange-700/30">
                📚 Grades {gradeRange}
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-orange-700/30">
                ⏱️ {readingTime}
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-orange-700/30">
                📝 {downloadableResources.length} resources
              </div>
            </div>
          </div>
        </div>
      </Herobox>

      <main className="text-white">
        {/* Story Overview */}
        <section className="px-8 md:px-20 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                {/* Story Text Preview */}
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl p-6 border border-gray-700/30">
                  <h2 className="font-trickordead text-2xl text-orange-400 mb-4">
                    📖 Story Preview
                  </h2>
                  <div className="prose prose-invert prose-orange max-w-none">
                    <div className="text-gray-300 leading-relaxed">
                      {storyText.split('\n\n').slice(0, 6).map((paragraph, index) => (
                        <p
                          key={index}
                          className="mb-4"
                          dangerouslySetInnerHTML={{
                            __html: paragraph
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/\*(.*?)\*/g, '<em>$1</em>')
                          }}
                        />
                      ))}
                      <div className="text-orange-400 italic">
                        [Story continues... Full text available in downloadable materials]
                      </div>
                    </div>
                  </div>
                </div>

                {/* Themes & Learning Objectives */}
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl p-6 border border-gray-700/30">
                  <h3 className="font-trickordead text-xl text-orange-400 mb-4">
                    🎯 Learning Themes
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {themes.map((theme) => (
                      <span
                        key={theme}
                        className="bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full border border-purple-700/50 text-sm"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>

                  <h4 className="font-semibold text-white mb-3">📚 Subject Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((subject) => (
                      <span
                        key={subject}
                        className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full border border-blue-700/50 text-sm"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* SOL Standards */}
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl p-6 border border-gray-700/30">
                  <h3 className="font-trickordead text-lg text-orange-400 mb-4">
                    📋 SOL Standards
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-white text-sm mb-2">Grade 3</h4>
                      <div className="flex flex-wrap gap-1">
                        {solStandards.grade3.map((standard) => (
                          <span key={standard} className="text-sm bg-blue-700/30 text-blue-300 px-2 py-1 rounded">
                            {standard}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm mb-2">Grade 4</h4>
                      <div className="flex flex-wrap gap-1">
                        {solStandards.grade4.map((standard) => (
                          <span key={standard} className="text-sm bg-purple-700/30 text-purple-300 px-2 py-1 rounded">
                            {standard}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm mb-2">Grade 5</h4>
                      <div className="flex flex-wrap gap-1">
                        {solStandards.grade5.map((standard) => (
                          <span key={standard} className="text-sm bg-red-700/30 text-red-300 px-2 py-1 rounded">
                            {standard}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Download */}
                <div className="bg-gradient-to-br from-orange-900/20 to-yellow-900/20 rounded-xl p-6 border border-orange-700/30">
                  <h3 className="font-trickordead text-lg text-orange-400 mb-4">
                    🚀 Quick Start
                  </h3>
                  <p className="text-gray-300 text-base mb-4">
                    Get everything you need in one comprehensive packet.
                  </p>
                  {downloadableResources.find(r => r.category === 'educator-packet') && (
                    <DownloadLink
                      href={downloadableResources.find(r => r.category === 'educator-packet')!.url}
                      resourceTitle={downloadableResources.find(r => r.category === 'educator-packet')!.title}
                      resourceType="educator-packet"
                      storySlug={slug}
                      className="inline-block w-full"
                    >
                      <button className="w-full px-4 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors font-medium">
                        📥 Download Complete Packet
                      </button>
                    </DownloadLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Online Worksheets */}
        <section className="px-8 md:px-20 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-trickordead font-normal text-4xl sm:text-5xl gradient-text-accessible mb-4">
                🖥️ Interactive Online Worksheets
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Complete worksheets online with instant feedback, or print them for traditional use.
                Perfect for distance learning and classroom technology integration.
              </p>
            </div>

            {/* Grade Accordions */}
            <div className="space-y-6">
              {onlineWorksheets.map((worksheet) => (
                <WorksheetAccordion
                  key={worksheet.id}
                  worksheet={worksheet}
                  storySlug={slug}
                  isOpen={openAccordions[worksheet.grade] || false}
                  onToggle={() => toggleAccordion(worksheet.grade)}
                />
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-700/30">
              <h3 className="font-trickordead text-xl text-blue-400 mb-4">
                💡 Online Worksheet Features
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-base text-gray-300">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Interactive drag-and-drop activities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Instant feedback on answers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Save progress automatically</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Print-friendly backup version</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Works on tablets and computers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>No login required</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Back to Worksheets */}
        <section className="px-8 md:px-20 py-20 space-y-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-lg p-8 border border-gray-700/30">
              <h3 className="font-trickordead text-3xl mb-4 text-orange-400">
                Looking for More Resources?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Explore our full collection of educational materials and mysterious stories
                designed to engage young readers.
              </p>
              <div className="flex gap-5 items-center justify-center flex-col lg:flex-row">
                <Link href="/worksheets">
                  <Button
                    buttonImage={OrangeBackground}
                    altText="view-all-worksheets"
                    text="View All Worksheets"
                  />
                </Link>
                <ContactLink
                  href="/contact"
                  source="worksheet_story_page"
                >
                  <Button
                    buttonImage={YellowBackground}
                    altText="contact-us"
                    text="Questions? Contact Us"
                    textColor="text-black"
                  />
                </ContactLink>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default WorksheetStoryPage;