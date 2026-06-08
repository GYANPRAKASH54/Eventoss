'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

export default function EventCalculator() {
  const [eventType, setEventType] = useState('wedding');
  const [guests, setGuests] = useState(200);
  const [tier, setTier] = useState<'classic' | 'gold' | 'royal'>('gold');
  const [addons, setAddons] = useState<string[]>([]);

  const addonPrices: Record<string, number> = {
    mapping3D: 15000,
    celebrity: 35000,
    droneShow: 18000,
    customStaging: 12000,
  };

  const getBaseCost = () => {
    // Base cost calculations based on event type
    const eventBaseCost: Record<string, number> = {
      wedding: 15000,
      corporate: 20000,
      concert: 40000,
      birthday: 8000,
      productLaunch: 25000,
    };
    return eventBaseCost[eventType] || 15000;
  };

  const getPerGuestCost = () => {
    const tierMultiplier = {
      classic: 45,
      gold: 85,
      royal: 180,
    };
    return tierMultiplier[tier];
  };

  const toggleAddon = (id: string) => {
    if (addons.includes(id)) {
      setAddons(addons.filter((item) => item !== id));
    } else {
      setAddons([...addons, id]);
    }
  };

  const baseCost = getBaseCost();
  const guestCost = guests * getPerGuestCost();
  const addonsCost = addons.reduce((sum, current) => sum + (addonPrices[current] || 0), 0);
  const totalCost = baseCost + guestCost + addonsCost;

  const triggerWizard = () => {
    if (typeof window !== 'undefined' && (window as any).openConsultationWizard) {
      // Prefill event wizard details if custom logic exists
      (window as any).openConsultationWizard({
        eventType,
        guests,
        tier,
        addons,
        estimatedTotal: totalCost,
      });
    }
  };

  return (
    <section id="calculator" className="section-padding gradient-bg-gold-radial" style={{ position: 'relative' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '60px' }}>
          <span style={{ color: 'var(--gold)', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
            Instant Estimation
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-light)', marginTop: '8px' }}>
            Luxury Event <span className="gradient-text-gold">Budget Estimator</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0' }}>
            Configure your staging, scaling, and technology options to receive an immediate luxury budget projection.
          </p>
        </div>

        <div
          className="glass-panel-gold calculator-layout"
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '36px',
            gap: '40px',
          }}
        >
          {/* Controls Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Event Type Select */}
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 600, marginBottom: '10px' }}>
                Event Type
              </label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '12px',
                }}
              >
                {[
                  { id: 'wedding', label: 'Wedding' },
                  { id: 'corporate', label: 'Corporate' },
                  { id: 'concert', label: 'Live Concert' },
                  { id: 'birthday', label: 'Birthday' },
                  { id: 'productLaunch', label: 'Product Launch' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setEventType(type.id)}
                    className="clickable"
                    style={{
                      padding: '12px',
                      background: eventType === type.id ? 'var(--gold)' : 'rgba(255,255,255,0.03)',
                      color: eventType === type.id ? 'var(--bg-deep)' : '#ffffff',
                      border: eventType === type.id ? '1px solid var(--gold)' : '1px solid var(--border-glass)',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      transition: 'all 0.3s',
                    }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guests Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 600 }}>Estimated Guests</label>
                <span style={{ fontSize: '1rem', color: 'var(--gold)', fontWeight: 700 }}>{guests} Guests</span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--gold)',
                  height: '6px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  outline: 'none',
                }}
                className="clickable"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                <span>50 Guests</span>
                <span>1,500</span>
                <span>3,000+ Guests</span>
              </div>
            </div>

            {/* Experience Tier */}
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 600, marginBottom: '10px' }}>
                Staging & Decor Tier
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {[
                  { id: 'classic', label: 'Classic Luxury', desc: 'Premium Styling' },
                  { id: 'gold', label: 'Royal Gold', desc: 'Awwwards Decor' },
                  { id: 'royal', label: 'Elite Platinum', desc: 'Max Tech / VIP' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setTier(opt.id as any)}
                    className="clickable"
                    style={{
                      padding: '16px',
                      textAlign: 'left',
                      background: tier === opt.id ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255,255,255,0.02)',
                      border: tier === opt.id ? '1px solid var(--gold)' : '1px solid var(--border-glass)',
                      borderRadius: '8px',
                      transition: 'all 0.3s',
                    }}
                  >
                    <div style={{ color: tier === opt.id ? 'var(--gold)' : '#ffffff', fontSize: '0.85rem', fontWeight: 600 }}>{opt.label}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Technology Addons */}
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 600, marginBottom: '10px' }}>
                Immersive Event Add-ons
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {[
                  { id: 'mapping3D', label: '3D Projection Mapping' },
                  { id: 'celebrity', label: 'Celebrity/Artist Booking' },
                  { id: 'droneShow', label: 'Choreographed Drone Show' },
                  { id: 'customStaging', label: 'Bespoke Scenic Staging' },
                ].map((addon) => (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className="clickable"
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      background: addons.includes(addon.id) ? 'rgba(108, 92, 231, 0.15)' : 'rgba(255,255,255,0.02)',
                      border: addons.includes(addon.id) ? '1px solid var(--purple)' : '1px solid var(--border-glass)',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      color: addons.includes(addon.id) ? '#ffffff' : 'var(--text-muted)',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{addon.label}</span>
                    <span
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '3px',
                        border: addons.includes(addon.id) ? '1px solid var(--purple)' : '1px solid rgba(255,255,255,0.2)',
                        backgroundColor: addons.includes(addon.id) ? 'var(--purple)' : 'transparent',
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div
            className="glass-panel"
            style={{
              padding: '30px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-gold-glass)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <Sparkles size={18} style={{ color: 'var(--gold)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Estimate Summary
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyItems: 'space-between', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <span>Production Base:</span>
                  <span style={{ color: 'var(--text-light)' }}>${baseCost.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyItems: 'space-between', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <span>Guest Hospitality Staging:</span>
                  <span style={{ color: 'var(--text-light)' }}>${guestCost.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyItems: 'space-between', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <span>Immersive Tech Add-ons:</span>
                  <span style={{ color: 'var(--text-light)' }}>${addonsCost.toLocaleString()}</span>
                </div>
                <hr style={{ border: 'none', borderBottom: '1px solid var(--border-glass)', margin: '8px 0' }} />
                
                <div style={{ display: 'flex', justifyItems: 'space-between', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '10px' }}>
                  <span style={{ fontSize: '1rem', color: 'var(--text-light)', fontWeight: 600 }}>Estimated Investment:</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.85rem', color: 'var(--gold)', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                      ${totalCost.toLocaleString()}*
                    </div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>*Custom quotation applies.</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={triggerWizard}
              className="glass-btn glass-btn-gold clickable"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span>Lock Staging Blueprint</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
