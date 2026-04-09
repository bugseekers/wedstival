export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#040404',
      borderTop: '1px solid rgba(201,168,76,0.12)',
      padding: 'clamp(40px, 10vw, 80px) 0 clamp(24px, 5vw, 40px)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
      }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Brand Statement */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 10vw, 64px)' }}>
          <p style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.1rem, 2.5vw, 2rem)',
            fontStyle: 'italic',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.5,
          }}>
            "We don't just design weddings.{' '}
            <em style={{ color: '#C9A84C' }}>We engineer them.</em>"
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontFamily: '"Playfair Display", serif', fontSize: '1.4rem',
                fontWeight: 600, color: '#C9A84C', letterSpacing: '0.05em',
              }}>
                Vivaha Vizha
              </div>
              <div style={{
                fontFamily: '"Poppins", sans-serif', fontSize: '0.62rem',
                fontWeight: 300, color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: '4px',
              }}>
                Tamil Nadu, India
              </div>
            </div>
            <p style={{
              fontFamily: '"Poppins", sans-serif', fontSize: '0.82rem',
              fontWeight: 300, color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.9, maxWidth: '320px',
            }}>
              A technology-driven wedding design company crafting extraordinary celebrations
              across Tamil Nadu. Every wedding we design is first experienced, then executed.
            </p>
            <p style={{
              fontFamily: '"Poppins", sans-serif', fontSize: '0.8rem',
              fontWeight: 300, color: 'rgba(201,168,76,0.5)',
              marginTop: '16px', letterSpacing: '0.04em',
            }}>
              உங்கள் திருமணத்தை முன்பே அனுபவிக்கலாம்
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontFamily: '"Poppins", sans-serif', fontSize: '0.68rem',
              fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#C9A84C', marginBottom: '24px',
            }}>
              Explore
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                ['#designs', 'Wedding Designs'],
                ['#experience', 'The Experience'],
                ['#technology', 'Our Technology'],
                ['#process', 'Our Process'],
                ['#booking', 'Book a Consultation'],
              ].map(([href, label]) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  style={{
                    fontFamily: '"Poppins", sans-serif', fontSize: '0.82rem',
                    fontWeight: 300, color: 'rgba(255,255,255,0.4)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', padding: 0, transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A84C'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: '"Poppins", sans-serif', fontSize: '0.68rem',
              fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#C9A84C', marginBottom: '24px',
            }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                ['hello@vivahavizha.in', 'Email'],
                ['+91 98400 00000', 'Phone'],
                ['Chennai · Coimbatore · Madurai', 'Locations'],
              ].map(([value, label]) => (
                <div key={label}>
                  <div style={{
                    fontFamily: '"Poppins", sans-serif', fontSize: '0.65rem',
                    letterSpacing: '0.15em', color: 'rgba(201,168,76,0.5)',
                    textTransform: 'uppercase', marginBottom: '4px',
                  }}>
                    {label}
                  </div>
                  <div style={{
                    fontFamily: '"Poppins", sans-serif', fontSize: '0.82rem',
                    color: 'rgba(255,255,255,0.4)', fontWeight: 300,
                  }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 'clamp(20px, 5vw, 32px)',
          display: 'flex', flexWrap: 'wrap', flexDirection: 'column-reverse',
          justifyContent: 'space-between', alignItems: 'center', gap: 'clamp(12px, 3vw, 16px)',
        }}>
          <span style={{
            fontFamily: '"Poppins", sans-serif', fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.2)', fontWeight: 300,
          }}>
            © 2024 Vivaha Vizha. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 'clamp(12px, 3vw, 24px)' }}>
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: '"Poppins", sans-serif', fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.2)'; }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
