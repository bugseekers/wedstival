import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L25 9V19L14 25L3 19V9L14 3Z" stroke="#C9A84C" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M14 3V25M3 9L25 9M3 19L25 19" stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.4"/>
      </svg>
    ),
    title: 'Precision 3D Stage Planning',
    description: 'Every centimeter of your wedding space is mapped with architectural accuracy before execution begins.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#C9A84C" strokeWidth="1.2"/>
        <path d="M9 14C9 11.24 11.24 9 14 9C16.76 9 19 11.24 19 14" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="3" stroke="#C9A84C" strokeWidth="1.2"/>
        <path d="M4 14H6M22 14H24M14 4V6M14 22V24" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Realistic Pre-Execution Visualization',
    description: 'Step inside your wedding setup virtually. See the flowers, the light, the atmosphere — all before the actual day.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="9" height="9" rx="1" stroke="#C9A84C" strokeWidth="1.2"/>
        <rect x="15" y="4" width="9" height="9" rx="1" stroke="#C9A84C" strokeWidth="1.2"/>
        <rect x="4" y="15" width="9" height="9" rx="1" stroke="#C9A84C" strokeWidth="1.2"/>
        <rect x="15" y="15" width="9" height="9" rx="1" stroke="#C9A84C" strokeWidth="1.2"/>
      </svg>
    ),
    title: 'Detail-Level Customization',
    description: 'Change floral arrangements, drape colors, stage height, and lighting atmosphere until it feels exactly right.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 22L14 6L22 22" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 17H19" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="14" cy="22" r="1.5" fill="#C9A84C" fillOpacity="0.4" stroke="#C9A84C" strokeWidth="0.6"/>
      </svg>
    ),
    title: 'Seamless Design-to-Execution',
    description: 'Your approved visualization becomes the precise blueprint our team follows. No guesswork, no surprises.',
  },
];

export default function Technology() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
      const cards = cardsRef.current?.querySelectorAll('.tech-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technology"
      ref={sectionRef}
      style={{ padding: 'clamp(80px, 15vw, 140px) 0', background: '#080808', position: 'relative' }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 60%)',
      }} />

      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16 lg:mb-20" style={{ opacity: 0 }}>
          <span style={{
            fontFamily: '"Poppins", sans-serif', fontSize: '0.7rem', fontWeight: 500,
            letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A84C',
          }}>
            Our Edge
          </span>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
            fontWeight: 600, color: '#FFFFFF',
            lineHeight: 1.2, marginTop: '16px', marginBottom: '12px',
          }}>
            Built on Advanced Design Technology
          </h2>
          <p style={{
            fontFamily: '"Poppins", sans-serif', fontSize: 'clamp(0.85rem, 2vw, 0.9rem)', fontWeight: 300,
            color: 'rgba(255,255,255,0.45)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8,
          }}>
            Where centuries of wedding tradition meet the precision of modern design systems
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <div
              key={i}
              className="tech-card"
              style={{
                padding: '36px 28px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.5s ease',
                cursor: 'default',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = 'rgba(201,168,76,0.05)';
                el.style.borderColor = 'rgba(201,168,76,0.3)';
                el.style.transform = 'translateY(-6px)';
                el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.2)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = 'rgba(255,255,255,0.03)';
                el.style.borderColor = 'rgba(255,255,255,0.08)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Corner accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0,
                width: '40px', height: '40px',
                borderTop: '2px solid rgba(201,168,76,0.4)',
                borderLeft: '2px solid rgba(201,168,76,0.4)',
              }} />
              <div style={{
                position: 'absolute', bottom: 0, right: 0,
                width: '40px', height: '40px',
                borderBottom: '2px solid rgba(201,168,76,0.2)',
                borderRight: '2px solid rgba(201,168,76,0.2)',
              }} />

              <div style={{ marginBottom: '24px' }}>{feature.icon}</div>
              <h3 style={{
                fontFamily: '"Playfair Display", serif', fontSize: '1.1rem',
                fontWeight: 600, color: '#FFFFFF', marginBottom: '14px', lineHeight: 1.3,
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontFamily: '"Poppins", sans-serif', fontSize: '0.82rem',
                fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8,
              }}>
                {feature.description}
              </p>

              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)',
                opacity: 0, transition: 'opacity 0.3s',
              }} className="card-bottom-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
