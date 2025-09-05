import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import BookPageClient from "./BookPageClient";

import Books from "@/app/constants/Books";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const selectedBook = Books.find((book) => book.bookSlug === slug);

  if (!selectedBook) {
    return {
      title: "Book Not Found | Scaremoor",
      description: "The book you're looking for could not be found.",
    };
  }

  const bookUrl = `https://www.scaremoor.com/book/${selectedBook.bookSlug}`;
  const bookDescription = selectedBook.bookDescription?.replace(/\*/g, "").trim() || 
    `${selectedBook.bookSubHeading} - A spine-chilling middle grade horror book by T.L. Griffith, perfect for kids aged 8-13.`;

  return {
    title: selectedBook.bookTitle,
    description: bookDescription.substring(0, 160),
    alternates: {
      canonical: bookUrl,
    },
    openGraph: {
      title: `${selectedBook.bookTitle} | Scaremoor`,
      description: bookDescription.substring(0, 160),
      url: bookUrl,
      siteName: "Scaremoor",
      images: [
        {
          url: `https://www.scaremoor.com/images/books/${selectedBook.bookSlug}-share.jpg`,
          width: 1200,
          height: 630,
          alt: selectedBook.bookTitle,
        },
      ],
      type: "book",
    },
    twitter: {
      card: "summary_large_image",
      title: `${selectedBook.bookTitle} | Scaremoor`,
      description: bookDescription.substring(0, 160),
      images: [`https://www.scaremoor.com/images/books/${selectedBook.bookSlug}-share.jpg`],
    },
  };
}

export async function generateStaticParams() {
  return Books.map((book) => ({
    slug: book.bookSlug,
  }));
}

const BookPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const selectedBook = Books.find((book) => book.bookSlug === slug);

  if (!selectedBook) {
    notFound();
  }
  
  const bookStructuredData = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: selectedBook.bookTitle,
    description: selectedBook.bookDescription?.replace(/\*/g, "").trim() || selectedBook.bookSubHeading,
    author: {
      "@type": "Person",
      name: "T.L. Griffith",
      url: "https://www.scaremoor.com/author"
    },
    publisher: {
      "@type": "Organization",
      name: "Scaremoor Books"
    },
    genre: ["Middle Grade Horror", "Children's Fiction", "Horror"],
    audience: {
      "@type": "Audience",
      audienceType: "Children",
      suggestedMinAge: 8,
      suggestedMaxAge: 13
    },
    url: `https://www.scaremoor.com/book/${selectedBook.bookSlug}`,
    image: `https://www.scaremoor.com/images/books/${selectedBook.bookSlug}-cover.jpg`,
    offers: {
      "@type": "Offer",
      url: selectedBook.purchaseLink,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Amazon"
      }
    },
    isPartOf: {
      "@type": "BookSeries",
      name: "Scaremoor",
      url: "https://www.scaremoor.com/scaremoor"
    }
  };

  return (
    <>
      <Script
        id={`book-structured-data-${selectedBook.bookSlug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookStructuredData),
        }}
      />
      <BookPageClient selectedBook={selectedBook} />
    </>
  );
};

export default BookPage;
