"use client";

import { useState, useEffect } from "react";
import { Users, Star, BookOpen, Headphones } from "lucide-react";

interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
}

function AnimatedStat({ icon, value, label, delay = 0 }: StatProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      const numValue = parseInt(value.replace(/[^0-9]/g, ""));
      if (!numValue) {
        setDisplayValue(value);
        return;
      }

      let current = 0;
      const increment = numValue / 30;
      const interval = setInterval(() => {
        current += increment;
        if (current >= numValue) {
          setDisplayValue(value);
          clearInterval(interval);
        } else {
          const suffix = value.includes("K") ? "K" : value.includes("+") ? "+" : "";
          const displayNum = value.includes("K") 
            ? Math.floor(current / 1000) 
            : Math.floor(current);
          setDisplayValue(displayNum + suffix);
        }
      }, 50);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className={`text-center transform transition-all duration-700 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}>
      <div className="text-orange-400 mb-2 flex justify-center">
        {icon}
      </div>
      <div className="text-2xl md:text-3xl font-bold text-orange-100 mb-1">
        {displayValue}
      </div>
      <div className="text-orange-300/80 text-sm">
        {label}
      </div>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-y border-orange-500/20 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-100 mb-3">
            Join Thousands of Young Horror Fans
          </h2>
          <p className="text-orange-300/90 text-sm md:text-base max-w-2xl mx-auto">
            See why parents and kids love our spine-tingling stories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
          <AnimatedStat
            icon={<Users size={32} />}
            value="15K+"
            label="Young Readers"
            delay={200}
          />
          
          <AnimatedStat
            icon={<Star size={32} />}
            value="4.9"
            label="Average Rating"
            delay={400}
          />
          
          <AnimatedStat
            icon={<BookOpen size={32} />}
            value="8"
            label="Books Published"
            delay={600}
          />
          
          <AnimatedStat
            icon={<Headphones size={32} />}
            value="25K+"
            label="Podcast Downloads"
            delay={800}
          />
        </div>

        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 text-orange-200/80 text-sm">
              <div className="flex text-yellow-400">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <span>"Perfect for my 10-year-old!"</span>
            </div>
            
            <div className="flex items-center space-x-2 text-orange-200/80 text-sm">
              <div className="flex text-yellow-400">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <span>"Better than Goosebumps!"</span>
            </div>
            
            <div className="flex items-center space-x-2 text-orange-200/80 text-sm">
              <div className="flex text-yellow-400">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <span>"Keeps them reading!"</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}