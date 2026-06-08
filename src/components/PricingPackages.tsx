'use client';

import { useState } from 'react';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';

export default function PricingPackages() {
  const [activeTab, setActiveTab] = useState<'packages' | 'compare'>('packages');

  const packages = [
    {
      name: 'Classic Luxury',
      price: '$25,000',
      period: 'Starting Staging Rate',
      desc: 'Ideal for upscale private gatherings and corporate banquets.',
      features: [
        'Initial 3D floor plan layout',
        'Standard structural staging (up to 24ft)',
        'Ambient lighting & wash program',
        'Bespoke ivory draping & backdrop',
        'Standard floral pedestals (x4)',
        'Active stage supervisor (4 hours)',
      ],
      popular: false,
      color: 'var(--purple)',
    },
    {
      name: 'Royal Gold',
      price: '$65,000',
      period: 'Starting Staging Rate',
      desc: 'Our signature Awwwards-level setup for high-profile galas & weddings.',
      features: [
        'Complete interactive WebGL 3D design walkthrough',
        'Multi-level structural staging (up to 40ft)',
        'Synchronized moving head lights (x12)',
        'Bespoke floral styling & canopy arches',
        'Full LED display screen setup (15ft x 9ft)',
        'Staging manager + sound engineer (8 hours)',
      ],
      popular: true,
      color: 'var(--gold)',
    },
    {
      name: 'Elite Platinum',
      price: 'Custom Quotation',
      period: 'Bespoke Production Scale',
      desc: 'Full-stadium level setups incorporating immersive technologies.',
      features: [
        'Signature custom-molded physical props',
        'Uncapped custom stage sizes',
        '3D Laser Mapping & projection systems',
        'Integrated drone light choreographies',
        'Celebrity green-room management',
        'Full-time technical crew & director team',
      ],
      popular: false,
      color: 'var(--cyan)',
    },
  ];

  const compareFeatures = [
    { name: 'Staging Structural Width', classic: 'Up to 24ft', gold: 'Up to 40ft', platinum: 'Unlimited' },
    { name: '3D Mockup Blueprint', classic: 'Static 2D/3D PDF', gold: 'WebGL Walkthrough', platinum: 'VR Spatial Staging' },
    { name: 'Lighting Configuration', classic: 'Ambient LED wash', gold: '12x Synchronized spots', platinum: 'Strobes, Lasers & Drones' },
    { name: 'Floral Staged Accents', classic: 'Standard Pedestals', gold: 'Custom flower canopy', platinum: 'Full floral arches & columns' },
    { name: 'Active Technical Staff', classic: '1 Manager', gold: 'Manager + Engineer', platinum: 'Full Staging Crew (5+)' },
    { name: 'LED Screens', classic: 'Optional Add-on', gold: '15ft x 9ft screen', platinum: 'Multi-screen setup' },
  ];

  const triggerWizard = () => {
    if (typeof window !== 'undefined' && (window as any).openConsultationWizard) {
      (window as any).openConsultationWizard();
    }
  };

  return (
    <section id="pricing" className="section-padding" style={{ background: 'var(--bg-deep)', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: 'var(--purple)', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
            Investment Tiers
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-light)', marginTop: '8px' }}>
            Staging Package <span className="gradient-text-purple-cyan">Quotations</span>
          </h2>
          
          {/* Tab buttons */}
          <div style={{ display: 'inline-flex', background: 'var(--bg-input)', padding: '4px', borderRadius: '30px', border: '1px solid var(--border-glass)', marginTop: '24px' }}>
            <button
              onClick={() => setActiveTab('packages')}
              className="clickable"
              style={{
                padding: '8px 24px',
                borderRadius: '30px',
                border: 'none',
                background: activeTab === 'packages' ? 'var(--purple)' : 'transparent',
                color: 'var(--text-light)',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'all 0.3s',
              }}
            >
              Pricing Packages
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className="clickable"
              style={{
                padding: '8px 24px',
                borderRadius: '30px',
                border: 'none',
                background: activeTab === 'compare' ? 'var(--purple)' : 'transparent',
                color: 'var(--text-light)',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'all 0.3s',
              }}
            >
              Compare Features
            </button>
          </div>
        </div>

        {activeTab === 'packages' ? (
          /* Package Cards */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px',
              alignItems: 'stretch',
            }}
          >
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={pkg.popular ? 'glass-panel-gold' : 'glass-panel'}
                style={{
                  padding: '40px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  borderWidth: pkg.popular ? '1.5px' : '1px',
                  borderColor: pkg.popular ? 'var(--gold)' : 'var(--border-glass)',
                  boxShadow: pkg.popular ? '0 15px 40px rgba(212, 175, 55, 0.1)' : 'var(--shadow-premium)',
                  position: 'relative',
                }}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: 'var(--gold)',
                      color: 'var(--bg-deep)',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '20px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Sparkles size={10} />
                    <span>Most Immersive</span>
                  </span>
                )}

                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-light)', fontWeight: 700 }}>{pkg.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.4 }}>{pkg.desc}</p>
                
                <hr style={{ border: 'none', borderBottom: '1px solid var(--border-glass)', margin: '24px 0' }} />

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: pkg.popular ? 'var(--gold)' : '#ffffff', fontFamily: 'var(--font-display)' }}>
                    {pkg.price}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pkg.period}</span>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px', flex: 1 }}>
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                      <Check size={14} style={{ color: pkg.popular ? 'var(--gold)' : 'var(--purple)', marginTop: '3px', flexShrink: 0 }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={triggerWizard}
                  className={`glass-btn ${pkg.popular ? 'glass-btn-gold' : 'glass-btn-primary'} clickable`}
                  style={{ width: '100%', padding: '12px 0' }}
                >
                  Acquire Blueprint
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Comparison Table */
          <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Blueprint Feature</th>
                  <th style={{ padding: '16px', color: 'var(--text-light)', fontSize: '1rem', fontWeight: 700 }}>Classic Luxury</th>
                  <th style={{ padding: '16px', color: 'var(--gold)', fontSize: '1rem', fontWeight: 700 }}>Royal Gold</th>
                  <th style={{ padding: '16px', color: 'var(--cyan)', fontSize: '1rem', fontWeight: 700 }}>Elite Platinum</th>
                </tr>
              </thead>
              <tbody>
                {compareFeatures.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '18px 16px', color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: 500 }}>{row.name}</td>
                    <td style={{ padding: '18px 16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{row.classic}</td>
                    <td style={{ padding: '18px 16px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>{row.gold}</td>
                    <td style={{ padding: '18px 16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{row.platinum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
