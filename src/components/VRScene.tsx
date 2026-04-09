import { useEffect, useRef } from 'react';

interface VRSceneProps {
  scrollProgress?: number;
  className?: string;
  size?: 'hero' | 'small';
}

export default function VRScene({ scrollProgress = 0, className = '', size = 'hero' }: VRSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(scrollProgress);

  const modelUrl = 'https://raw.githubusercontent.com/bugseekers/assets/main/VR%20Headset.glb';

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
      if (!modelRef.current) return;

      // Preserve the premium floating feel while model-viewer handles model rotation.
      const rotateX = mouseRef.current.y * 5 + Math.sin(clock * 0.5) * 2;
      const rotateY = mouseRef.current.x * 7 - scrollRef.current * 10;
      const floatY = Math.sin(clock) * 8;
      const horizontalOffset = size === 'hero' ? 12 : 0;
      modelRef.current.style.transform = `translate3d(${horizontalOffset}px, ${floatY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
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
      <model-viewer
        ref={modelRef}
        src={modelUrl}
        alt="Wedstival VR headset"
        auto-rotate
        camera-controls
        disable-zoom
        loading="eager"
        interaction-prompt="none"
        touch-action="pan-y"
        camera-orbit="0deg 75deg 2.2m"
        min-camera-orbit="auto auto 2.2m"
        max-camera-orbit="auto auto 2.2m"
        shadow-intensity="0"
        style={{
          width: size === 'hero' ? 'min(88%, 620px)' : 'min(84%, 460px)',
          maxHeight: '100%',
          height: '100%',
          filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.45))',
          willChange: 'transform',
          transformStyle: 'preserve-3d',
          userSelect: 'none',
          background: 'transparent',
        }}
      />
    </div>
  );
}
