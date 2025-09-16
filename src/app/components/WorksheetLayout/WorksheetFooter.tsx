'use client'

import Link from 'next/link';

const WorksheetFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-8 print:hidden">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
          <span>© {currentYear} Scaremoor. All rights reserved.</span>
          <span className="text-gray-400">|</span>
          <Link
            href="/privacy"
            className="hover:text-gray-800 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default WorksheetFooter;