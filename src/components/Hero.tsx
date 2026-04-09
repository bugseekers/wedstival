import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VRScene from './VRScene';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const tamilRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const vrRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(labelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
        .fromTo(headingRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.6')
        .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.7')
        .fromTo(tamilRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' }, '-=0.5')
        .fromTo(btnsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.6')
        .fromTo(vrRef.current, { opacity: 0, scale: 0.92, x: 30 }, { opacity: 1, scale: 1, x: 0, duration: 1.6, ease: 'power3.out' }, '-=1.4');

      gsap.to(overlayRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        opacity: 0.7,
      });

      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: -80,
        opacity: 0,
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(20,20,40,0.8) 0%, transparent 50%), #080808',
      }}
    >
      {/* Depth gradient layers */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(201,168,76,0.04) 0%, transparent 50%, rgba(10,10,30,0.5) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        }}
      />

      <div
        ref={overlayRef}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, transparent 60%, #080808 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20 lg:py-32">
          {/* Left Content */}
          <div ref={contentRef} className="flex flex-col gap-8">
            <span
              ref={labelRef}
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#C9A84C',
                borderLeft: '2px solid #C9A84C',
                paddingLeft: '14px',
                opacity: 0,
              }}
            >
              Technology-Driven Wedding Experiences
            </span>

            <h1
              ref={headingRef}
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 3.8rem)',
                fontWeight: 600,
                lineHeight: 1.15,
                color: '#FFFFFF',
                opacity: 0,
              }}
            >
              Design Your Wedding{' '}
              <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Before</em>
              <br />
              It Comes to Life
            </h1>

            <p
              ref={subRef}
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                fontWeight: 300,
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.55)',
                maxWidth: '440px',
                opacity: 0,
              }}
            >
              Experience every detail of your wedding setup before your big day.
              We blend tradition with precision technology to create memories worth living.
            </p>

            <p
              ref={tamilRef}
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: '0.85rem',
                fontWeight: 300,
                color: 'rgba(201,168,76,0.6)',
                letterSpacing: '0.05em',
                opacity: 0,
              }}
            >
              உங்கள் திருமணத்தை முன்பே அனுபவிக்கலாம்
            </p>

            <div ref={btnsRef} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4" style={{ opacity: 0 }}>
              <button
                onClick={() => scrollToSection('#booking')}
                style={{
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: 'clamp(0.75rem, 1.2vw, 0.8rem)',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#080808',
                  background: 'linear-gradient(135deg, #C9A84C 0%, #D4AF6A 50%, #B8965A 100%)',
                  border: 'none',
                  padding: 'clamp(12px 20px, 2vw, 16px 36px)',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
                  flex: '1 1 auto',
                  minWidth: '140px',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(-2px)';
                  el.style.boxShadow = '0 8px 30px rgba(201,168,76,0.4)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                Book Consultation
              </button>

              <button
                onClick={() => scrollToSection('#designs')}
                style={{
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: 'clamp(0.75rem, 1.2vw, 0.8rem)',
                  fontWeight: 400,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                  background: 'transparent',
                  border: '1px solid rgba(201,168,76,0.4)',
                  padding: 'clamp(12px 20px, 2vw, 16px 36px)',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  flex: '1 1 auto',
                  minWidth: '140px',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = '#C9A84C';
                  el.style.background = 'rgba(201,168,76,0.08)';
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(201,168,76,0.4)';
                  el.style.background = 'transparent';
                  el.style.transform = 'translateY(0)';
                }}
              >
                View Designs
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 sm:gap-12 mt-4">
              {[['200+', 'Weddings'], ['15+', 'Years'], ['100%', 'Satisfaction']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.6rem', color: '#C9A84C', fontWeight: 600 }}>{num}</div>
                  <div style={{ fontFamily: '"Poppins", sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 3D VR Scene */}
          <div
            ref={vrRef}
            style={{
              height: '600px',
              position: 'relative',
              opacity: 0,
            }}
          >
            <VRScene size="hero" className="w-full h-full" />
            {/* Glow underneath headset */}
            <div style={{
              position: 'absolute',
              bottom: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '40px',
              background: 'radial-gradient(ellipse, rgba(201,168,76,0.25) 0%, transparent 70%)',
              filter: 'blur(10px)',
              pointerEvents: 'none',
            }} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0.5,
        }}
      >
        <span style={{ fontFamily: '"Poppins", sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{
          width: '1px',
          height: '50px',
          background: 'linear-gradient(to bottom, #C9A84C, transparent)',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.1); }
        }
      `}</style>
    </section>
  );
}
