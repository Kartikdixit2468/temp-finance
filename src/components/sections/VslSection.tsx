import React, { useState, useRef } from 'react';
import { BookOpen, UserCheck, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';

export const VslSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setHasStarted(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section
      id="vsl"
      className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-14"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content */}
        <div className="lg:col-span-6">
          <div className="w-12 h-1 bg-blue-600 rounded-full mb-6"></div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1] mb-4">
            Still Not <br />
            <span className="text-blue-600">Convinced?</span>
          </h2>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-8">
            Then meet me inside{' '}
            <span className="relative inline-block text-blue-600">
              the Workshop.
              <svg
                className="absolute -bottom-1 left-0 w-full h-2 text-blue-600"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,15 Q50,0 100,10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h3>

          {/* Benefit Box */}
          <div className="bg-blue-50/60 rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-sm space-y-6">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center text-xl shrink-0 shadow-sm border border-blue-100">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base sm:text-lg mb-1">
                  You've read the whole page.
                </h4>
                <p className="text-slate-600 text-sm sm:text-base">
                  Now hear it directly from Yash in this short video.
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-blue-100/80"></div>

            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center text-xl shrink-0 shadow-sm border border-blue-100">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-800 text-base sm:text-lg font-medium leading-relaxed">
                  I'll show you what to look for, what questions to ask, and what{' '}
                  <span className="font-extrabold text-blue-600">you shouldn't overlook</span>{' '}
                  before buying or renewing health insurance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Video Area with Bracket Framing & Ambient Design */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          
          {/* Ambient Glows */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-blue-600/20 via-sky-400/15 to-indigo-500/10 blur-3xl -z-10" />
          <div className="absolute -bottom-4 w-64 h-12 bg-slate-950/15 blur-xl rounded-full -z-10" />

          {/* BRACKET FRAME WRAPPER */}
          <div className="relative p-4 sm:p-6 w-full max-w-md sm:max-w-lg">
            
            {/* Top-Left Bracket */}
            <div className="absolute top-0 left-0 w-8 h-8 sm:w-10 sm:h-10 border-t-4 border-l-4 border-blue-600 rounded-tl-xl pointer-events-none" />
            
            {/* Top-Right Bracket */}
            <div className="absolute top-0 right-0 w-8 h-8 sm:w-10 sm:h-10 border-t-4 border-r-4 border-blue-600 rounded-tr-xl pointer-events-none" />
            
            {/* Bottom-Left Bracket */}
            <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-10 sm:h-10 border-b-4 border-l-4 border-blue-600 rounded-bl-xl pointer-events-none" />
            
            {/* Bottom-Right Bracket */}
            <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 border-b-4 border-r-4 border-blue-600 rounded-br-xl pointer-events-none" />

            {/* Video Player Card */}
            <div 
              onClick={togglePlay}
              className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-800/80 group cursor-pointer aspect-[9/16] sm:aspect-[4/5] max-h-[580px] flex items-center justify-center"
            >
              <video
                ref={videoRef}
                src="/videos/yash-vsl.mp4"
                playsInline
                preload="metadata"
                onPlay={() => {
                  setIsPlaying(true);
                  setHasStarted(true);
                }}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                className="w-full h-full object-cover"
              />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 text-white text-xs font-extrabold shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Quick Video from Yash</span>
              </div>

              {/* Audio Toggle Button (Top Right) */}
              {hasStarted && (
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-slate-900 transition-colors shadow-md cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-blue-400" />}
                </button>
              )}

              {/* Central Play/Pause Overlay Button */}
              {(!isPlaying || !hasStarted) && (
                <div className="absolute inset-0 bg-slate-950/35 backdrop-blur-[2px] flex items-center justify-center z-10 transition-opacity">
                  <div className="relative flex items-center justify-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-glow-btn group-hover:scale-110 group-hover:bg-blue-500 transition-transform duration-300">
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1" />
                    </div>
                    {/* Animated Pulsing Ring */}
                    <div className="absolute inset-0 rounded-full bg-blue-500/40 animate-ping pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Bottom Mini Control Bar (when active) */}
              {hasStarted && (
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-center justify-between z-20 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>
                    <span className="font-semibold text-slate-300 text-[11px]">Click anywhere to {isPlaying ? 'pause' : 'play'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
