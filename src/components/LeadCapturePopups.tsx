'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles, PhoneCall, Gift, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LeadCapturePopups() {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [showCallback, setShowCallback] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [hasTriggeredExit, setHasTriggeredExit] = useState(false);

  useEffect(() => {
    // 1. Exit-Intent Trigger: Detect cursor leaving top viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20 && !hasTriggeredExit && !showExitIntent) {
        setShowExitIntent(true);
        setHasTriggeredExit(true);
      }
    };

    // 2. Timed Callback Trigger: Trigger callback offer after 45 seconds
    const callbackTimeout = setTimeout(() => {
      const isWizardOpen = (window as any).isConsultationWizardOpen;
      if (!isWizardOpen && !showExitIntent && !submitted) {
        setShowCallback(true);
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(callbackTimeout);
    };
  }, [hasTriggeredExit, showExitIntent, submitted]);

  const handleExitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#ffffff'],
    });

    setTimeout(() => {
      setShowExitIntent(false);
      setSubmitted(false);
      setEmail('');
    }, 4000);
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 40,
      origin: { y: 0.7 },
      colors: ['#6C5CE7', '#00F2FE'],
    });

    setTimeout(() => {
      setShowCallback(false);
      setSubmitted(false);
      setPhone('');
    }, 4000);
  };

  const openWizard = () => {
    setShowExitIntent(false);
    setShowCallback(false);
    if (typeof window !== 'undefined' && (window as any).openConsultationWizard) {
      (window as any).openConsultationWizard();
    }
  };

  return (
    <>
      {/* Exit-Intent Offer Popup */}
      {showExitIntent && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(2, 2, 8, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            className="glass-panel-gold"
            style={{
              width: '100%',
              maxWidth: '500px',
              padding: '40px',
              position: 'relative',
              textAlign: 'center',
              boxShadow: '0 25px 70px rgba(212, 175, 55, 0.15)',
            }}
          >
            <button
              onClick={() => setShowExitIntent(false)}
              className="clickable"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'none',
              }}
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <form onSubmit={handleExitSubmit}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}
                >
                  <Gift size={28} style={{ color: 'var(--gold)' }} />
                </div>
                
                <h3 style={{ fontSize: '1.75rem', color: 'var(--text-light)', marginBottom: '8px' }}>
                  Wait! Claim Your <span className="gradient-text-gold">Staging Credit</span>
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '28px' }}>
                  Enter your email to unlock a **$1,500 staging credit** valid for any Concert, Wedding, or Corporate Booking.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '30px',
                      color: 'var(--text-light)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      textAlign: 'center',
                    }}
                    className="clickable"
                  />
                  <button
                    type="submit"
                    className="glass-btn glass-btn-gold clickable"
                    style={{ width: '100%', padding: '14px 0', fontSize: '0.95rem' }}
                  >
                    Activate Staging Voucher
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h4 style={{ fontSize: '1.5rem', color: 'var(--gold)', marginBottom: '8px' }}>
                  Voucher Code Activated!
                </h4>
                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
                  Check your inbox. Your $1,500 staging credit token has been registered to **{email}**.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Immediate Callback Widget */}
      {showCallback && (
        <div
          className="glass-panel"
          style={{
            position: 'fixed',
            bottom: '104px',
            left: '32px',
            width: '320px',
            padding: '24px',
            zIndex: 998,
            boxShadow: '0 15px 40px rgba(108, 92, 231, 0.15)',
            border: '1px solid var(--border-glass)',
            backgroundColor: 'var(--bg-card)',
          }}
        >
          <button
            onClick={() => setShowCallback(false)}
            className="clickable"
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'none',
            }}
          >
            <X size={16} />
          </button>

          {!submitted ? (
            <form onSubmit={handleCallbackSubmit}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <PhoneCall size={16} style={{ color: 'var(--purple)' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)', letterSpacing: '0.05em' }}>
                  Instant Callback
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: 1.4, marginBottom: '16px' }}>
                Enter your number and one of our luxury staging leads will call you in 5 minutes.
              </p>

              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="+1 (555) 0000"
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '20px',
                    color: 'var(--text-light)',
                    fontSize: '0.8rem',
                    outline: 'none',
                  }}
                  className="clickable"
                />
                <button
                  type="submit"
                  className="glass-btn glass-btn-primary clickable"
                  style={{ padding: '8px 14px', borderRadius: '20px', fontSize: '0.75rem' }}
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--purple)', fontWeight: 600 }}>
                Ringing Scheduled!
              </span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '4px' }}>
                We are assigning a premium designer. Talk soon!
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
