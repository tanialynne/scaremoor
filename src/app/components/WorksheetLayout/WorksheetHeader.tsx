'use client'

import Image from 'next/image';
import Link from 'next/link';

// Import the Scaremoor logo
import ScaremoorLogo from '../../../../public/images/logo.png';

const WorksheetHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 print:hidden">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center">
            <Image
              src={ScaremoorLogo}
              alt="Scaremoor"
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default WorksheetHeader;