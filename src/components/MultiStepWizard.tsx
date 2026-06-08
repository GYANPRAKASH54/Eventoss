'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight, ArrowLeft, Send, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MultiStepWizard() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    eventType: 'wedding',
    guests: '200',
    tier: 'gold',
    mood: 'regal',
    date: '',
    venue: 'hotel',
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    // Expose control functions to global window to open from any component
    (window as any).openConsultationWizard = (prefillData?: any) => {
      if (prefillData) {
        setFormData((prev) => ({
          ...prev,
          eventType: prefillData.eventType || prev.eventType,
          guests: prefillData.guests ? String(prefillData.guests) : prev.guests,
          tier: prefillData.tier || prev.tier,
        }));
      }
      setIsOpen(true);
      setStep(1);
      setSuccess(false);
    };

    return () => {
      (window as any).openConsultationWizard = null;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate CRM Integration / API submission
    setSuccess(true);
    
    // Shoot premium confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#6C5CE7', '#00F2FE', '#FF007F', '#ffffff'],
    });
  };

  if (!isOpen) return null;

  return (
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
        zIndex: 9999,
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
          maxWidth: '580px',
          padding: '36px',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 80px rgba(108, 92, 231, 0.25)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
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
          <X size={24} />
        </button>

        {!success ? (
          <form onSubmit={handleSubmit}>
            {/* Header Status */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Sparkles size={16} style={{ color: 'var(--gold)' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Step {step} of 4
                </span>
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-light)' }}>
                {step === 1 && 'Define Your Celebration'}
                {step === 2 && 'Choose Your Visual Mood'}
                {step === 3 && 'Logistics & Details'}
                {step === 4 && 'Secure Staging Booking'}
              </h3>
              {/* Progress bar */}
              <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginTop: '16px' }}>
                <div
                  style={{
                    width: `${(step / 4) * 100}%`,
                    height: '100%',
                    backgroundColor: 'var(--gold)',
                    borderRadius: '2px',
                    boxShadow: '0 0 10px var(--gold-glow)',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>

            {/* Step 1: Category & Scale */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Event Category</label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
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
                  >
                    <option value="wedding">Luxury Wedding</option>
                    <option value="corporate">Corporate Gala/Summit</option>
                    <option value="concert">Live Music Concert/Festival</option>
                    <option value="birthday">Private Birthday Celebration</option>
                    <option value="productLaunch">Product Launch & Exhibition</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Estimated Guest Count</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
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
                  >
                    <option value="100">Under 150 guests</option>
                    <option value="300">150 - 500 guests</option>
                    <option value="800">500 - 1,000 guests</option>
                    <option value="2000">1,000+ VIP arena guests</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Theme & Mood */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Select Design Theme</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {[
                      { id: 'regal', label: 'Golden Regal', desc: 'Sleek luxury & gold details' },
                      { id: 'cyber', label: 'Cosmic Neon', desc: 'Dynamic lights & cyber beats' },
                      { id: 'minimalist', label: 'Ivory Modern', desc: 'Clean aesthetics & floristry' },
                      { id: 'stellar', label: 'Stellar Tech', desc: '3D projection & LED walls' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, mood: m.id })}
                        className="clickable"
                        style={{
                          padding: '16px',
                          textAlign: 'left',
                          borderRadius: '8px',
                          background: formData.mood === m.id ? 'rgba(212, 175, 55, 0.1)' : 'var(--bg-input)',
                          border: formData.mood === m.id ? '1px solid var(--gold)' : '1px solid var(--border-glass)',
                          transition: 'all 0.3s',
                        }}
                      >
                        <div style={{ color: formData.mood === m.id ? 'var(--gold)' : 'var(--text-light)', fontSize: '0.85rem', fontWeight: 600 }}>{m.label}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{m.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Date & Venue */}
            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Desired Celebration Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
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
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Venue Style Preference</label>
                  <select
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
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
                  >
                    <option value="hotel">Luxury 5-Star Hotel Ballroom</option>
                    <option value="estate">Private Waterfront Estate</option>
                    <option value="outdoor">Bespoke Scenic Glass Canopy</option>
                    <option value="arena">Exhibition Convention Arena</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4: Contact & Finish */}
            {step === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Alexander Vance"
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
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Your Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="alex@premium.com"
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
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
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

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Staging Notes (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us about specific theme setups or staging demands..."
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
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '36px' }}>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="glass-btn clickable"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="glass-btn glass-btn-primary clickable"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
                >
                  <span>Continue</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="glass-btn glass-btn-gold clickable"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px' }}
                >
                  <span>Submit Booking</span>
                  <Send size={16} />
                </button>
              )}
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1.5px solid var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 0 20px var(--gold-glow)',
              }}
            >
              <Check size={32} style={{ color: 'var(--gold)' }} />
            </div>
            <h3 style={{ fontSize: '1.85rem', color: 'var(--text-light)', marginBottom: '12px' }}>
              Staging Blueprint Reserved!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, maxWidth: '400px', margin: '0 auto 32px' }}>
              Thank you, {formData.name}. Our luxury lead scenographer will contact you in the next 15 minutes to initiate your digital venue rendering.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="glass-btn glass-btn-primary clickable"
              style={{ padding: '12px 32px' }}
            >
              Back to Showroom
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
