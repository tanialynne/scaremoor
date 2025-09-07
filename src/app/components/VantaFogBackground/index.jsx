"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";

const VantaFogBackground = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = FOG({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        highlightColor: 0xffffff,
        midtoneColor: 0xffffff,
        lowlightColor: 0x0,
        baseColor: 0x0,
        blurFactor: 0.9,
        speed: 2,
        zoom: 1.2,
      });
    }

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  return <div ref={vantaRef} className="hidden lg:block absolute inset-0 -z-10 mix-blend-screen opacity-30 pointer-events-none" />;
};

export default VantaFogBackground;
