import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// 👉 Put all logos in /public/brands/
const brands = [
  { name: 'Nike', logo: '/brands/nike.jpg' },
  { name: 'Veg Non Veg', logo: '/brands/vegnonveg.jpg' },
  { name: 'Puma', logo: '/brands/puma.png' },
  { name: 'Giva', logo: '/brands/giva.png' },
  { name: 'Lotto', logo: '/brands/lotto.png' },
  { name: 'Savana', logo: '/brands/savana.png' },
  { name: 'Wrogn', logo: '/brands/wrogn.png' },
  { name: 'Johnnie Walker', logo: '/brands/jhonniewalker.png' },
  { name: 'Kalyan Jewellers', logo: '/brands/kalyanjewellers.png' },
  { name: 'Glenlivet', logo: '/brands/glenlivet.png' },
  { name: 'Rare Rabbit', logo: '/brands/rarerabbit.png' },
  { name: 'Bacardi', logo: '/brands/bacardi.png' },
  { name: 'Ballantines', logo: '/brands/ballantines.png' },
  { name: 'Nexus Malls', logo: '/brands/nexus.png' },
  { name: 'Nykaa Man', logo: '/brands/nykaa.png' },
  { name: 'Bluestone', logo: '/brands/bluestone.png' },
  { name: 'Max Fashion', logo: '/brands/max.png' },
  { name: 'Adobe', logo: '/brands/adobe.png' },
  { name: 'Camikara Rum', logo: '/brands/camikara.png' },
  { name: 'Azorte', logo: '/brands/azorte.png' },
  { name: 'Oppo', logo: '/brands/oppo.png' },
  { name: 'Original Burger Co', logo: '/brands/obc.png' },
  { name: 'Surf Excel', logo: '/brands/surfexcel.png' },
  { name: 'Firebolt', logo: '/brands/fireboltt.png' },
  { name: 'Samoh', logo: '/brands/samoh.png' },
  { name: 'Heineken', logo: '/brands/heineken.png' },
  { name: 'BMW', logo: '/brands/bmw.png' },
  { name: 'Phoenix Malls', logo: '/brands/phoenix.png' },
  { name: 'Flipkart', logo: '/brands/flipkart.png' },
  { name: 'Budveiser', logo: '/brands/budveiser.png' }
];

const BrandCard = ({ brand, index, cardRef }) => {
  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl bg-white/60 backdrop-blur-md border border-black/5 flex items-center justify-center p-6 cursor-pointer"
      style={{ opacity: 0 }}
    >
      <img
        src={brand.logo}
        alt={brand.name}
        className="h-8 md:h-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
      />
    </div>
  );
};

const BrandsSection = () => {
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
                stagger: 0.08,
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
      id="brands"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{ background: 'linear-gradient(135deg, #FFF0F5 0%, #FFFFFF 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

        {/* Header (SAME STYLE) */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono text-sm uppercase tracking-widest text-[#FF1493] mb-4">
              Clients
            </p>
            <h2 className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#0A0A0A]">
              Brands We Worked With
            </h2>
          </div>
          <p className="font-manrope text-base text-[#0A0A0A]/60 max-w-md">
            Trusted by global and emerging brands to craft impactful digital experiences.
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6">
          {brands.map((brand, index) => (
            <BrandCard
              key={brand.name}
              brand={brand}
              index={index}
              cardRef={(el) => (cardsRef.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;