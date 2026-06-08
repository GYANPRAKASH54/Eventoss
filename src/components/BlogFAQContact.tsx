'use client';

import { useState } from 'react';
import { ChevronDown, Send, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BlogFAQContact() {
  // FAQ Accordion State
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#6C5CE7', '#D4AF37'],
    });

    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setMsg('');
    }, 4000);
  };

  const blogPosts = [
    {
      title: 'Staging Trends for 2026',
      excerpt: 'How projection mapping is replacing traditional canvas drapery in luxury galas.',
      category: 'Production',
      date: 'May 14, 2026',
      img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Fairytale Wedding Acoustics',
      excerpt: 'Architecting crystal-clear sound designs for outdoor high-canopy glass domes.',
      category: 'Weddings',
      date: 'Jun 02, 2026',
      img: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Heavy Truss Staging Logistics',
      excerpt: 'What goes behind rigging multi-ton setups for arena concert tours.',
      category: 'Technology',
      date: 'Jun 06, 2026',
      img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const faqs = [
    {
      q: 'How far in advance do we need to reserve the staging blueprint?',
      a: 'For mid-scale galas and weddings, we recommend locking the staging blueprints 3 to 6 months in advance. Arena concerts require a minimum of 6 months lead time for proper structural permit staging.',
    },
    {
      q: 'Can we interactively customize the 3D stage setup in real-time?',
      a: 'Yes! Once you initiate a project consultation, our scenographers provide an interactive 3D portal link. You can toggle staging trusses, floral shapes, and LED screen sizes on your computer or VR headset.',
    },
    {
      q: 'Do you handle the permit licensing for drone light shows and laser displays?',
      a: 'Absolutely. Eventoss provides end-to-end management, which includes securing FAA approvals for drone flights, coordinating local flight maps, and obtaining FDA laser safety permits.',
    },
    {
      q: 'What happens if we need to modify our guest scale last minute?',
      a: 'Our modular structural trusses allow us to scale layouts up or down. Minor guest seat adjustments can be handled up to 14 days prior to the event installation date.',
    },
  ];

  return (
    <>
      {/* Blog Section */}
      <section id="blog" className="section-padding" style={{ background: 'var(--bg-deep)', position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: 'var(--gold)', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
              Insights & News
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-light)', marginTop: '8px' }}>
              Staging & Event <span className="gradient-text-gold">Journals</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {blogPosts.map((post, idx) => (
              <div
                key={idx}
                className="glass-panel clickable"
                style={{ borderRadius: '16px', overflow: 'hidden' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--purple)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'var(--border-glass)';
                }}
              >
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(2,2,8,0.85)',
                      fontSize: '0.7rem',
                      color: 'var(--gold)',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '20px',
                    }}
                  >
                    {post.category}
                  </span>
                </div>
                <div style={{ padding: '24px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{post.date}</span>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-light)', fontWeight: 600, marginTop: '8px' }}>{post.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.4 }}>
                    {post.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding" style={{ background: 'var(--bg-deep)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: 'var(--purple)', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
              Common Queries
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-light)', marginTop: '8px' }}>
              Frequently Asked <span className="gradient-text-purple-cyan">Questions</span>
            </h2>
          </div>

          <div style={{ maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '20px 24px',
                  border: openFAQ === idx ? '1px solid rgba(108, 92, 231, 0.4)' : '1px solid var(--border-glass)',
                  transition: 'border-color 0.3s',
                }}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="clickable"
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left',
                    color: 'var(--text-light)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'none',
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: openFAQ === idx ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.3s',
                      color: openFAQ === idx ? 'var(--purple)' : 'var(--text-muted)',
                    }}
                  />
                </button>

                {openFAQ === idx && (
                  <p
                    style={{
                      marginTop: '12px',
                      color: 'var(--text-muted)',
                      fontSize: '0.85rem',
                      lineHeight: 1.5,
                      borderTop: '1px solid var(--border-glass)',
                      paddingTop: '12px',
                    }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding" style={{ background: 'var(--bg-deep)', position: 'relative' }}>
        <div className="container">
          <div
            className="contact-layout"
            style={{
              alignItems: 'start',
            }}
          >
            {/* Info Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', marginBottom: '40px' }}>
              <div>
                <span style={{ color: 'var(--gold)', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
                  Get In Touch
                </span>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-light)', marginTop: '8px' }}>
                  Let's Create Something <span className="gradient-text-gold">Historic</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '16px', lineHeight: 1.6 }}>
                  Direct inquiries regarding venue bookings, concert technical staging, and private blueprints. Let's start the design session.
                </p>
              </div>

              {/* Contacts info list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 600 }}>Staging HQ Office</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>Bihar, Jharkhand & Delhi NCR</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', color: 'var(--purple)' }}>
                    <Phone size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 600 }}>Hotline Routing</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>+91 7061528401</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', color: 'var(--cyan)' }}>
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 600 }}>Electronic Inquiries</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>info@eventoss.in</p>
                  </div>
                </div>
              </div>

              {/* Socials & WhatsApp */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a
                    href="https://wa.me/917061528401"
                    target="_blank"
                    rel="noreferrer"
                    className="glass-btn clickable"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      borderColor: 'rgba(37, 211, 102, 0.4)',
                      background: 'rgba(37, 211, 102, 0.05)',
                      color: '#25D366',
                    }}
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp Direct</span>
                  </a>
                </div>

                {/* Inline SVG Social Icons */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {[
                    {
                      name: 'facebook',
                      link: 'https://www.facebook.com/eventoss4/',
                      svg: (
                        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      ),
                    },
                    {
                      name: 'twitter',
                      link: 'https://twitter.com/eventoss',
                      svg: (
                        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                      ),
                    },
                    {
                      name: 'youtube',
                      link: 'https://www.youtube.com/channel/UCqFiPY10An7YcC6XV9pgZCQ',
                      svg: (
                        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                        </svg>
                      ),
                    },
                    {
                      name: 'linkedin',
                      link: 'https://www.linkedin.com/company/eventoss-entertainment-pvt-ltd/',
                      svg: (
                        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      ),
                    },
                    {
                      name: 'instagram',
                      link: 'https://www.instagram.com/eventossofficial/',
                      svg: (
                        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      ),
                    },
                    {
                      name: 'googleplus',
                      link: 'https://maps.google.com/?q=Eventoss+Entertainment+Pvt+Ltd',
                      svg: (
                        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10 11H5.5c-2 0-3.5 1.5-3.5 3.5s1.5 3.5 3.5 3.5c2.5 0 3.5-1.5 3.5-3.5v-1" />
                          <path d="M14 12h6" />
                          <path d="M17 9v6" />
                        </svg>
                      ),
                    },
                    {
                      name: 'email',
                      link: 'mailto:info@eventoss.in',
                      svg: (
                        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="M22 6l-10 7L2 6" />
                        </svg>
                      ),
                    },
                  ].map((soc, sIdx) => (
                    <a
                      key={sIdx}
                      href={soc.link}
                      target="_blank"
                      rel="noreferrer"
                      className="glass-panel clickable"
                      style={{
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {soc.svg}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="glass-panel" style={{ padding: '36px' }}>
              {!submitted ? (
                <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 600, marginBottom: '8px' }}>
                    Quick Blueprint Inquiry
                  </h3>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Devin Vance"
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '8px',
                        color: 'var(--text-light)',
                        outline: 'none',
                      }}
                      className="clickable"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid-mobile">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Your Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="devin@luxury.com"
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'var(--bg-input)',
                          border: '1px solid var(--border-glass)',
                          borderRadius: '8px',
                          color: 'var(--text-light)',
                          outline: 'none',
                        }}
                        className="clickable"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="+1 (555) 0199"
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'var(--bg-input)',
                          border: '1px solid var(--border-glass)',
                          borderRadius: '8px',
                          color: 'var(--text-light)',
                          outline: 'none',
                        }}
                        className="clickable"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Event Details</label>
                    <textarea
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      required
                      rows={4}
                      placeholder="Outline your venue dimensions, custom theme requirements, and artist logistics..."
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '8px',
                        color: 'var(--text-light)',
                        outline: 'none',
                        resize: 'none',
                      }}
                      className="clickable"
                    />
                  </div>

                  <button
                    type="submit"
                    className="glass-btn glass-btn-primary clickable"
                    style={{ width: '100%', padding: '14px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <span>Submit Inquiry</span>
                    <Send size={14} />
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(108, 92, 231, 0.1)',
                      border: '1px solid var(--purple)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                    }}
                  >
                    <Send size={20} style={{ color: 'var(--purple)' }} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-light)', marginBottom: '8px' }}>Message Dispatched!</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    We have received your coordinates. A staging director is reviewing your specs.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Styled Google Maps Mock Overlay */}
      <section style={{ height: '350px', background: 'var(--bg-deep)', position: 'relative', borderTop: '1px solid var(--border-glass)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', filter: 'grayscale(100%) invert(95%) contrast(1.2)' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.4282567436034!2d-74.0062269!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a2256db8eb7%3A0xe2114700d111005a!2sMetropolis%20Plaza!5e0!3m2!1sen!2sus!4v1655000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
          />
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(2, 2, 8, 0.8), transparent 20%, transparent 80%, rgba(2, 2, 8, 0.8))',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, transparent 30%, rgba(2, 2, 8, 0.95) 75%)',
            pointerEvents: 'none',
          }}
        />
      </section>

      {/* Footer */}
      <footer
        style={{
          background: 'rgba(2, 2, 8, 0.98)',
          borderTop: '1px solid var(--border-glass)',
          padding: '40px 0',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Eventoss Staging Redesign. All rights reserved. Architectural models simulated under strict sandbox guidelines.
          </p>
        </div>
      </footer>
    </>
  );
}
