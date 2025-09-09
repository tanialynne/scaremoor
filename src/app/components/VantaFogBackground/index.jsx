"use client";
import React, { useEffect, useRef, useState } from "react";

const VantaFogBackground = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop and when user has interacted (reduces initial bundle)
    const checkVisibility = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsVisible(true);
      }
    };

    // Delay loading slightly to prioritize critical content
    const timer = setTimeout(checkVisibility, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible || vantaEffect.current) return;

    // Dynamic import to reduce bundle size
    const loadVanta = async () => {
      try {
        const [{ default: FOG }, THREE] = await Promise.all([
          import('vanta/dist/vanta.fog.min'),
          import('three')
        ]);

        if (vantaRef.current && !vantaEffect.current) {
          vantaEffect.current = FOG({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: false, // Disable for performance
            touchControls: false, // Disable for performance
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            highlightColor: 0xffffff,
            midtoneColor: 0xffffff,
            lowlightColor: 0x0,
            baseColor: 0x0,
            blurFactor: 0.9,
            speed: 1.5, // Reduced speed for better performance
            zoom: 1.2,
          });
        }
      } catch (error) {
        console.warn('Failed to load Vanta effect:', error);
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [isVisible]);

  if (!isVisible) {
    return (
      <div className="hidden lg:block absolute inset-0 -z-8 bg-gradient-to-b from-gray-800/10 via-gray-900/5 to-black/10 opacity-30 pointer-events-none" />
    );
  }

  return <div ref={vantaRef} className="hidden lg:block absolute inset-0 -z-8 mix-blend-screen opacity-30 pointer-events-none" />;
};

export default VantaFogBackground;
