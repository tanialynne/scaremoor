import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Herobox from "../components/Herobox";
import Button from "../components/Button";

import BackgroundImage from "../../../public/images/singleBookBackground.png";
import OrangeBackgroundMd from "../../../public/images/orangeBackgroundMd.png";
import CloudRight from "../../../public/images/cloudRightTop.png";
import CloudBottom from "../../../public/images/cloudBottomLeft.png";
import CloudBottomMiddle from "../../../public/images/cloudBottomMiddle.png";
import YellowBackground from "../../../public/images/yellowBackground.png";
import OrangeBackground from "../../../public/images/orangeBackground.png";

import BlogPosts from "../constants/BlogPosts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Explore the world of children's horror writing, reading tips, and behind-the-scenes stories from Scaremoor.",
};

const BlogPage = () => {
  return (
    <>
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-22">
        <div className="items-center">
          <div className="space-y-5">
            <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <h2 className="hero-text-large">Stories Behind the Scares.</h2>
              <h1 className="hero-text-xlarge max-w-[20ch]">
                Writing Tips & Insights.
              </h1>
            </div>

            <p
              className="max-w-[80ch] font-light"
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              Every Scaremoor book hides a secret. In this blog, we share the
              twisted inspirations and eerie behind-the-scenes details that
              breathe life into the series. Peek into the notebooks, explore the
              real-world places that gave us goosebumps, and uncover how
              ordinary moments turn into unforgettable frights.
            </p>

            <div className="flex flex-col sm:flex-row pt-8 gap-5">
              <Link href="#stories">
                <Button
                  buttonImage={OrangeBackgroundMd}
                  altText="browse-stories"
                  text="Browse Stories"
                />
              </Link>

              <Link href="/books">
                <Button
                  buttonImage={YellowBackground}
                  altText="read-books"
                  text="Explore Books"
                  textColor="text-black"
                />
              </Link>
            </div>
          </div>
        </div>
      </Herobox>

      <main className="text-white">
        <section
          id="stories"
          className="px-8 md:px-20 py-20 min-h-180 h-full relative overflow-hidden space-y-6"
        >
          <div className="text-center space-y-6 relative z-50">
            <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize bg-gradient-to-b from-white from-[10%] to-[#A4A4A4] bg-clip-text text-transparent">
              Featured Stories & Tips
            </h2>
            <p className="max-w-[60ch] mx-auto">
              Explore the world of middle grade horror writing with expert tips,
              behind-the-scenes insights, and guides for young readers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12 relative z-50">
            {BlogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block">
                <article className="bg-gray-900/50 rounded-lg overflow-hidden border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer h-full">
                  <div className="p-6 h-full flex flex-col min-h-[250px]">
                    <div className="space-y-4 flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-orange-600 text-white rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-xl font-semibold leading-tight hover:text-orange-400 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-300 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-400 pt-6 mt-6 border-t border-gray-700">
                      <div className="flex items-center space-x-4">
                        <span>By {post.author}</span>
                        <span>
                          {new Date(post.publishedDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="text-center space-y-6 relative z-50 pt-24">
            <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize bg-gradient-to-b from-white from-[10%] to-[#A4A4A4] bg-clip-text text-transparent">
              Ready for More Scares?
            </h2>
            <p className="max-w-[60ch] mx-auto">
              Explore our spine-tingling middle grade horror series. Perfect for
              young readers who love goosebumps, creepy mysteries, and spooky
              scares.
            </p>
            <div className="flex gap-5 items-center justify-center flex-col lg:flex-row">
              <Link href="/books">
                <Button
                  buttonImage={OrangeBackground}
                  altText="explore-books"
                  text="Explore Books"
                />
              </Link>
              <Link href="/free-story">
                <Button
                  buttonImage={YellowBackground}
                  altText="read-story"
                  text="Read a Free Story"
                  textColor="text-black"
                />
              </Link>
            </div>
          </div>

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
          <Image
            src={CloudBottomMiddle}
            alt="cloud"
            className="absolute bottom-0 right-0 -z-10"
            loading="lazy"
          />
        </section>
      </main>
    </>
  );
};

export default BlogPage;
