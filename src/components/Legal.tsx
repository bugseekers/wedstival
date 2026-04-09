import type { CSSProperties } from 'react';

export default function Legal() {
  const cardStyle: CSSProperties = {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(201,168,76,0.16)',
    padding: 'clamp(24px, 4vw, 36px)',
  };

  const headingStyle: CSSProperties = {
    fontFamily: '"Playfair Display", serif',
    fontSize: 'clamp(1.2rem, 2.8vw, 2rem)',
    color: '#FFFFFF',
    marginBottom: '14px',
    lineHeight: 1.25,
  };

  const textStyle: CSSProperties = {
    fontFamily: '"Poppins", sans-serif',
    fontSize: 'clamp(0.8rem, 1.5vw, 0.86rem)',
    color: 'rgba(255,255,255,0.56)',
    lineHeight: 1.8,
    fontWeight: 300,
  };

  return (
    <section
      style={{
        padding: 'clamp(70px, 10vw, 110px) 0',
        background: '#060606',
        borderTop: '1px solid rgba(201,168,76,0.12)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div id="privacy-policy" style={cardStyle}>
          <h3 style={headingStyle}>Privacy Policy</h3>
          <p style={textStyle}>
            Wedstival collects only the details you provide through our website forms, including name, email,
            phone number, wedding information, and message content. This information is used solely to respond
            to your inquiry, schedule consultations, and provide our design services.
          </p>
          <p style={{ ...textStyle, marginTop: '12px' }}>
            We do not sell your data. Your information is shared only with internal team members who handle your
            request. For updates, corrections, or data removal requests, contact us at thesociominds@gmail.com.
          </p>
        </div>

        <div id="terms-and-conditions" style={cardStyle}>
          <h3 style={headingStyle}>Terms and Conditions</h3>
          <p style={textStyle}>
            By using the Wedstival website and submitting consultation requests, you confirm that the information
            provided is accurate and that you authorize us to contact you regarding your event.
          </p>
          <p style={{ ...textStyle, marginTop: '12px' }}>
            All concepts, visual previews, and design proposals shared by Wedstival remain intellectual property
            of Wedstival unless otherwise agreed in writing. Final timelines, deliverables, and pricing are
            confirmed only through official project agreements.
          </p>
        </div>
      </div>
    </section>
  );
}
