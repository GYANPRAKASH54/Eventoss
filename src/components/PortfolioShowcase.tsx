'use client';

import { useState, useRef } from 'react';
import { Play } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

export default function PortfolioShowcase() {
  const [filter, setFilter] = useState('all');
  
  // Before/After Slider State
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const portfolioItems = [
    { id: 1, title: 'The Royal Sovereign Wedding', category: 'wedding', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80', tag: 'Royal Canopy', videoId: 'QFydfkByoJA' },
    { id: 2, title: 'Hyperion Tech Keynote', category: 'corporate', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80', tag: '3D Projection', videoId: 'QHjY7GttQhT' },
    { id: 3, title: 'Nebula Neon Arena Tour', category: 'concert', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80', tag: 'Truss Staging', videoId: 'lTXGsmT0I_0' },
    { id: 4, title: 'Celestial Garden Gala', category: 'wedding', image: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&w=600&q=80', tag: 'Floral Scenic', videoId: 'QFydfkByoJA' },
    { id: 5, title: 'Quantum Venture Summit', category: 'corporate', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80', tag: 'Glass Booths', videoId: 'QEYa-cX4oep' },
    { id: 6, title: 'Decibel DJ Dome Set', category: 'concert', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80', tag: 'Laser Matrix', videoId: 'QHFCXIxUueS' },
  ];

  const filteredItems = filter === 'all' ? portfolioItems : portfolioItems.filter(item => item.category === filter);

  // Before/After Drag Logic
  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  const startDrag = () => {
    isDragging.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <section id="portfolio" className="section-padding" style={{ background: 'var(--bg-deep)', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <ScrollReveal>
          <div
            style={{
              marginBottom: '60px',
            }}
            className="portfolio-header"
          >
            <div>
              <span style={{ color: 'var(--purple)', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
                The Showcase
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-light)', marginTop: '8px' }}>
                Cinematic Staging <span className="gradient-text-purple-cyan">Transformations</span>
              </h2>
            </div>

            {/* Filtering */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'wedding', label: 'Royal Weddings' },
                { id: 'corporate', label: 'Corporate Galas' },
                { id: 'concert', label: 'Concerts & Shows' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setFilter(btn.id)}
                  className="clickable"
                  style={{
                    padding: '10px 22px',
                    background: filter === btn.id ? 'var(--purple)' : 'var(--bg-input)',
                    border: filter === btn.id ? '1px solid var(--purple)' : '1px solid var(--border-glass)',
                    color: filter === btn.id ? '#ffffff' : 'var(--text-light)',
                    borderRadius: '30px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    transition: 'all 0.3s',
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        <StaggerContainer>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '80px',
            }}
          >
            {filteredItems.map((item) => (
              <StaggerItem key={item.id} direction="up" scale={0.95}>
                <Link
                  href={`/work?v=${item.videoId}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div
                    className="glass-panel clickable"
                    style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      />
                      {/* Floating Tag */}
                      <span
                        style={{
                          position: 'absolute',
                          top: '16px',
                          left: '16px',
                          background: 'rgba(2, 2, 8, 0.75)',
                          border: '1px solid var(--border-glass)',
                          padding: '4px 10px',
                          borderRadius: '20px',
                          fontSize: '0.7rem',
                          color: 'var(--gold)',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.tag}
                      </span>

                      {/* Glassy Play Overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'rgba(0,0,0,0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.3s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                      >
                        <div
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            border: '1.5px solid #ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-light)',
                          }}
                        >
                          <Play size={18} fill="#ffffff" />
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: '24px' }}>
                      <h3 style={{ fontSize: '1.15rem', color: 'var(--text-light)', fontWeight: 600 }}>{item.title}</h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginTop: '6px' }}>
                        {item.category} Production
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Cinematic Video Showcase CTA */}
        <ScrollReveal>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-40px', marginBottom: '80px' }}>
            <Link
              href="/work"
              className="glass-btn glass-btn-primary clickable animate-pulse-glow"
              style={{
                padding: '12px 32px',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Play size={16} fill="#ffffff" />
              <span>View Cinematic Staging Videos</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Interactive Before/After Staging Transformation Slider */}
        <div style={{ marginTop: '100px' }}>
          <ScrollReveal direction="up" scale={0.95}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span style={{ color: 'var(--gold)', letterSpacing: '0.1em', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>
                Staging Rig Blueprint
              </span>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--text-light)', marginTop: '4px' }}>
                Interactive Staging <span className="gradient-text-gold">Before & After</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '500px', margin: '8px auto 0' }}>
                Drag the golden central divider to reveal the empty venue transformation into a Royal White Wedding Staging.
              </p>
            </div>
          </ScrollReveal>

          {/* Slider Container */}
          <ScrollReveal direction="none" scale={0.98} delay={0.15}>
            <div
              ref={sliderRef}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '850px',
                height: '450px',
                margin: '0 auto',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                border: '1px solid var(--border-glass)',
              }}
            >
              {/* After Image (Full background) */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <img
                  src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80"
                  alt="After Decor Staging"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '24px',
                    right: '24px',
                    background: 'rgba(2, 2, 8, 0.75)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--gold)',
                    border: '1px solid var(--gold)',
                  }}
                >
                  Executed Luxury Staging
                </span>
              </div>

              {/* Before Image (Clipped width) */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: `${sliderPos}%`,
                  height: '100%',
                  overflow: 'hidden',
                  zIndex: 2,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80"
                  alt="Before Decor Staging"
                  style={{
                    width: sliderRef.current?.getBoundingClientRect().width || 850,
                    height: '450px',
                    objectFit: 'cover',
                    maxWidth: 'none',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '24px',
                    background: 'rgba(2, 2, 8, 0.75)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-light)',
                    border: '1px solid var(--border-glass)',
                  }}
                >
                  Raw Empty Arena Venue
                </span>
              </div>

              {/* Draggable Divider Bar */}
              <div
                onMouseDown={startDrag}
                onTouchStart={startDrag}
                className="draggable clickable"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: `${sliderPos}%`,
                  width: '4px',
                  height: '100%',
                  backgroundColor: 'var(--gold)',
                  zIndex: 3,
                  boxShadow: '0 0 10px var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Drag Handle */}
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-deep)',
                    border: '2px solid var(--gold)',
                    boxShadow: '0 0 10px var(--gold-glow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                  }}
                >
                  ↔
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
