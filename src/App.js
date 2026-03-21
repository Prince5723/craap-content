import React, { useEffect, useRef } from 'react';
import '@/App.css';
import gsap from 'gsap';
import Header from '@/components/Header';
// import HeroCanvas from '@/components/HeroCanvas';
import CustomCursor from '@/components/CustomCursor';
import FloatingBubbles from '@/components/FloatingBubbles';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import WorksSection from '@/components/WorksSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useBounceLogo, useMagneticEffect } from '@/hooks/useAnimations';
import BrandsSection from './components/BrandSection';

const LOGO_URL = '/assests/logo1.png';
const WATERMARK_URL = '/assests/logowatermark.png';

const HeroSection = () => {
  const heroTextRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroCTARef = useRef(null);
  const titleRef = useRef(null);
  const logoRef = useBounceLogo(5000);
  const exploreBtnRef = useMagneticEffect(0.4);
  const contactBtnRef = useMagneticEffect(0.4);
  const leftWatermarkRef = useRef(null);
  const rightWatermarkRef = useRef(null);

  useEffect(() => {
    const applyResponsive = () => {
      const isMobile = window.innerWidth < 1024;
      if (leftWatermarkRef.current) {
        leftWatermarkRef.current.style.width = isMobile ? '2400px' : 'clamp(1100px, 280vw, 2400px)';
        leftWatermarkRef.current.style.top = isMobile ? '18%' : '5%';
        leftWatermarkRef.current.style.left = isMobile ? '-33vw' : 'clamp(-620px, -35vw, -150px)';
      }
      if (rightWatermarkRef.current) {
        rightWatermarkRef.current.style.width = isMobile ? '70vw' : 'clamp(200px, 30vw, 900px)';
        rightWatermarkRef.current.style.top = isMobile ? '10%' : '30%';
        rightWatermarkRef.current.style.right = isMobile ? '-17vw' : 'clamp(-40px, 2vw, 20px)';
      }
    };
    applyResponsive();
    window.addEventListener('resize', applyResponsive);
    return () => window.removeEventListener('resize', applyResponsive);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.5 });

    tl.fromTo(
      heroTextRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo(
      heroSubRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(
      heroCTARef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    );

    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll('.letter');
      gsap.fromTo(
        letters,
        { opacity: 0, y: 80, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.04,
          delay: 2.5,
          ease: 'back.out(1.7)',
        }
      );
    }

    // 3D float for left watermark
    gsap.to(leftWatermarkRef.current, {
      rotateY: 8,
      rotateX: 4,
      y: -18,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      transformOrigin: 'center center',
    });

    // 3D float for right watermark
    gsap.to(rightWatermarkRef.current, {
      rotateY: -10,
      rotateX: -5,
      y: -14,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1,
      transformOrigin: 'center center',
    });

  }, []);

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWorks = () => {
    const el = document.querySelector('#works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const renderTitle = (text, className = '') => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className={`letter inline-block ${className}`}
        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF0F5 0%, #FFFFFF 60%, #FFF0F5 100%)' }}
    >
      {/* Left watermark */}
      <img
        ref={leftWatermarkRef}
        src={WATERMARK_URL}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '5%',
          left: 'clamp(-620px, -35vw, -150px)',
          width: 'clamp(1100px, 280vw, 2400px)',
          opacity: 0.22,
          transform: 'rotate(-15deg)',
          filter: 'blur(4px)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
        }}
      />
      {/* Right watermark */}
      <img
        ref={rightWatermarkRef}
        src={WATERMARK_URL}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          right: 'clamp(-40px, 2vw, 20px)',
          width: 'clamp(200px, 30vw, 900px)',
          opacity: 0.22,
          transform: 'scaleX(-1) rotate(-15deg)',
          filter: 'blur(4px)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
        }}
      />

      <FloatingBubbles count={12} section="hero" />
      {/* <HeroCanvas /> */}

      {/* Hero Content Overlay */}
      <div className="relative z-10 text-center px-6 mt-20">
        <div ref={heroTextRef} style={{ opacity: 0 }}>
          <div ref={logoRef} className="inline-block">
            <img
              src={LOGO_URL}
              alt="Craaaap Content Logo"
              className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
              data-testid="hero-logo"
            />
          </div>
          <h1
            ref={titleRef}
            className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-7xl xl:text-8xl uppercase tracking-tight text-[#0A0A0A] overflow-hidden leading-[1.1]"
            data-testid="hero-title"
          >
            <span className="block">{renderTitle('Craaaap', 'text-[#FF1493]')}</span>
            <span className="block">{renderTitle('Content')}</span>
          </h1>
        </div>
        <p
          ref={heroSubRef}
          className="font-manrope text-base md:text-lg text-[#0A0A0A]/60 mt-4 max-w-xl mx-auto"
          style={{ opacity: 0 }}
          data-testid="hero-subtitle"
        >
          Content Buddies to your favourite Creators.
        </p>
        <div
          ref={heroCTARef}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          style={{ opacity: 0 }}
        >
          <div ref={exploreBtnRef} className="inline-block">
            <button
              onClick={scrollToWorks}
              data-testid="hero-cta-explore"
              className="bg-[#FF1493] text-white rounded-full px-8 py-4 font-syne font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform hover:shadow-[0_0_30px_rgba(255,20,147,0.5)] active:scale-95"
              data-hover
            >
              Explore Our Work
            </button>
          </div>
          <div ref={contactBtnRef} className="inline-block">
            <button
              onClick={scrollToContact}
              data-testid="hero-cta-contact"
              className="border-2 border-[#0A0A0A] text-[#0A0A0A] rounded-full px-8 py-4 font-syne font-bold text-sm uppercase tracking-wider hover:bg-[#0A0A0A] hover:text-white transition-colors active:scale-95"
              data-hover
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

function App() {
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      document.documentElement.style.cursor = 'auto';
      const all = document.querySelectorAll('*');
      all.forEach((el) => (el.style.cursor = 'auto'));
    }
  }, []);

  return (
    <div className="App" data-testid="app-root">
      <CustomCursor />
      <div className="noise-overlay" />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <WorksSection />
        <BrandsSection/>
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;