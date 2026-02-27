'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// --- CONFIGURATION: EDIT YOUR RESUME DETAILS HERE ---
const RESUME_DATA = {
  name: "AKSHAT SINGH",
  role: "FULL STACK ARCHITECT",
  stats: [
    { label: "Code Quality", value: "100%", description: "Clean, Scalable, Efficient", color: "bg-emerald-400" },
    { label: "Projects Shipped", value: "50+", description: "Enterprise & Open Source", color: "bg-blue-400" },
    { label: "Client Satisfaction", value: "5/5", description: "Top Rated Freelancer", color: "bg-purple-400" },
    { label: "Tech Stack", value: "Modern", description: "Next.js, React, Node, AI", color: "bg-orange-400" },
  ]
};

const HeroScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const objectRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=3000", // Makes the scroll distance longer for smoother control
        scrub: 1, // Softens the link between scroll and animation (smoothness)
        pin: true, // Pins the section
        anticipatePin: 1,
      }
    });

    // 1. The Main Object Movement (Left to Right)
    tl.to(objectRef.current, {
      x: '120vw', // Moves all the way across and off screen
      ease: "none", // Linear because scroll handles the easing
    }, 0);

    // 2. The Text Parallax (Moves slightly left to create depth)
    tl.to(textRef.current, {
      x: '-20%',
      opacity: 1,
      ease: "none",
    }, 0);

    // 3. Stats Cards Animations (Staggered pop-up as the object passes)
    // We calculate when the object passes specific percentages of the screen
    cardsRef.current.forEach((card, index) => {
      const position = index * 0.15; // Stagger timing based on index
      
      tl.fromTo(card, 
        { 
          scale: 0, 
          opacity: 0, 
          y: 100,
          rotation: -10
        },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          rotation: 0,
          ease: "back.out(1.7)", // Bouncy "premium" feel
          duration: 0.5 // Relative to scroll duration
        }, 
        position + 0.1 // Insert into timeline at specific spot
      );
    });

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-neutral-950 text-white overflow-x-hidden">
      
      {/* Intro Section (Standard Scroll) */}
      <div className="h-screen flex items-center justify-center flex-col z-10 relative">
        <p className="text-gray-400 mb-4 text-sm tracking-widest uppercase">Portfolio Loading...</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-8 animate-pulse">SCROLL DOWN</h1>
        <div className="w-[1px] h-24 bg-gradient-to-b from-blue-500 to-transparent"></div>
      </div>

      {/* THE ANIMATION TRIGGER AREA */}
      <div ref={triggerRef} className="h-screen w-full relative flex items-center overflow-hidden bg-grid-white/[0.05]">
        
        {/* BACKGROUND TEXT (AKSHAT SINGH) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 
            ref={textRef}
            className="text-[15vw] md:text-[20vw] font-black whitespace-nowrap opacity-20 text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-800 tracking-tighter leading-none select-none"
            style={{ transform: 'translateX(10%)' }} // Start slightly offset
          >
            {RESUME_DATA.name}
          </h1>
        </div>

        {/* THE MOVING OBJECT (The "Driver" of the animation) */}
        {/* Replace the src below with a transparent PNG of a cool car, a 3D avatar, or keep this generic shape */}
        <div 
          ref={objectRef} 
          className="absolute left-[-20%] top-1/2 -translate-y-1/2 z-20 w-[400px] h-[200px] md:w-[600px] md:h-[300px]"
        >
          {/* This represents the Car/Vehicle. Using a high-tech placeholder. */}
          <div className="w-full h-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 rounded-full blur-[60px] opacity-50 animate-pulse"></div>
            {/* Visual Representation of the "Car" - You can replace this Image tag with your preferred asset */}
            <img 
               src="https://cdn.pixabay.com/photo/2019/12/05/11/18/car-4674794_1280.png" 
               alt="Concept Car"
               className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform scale-x-[-1]" // Flipped to face right
            />
          </div>
        </div>

        {/* STATS CARDS (Positioned relative to the viewport) */}
        <div className="absolute inset-0 z-10 w-full h-full max-w-7xl mx-auto pointer-events-none">
          {RESUME_DATA.stats.map((stat, i) => (
            <div 
              key={i}
              ref={el => { cardsRef.current[i] = el }} // Correct way to handle ref array
              className={`absolute p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl w-64 md:w-80
                ${i % 2 === 0 ? 'top-[15%] md:top-[20%]' : 'bottom-[15%] md:bottom-[20%]'} 
              `}
              // Distribute them horizontally across the screen
              style={{ left: `${20 + (i * 20)}%` }} 
            >
              <div className={`w-12 h-1 mb-4 ${stat.color}`}></div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</h3>
              <p className="text-lg font-semibold text-white/90 uppercase tracking-wider">{stat.label}</p>
              <p className="text-sm text-gray-400 mt-2">{stat.description}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Footer / Continue Section */}
      <div className="h-screen bg-neutral-900 flex items-center justify-center z-30 relative">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-6">Let's Build Something Great.</h2>
          <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
            Contact Akshat
          </button>
        </div>
      </div>

    </main>
  );
};

export default HeroScroll;