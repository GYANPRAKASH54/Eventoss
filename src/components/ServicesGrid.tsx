'use client';

import Link from 'next/link';
import {
  Sparkles,
  Briefcase,
  Gift,
  Plane,
  Rocket,
  Presentation,
  Music,
  Wine,
  PartyPopper,
  Crown
} from 'lucide-react';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

export default function ServicesGrid() {
  const services = [
    {
      id: 'wedding-planning',
      title: 'Wedding Planning',
      desc: 'Cinematic set pieces, fairytale floral arches, and custom designer tablescapes.',
      icon: Sparkles,
      color: 'var(--gold)',
    },
    {
      id: 'corporate-events',
      title: 'Corporate Events',
      desc: 'Bespoke conference layouts, LED configurations, and VIP award stage ceremonies.',
      icon: 'var(--cyan)',
    },
    {
      id: 'birthday-celebrations',
      title: 'Birthday Celebrations',
      desc: 'Interactive thematic designs, dynamic neon backdrops, and balloon architectures.',
      icon: Gift,
      color: 'var(--purple)',
    },
    {
      id: 'destination-weddings',
      title: 'Destination Weddings',
      desc: 'End-to-end scenic staging at waterfront resorts, luxury islands, and secret estates.',
      icon: Plane,
      color: 'var(--gold)',
    },
    {
      id: 'product-launches',
      title: 'Product Launches',
      desc: 'Unveiling spectacles with 3D projection mappings and synchronized laser beams.',
      icon: Rocket,
      color: 'var(--magenta)',
    },
    {
      id: 'exhibition-management',
      title: 'Exhibition Management',
      desc: 'Innovative floor staging, architectural glass stalls, and digital showcase displays.',
      icon: Presentation,
      color: 'var(--cyan)',
    },
    {
      id: 'live-concerts',
      title: 'Live Concerts',
      desc: 'Heavy-duty structural rigging, stadium sound designs, and active pulse strobes.',
      icon: Music,
      color: 'var(--purple)',
    },
    {
      id: 'private-parties',
      title: 'Private Parties',
      desc: 'Sleek lounge systems, professional mixology setups, and custom DJ performance stages.',
      icon: Wine,
      color: 'var(--magenta)',
    },
    {
      id: 'social-events',
      title: 'Social Events',
      desc: 'Community galas, family banquets, and customized interactive photo pavilions.',
      icon: PartyPopper,
      color: 'var(--cyan)',
    },
    {
      id: 'luxury-events',
      title: 'Luxury Events',
      desc: 'Ultra-exclusive VIP staging with signature concierge planning and bespoke themes.',
      icon: Crown,
      color: 'var(--gold)',
    },
  ];

  return (
    <section id="services" className="section-padding" style={{ background: 'var(--bg-deep)', borderTop: '1px solid var(--border-glass)', position: 'relative' }}>
      <div className="container">
        {/* Title */}
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: 'var(--gold)', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
              Event Portfolios
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-light)', marginTop: '8px' }}>
              Our Luxury <span className="gradient-text-gold">Execution Services</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0' }}>
              We orchestrate the absolute finest detail of structural layout, theatrical lighting, and vendor synergy.
            </p>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <StaggerContainer>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {services.map((svc) => {
              const IconComp = typeof svc.icon === 'string' ? Briefcase : svc.icon;
              const svcColor = svc.color || 'var(--cyan)';
              return (
                <StaggerItem key={svc.id} direction="up" scale={0.97}>
                  <Link
                    href={`/services/${svc.id}`}
                    className="glass-panel clickable"
                    style={{
                      padding: '36px',
                      textDecoration: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px',
                      height: '100%',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.borderColor = svcColor;
                      e.currentTarget.style.boxShadow = `0 15px 35px rgba(255,255,255,0.02), 0 0 20px ${svcColor}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.borderColor = 'var(--border-glass)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-premium)';
                    }}
                  >
                    {/* SVG Icon Container */}
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--bg-input)',
                        border: '1px solid var(--border-glass)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: svcColor,
                        transition: 'all 0.3s',
                      }}
                      className="icon-box"
                    >
                      <IconComp size={24} />
                    </div>

                    {/* Details */}
                    <div>
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 600 }}>{svc.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.5 }}>
                        {svc.desc}
                      </p>
                    </div>

                    {/* Learn More Floating Indicator */}
                    <div
                      style={{
                        alignSelf: 'flex-start',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: svcColor,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: 'auto',
                        paddingTop: '12px',
                      }}
                    >
                      <span>Explore Blueprint</span>
                      <span>→</span>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
