import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

// Hook for magnetic button effect
export const useMagneticEffect = (strength = 0.3) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  return ref;
};

// Hook for tilt card effect
export const useTiltEffect = (maxTilt = 8) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateY: x * maxTilt,
        rotateX: -y * maxTilt,
        transformPerspective: 800,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [maxTilt]);

  return ref;
};

// Hook for text scramble animation
export const useTextScramble = (finalText, trigger = true) => {
  const ref = useRef(null);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*';

  useEffect(() => {
    if (!trigger || !ref.current) return;
    const el = ref.current;
    let iteration = 0;
    const speed = 30;

    const interval = setInterval(() => {
      el.innerText = finalText
        .split('')
        .map((letter, index) => {
          if (index < iteration) return finalText[index];
          if (letter === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration >= finalText.length) clearInterval(interval);
      iteration += 1 / 2;
    }, speed);

    return () => clearInterval(interval);
  }, [finalText, trigger]);

  return ref;
};

// Bounce animation for logo
export const useBounceLogo = (interval = 4000) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const bounce = () => {
      gsap.timeline()
        .to(el, { y: -20, scaleY: 1.05, scaleX: 0.95, duration: 0.3, ease: 'power2.out' })
        .to(el, { y: 0, scaleY: 0.9, scaleX: 1.1, duration: 0.15, ease: 'power2.in' })
        .to(el, { y: -10, scaleY: 1.03, scaleX: 0.97, duration: 0.2, ease: 'power2.out' })
        .to(el, { y: 0, scaleY: 1, scaleX: 1, duration: 0.3, ease: 'bounce.out' });
    };

    // Initial bounce
    const timeout = setTimeout(bounce, 1500);
    // Periodic bounce
    const timer = setInterval(bounce, interval);

    return () => {
      clearTimeout(timeout);
      clearInterval(timer);
    };
  }, [interval]);

  return ref;
};
