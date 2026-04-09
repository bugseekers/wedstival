import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Understand Your Vision',
    description: 'We begin with deep listening. Your dreams, your family traditions, your aesthetic preferences — every detail shapes the blueprint.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 8C12 8 9 11 9 15C9 19 12 22 16 22C20 22 23 19 23 15C23 11 20 8 16 8Z" stroke="#C9A84C" strokeWidth="1.2"/>
        <path d="M16 15V11M16 15L19 18" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M9 27C10.5 24.5 13 23 16 23C19 23 21.5 24.5 23 27" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Design & Preview',
    description: 'Our team builds your complete wedding environment in immersive 3D. Walk through it, refine it, and approve it with total confidence.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="5" y="9" width="22" height="14" rx="2" stroke="#C9A84C" strokeWidth="1.2"/>
        <path d="M12 9V7M20 9V7" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="13" cy="16" r="2" stroke="#C9A84C" strokeWidth="1.2"/>
        <circle cx="19" cy="16" r="2" stroke="#C9A84C" strokeWidth="1.2"/>
        <path d="M15 16H17" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Execute Flawlessly',
    description: 'With your approved design as the blueprint, our team executes with military precision. What you saw is what you get.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 17L13 22L24 11" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="16" cy="16" r="11" stroke="#C9A84C" strokeWidth="1.2"/>
      </svg>
    ),
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
        }
      );

      const stepEls = stepsRef.current?.querySelectorAll('.process-step');
      if (stepEls) {
        gsap.fromTo(
          stepEls,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: { trigger: stepsRef.current, start: 'top 75%' },
          }
        );
      }

      const line = sectionRef.current?.querySelector('.process-line');
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 1.8, ease: 'power2.inOut',
            scrollTrigger: { trigger: stepsRef.current, start: 'top 70%' },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 15vw, 140px) 0',
        background: 'linear-gradient(180deg, #0c0a08 0%, #080808 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
      }} />

      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16 lg:mb-20" style={{ opacity: 0 }}>
          <span style={{
            fontFamily: '"Poppins", sans-serif', fontSize: '0.7rem', fontWeight: 500,
            letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A84C',
          }}>
            How It Works
          </span>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
            fontWeight: 600, color: '#FFFFFF',
            lineHeight: 1.2, marginTop: '16px',
          }}>
            Our Process
          </h2>
        </div>

        <div ref={stepsRef} style={{ position: 'relative' }}>
          {/* Connecting line */}
          <div style={{
            position: 'absolute', top: '60px', left: '16.67%', right: '16.67%',
            height: '1px',
            background: 'linear-gradient(90deg, rgba(201,168,76,0.15), rgba(201,168,76,0.5), rgba(201,168,76,0.15))',
            display: 'none',
          }} className="process-line lg:block" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <div
                key={i}
                className="process-step"
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  textAlign: 'center', opacity: 0,
                }}
              >
                <div style={{
                  width: 'clamp(70px, 15vw, 90px)', height: 'clamp(70px, 15vw, 90px)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
                  marginBottom: 'clamp(20px, 5vw, 32px)', position: 'relative',
                  transition: 'all 0.4s ease',
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#C9A84C';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(201,168,76,0.2)';
                    e.currentTarget.style.background = 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)';
                  }}
                >
                  {step.icon}
                  <span style={{
                    position: 'absolute', top: '-10px', right: '-10px',
                    fontFamily: '"Playfair Display", serif', fontSize: '0.85rem',
                    fontWeight: 700, color: '#C9A84C',
                    background: '#080808', padding: '2px 6px',
                    border: '1px solid rgba(201,168,76,0.3)',
                  }}>
                    {step.number}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                  fontWeight: 600, color: '#FFFFFF', marginBottom: '12px',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: '"Poppins", sans-serif', fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
                  fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8,
                  maxWidth: '280px',
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
