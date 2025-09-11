"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { NavigationGroup } from "@/app/constants/NavigationStructure";
import MobileNavLink from "./MobileNavLink";

interface MobileNavSectionProps {
  group: NavigationGroup;
  onLinkClick: () => void;
  animationDelay: number;
}

const MobileNavSection: React.FC<MobileNavSectionProps> = ({ group, onLinkClick, animationDelay }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // For single-item groups, render as simple link with consistent width
  if (group.items.length === 1) {
    const item = group.items[0];
    return (
      <div
        className="w-full transform transition-all duration-500 ease-in-out translate-y-0 opacity-100"
        style={{ transitionDelay: `${animationDelay}ms` }}
      >
        <MobileNavLink 
          text={item.name} 
          href={item.href} 
          onClick={onLinkClick}
        />
      </div>
    );
  }

  // For multi-item groups (like Books), create collapsible section
  const mainItems = group.items.filter(item => !item.href.startsWith('/book/'));
  const bookItems = group.items.filter(item => item.href.startsWith('/book/'));
  
  return (
    <>
      {/* Main section items */}
      {mainItems.map((item) => (
        <div 
          key={item.href} 
          className="w-full transform transition-all duration-500 ease-in-out translate-y-0 opacity-100"
          style={{ transitionDelay: `${animationDelay}ms` }}
        >
          <MobileNavLink 
            text={item.name} 
            href={item.href} 
            onClick={onLinkClick}
          />
        </div>
      ))}
      
      {/* Collapsible books section */}
      {bookItems.length > 0 && (
        <div 
          className="w-full transform transition-all duration-500 ease-in-out translate-y-0 opacity-100"
          style={{ transitionDelay: `${animationDelay}ms` }}
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center w-full text-left text-white hover:text-[#F54F02] transition-colors duration-300 px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            <ChevronDown 
              className={`mr-2 h-4 w-4 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
            Individual Books ({bookItems.length})
          </button>
          
          {isExpanded && (
            <div className="mt-2 space-y-2">
              {bookItems.map((item) => (
                <div key={item.href} className="w-full">
                  <MobileNavLink 
                    text={item.name} 
                    href={item.href} 
                    onClick={onLinkClick}
                    isSubItem={true}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MobileNavSection;