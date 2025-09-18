"use client";

import Link from "next/link";

const WorksheetFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-8 print:hidden">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-wrap items-baseline justify-between text-sm text-gray-600">
          <span className="whitespace-nowrap">
            © {currentYear} Scaremoor. All rights reserved.
          </span>
          <Link
            href="/privacy"
            className="hover:text-gray-800 transition-colors whitespace-nowrap small-link"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default WorksheetFooter;
