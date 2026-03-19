import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const LOGO_URL = '/assests/logo2.png';

const Header = () => {
  const headerRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 80) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    gsap.fromTo(header, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Works', href: '#works' },
    { label: 'About', href: '#about' },
  ];

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      ref={headerRef}
      data-testid="main-header"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-6xl"
    >
      <div className="glass-card rounded-full px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
          data-testid="header-logo-link"
          className="flex items-center gap-3"
          data-hover
        >
          <img
            src={LOGO_URL}
            alt="Craaaap Content"
            className="h-10 w-auto object-contain"
            data-testid="header-logo-image"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
              data-testid={`nav-${item.label.toLowerCase()}`}
              className="font-syne font-semibold text-sm uppercase tracking-widest text-[#0A0A0A] hover:text-[#FF1493] transition-colors"
              data-hover
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
            data-testid="nav-contact-btn"
            className="bg-[#FF1493] text-white rounded-full px-6 py-2 font-syne font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform hover:shadow-[0_0_20px_rgba(255,20,147,0.5)]"
            data-hover
          >
            Contact
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          data-testid="mobile-menu-toggle"
          className="md:hidden text-[#0A0A0A]"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-hover
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div
          data-testid="mobile-nav"
          className="glass-card rounded-2xl mt-2 p-6 md:hidden flex flex-col gap-4"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
              data-testid={`mobile-nav-${item.label.toLowerCase()}`}
              className="font-syne font-semibold text-base uppercase tracking-widest text-[#0A0A0A] hover:text-[#FF1493] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
            data-testid="mobile-nav-contact-btn"
            className="bg-[#FF1493] text-white rounded-full px-6 py-3 font-syne font-bold text-sm uppercase tracking-wider text-center"
          >
            Contact
          </a>
        </div>
      )}

      <style>{`
        .header-scrolled .glass-card {
          background: rgba(255, 240, 245, 0.85);
          box-shadow: 0 4px 30px rgba(255, 20, 147, 0.08);
        }
      `}</style>
    </header>
  );
};

export default Header;
