'use client';

import { useState, useEffect, useRef } from 'react';
import { Award } from 'lucide-react';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

function Counter({ endValue, duration = 2000 }: { endValue: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const end = endValue;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.abs(Math.floor(totalMiliseconds / end));
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) {
        clearInterval(timer);
      }
    }, incrementTime || 1);

    return () => clearInterval(timer);
  }, [started, endValue, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function AboutSection() {
  const [activeMilestone, setActiveMilestone] = useState(0);

  const milestones = [
    { year: '2010', title: 'The Launch', desc: 'Eventoss was founded in Patna, Bihar, by Syed Aabish Hassan with a core team of four, establishing localized brand and staging coordination.' },
    { year: '2013', title: 'Official Incorporation', desc: 'Officially incorporated as Eventoss Entertainment Pvt. Ltd., scaling corporate activation contracts.' },
    { year: '2015', title: '₹1 Crore Turnover', desc: 'Achieved a major financial growth milestone, crossing the ₹1 crore mark in annual turnover.' },
    { year: '2017', title: 'Regional Expansion', desc: 'Registered 200% turnover growth and expanded physical presence to Delhi NCR and Ranchi (Jharkhand).' },
    { year: '2019', title: 'Delhi Corporate HQ', desc: 'Established corporate headquarters in Delhi, achieving 300% turnover growth and transitioning to pan-India operations.' },
  ];

  const team = [
    { name: 'Syed Aabish Hassan', role: 'Founder, CEO & MD', img: '/team/aabish.png' },
    { name: 'Rahul Ranjan', role: 'Co-Founder & Executive Director', img: '/team/rahul.png' },
    { name: 'Ali Waris Khan', role: 'Director - Events & Entertainment', img: '/team/ali.png' },
    { name: 'Shubham Sinha', role: 'Director - Brand Activation & PR', img: '/team/shubham.png' },
  ];

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--bg-deep)', position: 'relative' }}>
      <div className="container">
        {/* Title */}
        <ScrollReveal>
          <div style={{ maxWidth: '650px', marginBottom: '60px' }}>
            <span style={{ color: 'var(--purple)', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
              Our Heritage
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-light)', marginTop: '8px' }}>
              We Orchestrate <span className="gradient-text-purple-cyan">Landmark Moments</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '16px', lineHeight: 1.6 }}>
              At Eventoss, we build immersive environments that transform typical venues into luxury storytelling canvases. Every element is modeled in 3D space and engineered with professional lighting, acoustics, and design.
            </p>
          </div>
        </ScrollReveal>

        {/* Story & Counting Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            marginBottom: '80px',
          }}
        >
          {/* Timeline Milestones */}
          <ScrollReveal direction="left">
            <div className="glass-panel" style={{ padding: '36px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-light)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} style={{ color: 'var(--gold)' }} />
                <span>Company Journey</span>
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {milestones.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveMilestone(index)}
                    className="clickable"
                    style={{
                      display: 'flex',
                      gap: '16px',
                      borderLeft: `2px solid ${activeMilestone === index ? 'var(--purple)' : 'var(--border-glass)'}`,
                      paddingLeft: '16px',
                      transition: 'all 0.3s',
                      opacity: activeMilestone === index ? 1 : 0.6,
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          color: activeMilestone === index ? 'var(--purple)' : '#ffffff',
                        }}
                      >
                        {item.year}
                      </span>
                      <h4 style={{ fontSize: '0.95rem', color: 'var(--text-light)', fontWeight: 600, marginTop: '2px' }}>{item.title}</h4>
                      {activeMilestone === index && (
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.4 }}>
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Stats Counter & Values */}
          <StaggerContainer>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                height: '100%',
              }}
            >
              {[
                { label: 'Completed Stages', count: 540, prefix: '', suffix: '+' },
                { label: 'Satisfied Couples', count: 280, prefix: '', suffix: '+' },
                { label: 'Corporate Partners', count: 120, prefix: '', suffix: '' },
                { label: 'Laser Show Pulses', count: 99, prefix: '', suffix: 'M' },
              ].map((stat, i) => (
                <StaggerItem key={i} direction="up" scale={0.9}>
                  <div
                    className="glass-panel"
                    style={{
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      height: '100%',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: 'var(--gold)',
                        textShadow: '0 0 15px var(--gold-glow)',
                      }}
                    >
                      {stat.prefix}
                      <Counter endValue={stat.count} />
                      {stat.suffix}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', fontWeight: 500 }}>
                      {stat.label}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>

        {/* Team Showcase */}
        <div>
          <ScrollReveal>
            <div style={{ marginBottom: '40px' }}>
              <span style={{ color: 'var(--gold)', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>
                The Creators
              </span>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--text-light)', marginTop: '4px' }}>
                Corporate & Staging <span className="gradient-text-gold">Directors</span>
              </h3>
            </div>
          </ScrollReveal>

          <StaggerContainer>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '24px',
              }}
            >
              {team.map((member, idx) => (
                <StaggerItem key={idx} direction="up" scale={0.95}>
                  <div
                    className="glass-panel clickable"
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.borderColor = 'var(--purple)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.borderColor = 'var(--border-glass)';
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '240px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        position: 'relative',
                        marginBottom: '16px',
                      }}
                    >
                      <img
                        src={member.img}
                        alt={member.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          filter: 'grayscale(100%) contrast(1.1)',
                          transition: 'filter 0.5s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0%)')}
                        onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(100%) contrast(1.1)')}
                      />
                    </div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--text-light)', fontWeight: 600 }}>{member.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>{member.role}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
