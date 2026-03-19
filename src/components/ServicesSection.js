import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Megaphone, Target, Video, Users } from 'lucide-react';
import FloatingBubbles from '@/components/FloatingBubbles';

const services = [
  {

    title: 'Content Creation',
    description: "Content that stops the thumb-marathon , it's high quality craaaap , they call it a story , something that calls the audience into loyal fans .",
    icon: Video,
    color: '#FF1493',
  },
  {
    title: 'Influencer Marketing',
    description: "We find the right humans to talk about your stuff so you don't have to. It’s basically professional matchmaking,because nobody likes a dry feed. That’s just craaaap.",
    icon: Megaphone,
    color: '#FF1493',

  },
  {
    title: 'Brand Curations',
   description: `We don’t just throw things at the wall to see what sticks. We’re much pickier than that. We curate the aesthetic, the voice, and the "je ne sais quoi" (that’s French for good craaaap). We slap it with offline curations.`,
    icon: Target,
    color: '#FF69B4',
  },
  {
    title: 'Tech Design',
    description: 'We built the pretty tech stuff so your users don’t have to wonder which button to panic-click. High-tech, low-stress.',
    icon: Users,
    color: '#FF69B4',
  },
];

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              cardsRef.current,
              { opacity: 0, y: 60, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      data-testid="services-section"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFF0F5 0%, #FFFFFF 100%)' }}
    >
      <FloatingBubbles count={8} section="services" />
      {/* Marquee */}
      <div className="overflow-hidden mb-16 md:mb-24">
        <div className="flex whitespace-nowrap marquee-track">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-syne font-extrabold text-6xl md:text-8xl lg:text-9xl uppercase tracking-tight text-[#FF1493]/10 mx-8"
            >
              Strategy &bull; Content &bull; Influencers &bull; Growth &bull;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="mb-16">
          <p className="font-mono text-sm uppercase tracking-widest text-[#FF1493] mb-4" data-testid="services-label">
            What We Do
          </p>
          <h2 className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#0A0A0A]" data-testid="services-heading">
            Our Services
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                ref={(el) => (cardsRef.current[index] = el)}
                data-testid={`service-card-${index}`}
                className="glass-card rounded-3xl p-8 md:p-10 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group"
                style={{ opacity: 0, transformStyle: 'preserve-3d' }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  gsap.to(e.currentTarget, {
                    rotateY: x * 10,
                    rotateX: -y * 10,
                    transformPerspective: 800,
                    duration: 0.4,
                    ease: 'power2.out',
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.4)',
                  });
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-125 group-hover:rotate-12 duration-500"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <Icon size={28} color={service.color} strokeWidth={2} />
                </div>
                <h3 className="font-syne font-bold text-xl md:text-2xl text-[#0A0A0A] mb-3">
                  {service.title}
                </h3>
                <p className="font-manrope text-sm md:text-base text-[#0A0A0A]/60 leading-relaxed">
                  {service.description}
                </p>
                {/* Animated underline */}
                <div className="mt-6 h-[2px] bg-gradient-to-r from-[#FF1493] to-[#FF69B4] w-0 group-hover:w-full transition-all duration-700 ease-out rounded-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
