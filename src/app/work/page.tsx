'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, ArrowLeft, Film, Calendar, Award, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

const YoutubeIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.555A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93 .502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.482 20.5 12 20.5 12 20.5s7.518 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let count = 0;
    const cols = 22;
    const rows = 14;

    let isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const checkTheme = () => {
      isLight = document.documentElement.getAttribute('data-theme') === 'light';
    };
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.fillStyle = isLight ? '#F8FAFC' : '#080914';
      ctx.fillRect(0, 0, width, height);

      // Draw horizontal undulating lines
      ctx.strokeStyle = isLight ? 'rgba(98, 0, 238, 0.04)' : 'rgba(179, 157, 219, 0.05)';
      ctx.lineWidth = 1;

      count += 0.008;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const x = c * (width / (cols - 1));
          const angle = (c * 0.2) + (r * 0.35) + count;
          const yOffset = Math.sin(angle) * 25 + Math.cos(c * 0.1 - count * 0.5) * 10;
          const y = r * (height / (rows - 1)) + yOffset;

          if (c === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Draw vertical undulating lines
      ctx.strokeStyle = isLight ? 'rgba(1, 135, 134, 0.03)' : 'rgba(128, 222, 234, 0.04)';
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const x = c * (width / (cols - 1));
          const angle = (c * 0.2) + (r * 0.35) + count;
          const yOffset = Math.sin(angle) * 25 + Math.cos(c * 0.1 - count * 0.5) * 10;
          const y = r * (height / (rows - 1)) + yOffset;

          if (r === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Draw glowing junctions/nodes
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * (width / (cols - 1));
          const angle = (c * 0.2) + (r * 0.35) + count;
          const yOffset = Math.sin(angle) * 25 + Math.cos(c * 0.1 - count * 0.5) * 10;
          const y = r * (height / (rows - 1)) + yOffset;

          const pulse = Math.sin(count * 2 + c + r) * 0.3 + 0.7;
          const size = (c % 3 === 0 && r % 2 === 0) ? 2.2 : 1.2;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);

          if (c % 2 === 0) {
            ctx.fillStyle = isLight 
              ? `rgba(1, 135, 134, ${0.12 * pulse})` 
              : `rgba(128, 222, 234, ${0.18 * pulse})`;
          } else {
            ctx.fillStyle = isLight 
              ? `rgba(98, 0, 238, ${0.12 * pulse})` 
              : `rgba(179, 157, 219, ${0.18 * pulse})`;
          }
          ctx.fill();
        }
      }

      // Floating cinematic lens color spots
      const spots = isLight ? [
        { x: width * 0.2, y: height * 0.3, r: 280, color: '98, 0, 238', speed: 0.0006 },
        { x: width * 0.8, y: height * 0.7, r: 320, color: '1, 135, 134', speed: 0.0005 },
        { x: width * 0.5, y: height * 0.5, r: 360, color: '244, 143, 177', speed: 0.0004 }
      ] : [
        { x: width * 0.2, y: height * 0.3, r: 280, color: '179, 157, 219', speed: 0.0006 },
        { x: width * 0.8, y: height * 0.7, r: 320, color: '128, 222, 234', speed: 0.0005 },
        { x: width * 0.5, y: height * 0.5, r: 360, color: '244, 143, 177', speed: 0.0004 }
      ];

      spots.forEach((spot, idx) => {
        const timeOffset = count * spot.speed * 120;
        const currentX = spot.x + Math.sin(timeOffset + idx) * 60;
        const currentY = spot.y + Math.cos(timeOffset + idx) * 60;

        const grad = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, spot.r);
        grad.addColorStop(0, isLight ? `rgba(${spot.color}, 0.025)` : `rgba(${spot.color}, 0.05)`);
        grad.addColorStop(0.5, isLight ? `rgba(${spot.color}, 0.005)` : `rgba(${spot.color}, 0.01)`);
        grad.addColorStop(1, 'rgba(8, 9, 20, 0)');

        ctx.beginPath();
        ctx.arc(currentX, currentY, spot.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

interface VideoReel {
  id: string;
  title: string;
  category: 'Corporate' | 'Weddings' | 'Activations' | 'Special Campaigns';
  desc: string;
  duration: string;
  views: string;
  date: string;
}

export default function WorkReels() {
  const [activeVideo, setActiveVideo] = useState<string>('lTXGsmT0I_0'); // Shah Rukh Khan talk show as default
  const theaterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('v');
      if (v) {
        const match = videoList.find(video => video.id === v);
        if (match) {
          setActiveVideo(v);
        }
      }
    }
  }, []);

  const videoList: VideoReel[] = [
    {
      id: 'lTXGsmT0I_0',
      title: 'Shahrukh Khan Talk Show in Patna',
      category: 'Special Campaigns',
      desc: 'Exclusive red-carpet talk show production and stage execution for superstar Shah Rukh Khan. Complete stage design, lighting, sound, and crowd security management by Eventoss.',
      duration: '4:32',
      views: '54K+ Views',
      date: 'Event Managed by Eventoss'
    },
    {
      id: 'MxIzxoVqbPA',
      title: 'Vivo Anniversary Celebration Gala',
      category: 'Corporate',
      desc: 'Annual corporate partner summit and celebratory milestone gala executed for Vivo. Features state-of-the-art neon stage design, LED screen choreography, and automated lasers.',
      duration: '3:15',
      views: '12K+ Views',
      date: 'Corporate Event Production'
    },
    {
      id: 'QFydfkByoJA',
      title: 'Wedding Dairy - Executed by Wedlock',
      category: 'Weddings',
      desc: 'Cinematic highlights of a royal destination wedding crafted by Wedlock, a premium unit of Eventoss. Immersive floral dome setups, pathway lighting, and luxury outdoor staging.',
      duration: '5:45',
      views: '28K+ Views',
      date: 'Wedlock Luxury Planners'
    },
    {
      id: 'QHFCXIxUueS',
      title: 'Minute Maid Presents Kite Festival',
      category: 'Activations',
      desc: 'A massive public outdoor brand activation campaign executed for Minute Maid. Managed structural pavilions, promotional staging, and consumer engagement zones.',
      duration: '2:50',
      views: '18K+ Views',
      date: 'BTL Brand Activation'
    },
    {
      id: 'QEYa-cX4oep',
      title: 'Educatuss - Mega Education Summit',
      category: 'Corporate',
      desc: 'Promotional video and stage highlight reel for Educatuss, a career counseling and education summit unit under Eventoss Entertainment Pvt. Ltd.',
      duration: '3:20',
      views: '9K+ Views',
      date: 'Eventoss Career Summit'
    }
  ];

  const handleVideoSelect = (videoId: string) => {
    setActiveVideo(videoId);
    if (theaterRef.current) {
      theaterRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const selectedVideoInfo = videoList.find(v => v.id === activeVideo) || videoList[0];

  return (
    <div style={{ background: 'var(--bg-deep)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px', position: 'relative', overflow: 'hidden' }}>

      {/* Cinematic Ambient Particle Canvas */}
      <CinematicBackground />

      {/* Cinematic Vignette Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8, 9, 20, 0.9) 95%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Background Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70vw',
          height: '70vh',
          background: 'radial-gradient(circle, rgba(128, 222, 234, 0.03) 0%, rgba(179, 157, 219, 0.03) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Navigation Back */}
        <div style={{ marginBottom: '40px' }}>
          <Link
            href="/"
            className="clickable"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'color 0.25s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <ScrollReveal>
          <div style={{ maxWidth: '800px', marginBottom: '50px' }}>
            <span style={{ color: 'var(--purple)', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Film size={14} />
              <span>Cinematic Showroom</span>
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', color: 'var(--text-light)', marginTop: '12px', lineHeight: 1.1 }}>
              Staging & Execution <span className="gradient-text-purple-cyan">In Motion</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '20px', lineHeight: 1.6, fontSize: '1.05rem' }}>
              Step into the event arena. Select any production below to activate the theater player and experience how Eventoss transforms spatial blueprints into living corporate celebrations and royal wedding narratives.
            </p>
          </div>
        </ScrollReveal>

        {/* Video Theater Screen */}
        <div ref={theaterRef} style={{ marginBottom: '80px' }}>
          <ScrollReveal direction="none" scale={0.98}>
            <div className="glass-panel" style={{ padding: '16px', borderRadius: '24px', overflow: 'hidden' }}>

              {/* Aspect Ratio Box */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
                  height: 0,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#000000',
                  boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)'
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                  title={selectedVideoInfo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                />
              </div>

              {/* Video Info Card */}
              <div style={{ padding: '24px 16px 12px 16px', marginTop: '12px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                  <span style={{
                    background: 'var(--purple-glow)',
                    color: 'var(--purple)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    {selectedVideoInfo.category}
                  </span>
                  <span style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-muted)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}>
                    {selectedVideoInfo.date}
                  </span>
                  <span style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-muted)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    marginLeft: 'auto'
                  }}>
                    {selectedVideoInfo.views}
                  </span>
                </div>

                <h2 style={{ fontSize: '1.6rem', color: 'var(--text-light)', fontWeight: 600 }}>
                  {selectedVideoInfo.title}
                </h2>

                <p style={{ color: 'var(--text-muted)', marginTop: '12px', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  {selectedVideoInfo.desc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Video Playlist Grid */}
        <div style={{ marginBottom: '100px' }}>
          <ScrollReveal>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} style={{ color: 'var(--cyan)' }} />
                <span>Select Event Staging Video Reel</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                Click on any card to load the video reel in the main theatre player above.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
              }}
            >
              {videoList.map((video) => {
                const isActive = video.id === activeVideo;
                return (
                  <StaggerItem key={video.id} direction="up" scale={0.97}>
                    <div
                      onClick={() => handleVideoSelect(video.id)}
                      className="glass-panel clickable"
                      style={{
                        padding: '20px',
                        borderRadius: '20px',
                        borderColor: isActive ? 'var(--cyan)' : 'var(--border-glass)',
                        boxShadow: isActive ? '0 0 25px rgba(128, 222, 234, 0.15)' : 'var(--shadow-premium)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        background: isActive ? 'rgba(20, 30, 48, 0.65)' : 'var(--bg-card)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = 'var(--purple)';
                          e.currentTarget.style.transform = 'translateY(-4px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = 'var(--border-glass)';
                          e.currentTarget.style.transform = 'none';
                        }
                      }}
                    >
                      <div>
                        {/* Title and Play Icon */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                          <span style={{
                            fontSize: '0.7rem',
                            color: isActive ? 'var(--cyan)' : 'var(--purple)',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            {video.category}
                          </span>
                          <div
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              backgroundColor: isActive ? 'var(--cyan)' : 'rgba(255,255,255,0.05)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: isActive ? 'var(--bg-deep)' : '#ffffff',
                              transition: 'all 0.3s'
                            }}
                          >
                            <Play size={12} fill={isActive ? 'var(--bg-deep)' : 'none'} />
                          </div>
                        </div>

                        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-light)', fontWeight: 600, marginTop: '8px', lineHeight: 1.3 }}>
                          {video.title}
                        </h4>

                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '8px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {video.desc}
                        </p>
                      </div>

                      {/* Card Footer Info */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={12} />
                          <span>{video.views}</span>
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                          {video.duration}
                        </span>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </div>

        {/* YouTube Channel Redirect Callout */}
        <ScrollReveal>
          <div
            className="glass-panel-gold"
            style={{
              padding: '48px',
              borderRadius: '28px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              background: 'radial-gradient(circle at 10% 20%, rgba(179, 157, 219, 0.08) 0%, rgba(8, 9, 20, 0.95) 80%)'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '180px',
                height: '180px',
                background: 'radial-gradient(circle, rgba(184, 134, 11, 0.05) 0%, transparent 70%)',
                pointerEvents: 'none'
              }}
            />

            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-gold-glass)', color: '#FF0000', marginBottom: '20px' }}>
              <YoutubeIcon size={28} />
            </div>

            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--text-light)', fontWeight: 600 }}>
              Want to see more event stagings?
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '12px auto 28px', lineHeight: 1.6 }}>
              We regularly upload full showreels, drone recordings, and live footage of concerts, VIP lounges, and royal stages on our official YouTube channel. Subscribe to stay updated with our landmark designs.
            </p>

            <a
              href="https://www.youtube.com/channel/UCqFiPY10An7YcC6XV9pgZCQ"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn glass-btn-gold clickable"
              style={{
                padding: '14px 36px',
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span>Explore Official YouTube Channel</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
