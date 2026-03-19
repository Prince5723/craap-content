import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
    setIsTouchDevice(isTouch);

    if (isTouch) {
      document.documentElement.style.cursor = 'auto';
      document.body.style.cursor = 'auto';
      const style = document.createElement('style');
      style.id = 'touch-cursor-fix';
      style.textContent = '* { cursor: auto !important; }';
      document.head.appendChild(style);
      return () => {
        const existing = document.getElementById('touch-cursor-fix');
        if (existing) existing.remove();
      };
    }

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.5,
        ease: 'power3.out',
      });
      gsap.to(dot, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.1,
        ease: 'power3.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.8,
        borderColor: '#FF1493',
        backgroundColor: 'rgba(255, 20, 147, 0.1)',
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        borderColor: '#FF1493',
        backgroundColor: 'transparent',
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', moveCursor);

    const attachHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, [data-hover]');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };
    attachHoverListeners();

    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, []);

  // Don't render cursor elements on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={cursorRef}
        data-testid="custom-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '2px solid #FF1493',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={cursorDotRef}
        data-testid="custom-cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#FF1493',
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      />
    </>
  );
};

export default CustomCursor;
