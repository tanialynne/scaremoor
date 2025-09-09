"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface PodcastCardProps {
  title: string;
  description: string;
  episode: string;
  duration: string;
  audioSrc: string;
}

const PodcastCard = ({ title, description, episode, duration, audioSrc }: PodcastCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize random animation delays for CSS animations
  const [animationDelays] = useState(() => 
    Array.from({ length: 60 }, () => Math.random() * 0.7 + 0.2)
  );

  const handleCardClick = async () => {
    if (!isFlipped) {
      setIsFlipped(true);
      
      // Auto-play when card flips
      setTimeout(async () => {
        if (audioRef.current) {
          try {
            // Reset and reload audio
            audioRef.current.currentTime = 0;
            audioRef.current.load();
            
            // Wait a bit for loading
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
              await playPromise;
              setIsPlaying(true);
            }
          } catch (error) {
            console.error("Audio play failed:", error);
            setIsPlaying(false);
            // Try to enable audio through user gesture
            alert("Please click the play button to start audio");
          }
        }
      }, 300);
    }
  };

  const handlePlayPause = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Audio play/pause failed:", error);
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setTotalDuration(audioRef.current.duration);
    }
  };

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * totalDuration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        setIsPlaying(false);
      };
      
      const handleError = (e: Event) => {
        console.error("Audio error:", e);
        setIsPlaying(false);
      };
      
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("error", handleError);
      audio.addEventListener("canplaythrough", () => {
        console.log("Audio can play through");
      });

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("error", handleError);
      };
    }
  }, []);

  return (
    <div className="relative w-full perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        aria-label={`Play podcast episode: ${title}`}
        aria-pressed={isFlipped}
      >
        {/* Front of card */}
        <div className="w-full h-full backface-hidden bg-gray-900/50 rounded-lg p-6 border border-gray-700 hover:border-orange-500/50 focus-within:border-orange-500/50 focus-within:ring-2 focus-within:ring-orange-400/50 transition-all duration-300 hover:transform hover:scale-105 focus-within:scale-105 cursor-pointer">
          <div className="flex flex-col h-full min-h-[280px]">
            <div className="space-y-3 flex-grow">
              <h3 className="font-trickordead text-2xl" id={`podcast-title-${title.replace(/\s+/g, '-').toLowerCase()}`}>{title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {description}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{episode} • {duration}</span>
                <span className="text-green-400 font-semibold">FREE</span>
              </div>
              <div className="mt-4 text-right text-gray-500">
                <span className="text-xs">Click to play →</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gray-900/50 rounded-lg p-6 border border-orange-500/50">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <h3 className="font-trickordead text-xl mb-2 text-orange-400">{title}</h3>
              <p className="text-sm text-gray-300 mb-4">Now Playing...</p>
            </div>

            {/* Audio Controls */}
            <div className="space-y-4">
              {/* Play/Pause Button with Waveform */}
              <div className="flex items-center justify-center relative">
                {/* CSS-Based Waveform Animation */}
                {isPlaying && (
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 flex items-center justify-center pointer-events-none px-2" aria-hidden="true">
                    <div className="sound-wave flex items-center justify-center h-full w-full">
                      {animationDelays.map((delay, i) => {
                        // Determine animation class based on position
                        let animationClass = 'wave-lg';
                        if (i < 7 || i >= animationDelays.length - 7) {
                          animationClass = 'wave-md';
                        }
                        if (i < 3 || i >= animationDelays.length - 3) {
                          animationClass = 'wave-sm';
                        }
                        
                        return (
                          <div
                            key={i}
                            className={`bar ${animationClass}`}
                            style={{
                              animationDuration: `${delay}s`,
                              flex: '1 1 auto',
                              maxWidth: '3px'
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
                <button
                  onClick={handlePlayPause}
                  className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full transition-colors relative z-10"
                >
                  {isPlaying ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max={totalDuration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    onMouseDown={handleMouseDown}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                    style={{
                      background: `linear-gradient(to right, #ea580c ${totalDuration ? (currentTime / totalDuration) * 100 : 0}%, #374151 ${totalDuration ? (currentTime / totalDuration) * 100 : 0}%)`
                    }}
                    aria-label={`Audio progress: ${formatTime(currentTime)} of ${formatTime(totalDuration)}`}
                    aria-valuemin={0}
                    aria-valuemax={totalDuration || 0}
                    aria-valuenow={currentTime}
                    aria-valuetext={`${formatTime(currentTime)} of ${formatTime(totalDuration)}`}
                  />
                  {/* Loading indicator */}
                  {!totalDuration && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(totalDuration)}</span>
                </div>
              </div>

              {/* Back Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                  if (audioRef.current) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                  }
                }}
                className="w-full bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900 text-white py-2 px-4 rounded text-sm transition-colors"
                aria-label="Go back to podcast description"
              >
                ← Back to Description
              </button>
            </div>
          </div>

          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            src={audioSrc}
            preload="auto"
            controls={false}
            onError={(e) => {
              console.error("Audio error:", e.currentTarget.error);
            }}
            onCanPlay={() => {
              console.log("Audio can play");
            }}
            onLoadStart={() => {
              console.log("Audio load started");
            }}
            onLoadedData={() => {
              console.log("Audio loaded data");
            }}
          />
        </div>
      </div>

      {/* CSS for 3D transforms */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ea580c;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(234, 88, 12, 0.5);
          transition: all 0.2s ease;
        }
        .slider::-webkit-slider-thumb:hover {
          background: #fb923c;
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(234, 88, 12, 0.7);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ea580c;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(234, 88, 12, 0.5);
          transition: all 0.2s ease;
        }
        .slider::-moz-range-thumb:hover {
          background: #fb923c;
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(234, 88, 12, 0.7);
        }
        .sound-wave {
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .bar {
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          animation-direction: alternate;
          background: linear-gradient(to top, #ea580c, #fb923c, #fdba74);
          margin: 0 1px;
          height: 8px;
          width: 2px;
          border-radius: 1px;
        }
        
        @keyframes wave-sm {
          0% {
            opacity: 0.4;
            height: 8px;
          }
          100% {
            opacity: 1;
            height: 20px;
          }
        }
        
        @keyframes wave-md {
          0% {
            opacity: 0.4;
            height: 12px;
          }
          100% {
            opacity: 1;
            height: 35px;
          }
        }
        
        @keyframes wave-lg {
          0% {
            opacity: 0.4;
            height: 12px;
          }
          100% {
            opacity: 1;
            height: 50px;
          }
        }
        
        .wave-sm {
          animation-name: wave-sm;
        }
        
        .wave-md {
          animation-name: wave-md;
        }
        
        .wave-lg {
          animation-name: wave-lg;
        }
      `}</style>
    </div>
  );
};

export default PodcastCard;