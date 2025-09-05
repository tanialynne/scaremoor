"use client";

import RequestForm from "../RequestForm";
import Image from "next/image";

import ListCheckIcon from "../../../../public/images/icons/list.svg";

type ChapterLeadMagnetProps = {
  bookTitle: string;
  leadMagnetId: string;
  className?: string;
};

const ChapterLeadMagnet: React.FC<ChapterLeadMagnetProps> = ({ 
  bookTitle, 
  leadMagnetId, 
  className = "" 
}) => {
  return (
    <div className={`space-y-5 lg:pt-10 ${className}`}>
      <div className="font-(family-name:--trickOrDead) font-normal space-y-4 [text-shadow:0_0_13px_rgba(0,0,0,0.8)]">
        <p className="text-3xl md:text-6xl">Get Chapter One…</p>
        <h3 className="text-5xl md:text-7xl">If You Dare.</h3>
      </div>

      <div 
        className="max-w-[62ch] font-light space-y-6"
        style={{
          textShadow: "13px 13px 13px rgba(0, 0, 0, 0.8)",
        }}
      >
        <p>Want a taste of the terror before you buy?</p>
        <p>
          Get the first chapter of <span className="font-bold">{bookTitle}</span> <span className="font-bold">FREE</span> and dive into the world of <span className="font-bold">SCAREMOOR</span>.
        </p>
      </div>
      
      <div className="w-full max-w-[300px] sm:max-w-1/2 md:max-w-[700px]">
        <RequestForm buttonText="Send My Chapter" requestId={leadMagnetId} />
      </div>

      <ul className="flex gap-4 pt-4 flex-col md:flex-row">
        <li className="inline-flex items-center gap-2">
          <Image src={ListCheckIcon} alt="list-icon" />
          <span>Perfect for ages 8–12 (and brave grown-ups too). No spam, just stories.</span>
        </li>
      </ul>
    </div>
  );
};

export default ChapterLeadMagnet;