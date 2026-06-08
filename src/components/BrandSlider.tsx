'use client';

export default function BrandSlider() {
  const brands = [
    { name: 'Vogue Galas', logo: 'VOGUE' },
    { name: 'Tesla Summits', logo: 'TESLA' },
    { name: 'Samsung Shows', logo: 'SAMSUNG' },
    { name: 'Rolex Events', logo: 'ROLEX' },
    { name: 'Mercedes VIP', logo: 'MERCEDES' },
    { name: 'Google Panels', logo: 'GOOGLE' },
  ];

  return (
    <section
      style={{
        padding: '50px 0',
        background: 'rgba(2, 2, 8, 0.95)',
        borderBottom: '1px solid var(--border-glass)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '30px',
            fontWeight: 600,
          }}
        >
          Partnered with the World's Leading Brands
        </p>

        {/* Marquee Wrapper */}
        <div className="marquee-wrapper">
          <div className="marquee-moving-list">
            {/* Double the list for infinite looping */}
            {[...brands, ...brands, ...brands].map((brand, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.08)',
                  transition: 'color 0.3s',
                }}
                className="clickable brand-logo"
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.08)')}
              >
                {brand.logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
