import { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Herobox from "../components/Herobox";
import Button from "../components/Button";
import WorksheetAnalytics from "../components/WorksheetAnalytics";
import { WorksheetCardLink } from "../components/WorksheetAnalytics/WorksheetLink";
import {
  getPublishedWorksheetStories,
  WorksheetStory,
} from "../constants/Worksheets";
import { isFeatureEnabled } from "../constants/FeatureFlags";

import BackgroundImage from "../../../public/images/landingpage-Image.png";
import OrangeBackgroundMd from "../../../public/images/orangeBackgroundMd.png";

export const metadata: Metadata = {
  title: "Educational Worksheets & Printables",
  description:
    "Free educational resources, worksheets, and activities for teachers. Standards-aligned materials for grades 3-5 featuring mysterious stories and engaging activities.",
};

interface WorksheetCardProps {
  story: WorksheetStory;
}

const WorksheetCard: React.FC<WorksheetCardProps> = ({ story }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl p-6 border border-orange-700/30 hover:border-orange-500/50 transition-all duration-300 group">
      {story.coverImage && (
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-2 bg-orange-600 text-white text-xs px-2 py-1 rounded">
            Grades {story.gradeRange}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-trickordead text-orange-400 mb-2">
            {story.title}
          </h3>
          <p className="text-gray-300 text-base leading-relaxed">
            {story.description}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {story.themes.slice(0, 3).map((theme) => (
              <span
                key={theme}
                className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full border border-purple-700/50"
              >
                {theme}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>📚 {story.readingTime}</span>
            <span>📝 {story.downloadableResources.length} resources</span>
          </div>
        </div>

        <div className="pt-2">
          <WorksheetCardLink
            href={`/worksheets/${story.slug}`}
            storyTitle={story.title}
            storySlug={story.slug}
          >
            <Button
              buttonImage={OrangeBackgroundMd}
              altText={`View ${story.title} worksheets`}
              text="View Materials"
            />
          </WorksheetCardLink>
        </div>
      </div>
    </div>
  );
};

const WorksheetsPage = () => {
  // Redirect if worksheets are disabled
  if (!isFeatureEnabled("WORKSHEETS_ENABLED")) {
    redirect("/");
  }

  const stories = getPublishedWorksheetStories();

  return (
    <>
      <WorksheetAnalytics pageType="landing" />
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-22">
        <div className="items-center">
          <div className="space-y-5 lg:pt-10">
            <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <h2 className="hero-text-large">Educational Resources</h2>
              <h1 className="hero-text-xlarge max-w-[20ch]">
                Worksheets & Printables
              </h1>
            </div>

            <p
              className="max-w-[80ch] font-light"
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              Free, standards-aligned educational materials featuring mysterious
              stories that captivate young readers while building critical
              thinking skills. Perfect for grades 3-5 classrooms, homeschool
              families, and reading enrichment.
            </p>
          </div>
        </div>
      </Herobox>

      <main className="text-white">
        {/* Introduction Section */}
        <section className="px-8 md:px-20 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="font-trickordead font-normal text-4xl sm:text-5xl gradient-text-accessible">
                  Why Spooky Stories?
                </h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <div className="space-y-4 text-gray-300">
                    <p>
                      Mystery and suspense naturally engage young readers,
                      making complex themes like consequences, identity, and
                      moral choices more accessible and memorable.
                    </p>
                    <p>
                      Each story comes with differentiated activities for grades
                      3-5, aligned to Standards of Learning (SOL) for English
                      Language Arts.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-base">
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                      <div className="text-orange-400 font-semibold mb-1">
                        📚 Reading Level
                      </div>
                      <div className="text-gray-300">Grades 3-5</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                      <div className="text-orange-400 font-semibold mb-1">
                        ⏱️ Read Time
                      </div>
                      <div className="text-gray-300">10-15 minutes</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                      <div className="text-orange-400 font-semibold mb-1">
                        🎯 Prep Time
                      </div>
                      <div className="text-gray-300">Zero required</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                      <div className="text-orange-400 font-semibold mb-1">
                        📋 Standards
                      </div>
                      <div className="text-gray-300">SOL Aligned</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-900/20 to-yellow-900/20 rounded-xl p-8 border border-orange-700/30">
                  <h3 className="font-trickordead text-2xl text-orange-400 mb-4">
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-orange-400 mt-1">📖</span>
                      <span>Original short story (10-15 min read-aloud)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-400 mt-1">📝</span>
                      <span>
                        Grade-differentiated worksheets (3rd, 4th, 5th)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-400 mt-1">🎯</span>
                      <span>Ready-to-use activities (zero prep time)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-400 mt-1">✓</span>
                      <span>Complete answer keys for teachers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-400 mt-1">🎨</span>
                      <span>Extension activities for early finishers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-400 mt-1">📋</span>
                      <span>Implementation guide with timing options</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stories Grid */}
        <section className="px-8 md:px-20 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-trickordead font-normal text-4xl sm:text-5xl gradient-text-accessible mb-4">
                Available Stories & Worksheets
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Each story comes with a complete educational packet designed to
                spark critical thinking and engage students in meaningful
                discussions.
              </p>
            </div>

            {stories.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stories.map((story) => (
                  <WorksheetCard key={story.id} story={story} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-trickordead text-orange-400 mb-2">
                  More Stories Coming Soon!
                </h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  We&apos;re working on additional mysterious stories and
                  educational materials. Check back soon for new releases.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Implementation Guide */}
        <section className="px-8 md:px-20 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-trickordead font-normal text-4xl sm:text-5xl gradient-text-accessible mb-4">
                How to Use These Materials
              </h2>
              <p className="text-gray-400">
                Flexible implementation options to fit your classroom schedule
                and teaching style
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl p-6 border border-blue-700/30">
                <h3 className="font-trickordead text-xl text-blue-400 mb-4">
                  📚 Whole Class Adventure
                </h3>
                <ul className="space-y-2 text-gray-300 text-base">
                  <li>• Read story aloud (10-15 min)</li>
                  <li>• Class discussion (5 min)</li>
                  <li>• Complete worksheet together (15 min)</li>
                  <li>• Share creative responses (10 min)</li>
                </ul>
                <div className="mt-4 text-blue-300 font-semibold">
                  Total Time: 40-45 minutes
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl p-6 border border-green-700/30">
                <h3 className="font-trickordead text-xl text-green-400 mb-4">
                  🔄 Reading Centers
                </h3>
                <ul className="space-y-2 text-gray-300 text-base">
                  <li>• Station 1: Read the story</li>
                  <li>• Station 2: Comprehension questions</li>
                  <li>• Station 3: Creative activity</li>
                  <li>• Station 4: Extension/enrichment</li>
                </ul>
                <div className="mt-4 text-green-300 font-semibold">
                  Rotation: 15 min each
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl p-6 border border-purple-700/30">
                <h3 className="font-trickordead text-xl text-purple-400 mb-4">
                  📖 Independent Work
                </h3>
                <ul className="space-y-2 text-gray-300 text-base">
                  <li>• Silent reading time</li>
                  <li>• Complete grade-level worksheet</li>
                  <li>• Choice activity from extensions</li>
                  <li>• Peer share (optional)</li>
                </ul>
                <div className="mt-4 text-purple-300 font-semibold">
                  Flexible timing
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl p-6 border border-orange-700/30">
                <h3 className="font-trickordead text-xl text-orange-400 mb-4">
                  📅 Week-Long Unit
                </h3>
                <ul className="space-y-2 text-gray-300 text-base">
                  <li>• Monday: Read & discuss</li>
                  <li>• Tuesday: Vocabulary focus</li>
                  <li>• Wednesday: Comprehension</li>
                  <li>• Thursday: Creative writing</li>
                  <li>• Friday: Art & sharing</li>
                </ul>
                <div className="mt-4 text-orange-300 font-semibold">
                  20-30 min daily
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-8 md:px-20 py-20 space-y-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-orange-900/20 to-yellow-900/20 rounded-lg p-8 border border-orange-700/30">
              <h3 className="font-trickordead text-3xl mb-4 text-orange-400">
                Questions About These Materials?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Need help implementing these activities in your classroom? Have
                suggestions for future stories? We&apos;d love to hear from
                educators using these materials!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    buttonImage={OrangeBackgroundMd}
                    altText="contact-educators"
                    text="Contact Us"
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

export default WorksheetsPage;
