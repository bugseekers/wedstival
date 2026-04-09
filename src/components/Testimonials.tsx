import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Walking through our mandap virtually before the wedding changed everything. We adjusted the lighting three times and the floral drape color twice — and on the actual day, it was exactly as we had envisioned. No surprises, only joy.",
    name: "Priya & Karthik Rajan",
    location: "Chennai",
    wedding: "Royal Brahmin Wedding",
    image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    quote: "I never thought I could feel emotional during a planning session. But when I stepped into the virtual space they had created and saw my parents' face lit up — I knew this was not just a service. It was something extraordinary.",
    name: "Deepa & Surya Narayanan",
    location: "Coimbatore",
    wedding: "Traditional Mudaliar Ceremony",
    image: "https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    quote: "We had a very specific aesthetic in mind — modern minimalist with traditional undertones. They nailed every single element. The precision of execution matched the digital preview perfectly. Our guests couldn't stop asking who designed it.",
    name: "Ananya & Vikram Menon",
    location: "Madurai",
    wedding: "Modern Elegant Fusion",
    image: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    quote: "The experience was unlike anything we expected. We sat with our family abroad on a video call and gave approvals together in real time. It brought everyone into the planning process despite the distance.",
    name: "Meera & Arun Krishnamurthy",
    location: "Trichy",
    wedding: "Grand Royal Setup",
    image: "https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

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
      gsap.fromTo(
        sliderRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sliderRef.current, start: 'top 80%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const goTo = (index: number) => {
    const newIndex = (index + testimonials.length) % testimonials.length;
    gsap.to(sliderRef.current, {
      opacity: 0, x: index > active ? -20 : 20, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        setActive(newIndex);
        gsap.fromTo(sliderRef.current,
          { opacity: 0, x: index > active ? 20 : -20 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
        );
      },
    });
  };

  const t = testimonials[active];

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 15vw, 140px) 0',
        background: '#080808',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
      }} />

      {/* Background quote mark */}
      <div style={{
        position: 'absolute', top: '10%', left: '5%',
        fontFamily: '"Playfair Display", serif', fontSize: '20rem',
        color: 'rgba(201,168,76,0.03)', lineHeight: 1, pointerEvents: 'none',
        userSelect: 'none',
      }}>
        "
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16 lg:mb-20" style={{ opacity: 0 }}>
          <span style={{
            fontFamily: '"Poppins", sans-serif', fontSize: '0.7rem', fontWeight: 500,
            letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A84C',
          }}>
            Client Stories
          </span>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
            fontWeight: 600, color: '#FFFFFF',
            lineHeight: 1.2, marginTop: '16px',
          }}>
            Words from Our Couples
          </h2>
        </div>

        <div ref={sliderRef} style={{ opacity: 0 }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(201,168,76,0.15)',
            backdropFilter: 'blur(20px)',
            padding: 'clamp(32px, 5vw, 60px)',
            position: 'relative',
            maxWidth: '860px',
            margin: '0 auto',
          }}>
            {/* Corner accents */}
            {[['top:0', 'left:0', 'borderTop:2px solid', 'borderLeft:2px solid'],
              ['top:0', 'right:0', 'borderTop:2px solid', 'borderRight:2px solid'],
              ['bottom:0', 'left:0', 'borderBottom:2px solid', 'borderLeft:2px solid'],
              ['bottom:0', 'right:0', 'borderBottom:2px solid', 'borderRight:2px solid']].map((_, ci) => (
              <div key={ci} style={{
                position: 'absolute',
                top: ci < 2 ? 0 : 'auto', bottom: ci >= 2 ? 0 : 'auto',
                left: ci % 2 === 0 ? 0 : 'auto', right: ci % 2 === 1 ? 0 : 'auto',
                width: '30px', height: '30px',
                borderTop: ci < 2 ? '1px solid rgba(201,168,76,0.5)' : 'none',
                borderBottom: ci >= 2 ? '1px solid rgba(201,168,76,0.5)' : 'none',
                borderLeft: ci % 2 === 0 ? '1px solid rgba(201,168,76,0.5)' : 'none',
                borderRight: ci % 2 === 1 ? '1px solid rgba(201,168,76,0.5)' : 'none',
              }} />
            ))}

            <div style={{
              fontFamily: '"Playfair Display", serif', fontSize: '3rem',
              color: '#C9A84C', lineHeight: 0.5, marginBottom: '28px', opacity: 0.6,
            }}>
              "
            </div>

            <p style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              fontWeight: 400, fontStyle: 'italic',
              color: 'rgba(255,255,255,0.85)', lineHeight: 1.8,
              marginBottom: '40px',
            }}>
              {t.quote}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img
                src={t.image}
                alt={t.name}
                style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid rgba(201,168,76,0.4)',
                }}
              />
              <div>
                <div style={{
                  fontFamily: '"Playfair Display", serif', fontSize: '1.05rem',
                  fontWeight: 600, color: '#FFFFFF',
                }}>
                  {t.name}
                </div>
                <div style={{
                  fontFamily: '"Poppins", sans-serif', fontSize: '0.72rem',
                  color: '#C9A84C', fontWeight: 400, marginTop: '3px',
                }}>
                  {t.wedding} · {t.location}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', marginTop: '40px' }}>
            <button
              onClick={() => goTo(active - 1)}
              style={{
                width: '44px', height: '44px',
                border: '1px solid rgba(201,168,76,0.3)',
                background: 'transparent', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#C9A84C', transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(201,168,76,0.1)';
                e.currentTarget.style.borderColor = '#C9A84C';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: i === active ? '28px' : '8px',
                    height: '4px',
                    background: i === active ? '#C9A84C' : 'rgba(255,255,255,0.2)',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.4s ease',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => goTo(active + 1)}
              style={{
                width: '44px', height: '44px',
                border: '1px solid rgba(201,168,76,0.3)',
                background: 'transparent', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(201,168,76,0.1)';
                e.currentTarget.style.borderColor = '#C9A84C';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
