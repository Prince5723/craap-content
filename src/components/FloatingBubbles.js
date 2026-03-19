import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FloatingBubbles = ({ count = 15, section = 'global' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const bubbles = container.querySelectorAll('.bubble');
    bubbles.forEach((bubble, i) => {
      const size = Math.random() * 60 + 10;
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const duration = Math.random() * 8 + 6;
      const delay = Math.random() * 5;

      gsap.set(bubble, {
        width: size,
        height: size,
        left: `${startX}%`,
        top: `${startY}%`,
        opacity: Math.random() * 0.15 + 0.03,
      });

      // Floating animation
      gsap.to(bubble, {
        y: `random(-80, 80)`,
        x: `random(-40, 40)`,
        rotation: `random(-180, 180)`,
        duration: duration,
        delay: delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Scale pulse
      gsap.to(bubble, {
        scale: `random(0.8, 1.3)`,
        duration: duration * 0.7,
        delay: delay + 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      data-testid={`floating-bubbles-${section}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bubble absolute rounded-full"
          style={{
            background: i % 3 === 0 
              ? 'radial-gradient(circle, rgba(255,20,147,0.3) 0%, transparent 70%)'
              : i % 3 === 1
              ? 'radial-gradient(circle, rgba(255,105,180,0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255,182,193,0.25) 0%, transparent 70%)',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBubbles;
