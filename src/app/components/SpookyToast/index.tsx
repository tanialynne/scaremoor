"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Kind = "success" | "error";

type ToastItem = {
  id: string;
  kind: Kind;
  message: string;
  duration?: number;
};

let enqueueExternal: ((t: Omit<ToastItem, "id">) => void) | null = null;

export const spookyToast = {
  success(message: string, duration = 4000) {
    enqueueExternal?.({ kind: "success", message, duration });
  },
  error(message: string, duration = 4500) {
    enqueueExternal?.({ kind: "error", message, duration });
  },
};

const SPOOKY_SOUNDS = {
  success: ["✨", "🎃", "🦇", "👻"],
  error: ["💀", "🕷️", "🩸", "⚡"],
};

const SPOOKY_TITLES = {
  success: ["Spell Complete!", "Magic Worked!", "Potion Success!", "Enchantment Done!"],
  error: ["Oh No!", "Spell Backfired!", "Potion Failed!", "Something's Wrong!"],
};

export default function SpookyToast() {
  const [mounted, setMounted] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  useEffect(() => setMounted(true), []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timeout = timeoutsRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutsRef.current.delete(id);
    }
  }, []);

  useEffect(() => {
    const timeouts = timeoutsRef.current;
    
    enqueueExternal = (toast) => {
      const id = `spooky-${idRef.current++}`;
      const newToast = { id, ...toast };

      setToasts((prev) => [...prev, newToast]);

      if (toast.duration) {
        const timeout = setTimeout(() => removeToast(id), toast.duration);
        timeouts.set(id, timeout);
      }
    };

    return () => {
      enqueueExternal = null;
      timeouts.forEach((timeout) => clearTimeout(timeout));
      timeouts.clear();
    };
  }, [removeToast]);

  if (!mounted) return null;

  return createPortal(
    <div aria-live="assertive" className="fixed z-[9999] top-4 right-4 flex flex-col gap-3 w-[92vw] max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>,
    document.body
  );
}

function ToastCard({ toast, onClose }: { toast: ToastItem; onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const icons = SPOOKY_SOUNDS[toast.kind];
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 800);
    return () => clearInterval(interval);
  }, [toast.kind]);

  const getThemeClasses = (kind: Kind) => {
    const themes = {
      success: {
        bg: "bg-gradient-to-br from-purple-900/95 to-indigo-900/95",
        border: "border-purple-400/30",
        ring: "ring-1 ring-purple-300/20",
        accent: "from-purple-300 via-pink-300 to-transparent",
        bar: "bg-gradient-to-b from-purple-400 to-pink-400",
        glow: "shadow-purple-500/20",
      },
      error: {
        bg: "bg-gradient-to-br from-red-900/95 to-orange-900/95",
        border: "border-red-400/30",
        ring: "ring-1 ring-red-300/20",
        accent: "from-red-300 via-orange-300 to-transparent",
        bar: "bg-gradient-to-b from-red-400 to-orange-400",
        glow: "shadow-red-500/20",
      },
    };
    return themes[kind];
  };

  const theme = getThemeClasses(toast.kind);
  const icons = SPOOKY_SOUNDS[toast.kind];
  const titles = SPOOKY_TITLES[toast.kind];
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];

  const baseClasses = `
    relative overflow-hidden rounded-2xl border backdrop-blur-xl
    transform transition-all duration-500 ease-out pointer-events-auto
    ${theme.bg} ${theme.border} ${theme.ring} shadow-2xl ${theme.glow}
    ${isVisible ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95"}
  `;

  return (
    <div
      role="status"
      className={baseClasses}
      style={{
        animation: isVisible ? "spookyFloat 3s ease-in-out infinite alternate" : "none",
      }}>
      <div className={`absolute inset-x-0 -top-6 h-12 bg-gradient-to-b ${theme.accent} opacity-60`} aria-hidden="true" />

      <div className="absolute left-0 top-0 w-2 h-full overflow-hidden">
        <div
          className={`w-full h-0 ${theme.bar} rounded-r-sm`}
          style={{
            animation: `spookyDrip ${toast.duration || 4000}ms linear forwards`,
            filter: "drop-shadow(0 0 4px rgba(255,255,255,0.3))",
          }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${20 + i * 25}%`,
              top: `${30 + i * 20}%`,
              animation: `sparkle ${2 + i * 0.5}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      <div className="relative p-4 flex items-start gap-3">
        <div
          className="text-2xl select-none transform transition-transform duration-300 hover:scale-110"
          style={{
            animation: "bounce 2s ease-in-out infinite",
            filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))",
          }}
          aria-hidden="true">
          {icons[currentIcon]}
        </div>

        <div className="flex-1">
          <p className="font-bold text-white text-sm tracking-wide mb-1 footer-text-small">{randomTitle}</p>
          <p className="text-sm text-white/90 leading-relaxed font-medium footer-text-small">{toast.message}</p>
        </div>

        <button
          onClick={onClose}
          aria-label="Close spooky notification"
          className="
            ml-2 px-3 py-1 text-xs font-semibold rounded-full
            bg-black/30 hover:bg-black/50 text-white/80 hover:text-white
            transition-all duration-200 transform hover:scale-105
            border border-white/20 hover:border-white/40
          ">
          ✕
        </button>
      </div>
    </div>
  );
}
