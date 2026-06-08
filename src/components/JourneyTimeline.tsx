'use client';

import { PhoneCall, FileText, Palette, Hammer, GlassWater } from 'lucide-react';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

export default function JourneyTimeline() {
  const steps = [
    {
      step: '01',
      title: 'Consultation',
      desc: 'We map out your strategic milestones, guest capacities, and initial budgeting goals.',
      icon: PhoneCall,
      color: 'var(--purple)',
    },
    {
      step: '02',
      title: 'Planning & Logistics',
      desc: 'Securing structural permits, aligning major artist schedules, and coordinating vendors.',
      icon: FileText,
      color: 'var(--cyan)',
    },
    {
      step: '03',
      title: 'Bespoke Staging Design',
      desc: 'Our scenographers build interactive 3D virtual blueprints of your stage, floral, and LED layout.',
      icon: Palette,
      color: 'var(--gold)',
    },
    {
      step: '04',
      title: 'Cinematic Execution',
      desc: 'Rigging teams erect the staging arrays, configure acoustic line arrays, and program show lighting.',
      icon: Hammer,
      color: 'var(--magenta)',
    },
    {
      step: '05',
      title: 'The Celebration',
      desc: 'Your landmark experience executes seamlessly, backed by our active floor directors.',
      icon: GlassWater,
      color: 'var(--cyan)',
    },
  ];

  return (
    <section id="journey" className="section-padding" style={{ background: 'var(--bg-deep)', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        {/* Title */}
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span style={{ color: 'var(--purple)', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
              The Blueprint Process
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-light)', marginTop: '8px' }}>
              Your Staging <span className="gradient-text-purple-cyan">Journey</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '550px', margin: '12px auto 0' }}>
              Follow our premium development pathway, from initial sketch to final cinematic spotlight reveal.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline Grid layout */}
        <StaggerContainer>
          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '30px',
            }}
          >
            {/* Horizontal Connecting Line (Desktop) */}
            <div
              className="timeline-bar"
              style={{
                position: 'absolute',
                top: '40px',
                left: '50px',
                right: '50px',
                height: '1.5px',
                background: 'linear-gradient(90deg, var(--purple) 0%, var(--gold) 50%, var(--magenta) 100%)',
                opacity: 0.2,
                zIndex: 1,
              }}
            />

            {steps.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <StaggerItem key={idx} direction="up" scale={0.85}>
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    {/* Step Circle */}
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--bg-deep)',
                        border: `1.5px solid ${item.color}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        marginBottom: '24px',
                        boxShadow: `0 0 20px ${item.color}20`,
                        transition: 'transform 0.4s',
                      }}
                      className="step-circle clickable"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <IconComp size={24} style={{ color: item.color }} />
                      {/* Step Number Tag */}
                      <span
                        style={{
                          position: 'absolute',
                          top: '-6px',
                          right: '-6px',
                          background: item.color,
                          color: 'var(--bg-deep)',
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {item.step}
                      </span>
                    </div>

                    {/* Info Text */}
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--text-light)', fontWeight: 600, marginBottom: '10px' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, padding: '0 10px' }}>
                      {item.desc}
                    </p>
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
