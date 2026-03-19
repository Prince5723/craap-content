// import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';

// const BALLOON_URL = '/assests/logo1.png';

// const HeroCanvas = () => {
//   const containerRef = useRef(null);
//   const lastSpawnRef = useRef(0);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const spawnBalloon = (x, y) => {
//       const balloon = document.createElement('img');
//       balloon.src = BALLOON_URL;

//       // Random size between 50–80px
//       const size = 80 + Math.random() * 30;

//       Object.assign(balloon.style, {
//         position: 'absolute',
//         left: `${x - size / 2}px`,
//         top: `${y - size / 2}px`,
//         width: `${size}px`,
//         height: `${size}px`,
//         pointerEvents: 'none',
//         zIndex: 20,
//         userSelect: 'none',
//         opacity: 1,
//       });

//       container.appendChild(balloon);

//       // Slight horizontal sway as it rises
//       const swayX = (Math.random() - 0.5) * 80;

//       gsap.to(balloon, {
//         y: -(300 + Math.random() * 200),
//         x: swayX,
//         opacity: 0,
//         scale: 0.6 + Math.random() * 0.4,
//         duration: 2.5 + Math.random() * 1,
//         ease: 'power1.out',
//         onComplete: () => {
//           if (balloon.parentNode) balloon.parentNode.removeChild(balloon);
//         },
//       });
//     };

//     const handleMouseMove = (e) => {
//       const now = Date.now();
//       if (now - lastSpawnRef.current < 200) return; // throttle 300ms
//       lastSpawnRef.current = now;

//       const rect = container.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;

//       spawnBalloon(x, y);
//     };

//     container.addEventListener('mousemove', handleMouseMove);
//     return () => container.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       data-testid="hero-canvas"
//       className="hero-canvas-container"
//       style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         overflow: 'hidden',
//       }}
//     />
//   );
// };

// export default HeroCanvas;