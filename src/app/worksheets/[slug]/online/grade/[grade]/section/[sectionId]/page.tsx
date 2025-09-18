'use client';

import { useEffect, useState } from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getWorksheetStoryBySlug, WorksheetStory } from "../../../../../../../constants/Worksheets";
import { getOnlineWorksheet } from "../../../../../../../constants/OnlineWorksheets";
import { isFeatureEnabled } from "../../../../../../../constants/FeatureFlags";
import WorksheetHeader from "../../../../../../../components/WorksheetLayout/WorksheetHeader";
import WorksheetFooter from "../../../../../../../components/WorksheetLayout/WorksheetFooter";
import SingleSectionRenderer from "../../../../../../../components/Worksheets/SingleSectionRenderer";
import { OnlineWorksheet, WorksheetSection } from "../../../../../../../components/Worksheets/types";

type Props = {
  params: Promise<{ slug: string; grade: string; sectionId: string }>;
};

const SingleSectionPage = ({ params }: Props) => {
  const [story, setStory] = useState<WorksheetStory | null>(null);
  const [worksheet, setWorksheet] = useState<OnlineWorksheet | null>(null);
  const [section, setSection] = useState<WorksheetSection | null>(null);
  const [allSections, setAllSections] = useState<WorksheetSection[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      // Redirect if worksheets are disabled
      if (!isFeatureEnabled("WORKSHEETS_ENABLED")) {
        redirect("/");
        return;
      }

      const { slug: paramSlug, grade: paramGrade, sectionId } = await params;
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

      // Find the specific section
      const sectionData = worksheetData.sections.find(s => s.id === sectionId);
      if (!sectionData) {
        notFound();
        return;
      }

      const sectionIndex = worksheetData.sections.findIndex(s => s.id === sectionId);

      setStory(storyData);
      setWorksheet(worksheetData);
      setSection(sectionData);
      setAllSections(worksheetData.sections);
      setCurrentSectionIndex(sectionIndex);

      // Set page title
      document.title = `${storyData.title} - ${sectionData.title} - Grade ${paramGrade}`;
    };

    loadData();
  }, [params]);

  const handleSave = async () => {
    // Create a more user-friendly save notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
    notification.textContent = 'Progress saved! ✓';
    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  if (!story || !worksheet || !section) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-gray-600">Worksheet section not found</p>
        </div>
      </div>
    );
  }

  const prevSection = currentSectionIndex > 0 ? allSections[currentSectionIndex - 1] : null;
  const nextSection = currentSectionIndex < allSections.length - 1 ? allSections[currentSectionIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <WorksheetHeader />

      {/* Navigation breadcrumb */}
      <div className="bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex flex-wrap items-baseline text-sm text-gray-600">
            <Link href="/worksheets" className="hover:text-orange-600 whitespace-nowrap breadcrumb">Worksheets</Link>
            <span className="mx-2">›</span>
            <Link href={`/worksheets/${story.slug}`} className="hover:text-orange-600 whitespace-nowrap breadcrumb">{story.title}</Link>
            <span className="mx-2">›</span>
            <Link href={`/worksheets/${story.slug}/online/grade/${worksheet.grade}`} className="hover:text-orange-600 whitespace-nowrap breadcrumb">Grade {worksheet.grade}</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900 font-medium whitespace-nowrap breadcrumb">{section.title}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-6xl mx-auto py-8 px-4">
        <SingleSectionRenderer
          section={section}
          storyTitle={story.title}
          worksheet={worksheet}
          onSave={handleSave}
        />

        {/* Navigation between sections */}
        <div className="mt-8 print:hidden">
          {/* Desktop layout */}
          <div className="hidden md:flex justify-between items-center">
            <div>
              {prevSection ? (
                <Link
                  href={`/worksheets/${story.slug}/online/grade/${worksheet.grade}/section/${prevSection.id}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  ← Previous: {prevSection.title.replace(/[📖🔢🧠⛰️🎨🔍➡️✍️]/g, '').trim()}
                </Link>
              ) : (
                <Link
                  href={`/worksheets/${story.slug}/online/grade/${worksheet.grade}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  ← Back to Grade {worksheet.grade}
                </Link>
              )}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Section {currentSectionIndex + 1} of {allSections.length}
              </p>
            </div>

            <div>
              {nextSection ? (
                <Link
                  href={`/worksheets/${story.slug}/online/grade/${worksheet.grade}/section/${nextSection.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                >
                  Next: {nextSection.title.replace(/[📖🔢🧠⛰️🎨🔍➡️✍️]/g, '').trim()} →
                </Link>
              ) : (
                <Link
                  href={`/worksheets/${story.slug}/online/grade/${worksheet.grade}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  View All Sections
                </Link>
              )}
            </div>
          </div>

          {/* Mobile layout - 3 lines */}
          <div className="md:hidden space-y-3">
            {/* Line 1: Next button */}
            <div className="text-center">
              {nextSection ? (
                <Link
                  href={`/worksheets/${story.slug}/online/grade/${worksheet.grade}/section/${nextSection.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                >
                  Next: {nextSection.title.replace(/[📖🔢🧠⛰️🎨🔍➡️✍️]/g, '').trim()} →
                </Link>
              ) : (
                <Link
                  href={`/worksheets/${story.slug}/online/grade/${worksheet.grade}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  View All Sections
                </Link>
              )}
            </div>

            {/* Line 2: Section counter */}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Section {currentSectionIndex + 1} of {allSections.length}
              </p>
            </div>

            {/* Line 3: Previous button */}
            <div className="text-center">
              {prevSection ? (
                <Link
                  href={`/worksheets/${story.slug}/online/grade/${worksheet.grade}/section/${prevSection.id}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  ← Previous: {prevSection.title.replace(/[📖🔢🧠⛰️🎨🔍➡️✍️]/g, '').trim()}
                </Link>
              ) : (
                <Link
                  href={`/worksheets/${story.slug}/online/grade/${worksheet.grade}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  ← Back to Grade {worksheet.grade}
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      <WorksheetFooter />
    </div>
  );
};

export default SingleSectionPage;