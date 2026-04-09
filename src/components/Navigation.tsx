import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Designs', href: '#designs' },
  { label: 'Experience', href: '#experience' },
  { label: 'Technology', href: '#technology' },
  { label: 'Process', href: '#process' },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.5 }
    );

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        background: scrolled ? 'rgba(8,8,8,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 md:py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col">
          <span
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              fontWeight: 600,
              color: '#C9A84C',
              letterSpacing: '0.05em',
            }}
          >
            Wedstival
          </span>
          <span
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontSize: '0.5rem',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Tamil Nadu
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: '0.8rem',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#C9A84C')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)')}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          onClick={() => scrollTo('#booking')}
          className="hidden md:block"
          style={{
            fontFamily: '"Poppins", sans-serif',
            fontSize: '0.75rem',
            fontWeight: 500,
            color: '#080808',
            background: 'linear-gradient(135deg, #C9A84C 0%, #D4AF6A 100%)',
            border: 'none',
            padding: '10px 24px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.transform = 'scale(1.04)';
            (e.target as HTMLElement).style.boxShadow = '0 0 20px rgba(201,168,76,0.4)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.transform = 'scale(1)';
            (e.target as HTMLElement).style.boxShadow = 'none';
          }}
        >
          Book Now
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {mobileOpen ? (
            <X size={24} color="#C9A84C" />
          ) : (
            <Menu size={24} color="#C9A84C" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 right-0"
          style={{
            background: 'rgba(8,8,8,0.98)',
            borderBottom: '1px solid rgba(201,168,76,0.15)',
            backdropFilter: 'blur(20px)',
            opacity: 0,
          }}
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.6)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '10px 0',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#C9A84C')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)')}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#booking')}
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#080808',
                background: 'linear-gradient(135deg, #C9A84C 0%, #D4AF6A 100%)',
                border: 'none',
                padding: '14px 20px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                marginTop: '8px',
                clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
              }}
            >
              Book Consultation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
