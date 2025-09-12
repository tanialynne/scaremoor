"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { NavigationGroup } from "@/app/constants/NavigationStructure";

interface NavigationDropdownProps {
  group: NavigationGroup;
  index: number;
}

const NavigationDropdown: React.FC<NavigationDropdownProps> = ({ group, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isActiveGroup = group.items.some(item => pathname === item.href);
  
  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsOpen(false);
    }, 150);
    setTimeoutId(id);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  // If only one item and it's always visible, render as simple link
  if (group.items.length === 1 && group.alwaysVisible) {
    const item = group.items[0];
    const isActive = pathname === item.href;
    
    return (
      <Link
        href={item.href}
        className={`px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black hover:bg-orange-600/20 ${
          isActive 
            ? "text-orange-400 font-semibold" 
            : "text-white hover:text-orange-300"
        }`}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black hover:bg-orange-600/20 ${
          isActiveGroup
            ? "text-orange-400 font-semibold"
            : "text-white hover:text-orange-300"
        }`}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {group.name}
        <ChevronDown 
          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div 
          className={`absolute top-full left-0 mt-2 py-2 bg-gray-900/95 backdrop-blur-sm border border-orange-700/30 rounded-lg shadow-lg shadow-black/50 z-50 ${
            group.name === "Books" 
              ? "min-w-64 max-h-96 overflow-y-auto" 
              : "min-w-48"
          }`}
          role="menu"
        >
          {group.items.map((item, itemIndex) => {
            const isActive = pathname === item.href;
            const isBookItem = item.href.startsWith('/book/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-inset ${
                  isActive
                    ? "text-orange-400 font-semibold"
                    : "text-gray-300 hover:bg-orange-600/20 hover:text-white"
                } ${isBookItem ? "pl-6 border-l-2 border-orange-700/20 ml-2" : ""}`}
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {isBookItem && <span className="text-orange-500 text-xs mr-2">📖</span>}
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NavigationDropdown;