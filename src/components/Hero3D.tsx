'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { CalendarRange, ShieldCheck, Trophy, Sparkles, ChevronDown } from 'lucide-react';

// Dynamically import Three.js scene with SSR disabled to prevent server hydration mismatches
const Hero3DCanvas = dynamic(() => import('./Hero3DCanvas'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at center, #0f1025 0%, var(--bg-deep) 100%)',
        zIndex: 1,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(212, 175, 55, 0.2)',
            borderTop: '3px solid var(--gold)',
            borderRadius: '50%',
            animation: 'spin 1.2s linear infinite',
            margin: '0 auto 20px',
          }}
        />
        <p style={{ fontFamily: 'var(--font-display)', color: 'var(--text-muted)', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
          LOADING 3D EVENT STAGE...
        </p>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  ),
});

export default function Hero3D() {
  const [theme, setTheme] = useState<'concert' | 'wedding' | 'corporate'>('concert');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerWizard = () => {
    if (typeof window !== 'undefined' && (window as any).openConsultationWizard) {
      (window as any).openConsultationWizard();
    }
  };

  const activeColor = theme === 'concert' ? 'var(--purple)' : theme === 'wedding' ? 'var(--gold)' : 'var(--cyan)';
  const activeLabel = theme === 'concert' ? 'Electric Arena' : theme === 'wedding' ? 'Royal Gazebo' : 'Elite Boardroom';

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '800px',
        overflow: 'hidden',
        background: 'var(--bg-deep)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* 3D WebGL Scene */}
      <Hero3DCanvas theme={theme} scrollY={scrollY} />

      {/* Grid Overlay for Premium Technical Aesthetic */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(var(--border-glass) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.25,
          pointerEvents: 'none',
        }}
      />

      {/* Main Hero Overlay Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          paddingTop: '80px',
        }}
      >
        <div style={{ maxWidth: '680px', pointerEvents: 'auto' }}>
          {/* Tagline */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-glass)',
              fontSize: '0.8rem',
              fontWeight: 500,
              color: 'var(--gold)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            <Sparkles size={12} />
            <span>Award-Winning Staging Agency</span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              lineHeight: 1.05,
              fontWeight: 800,
              marginBottom: '24px',
              color: 'var(--text-light)',
            }}
          >
            We Architect <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #ffffff 30%, var(--text-muted) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Cinematic Luxury
            </span>{' '}
            <br />
            <span
              style={{
                color: activeColor,
                textShadow: `0 0 30px ${theme === 'concert' ? 'var(--purple-glow)' : theme === 'wedding' ? 'var(--gold-glow)' : 'var(--cyan-glow)'}`,
                transition: 'color 0.4s, text-shadow 0.4s',
              }}
            >
              Experiences
            </span>
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
              marginBottom: '40px',
              fontWeight: 400,
            }}
          >
            Orchestrating breath-taking live concerts, majestic weddings, and premium corporate galas. Interact with our live 3D planner to experience our vision.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
            <button onClick={triggerWizard} className="glass-btn glass-btn-primary clickable">
              Plan Your Event
            </button>
            <a href="#services" className="glass-btn clickable">
              Explore Services
            </a>
          </div>
        </div>

        {/* Floating Theme Customizer Panels */}
        <div
          className="theme-selector-panel"
          style={{
            position: 'absolute',
            right: '24px',
            top: '55%',
            transform: 'translateY(-50%)',
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <p
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              textAlign: 'right',
              marginBottom: '4px',
            }}
          >
            Select 3D Stage Setup:
          </p>
          {[
            { id: 'concert', label: 'Live Concert' },
            { id: 'wedding', label: 'Luxury Wedding' },
            { id: 'corporate', label: 'Corporate Gala' },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setTheme(option.id as any)}
              className="glass-panel clickable"
              style={{
                padding: '12px 20px',
                textAlign: 'left',
                border: theme === option.id ? `1.5px solid ${activeColor}` : '1px solid var(--border-glass)',
                backgroundColor: theme === option.id ? 'rgba(255, 255, 255, 0.05)' : 'var(--bg-card)',
                boxShadow: theme === option.id ? `0 0 15px ${theme === 'concert' ? 'var(--purple-glow)' : theme === 'wedding' ? 'var(--gold-glow)' : 'var(--cyan-glow)'}` : 'none',
                minWidth: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-light)' }}>{option.label}</span>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: theme === option.id ? activeColor : 'rgba(255,255,255,0.2)',
                  boxShadow: theme === option.id ? `0 0 10px ${activeColor}` : 'none',
                  transition: 'background-color 0.3s',
                }}
              />
            </button>
          ))}
        </div>

        {/* Floating Counters and Trust Indicators */}
        <div
          className="hero-stats-panel"
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '24px',
            display: 'flex',
            gap: '40px',
            pointerEvents: 'auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CalendarRange size={24} style={{ color: 'var(--purple)' }} />
            <div>
              <h4 style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 700 }}>500+</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Luxury Events</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={24} style={{ color: 'var(--gold)' }} />
            <div>
              <h4 style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 700 }}>99.8%</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Client Rating</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Trophy size={24} style={{ color: 'var(--cyan)' }} />
            <div>
              <h4 style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 700 }}>15+</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Industry Awards</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: 'var(--text-muted)',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            animation: 'bounce 2s infinite',
          }}
        >
          <span>Scroll Down</span>
          <ChevronDown size={14} />
        </div>
      </div>
    </section>
  );
}
