import React, { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { Volume2, VolumeX } from 'lucide-react';

const works = [
  { title: 'Veg Non Veg X Nike', category: 'Content Creation', video: '/videos/video1.mp4' },
  { title: 'Flipkart', category: 'Sale Campaign', video: '/videos/video2.mp4' },
  { title: 'Giva Jewellery', category: 'Campaign Design', video: '/videos/video3.mp4' },
  { title: 'Fire Boltt', category: 'Lifestyle Integration', video: '/videos/video4.mp4' },
];

// Track if user has interacted with the page (needed for browser audio policy)
let userHasInteracted = false;
document.addEventListener('click', () => { userHasInteracted = true; }, { once: true });
document.addEventListener('touchstart', () => { userHasInteracted = true; }, { once: true });

const VideoCard = ({ work, index, cardRef }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const playVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (userHasInteracted) {
      video.muted = false;
      setSoundEnabled(true);
    } else {
      video.muted = true;
      setSoundEnabled(false);
    }

    video.play().catch(() => {
      video.muted = true;
      video.play();
      setSoundEnabled(false);
    });
    setIsPlaying(true);
  }, []);

  const stopVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.muted = true;
    setIsPlaying(false);
    setSoundEnabled(false);
  }, []);

  const handleClick = useCallback(() => {
    userHasInteracted = true;
    const video = videoRef.current;
    if (!video) return;

    if (isTouchDevice) {
      // Mobile: tap to toggle play/pause
      if (isPlaying) {
        stopVideo();
      } else {
        playVideo();
      }
    } else {
      // Desktop: click to enable sound on currently playing video
      if (isPlaying && video.muted) {
        video.muted = false;
        setSoundEnabled(true);
      }
    }
  }, [isTouchDevice, isPlaying, playVideo, stopVideo]);

  return (
    <div
      ref={cardRef}
      data-testid={`work-card-${index}`}
      className="group relative rounded-3xl overflow-hidden cursor-pointer"
      style={{ opacity: 0, transformStyle: 'preserve-3d' }}
      data-hover
      onClick={handleClick}
      onMouseEnter={!isTouchDevice ? playVideo : undefined}
      onMouseLeave={!isTouchDevice ? (e) => {
        stopVideo();
        gsap.to(e.currentTarget, {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        });
      } : undefined}
      onMouseMove={!isTouchDevice ? (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(e.currentTarget, {
          rotateY: x * 6,
          rotateX: -y * 6,
          scale: 1.02,
          transformPerspective: 1000,
          duration: 0.4,
          ease: 'power2.out',
        });
      } : undefined}
    >
      {/* 9:16 vertical reel ratio */}
      <div className="aspect-[9/16] max-h-[400px] md:max-h-[500px] overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={work.video}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          data-testid={`work-video-${index}`}
        />
      </div>

      {/* Sound indicator */}
      <div className={`absolute top-4 right-4 z-10 transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <div className={`${soundEnabled ? 'bg-[#FF1493]/80' : 'bg-black/60'} backdrop-blur-sm rounded-full p-2`}>
          {soundEnabled ? (
            <Volume2 size={16} color="white" />
          ) : (
            <VolumeX size={16} color="white" />
          )}
        </div>
        {isPlaying && !soundEnabled && (
          <p className="text-[10px] text-white/80 mt-1 text-center font-manrope whitespace-nowrap">Click for sound</p>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-5">
        <div className="flex items-end justify-between w-full">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#FF69B4] mb-1">
              {work.category}
            </p>
            <h3 className="font-syne font-bold text-sm md:text-base text-white">
              {work.title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorksSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              cardsRef.current,
              { opacity: 0, y: 80, scale: 0.9 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                stagger: 0.2,
                ease: 'power3.out',
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="works"
      ref={sectionRef}
      data-testid="works-section"
      className="relative py-24 md:py-32"
      style={{ background: 'linear-gradient(135deg, #FFF0F5 0%, #FFFFFF 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono text-sm uppercase tracking-widest text-[#FF1493] mb-4" data-testid="works-label">
              Portfolio
            </p>
            <h2
              className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#0A0A0A]"
              data-testid="works-heading"
            >
              Our Works
            </h2>
          </div>
          <p className="font-manrope text-base text-[#0A0A0A]/60 max-w-md">
            A peek at campaigns that broke the internet ? One scroll at a time.
          </p>
        </div>

        {/* Works Grid - Instagram Reel Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {works.map((work, index) => (
            <VideoCard
              key={work.title}
              work={work}
              index={index}
              cardRef={(el) => (cardsRef.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
