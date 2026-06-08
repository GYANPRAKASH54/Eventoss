'use client';

import { Users, LayoutGrid, Cpu, CheckCircle, ShieldCheck, DollarSign } from 'lucide-react';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

export default function WhyChooseUs() {
  const cards = [
    {
      title: 'Experienced Crew',
      desc: 'Our directors average 12+ years directing major arena shows and royal weddings.',
      icon: Users,
      color: 'var(--purple)',
    },
    {
      title: 'End-to-End Planning',
      desc: 'From initial structural licensing to final cleanup, we control every single asset.',
      icon: CheckCircle,
      color: 'var(--cyan)',
    },
    {
      title: 'Custom Event Designs',
      desc: 'We do not recycle templates. Every stage setup is modeled exclusively in virtual 3D.',
      icon: LayoutGrid,
      color: 'var(--gold)',
    },
    {
      title: 'Premium Vendor Network',
      desc: 'Immediate routing to top Michelin caterers, celebrity hosts, and high-end florists.',
      icon: ShieldCheck,
      color: 'var(--magenta)',
    },
    {
      title: 'Transparent Pricing',
      desc: 'Detailed line-item pricing. No hidden operational fees or agency surcharges.',
      icon: DollarSign,
      color: 'var(--cyan)',
    },
    {
      title: 'On-Time Execution',
      desc: 'Rigorous timeline checklists ensures your lighting rig and staging is operational 4 hours early.',
      icon: Cpu,
      color: 'var(--purple)',
    },
  ];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-deep)', position: 'relative' }}>
      <div className="container">
        {/* Title */}
        <ScrollReveal>
          <div style={{ maxWidth: '650px', marginBottom: '60px' }}>
            <span style={{ color: 'var(--gold)', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
              Why Choose Us
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-light)', marginTop: '8px' }}>
              Staging Execution <span className="gradient-text-gold">Engineered to Perfection</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '16px', lineHeight: 1.6 }}>
              Eventoss is built on structural precision and cinematic aesthetics. We combine hardware engineering with luxury design to ensure flawless operation.
            </p>
          </div>
        </ScrollReveal>

        {/* Cards Grid */}
        <StaggerContainer>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {cards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <StaggerItem key={idx} direction="up" scale={0.97}>
                  <div
                    className="glass-panel"
                    style={{
                      padding: '30px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      height: '100%',
                    }}
                  >
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--bg-input)',
                        border: '1px solid var(--border-glass)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: card.color,
                      }}
                    >
                      <IconComp size={20} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', color: 'var(--text-light)', fontWeight: 600 }}>{card.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.5 }}>
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
