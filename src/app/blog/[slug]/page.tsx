import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import BlogPostClient from "./BlogPostClient";

import BlogPosts from "@/app/constants/BlogPosts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const selectedPost = BlogPosts.find((post) => post.slug === slug);

  if (!selectedPost) {
    return {
      title: "Post Not Found | Scaremoor Blog",
      description: "The blog post you're looking for could not be found.",
    };
  }

  const postUrl = `https://www.scaremoor.com/blog/${selectedPost.slug}`;
  const postDescription = selectedPost.excerpt;

  return {
    title: selectedPost.title,
    description: postDescription,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: `${selectedPost.title} | Scaremoor Blog`,
      description: postDescription,
      url: postUrl,
      siteName: "Scaremoor",
      images: [
        {
          url: `https://www.scaremoor.com/images/blog/${selectedPost.slug}-share.jpg`,
          width: 1200,
          height: 630,
          alt: selectedPost.title,
        },
      ],
      type: "article",
      publishedTime: selectedPost.publishedDate,
      authors: [selectedPost.author],
      tags: selectedPost.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${selectedPost.title} | Scaremoor Blog`,
      description: postDescription,
      images: [`https://www.scaremoor.com/images/blog/${selectedPost.slug}-share.jpg`],
    },
  };
}

export async function generateStaticParams() {
  return BlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

const BlogPostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const selectedPost = BlogPosts.find((post) => post.slug === slug);

  if (!selectedPost) {
    notFound();
  }
  
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: selectedPost.title,
    description: selectedPost.excerpt,
    author: {
      "@type": "Person",
      name: selectedPost.author,
      url: "https://www.scaremoor.com/author"
    },
    publisher: {
      "@type": "Organization",
      name: "Scaremoor",
      logo: {
        "@type": "ImageObject",
        url: "https://www.scaremoor.com/images/logo.png"
      }
    },
    datePublished: selectedPost.publishedDate,
    dateModified: selectedPost.publishedDate,
    url: `https://www.scaremoor.com/blog/${selectedPost.slug}`,
    image: `https://www.scaremoor.com/images/blog/${selectedPost.slug}-featured.jpg`,
    keywords: selectedPost.tags.join(", "),
    articleSection: "Blog",
    wordCount: selectedPost.content.split(/\s+/).length,
    timeRequired: `PT${selectedPost.readTime}M`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.scaremoor.com/blog/${selectedPost.slug}`
    }
  };

  return (
    <>
      <Script
        id={`article-structured-data-${selectedPost.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <BlogPostClient selectedPost={selectedPost} />
    </>
  );
};

export default BlogPostPage;