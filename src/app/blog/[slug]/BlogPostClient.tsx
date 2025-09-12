"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";

import { BlogPost } from "@/app/constants/BlogPosts";
import Button from "@/app/components/Button";
import Nav from "@/app/components/Navigation";
import ShareButtons from "@/app/components/ShareButtons";
import { trackButtonClick } from "@/app/utils/analytics";

import BackgroundImage from "../../../../public/images/singleBookBackground.png";
import CloudRight from "../../../../public/images/cloudRightTop.png";
import CloudBottom from "../../../../public/images/cloudBottomLeft.png";
import YellowBackground from "../../../../public/images/yellowBackground.png";
import OrangeBackground from "../../../../public/images/orangeBackground.png";

interface BlogPostClientProps {
  selectedPost: BlogPost;
}

const BlogPostClient: React.FC<BlogPostClientProps> = ({ selectedPost }) => {
  useEffect(() => {
    // Track blog post view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: selectedPost.title,
        page_location: window.location.href,
        content_group1: "Blog Post",
        content_group2: selectedPost.tags[0] || "General",
        custom_parameter_1: selectedPost.readTime,
      });
    }
  }, [selectedPost]);

  const handleButtonClick = (buttonText: string, destination: string) => {
    trackButtonClick(
      buttonText,
      `Blog Post - ${selectedPost.title}`,
      destination
    );
  };

  return (
    <>
      <section
        className="relative z-50 px-8 md:px-20 p-8 overflow-hidden isolate min-h-[600px]"
        style={{
          backgroundImage: `url(${BackgroundImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 -z-10"></div>

        <Nav />

        <div className="text-white p-8 lg:p-12 flex flex-col justify-center items-center min-h-[calc(100%-120px)]">
          <div className="relative overflow-hidden max-w-4xl mx-auto z-10">
            <div className="space-y-6 text-center">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-orange-600 text-white rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
                <h1 className="text-5xl md:text-7xl max-w-[30ch]">
                  {selectedPost.title}
                </h1>
              </div>

              <p
                className="text-lg md:text-xl font-light max-w-[60ch] mx-auto leading-relaxed"
                style={{
                  textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
                }}
              >
                {selectedPost.excerpt}
              </p>

              <div className="flex justify-center items-center space-x-6 text-sm text-gray-300 pt-4">
                <span>By {selectedPost.author}</span>
                <span>•</span>
                <span>
                  {new Date(selectedPost.publishedDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
                <span>•</span>
                <span>{selectedPost.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="text-white relative overflow-hidden">
        <Image
          src={CloudRight}
          alt="cloud"
          className="absolute top-10 right-0 -z-10"
          loading="lazy"
        />
        <Image
          src={CloudBottom}
          alt="cloud"
          className="absolute bottom-0 left-0 -z-10"
          loading="lazy"
        />

        <article className="relative z-50 px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="blog-content">
              <Markdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="font-trickordead text-4xl md:text-5xl text-orange-400 mb-6 mt-8">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="font-trickordead text-3xl md:text-4xl text-orange-400 mb-4 mt-8">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-trickordead text-2xl md:text-3xl text-orange-400 mb-4 mt-6">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-200 leading-relaxed mb-4 text-lg">
                      {children}
                    </p>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-orange-400 hover:text-orange-300 underline"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-white font-semibold">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="text-gray-100 italic">{children}</em>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-200 text-lg">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-200 text-lg">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-orange-500 pl-4 my-6 text-gray-300 italic text-lg">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="text-orange-300 bg-gray-800 px-2 py-1 rounded text-sm">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4">
                      {children}
                    </pre>
                  ),
                }}
              >
                {selectedPost.content}
              </Markdown>
            </div>
            
            {/* Share buttons after article content */}
            <div className="mt-12 pt-8">
              <ShareButtons 
                url={`https://www.scaremoor.com/blog/${selectedPost.slug}`}
                title={selectedPost.title}
                description={selectedPost.excerpt}
                hashtags="Scaremoor,Blog,MiddleGradeHorror,WritingTips"
                label="Share this article:"
              />
            </div>
          </div>
        </article>

        <section className="relative flex flex-col justify-center items-center text-center space-y-12 py-20 px-8 z-50">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-trickordead font-normal text-4xl md:text-6xl bg-gradient-to-b from-white from-[10%] to-[#A4A4A4] bg-clip-text text-transparent">
              Ready for More Scares?
            </h2>
            <p className="text-lg">
              Explore our spine-tingling middle grade horror series, perfect for
              young readers who love a good scare.
            </p>
          </div>

          <div className="flex gap-5 items-center justify-center flex-col sm:flex-row">
            <Link
              href="/books"
              onClick={() => handleButtonClick("Explore Books", "/books")}
            >
              <Button
                buttonImage={OrangeBackground}
                altText="explore-books"
                text="Explore Books"
              />
            </Link>
            <Link
              href="/blog"
              onClick={() => handleButtonClick("More Blog Posts", "/blog")}
            >
              <Button
                buttonImage={YellowBackground}
                altText="more-posts"
                text="More Blog Posts"
                textColor="text-black"
              />
            </Link>
            <Link
              href="/society"
              onClick={() => handleButtonClick("Join the Society", "/society")}
            >
              <Button
                buttonImage={OrangeBackground}
                altText="join-society"
                text="Join the Society"
              />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default BlogPostClient;
