import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Booking as BookingType } from '../lib/supabase';

gsap.registerPlugin(ScrollTrigger);

const weddingTypes = ['Royal', 'Traditional', 'Modern Elegant', 'Fusion', 'Other'];
const guestCounts = ['Below 100', '100–300', '300–500', '500–1000', '1000+'];

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<BookingType>({
    name: '', email: '', phone: '', wedding_date: '', wedding_type: '', guest_count: '', message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' } });
      gsap.fromTo(formRef.current, { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' } });
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (field: keyof BookingType, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const subject = encodeURIComponent(`Wedstival Consultation Request - ${form.name}`);
      const body = encodeURIComponent(
        [
          'New consultation request from Wedstival website',
          '',
          `Name: ${form.name}`,
          `Email: ${form.email}`,
          `Phone: ${form.phone}`,
          `Wedding Date: ${form.wedding_date || 'Not provided'}`,
          `Wedding Style: ${form.wedding_type || 'Not provided'}`,
          `Expected Guests: ${form.guest_count || 'Not provided'}`,
          '',
          'Additional Notes:',
          form.message || 'N/A',
        ].join('\n')
      );

      const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=thesociominds@gmail.com&su=${subject}&body=${body}`;
      const opened = window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');

      if (!opened) {
        window.location.href = `mailto:thesociominds@gmail.com?subject=${subject}&body=${body}`;
      }

      setSubmitted(true);
    } catch {
      setError('Unable to open your email app. Please email us directly at thesociominds@gmail.com.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = (field: string) => ({
    width: '100%',
    background: focused === field ? 'rgba(201,168,76,0.05)' : 'rgba(255,255,255,0.03)',
    border: `1px solid ${focused === field ? 'rgba(201,168,76,0.6)' : 'rgba(255,255,255,0.1)'}`,
    color: '#FFFFFF',
    padding: 'clamp(12px 16px, 2vw, 16px 20px)',
    fontFamily: '"Poppins", sans-serif',
    fontSize: 'clamp(0.8rem, 1.5vw, 0.875rem)',
    fontWeight: 300,
    outline: 'none',
    transition: 'all 0.3s ease',
    appearance: 'none' as const,
  });

  const labelStyle = {
    fontFamily: '"Poppins", sans-serif',
    fontSize: '0.68rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.4)',
    display: 'block',
    marginBottom: '8px',
  };

  return (
    <section
      id="booking"
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 15vw, 140px) 0',
        background: 'linear-gradient(135deg, #0a0808 0%, #080808 50%, #080a0a 100%)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.05) 0%, transparent 60%)',
      }} />

      <div className="max-w-5xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-12 lg:mb-16" style={{ opacity: 0 }}>
          <span style={{
            fontFamily: '"Poppins", sans-serif', fontSize: '0.7rem', fontWeight: 500,
            letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A84C',
          }}>
            Begin Your Journey
          </span>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
            fontWeight: 600, color: '#FFFFFF',
            lineHeight: 1.2, marginTop: '16px', marginBottom: '12px',
          }}>
            Book Your Design Experience
          </h2>
          <p style={{
            fontFamily: '"Poppins", sans-serif', fontSize: 'clamp(0.85rem, 2vw, 0.9rem)', fontWeight: 300,
            color: 'rgba(255,255,255,0.45)', lineHeight: 1.8,
          }}>
            Limited consultation slots available each month
          </p>
          {/* Urgency badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)',
            padding: '8px 20px', marginTop: '16px',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C9A84C', animation: 'blink 1.5s ease-in-out infinite' }} />
            <span style={{
              fontFamily: '"Poppins", sans-serif', fontSize: '0.72rem',
              color: '#C9A84C', letterSpacing: '0.1em',
            }}>
              Only 3 slots remaining for this month
            </span>
          </div>
        </div>

        <div ref={formRef} style={{ opacity: 0 }}>
          {submitted ? (
            <div style={{
              textAlign: 'center', padding: '80px 40px',
              background: 'rgba(201,168,76,0.05)',
              border: '1px solid rgba(201,168,76,0.25)',
            }}>
              <div style={{ marginBottom: '24px' }}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ margin: '0 auto' }}>
                  <circle cx="32" cy="32" r="30" stroke="#C9A84C" strokeWidth="1.5"/>
                  <path d="M20 33L28 41L44 24" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '16px' }}>
                Request Received
              </h3>
              <p style={{ fontFamily: '"Poppins", sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', fontWeight: 300, lineHeight: 1.8 }}>
                Thank you for reaching out. Your draft has been opened in Gmail to send to thesociominds@gmail.com.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(201,168,76,0.15)',
                padding: 'clamp(32px, 5vw, 56px)',
              }}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text" required
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      placeholder="Your name"
                      style={{ ...inputStyle('name'), display: 'block' }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input
                      type="email" required
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      placeholder="your@email.com"
                      style={{ ...inputStyle('email'), display: 'block' }}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label style={labelStyle}>Phone Number *</label>
                    <input
                      type="tel" required
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      placeholder="+91 XXXXX XXXXX"
                      style={{ ...inputStyle('phone'), display: 'block' }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Wedding Date</label>
                    <input
                      type="date"
                      value={form.wedding_date}
                      onChange={(e) => handleChange('wedding_date', e.target.value)}
                      onFocus={() => setFocused('wedding_date')}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle('wedding_date'), display: 'block', colorScheme: 'dark' }}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label style={labelStyle}>Wedding Style</label>
                    <select
                      value={form.wedding_type}
                      onChange={(e) => handleChange('wedding_type', e.target.value)}
                      onFocus={() => setFocused('wedding_type')}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle('wedding_type'), display: 'block', cursor: 'pointer' }}
                    >
                      <option value="" style={{ background: '#111' }}>Select style</option>
                      {weddingTypes.map((t) => (
                        <option key={t} value={t} style={{ background: '#111' }}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Expected Guests</label>
                    <select
                      value={form.guest_count}
                      onChange={(e) => handleChange('guest_count', e.target.value)}
                      onFocus={() => setFocused('guest_count')}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle('guest_count'), display: 'block', cursor: 'pointer' }}
                    >
                      <option value="" style={{ background: '#111' }}>Select range</option>
                      {guestCounts.map((g) => (
                        <option key={g} value={g} style={{ background: '#111' }}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label style={labelStyle}>Additional Notes</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell us about your dream wedding..."
                    style={{ ...inputStyle('message'), display: 'block', resize: 'vertical', minHeight: '120px' }}
                  />
                </div>

                {error && (
                  <p style={{ fontFamily: '"Poppins", sans-serif', fontSize: '0.82rem', color: '#e57373', marginBottom: '20px' }}>
                    {error}
                  </p>
                )}

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      fontFamily: '"Poppins", sans-serif', fontSize: '0.8rem', fontWeight: 500,
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      color: submitting ? 'rgba(8,8,8,0.6)' : '#080808',
                      background: 'linear-gradient(135deg, #C9A84C 0%, #D4AF6A 50%, #B8965A 100%)',
                      border: 'none', padding: '18px 56px', cursor: submitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.4s ease',
                      clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                    }}
                    onMouseEnter={(e) => {
                      if (!submitting) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 12px 40px rgba(201,168,76,0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {submitting ? 'Submitting...' : 'Request Consultation'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        input::placeholder, textarea::placeholder {
          color: rgba(255,255,255,0.2);
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.7) sepia(1) saturate(2) hue-rotate(5deg);
          opacity: 0.6;
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}
