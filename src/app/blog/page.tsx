import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Nav from "../components/Navigation";
import Button from "../components/Button";

import BackgroundImage from "../../../public/images/singleBookBackground.png";
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
      <section
        className="relative z-50 px-8 md:px-20 p-8 overflow-hidden isolate h-[500px]"
        style={{
          backgroundImage: `url(${BackgroundImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 -z-10"></div>

        <Nav />

        <div className="text-white p-8 lg:p-12 flex flex-col justify-center items-center h-full">
          <div className="space-y-6 text-center max-w-5xl mx-auto mb-12">
            <div className="font-(family-name:--trickOrDead) font-normal [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <h1 className="text-4xl md:text-6xl">
                Stories Behind the Scares
              </h1>
            </div>
            <p className="max-w-[70ch] mx-auto text-gray-200 text-lg leading-relaxed">
              Step inside the shadows of <strong>middle grade horror</strong>
              —where young readers meet ghostly hallways, eerie mysteries, and
              monsters that feel a little too close for comfort. Here you’ll
              find <strong>expert tips for writing scary stories</strong>,
              behind-the-scenes secrets from the Scaremoor series, and guides to
              help kids discover the thrill of age-appropriate chills. From{" "}
              <strong>crafting spine-tingling tales</strong> to building the
              perfect spooky reading atmosphere, this is your gateway to the
              world of <strong>children’s horror fiction</strong>.
            </p>
          </div>
        </div>
      </section>
      <main className="text-white">
        <section className="px-8 md:px-20 py-20 min-h-180 h-full relative overflow-hidden">
          <div className="space-y-12 relative z-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BlogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block"
                >
                  <article className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-orange-500 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer h-full">
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

            <section className="relative flex flex-col justify-center items-center text-center space-y-4 py-20 px-8 z-50">
              <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="font-(family-name:--trickOrDead) font-normal text-4xl md:text-6xl bg-gradient-to-b from-white from-[10%] to-[#A4A4A4] bg-clip-text text-transparent">
                  Ready for More Scares?
                </h2>
                <p className="text-lg">
                  Explore our spine-tingling middle grade horror series.<br/>Perfect for young
                  readers who love goosebumps, creepy mysteries, and
                  unforgettable scares.
                </p>
              </div>

              <div className="flex gap-5 items-center justify-center flex-col sm:flex-row">
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
                <Link href="/society">
                  <Button
                    buttonImage={OrangeBackground}
                    altText="join-society"
                    text="Join the Society"
                  />
                </Link>
              </div>
            </section>
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
