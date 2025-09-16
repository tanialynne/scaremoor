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
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/worksheets" className="hover:text-orange-600">Worksheets</Link>
            <span>›</span>
            <Link href={`/worksheets/${story.slug}`} className="hover:text-orange-600">{story.title}</Link>
            <span>›</span>
            <Link href={`/worksheets/${story.slug}/online/grade/${worksheet.grade}`} className="hover:text-orange-600">Grade {worksheet.grade}</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{section.title}</span>
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
        <div className="mt-8 flex justify-between items-center print:hidden">
          <div>
            {prevSection ? (
              <Link
                href={`/worksheets/${story.slug}/online/grade/${worksheet.grade}/section/${prevSection.id}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                ← Previous: {prevSection.title.replace(/[📖🔢🧠⛰️🎨🔍➡️✍️]/g, '').trim()}
              </Link>
            ) : (
              <div></div>
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
      </main>

      <WorksheetFooter />
    </div>
  );
};

export default SingleSectionPage;