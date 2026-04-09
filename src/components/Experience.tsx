import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VRScene from './VRScene';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 1.4, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        }
      );
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 1.4, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const highlights = [
    'Walk through your mandap before it is built',
    'Adjust florals, drapes, and lighting in real time',
    'Share the experience with family remotely',
    'Approve with full confidence, zero surprises',
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        padding: '140px 0',
        background: 'linear-gradient(135deg, #0c0c0c 0%, #0a0808 50%, #0c0a08 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
      }} />

      {/* Background radial glow */}
      <div style={{
        position: 'absolute', top: '50%', right: '-10%', transform: 'translateY(-50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            <span style={{
              fontFamily: '"Poppins", sans-serif', fontSize: '0.7rem', fontWeight: 500,
              letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A84C',
            }}>
              The Experience
            </span>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
              fontWeight: 600, color: '#FFFFFF',
              lineHeight: 1.2, marginTop: '16px', marginBottom: '20px',
            }}>
              Experience Before<br />
              <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Commitment</em>
            </h2>
            <p style={{
              fontFamily: '"Poppins", sans-serif', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', fontWeight: 300,
              lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', marginBottom: '32px', maxWidth: '460px',
            }}>
              We don't ask you to imagine. We let you experience your entire wedding setup —
              the mandap, the florals, the lighting, the stage — before a single element is placed.
              This is not a presentation. This is your wedding, previewed.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
              {highlights.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '24px', height: '24px', minWidth: '24px', marginTop: '2px',
                    border: '1px solid rgba(201,168,76,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(201,168,76,0.08)',
                  }}>
                    <svg width="10" height="8" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5L4.5 8.5L11 1.5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{
                    fontFamily: '"Poppins", sans-serif', fontSize: 'clamp(0.8rem, 1.5vw, 0.85rem)',
                    color: 'rgba(255,255,255,0.65)', fontWeight: 300, lineHeight: 1.5,
                  }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                fontFamily: '"Poppins", sans-serif', fontSize: 'clamp(0.7rem, 1.2vw, 0.78rem)', fontWeight: 500,
                letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C',
                background: 'transparent', border: '1px solid rgba(201,168,76,0.5)',
                padding: 'clamp(10px 20px, 2vw, 14px 32px)', cursor: 'pointer', transition: 'all 0.4s ease',
                width: '100%', maxWidth: '280px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(201,168,76,0.1)';
                e.currentTarget.style.borderColor = '#C9A84C';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Schedule a Preview Session
            </button>
          </div>

          {/* Right — 3D VR Visual */}
          <div ref={rightRef} style={{ height: 'clamp(320px, 50vw, 540px)', opacity: 0, position: 'relative' }}>
            <VRScene size="hero" className="w-full h-full" />
            <div style={{
              position: 'absolute', bottom: '15%', left: '50%',
              transform: 'translateX(-50%)',
              width: '70%', height: '30px',
              background: 'radial-gradient(ellipse, rgba(201,168,76,0.2) 0%, transparent 70%)',
              filter: 'blur(12px)', pointerEvents: 'none',
            }} />
            {/* Floating label */}
            <div style={{
              position: 'absolute', bottom: '8%', left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}>
              <span style={{
                fontFamily: '"Poppins", sans-serif', fontSize: 'clamp(0.6rem, 1.2vw, 0.65rem)',
                letterSpacing: '0.2em', color: 'rgba(201,168,76,0.6)', textTransform: 'uppercase',
              }}>
                Immersive Pre-Visualization
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
