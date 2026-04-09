import { useEffect, useRef } from 'react';

interface VRSceneProps {
  scrollProgress?: number;
  className?: string;
  size?: 'hero' | 'small';
}

export default function VRScene({ scrollProgress = 0, className = '', size = 'hero' }: VRSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(scrollProgress);

  const headsetImage =
    'https://raw.githubusercontent.com/bugseekers/assets/main/ChatGPT%20Image%20Apr%209%2C%202026%2C%2012_45_17%20PM.png';

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const width = rect.width || 1;
      const height = rect.height || 1;
      mouseRef.current.x = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseRef.current.y = -((e.clientY - rect.top) / height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let clock = 0;
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      clock += 0.008;
      if (!imageRef.current) return;

      // Preserve previous feel: auto spin + mouse-driven tilt + gentle floating motion.
      const rotateX = mouseRef.current.y * 9 + Math.sin(clock * 0.5) * 3;
      const rotateY = mouseRef.current.x * 12 - clock * 8 - scrollRef.current * 28;
      const floatY = Math.sin(clock) * 8;
      const horizontalOffset = size === 'hero' ? 12 : 0;
      imageRef.current.style.transform = `translate3d(${horizontalOffset}px, ${floatY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [size]);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <img
        ref={imageRef}
        src={headsetImage}
        alt="Wedstival VR headset"
        loading="eager"
        style={{
          width: size === 'hero' ? 'min(88%, 620px)' : 'min(84%, 460px)',
          maxHeight: '100%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.45))',
          willChange: 'transform',
          transformStyle: 'preserve-3d',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
    </div>
  );
}
