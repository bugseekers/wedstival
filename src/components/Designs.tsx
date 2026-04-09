import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const designs = [
  {
    category: 'Royal',
    title: 'Maharaja Heritage',
    description: 'Opulent mandaps, regal floral canopies, gold-threaded drapes',
    image: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800',
    span: 'col-span-2',
  },
  {
    category: 'Traditional',
    title: 'Tamil Maangalyam',
    description: 'Sacred banana leaf arrangements, kolam artistry, brass vessel decor',
    image: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800',
    span: 'col-span-1',
  },
  {
    category: 'Modern Elegant',
    title: 'Ethereal Whites',
    description: 'Minimalist luxury with cascading blooms and subtle metallics',
    image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800',
    span: 'col-span-1',
  },
  {
    category: 'Royal',
    title: 'Garden Royale',
    description: 'Lush outdoor setups with velvet drapes and ambient lighting',
    image: 'https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg?auto=compress&cs=tinysrgb&w=800',
    span: 'col-span-1',
  },
  {
    category: 'Modern Elegant',
    title: 'Celestial Noir',
    description: 'Dark romantic aesthetics with starlight installations',
    image: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=800',
    span: 'col-span-2',
  },
];

export default function Designs() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      const cards = gridRef.current?.querySelectorAll('.design-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 1, ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: gridRef.current, start: 'top 75%' },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const categories = ['All', 'Royal', 'Traditional', 'Modern Elegant'];

  return (
    <section
      id="designs"
      ref={sectionRef}
      style={{ padding: '120px 0', background: '#080808', position: 'relative' }}
    >
      {/* Background accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
      }} />

      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="mb-16" style={{ opacity: 0 }}>
          <span style={{
            fontFamily: '"Poppins", sans-serif', fontSize: '0.7rem', fontWeight: 500,
            letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A84C',
          }}>
            Our Portfolio
          </span>
          <h2 style={{
            fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 600, color: '#FFFFFF', marginTop: '16px', marginBottom: '24px',
            lineHeight: 1.2,
          }}>
            Signature Wedding Designs
          </h2>
          <div className="flex flex-wrap gap-3 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                style={{
                  fontFamily: '"Poppins", sans-serif', fontSize: '0.72rem', fontWeight: 400,
                  letterSpacing: '0.1em', color: cat === 'All' ? '#080808' : 'rgba(255,255,255,0.5)',
                  background: cat === 'All' ? '#C9A84C' : 'transparent',
                  border: '1px solid',
                  borderColor: cat === 'All' ? '#C9A84C' : 'rgba(255,255,255,0.15)',
                  padding: '8px 20px', cursor: 'pointer', transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (cat !== 'All') {
                    e.currentTarget.style.borderColor = '#C9A84C';
                    e.currentTarget.style.color = '#C9A84C';
                  }
                }}
                onMouseLeave={(e) => {
                  if (cat !== 'All') {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-3 gap-4"
        >
          {designs.map((design, i) => (
            <div
              key={i}
              className={`design-card ${design.span}`}
              style={{
                position: 'relative',
                height: i === 0 || i === 4 ? '420px' : '340px',
                overflow: 'hidden',
                cursor: 'pointer',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('.design-img') as HTMLElement;
                const overlay = e.currentTarget.querySelector('.design-overlay') as HTMLElement;
                const info = e.currentTarget.querySelector('.design-info') as HTMLElement;
                if (img) img.style.transform = 'scale(1.08)';
                if (overlay) overlay.style.opacity = '1';
                if (info) info.style.transform = 'translateY(0)';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('.design-img') as HTMLElement;
                const overlay = e.currentTarget.querySelector('.design-overlay') as HTMLElement;
                const info = e.currentTarget.querySelector('.design-info') as HTMLElement;
                if (img) img.style.transform = 'scale(1)';
                if (overlay) overlay.style.opacity = '0';
                if (info) info.style.transform = 'translateY(10px)';
              }}
            >
              <img
                className="design-img"
                src={design.image}
                alt={design.title}
                loading="lazy"
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.3) 50%, transparent 100%)',
              }} />
              <div
                className="design-overlay"
                style={{
                  position: 'absolute', inset: 0, opacity: 0, transition: 'opacity 0.5s ease',
                  background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(201,168,76,0.08) 100%)',
                  boxShadow: 'inset 0 0 0 1px rgba(201,168,76,0.3)',
                }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px' }}>
                <span style={{
                  fontFamily: '"Poppins", sans-serif', fontSize: '0.62rem', fontWeight: 500,
                  letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C',
                  background: 'rgba(201,168,76,0.12)', padding: '4px 10px',
                  border: '1px solid rgba(201,168,76,0.3)',
                }}>
                  {design.category}
                </span>
                <div
                  className="design-info"
                  style={{ transform: 'translateY(10px)', transition: 'transform 0.5s ease', marginTop: '12px' }}
                >
                  <h3 style={{
                    fontFamily: '"Playfair Display", serif', fontSize: '1.25rem',
                    fontWeight: 600, color: '#FFFFFF', marginBottom: '6px',
                  }}>
                    {design.title}
                  </h3>
                  <p style={{
                    fontFamily: '"Poppins", sans-serif', fontSize: '0.78rem',
                    color: 'rgba(255,255,255,0.55)', fontWeight: 300,
                  }}>
                    {design.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
