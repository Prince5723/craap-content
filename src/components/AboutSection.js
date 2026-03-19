import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import FloatingBubbles from '@/components/FloatingBubbles';

// Change the path:
const TEAM_VIDEO = '/gif/craaaap.mp4';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              contentRef.current,
              { opacity: 0, x: -60 },
              { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
            );
            gsap.fromTo(
              imageRef.current,
              { opacity: 0, x: 60, scale: 0.9 },
              { opacity: 1, x: 0, scale: 1, duration: 1, delay: 0.2, ease: 'power3.out' }
            );

            if (!hasAnimated) {
              setHasAnimated(true);
              const targets = [50, 200, 10];
              const suffixes = ['+', '+', 'M+'];
              statsRef.current.forEach((el, i) => {
                if (!el) return;
                const counter = { val: 0 };
                gsap.to(counter, {
                  val: targets[i],
                  duration: 2,
                  delay: 0.5 + i * 0.2,
                  ease: 'power2.out',
                  onUpdate: () => {
                    el.textContent = Math.floor(counter.val) + suffixes[i];
                  },
                });
              });
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const stats = [
    { number: '50+', label: 'Brands Served' },
    { number: '200+', label: 'Campaigns Delivered' },
    { number: '10M+', label: 'Audience Reached' }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      data-testid="about-section"
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      <FloatingBubbles count={6} section="about" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div ref={contentRef} style={{ opacity: 0 }}>
            <p className="font-mono text-sm uppercase tracking-widest text-[#FF1493] mb-4">
              About Us
            </p>

            <h2 className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#0A0A0A] mb-8">
              We Make Content That Hits Different
            </h2>

            <p className="font-manrope text-base md:text-lg text-[#0A0A0A]/70 leading-relaxed mb-6">
              We don’t do "safe," and we definitely don't do boring. We’re a collective of strategists, creators, and influencer nerds obsessed with making the kind of high-quality craaaap people actually stop to watch. Because let’s be honest: the best marketing doesn’t feel like a sales pitch , it feels like something you’d actually send to the group chat.
            </p>

            {/* <p className="font-manrope text-base md:text-lg text-[#0A0A0A]/70 leading-relaxed mb-10">
              Our team of strategists, creators, and influencer experts work together to craft stories that resonate, engage, and convert. Because great marketing doesn't have to look like marketing.
            </p> */}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="group">
                  <p
                    ref={(el) => (statsRef.current[i] = el)}
                    className="font-syne font-extrabold text-3xl md:text-4xl text-[#FF1493] group-hover:scale-110 transition-transform origin-left"
                  >
                    {stat.number}
                  </p>
                  <p className="font-manrope text-xs md:text-sm text-[#0A0A0A]/50 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image (SHIFTED RIGHT) */}
          <div
            ref={imageRef}
            style={{ opacity: 0 }}
            className="relative lg:ml-8 xl:ml-12"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <video
  src={TEAM_VIDEO}
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-[400px] lg:h-[500px] object-cover"
/>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-5 shadow-xl glow-pink">
              <p className="font-syne font-bold text-lg text-[#0A0A0A]">
                Since 2025
              </p>
              <p className="font-manrope text-xs text-[#0A0A0A]/50">
                Making craaaap that works
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;