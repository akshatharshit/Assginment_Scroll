'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins safely for Next.js
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- DATA SOURCE: Based on Akshat Singh's Resume ---
const PROFILE_DATA = {
  name: "AKSHAT SINGH",
  alias: "ITZFIZZ", 
  role: "FULL STACK ARCHITECT",
  stats: [
    { 
      id: 1,
      value: "1000+", 
      label: "DSA Problems Solved", 
      sub: "LeetCode, CodeChef & GFG",
      color: "from-green-400 to-emerald-600",
      shadow: "shadow-green-500/20"
    },
    { 
      id: 2,
      value: "AWS", 
      label: "Certified Practitioner", 
      sub: "Cloud Security & Scalable Systems",
      color: "from-orange-400 to-amber-600",
      shadow: "shadow-orange-500/20"
    },
    { 
      id: 3,
      value: "Top 50", 
      label: "SIH Team Lead", 
      sub: "Smart India Hackathon Internal Round",
      color: "from-blue-400 to-indigo-600",
      shadow: "shadow-blue-500/20"
    },
    { 
      id: 4,
      value: "Awarded", 
      label: "Best Developer", 
      sub: "KIET Dept. of CSE (2023-24)",
      color: "from-purple-400 to-pink-600",
      shadow: "shadow-purple-500/20"
    },
  ]
};

const HeroScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const vehicleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=4000", // Increases scroll distance for cinematic pacing
        scrub: 1, // Adds physics/weight to the scroll
        pin: true, // Pins the section
        anticipatePin: 1,
      }
    });

    // 1. VEHICLE ANIMATION: Moves from -20% (left) to 130% (right)
    tl.to(vehicleRef.current, {
      x: '130vw', 
      ease: "none", 
    }, 0);

    // 2. PARALLAX TEXT: Moves slightly left (-25%) to create depth
    tl.to(textRef.current, {
      x: '-25%',
      ease: "none",
    }, 0);

    // 3. STAT CARDS: Pop up in sequence based on scroll position
    cardsRef.current.forEach((card, index) => {
      // Staggered start times: 0.15, 0.35, 0.55, 0.75
      const startPoint = 0.15 + (index * 0.20);
      
      tl.fromTo(card, 
        { 
          y: 120, 
          opacity: 0, 
          scale: 0.5,
          rotationX: -45
        },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          rotationX: 0,
          ease: "back.out(1.7)", // Premium "pop" effect
          duration: 0.5,
        }, 
        startPoint
      );
    });

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-[#030303] text-white overflow-x-hidden selection:bg-orange-500/30 font-sans">
      
      {/* --- SCENE 1: INTRO SCREEN --- */}
      <div className="h-screen flex flex-col items-center justify-center relative z-10">
        {/* Background ambient glow */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>
        
        <div className="text-center z-10 px-4">
          <p className="text-xs md:text-sm text-blue-400 font-mono mb-4 tracking-[0.3em] uppercase animate-pulse">
            System Initialized
          </p>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4 text-white">
            {PROFILE_DATA.name.split(' ')[0]}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600">
              {PROFILE_DATA.name.split(' ')[1]}
            </span>
          </h1>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
            <span className="text-sm text-gray-300 tracking-wider font-light">
              {PROFILE_DATA.role}
            </span>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 flex flex-col items-center gap-3 opacity-60">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent"></div>
          <p className="text-[10px] tracking-widest uppercase text-gray-500">Scroll to Explore</p>
        </div>
      </div>

      {/* --- SCENE 2: THE SCROLL DRIVE --- */}
      <div ref={triggerRef} className="h-screen w-full relative overflow-hidden bg-[#050505] flex items-center shadow-inner">
        
        {/* 1. Dynamic Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
        
        {/* 2. Huge Parallax Text Layer */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap pointer-events-none z-0">
          <h1 
            ref={textRef}
            className="text-[20vw] font-black leading-none opacity-[0.04] text-white select-none"
            style={{ transform: 'translateX(10%)' }}
          >
            {PROFILE_DATA.alias} DESIGN CODE
          </h1>
        </div>

        {/* 3. The "Player" Vehicle (CSS Only - No Images Needed) */}
        <div 
          ref={vehicleRef} 
          className="absolute left-[-15%] top-1/2 -translate-y-1/2 z-30 w-[200px] h-[100px] md:w-[300px] md:h-[150px] flex items-center justify-center"
        >
          {/* Cyber Pod Graphics */}
          <div className="relative w-full h-full flex items-center justify-center">
             {/* Engine Trail */}
             <div className="absolute right-[50%] top-1/2 -translate-y-1/2 w-[200px] h-[4px] bg-gradient-to-r from-transparent to-cyan-500 blur-sm"></div>
             
             {/* Main Body */}
             <div className="w-full h-12 bg-gradient-to-r from-gray-900 to-black border border-gray-700 rounded-r-full rounded-l-md relative z-10 shadow-[0_0_30px_rgba(0,255,255,0.3)]">
                {/* Cockpit */}
                <div className="absolute right-4 top-1 bottom-1 w-12 bg-cyan-900/50 rounded-full border border-cyan-500/30 overflow-hidden">
                  <div className="absolute inset-0 bg-cyan-400/20 animate-pulse"></div>
                </div>
                {/* Side details */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-20 h-[1px] bg-gray-600"></div>
                <div className="absolute -bottom-1 left-4 right-4 h-1 bg-cyan-500 blur-[2px]"></div>
             </div>

             {/* Glow Effect */}
             <div className="absolute w-[120%] h-[120%] bg-cyan-500/10 blur-xl rounded-full -z-10"></div>
          </div>
        </div>

        {/* 4. Floating Stat Cards */}
        <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto z-20 pointer-events-none">
          {PROFILE_DATA.stats.map((stat, i) => (
            <div 
              key={stat.id}
              ref={el => { if (el) cardsRef.current[i] = el }}
              className={`absolute p-6 rounded-xl border border-white/5 backdrop-blur-md bg-[#0a0a0a]/80 w-[240px] md:w-[300px] ${stat.shadow}
                ${i % 2 === 0 ? 'top-[20%]' : 'bottom-[20%]'}
              `}
              // Horizontal positioning: 15%, 40%, 65%, 90%
              style={{ left: `${15 + (i * 25)}%` }}
            >
              {/* Animated Accent Line */}
              <div className={`w-8 h-1 mb-4 rounded-full bg-gradient-to-r ${stat.color}`}></div>
              
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 font-sans tracking-tight">
                {stat.value}
              </h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                {stat.label}
              </p>
              <p className="text-[10px] md:text-xs text-gray-500 font-mono border-t border-white/5 pt-2 mt-2">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- SCENE 3: FOOTER --- */}
      <div className="h-[50vh] bg-black flex flex-col items-center justify-center border-t border-white/10 z-20 relative">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          Let's Build The Future
        </h2>
        <a 
          href="mailto:akshatsingh132004@gmail.com" 
          className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-white px-8 font-medium text-black transition-all duration-300 hover:bg-neutral-200 hover:w-56"
        >
          <span className="mr-2">Contact Akshat</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
        <div className="mt-8 text-gray-600 text-sm">
          © {new Date().getFullYear()} Akshat Singh. All rights reserved.
        </div>
      </div>
    </main>
  );
};

export default HeroScroll;