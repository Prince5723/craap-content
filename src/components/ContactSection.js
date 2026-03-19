import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MessageCircle, ArrowRight } from 'lucide-react';

const WHATSAPP_NUMBER = '7896960837';
const WHATSAPP_LINK = `https://wa.me/91${WHATSAPP_NUMBER}?text=Hey%20Craaaap%20Content!%20I%27d%20love%20to%20chat%20about%20a%20project.`;
const INSTAGRAM_LINK = 'https://www.instagram.com/craaaap.content/';
const EMAIL = 'team@craaaapcontent.com';

const openExternal = (url) => {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => document.body.removeChild(a), 100);
};

const ContactSection = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              leftRef.current,
              { opacity: 0, x: -60 },
              { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
            );
            gsap.fromTo(
              rightRef.current,
              { opacity: 0, x: 60 },
              { opacity: 1, x: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
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
      id="contact"
      ref={sectionRef}
      data-testid="contact-section"
      className="relative py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            <p className="font-mono text-sm uppercase tracking-widest text-[#FF1493] mb-4">
              Get In Touch
            </p>

            <h2 className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-7xl uppercase tracking-tight text-[#0A0A0A] leading-none">
              Let's Make
              <br />
              <span className="text-[#FF1493]">Craaaap</span>
            </h2>

            <p className="font-manrope text-base md:text-lg text-[#0A0A0A]/60 mt-6 max-w-lg">
              Ready to create content that actually works? Drop us a message and let's start building something incredible together.
            </p>
          </div>

          {/* Right (SHIFTED RIGHT) */}
          <div
            ref={rightRef}
            style={{ opacity: 0 }}
            className="space-y-8 lg:ml-10"
          >

            {/* WhatsApp */}
            <button
              onClick={() => openExternal(WHATSAPP_LINK)}
              className="group flex items-center gap-4 bg-[#25D366] text-white rounded-2xl p-6 w-full hover:bg-[#128C7E] transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle size={28} color="white" />
              </div>

              <div className="flex-1 text-left">
                <p className="font-syne font-bold text-lg md:text-xl">Chat on WhatsApp</p>
                <p className="font-manrope text-sm text-white/80">Direct message, instant reply</p>
              </div>

              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>

            {/* Email */}
            <div className="glass-card rounded-2xl p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-[#FF1493] mb-2">
                Email
              </p>

              <button
                onClick={() => openExternal(`mailto:${EMAIL}`)}
                className="font-syne font-bold text-lg md:text-xl text-[#0A0A0A] hover:text-[#FF1493] transition-colors hover:scale-105 transform origin-left"
              >
                {EMAIL}
              </button>
            </div>

            {/* Instagram */}
            <div className="glass-card rounded-2xl p-6 group hover:shadow-[0_0_20px_rgba(255,20,147,0.15)] transition-all duration-300">
              <p className="font-mono text-xs uppercase tracking-widest text-[#FF1493] mb-2">
                Instagram
              </p>

              <button
                onClick={() => openExternal(INSTAGRAM_LINK)}
                className="font-syne font-bold text-lg md:text-xl text-[#0A0A0A] hover:text-[#FF1493] transition-all hover:scale-105 transform origin-left"
              >
                @craaaap.content
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;