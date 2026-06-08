import Link from 'next/link';
import { ArrowLeft, Sparkles, CheckCircle, ShieldCheck, Flame, Hourglass } from 'lucide-react';
import Navbar from '@/components/Navbar';
import MultiStepWizard from '@/components/MultiStepWizard';

interface ServiceData {
  title: string;
  subtitle: string;
  longDesc: string;
  image: string;
  accent: string;
  specs: string[];
  stages: string[];
}

const serviceCatalog: Record<string, ServiceData> = {
  'wedding-planning': {
    title: 'Dream Wedding Planning',
    subtitle: 'Royal Canopies & Magical Scenography',
    longDesc: 'We design fairytale architectures featuring full-canopy ivory draping, floating crystal chandeliers, custom runway aisles, and luxury floral columns. Every detail is modeled in 3D to ensure absolute symmetry.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    accent: 'var(--gold)',
    specs: ['Bespoke Mandap & Altars', 'High-density floral setups', 'Drape fabrics & styling', 'Runway production mapping'],
    stages: ['Concept Modeling', 'Render Walkthrough', 'Permit Signoff', 'Active Staging Build'],
  },
  'corporate-events': {
    title: 'Corporate Galas & Summits',
    subtitle: 'Sleek Layouts & LED Media Systems',
    longDesc: 'We construct premium boardrooms, stage backdrops, and media panel systems designed for flawless broadcast quality. Integrated with wide-format modular LED screens and clean cyan highlights.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    accent: 'var(--cyan)',
    specs: ['LED Backdrop Screens', 'Panel speaker setups', 'Branded registration arches', 'Ultra-clear speech sound rigs'],
    stages: ['Objective Alignment', 'Structural calculations', 'Media feed configuration', 'Summit Staging Launch'],
  },
  'birthday-celebrations': {
    title: 'Birthday Celebrations',
    subtitle: 'Neon Staging & Immersive Themes',
    longDesc: 'High-energy private celebrations featuring dynamic neon signs, custom geometric backdrops, balloon cascade tunnels, and synchronized lighting rigs. Ideal for landmark milestone celebrations.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    accent: 'var(--purple)',
    specs: ['Custom neon logo pieces', 'Modular geometric panels', 'Multi-tiered accent lighting', 'Thematic photobooth arrays'],
    stages: ['Vibe selection', 'Accent piece blueprinting', 'Balloon setup prep', 'Showtime execution'],
  },
  'destination-weddings': {
    title: 'Destination Weddings',
    subtitle: 'Scenic Venues & Global Coordination',
    longDesc: 'We dispatch specialized rigging and planning squads worldwide. From ocean-front glass canopies in the Maldives to medieval castle staging in Italy, we orchestrate all shipping, customs, and vendor routes.',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
    accent: 'var(--gold)',
    specs: ['Cross-border custom rig shipping', 'Multi-lingual local vendor sync', 'All-weather staging covers', 'Travel concierge services'],
    stages: ['Global routing plan', 'Local permits clearance', 'Scenic asset pre-shipping', 'Remote Staging build'],
  },
  'product-launches': {
    title: 'Product Launches',
    subtitle: 'Cinematic Spectacle & Laser Reveals',
    longDesc: 'Transform product reveals into historic moments. Using custom projection mapping to project media onto raw car bodies, high-tech hardware, or large architectural surfaces, supported by automated laser sweeps.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    accent: 'var(--magenta)',
    specs: ['3D Projector Arrays (20K Lumens)', 'FDA-compliant laser systems', 'Hydraulic stage elevator sync', 'Spatial sound arrays'],
    stages: ['Media asset mapping', 'Laser timeline programming', 'Safety validation run', 'Show reveal launch'],
  },
  'exhibition-management': {
    title: 'Exhibition Management',
    subtitle: 'Floor Blueprints & Innovative Stalls',
    longDesc: 'Custom industrial floor plans designed for ease of traffic flow and high lead engagement. We build modular aluminum frames, elevated glass floors, and interactive display consoles for premium brand spaces.',
    image: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&w=1200&q=80',
    accent: 'var(--cyan)',
    specs: ['Elevated glass booth floors', 'Modular aluminum frames', 'Interactive product plinths', 'Double-decker VIP spaces'],
    stages: ['Exhibition floor sync', 'CAD layout design', 'Electrical routing plan', 'Staging build completion'],
  },
  'live-concerts': {
    title: 'Live Concert Staging',
    subtitle: 'Stadium Truss Rigging & Line Arrays',
    longDesc: 'Professional heavy rigging designed to support tens of tons of sound, lighting, and video arrays. Our structural engineers verify load calculations to guarantee safety in any open arena or stadium.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    accent: 'var(--purple)',
    specs: ['Certified aluminum ground supports', 'L-Acoustics line array layouts', 'Strobe lighting banks', 'Pyrotechnic stage integration'],
    stages: ['Load weight calculations', 'Rigging point plot mapping', 'Sound coverage analysis', 'Soundcheck & Staging launch'],
  },
  'private-parties': {
    title: 'Private Parties',
    subtitle: 'Sleek Lounge Staging & Mixology Sets',
    longDesc: 'Elevate private gatherings with glass lounge bars, premium velvet furniture, custom mixology stations, and intimate DJ pods designed for exclusive celebrity and private residences.',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
    accent: 'var(--magenta)',
    specs: ['Illuminated acrylic bars', 'Premium lounge setups', 'Bespoke DJ console skins', 'VIP security entry staging'],
    stages: ['Residence space analysis', 'Acoustic containment planning', 'Furniture curation', 'Staging layout finish'],
  },
  'social-events': {
    title: 'Social & Charity Galas',
    subtitle: 'Grand Banquets & Interactive Pavilions',
    longDesc: 'We orchestrate large scale community fundraisers, charity galas, and VIP awards events. Features include custom registration spaces, interactive sponsor photo-walls, and fine dining staging.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    accent: 'var(--cyan)',
    specs: ['Sponsor logo step-and-repeats', 'Interactive raffle pavilions', 'Stage ramp accesses', 'Silent auction podiums'],
    stages: ['Guest path analysis', 'Floorplan drafting', 'AV checkouts', 'Doors open execution'],
  },
  'luxury-events': {
    title: 'Luxury Staging Experiences',
    subtitle: 'VIP Staging & Creative Direction',
    longDesc: 'The pinnacle of bespoke event production. We assemble signature concepts, high-end engineering, and elite performance rosters to present unmatched digital and physical immersive staging.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    accent: 'var(--gold)',
    specs: ['Holographic projection screens', 'Kinetic light sculptures', 'Dedicated VIP concierge managers', 'Signature custom fragrance staging'],
    stages: ['Creative concept pitching', 'WebGL prototyping', 'Hardware fabrication', 'Global live execution'],
  },
};

interface Params {
  id: string;
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const data = serviceCatalog[id] || serviceCatalog['wedding-planning'];

  return (
    <>
      <Navbar />
      
      {/* Background radial glow */}
      <div
        className="gradient-bg-radial"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <section
        style={{
          position: 'relative',
          paddingTop: '160px',
          paddingBottom: '100px',
          zIndex: 2,
        }}
      >
        <div className="container">
          {/* Back Button */}
          <Link
            href="/"
            className="glass-btn clickable"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              fontSize: '0.85rem',
              marginBottom: '40px',
            }}
          >
            <ArrowLeft size={14} />
            <span>Back to Showroom</span>
          </Link>

          {/* Staging Layout Info */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: '50px',
              alignItems: 'start',
            }}
            className="service-detail-grid"
          >
            {/* Left Column: Image & Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div
                style={{
                  position: 'relative',
                  height: '420px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-glass)',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                }}
              >
                <img
                  src={data.image}
                  alt={data.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Sparkles size={16} style={{ color: data.accent }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: data.accent, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    {data.subtitle}
                  </span>
                </div>
                <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-light)', marginBottom: '20px' }}>
                  {data.title}
                </h1>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '1.05rem' }}>
                  {data.longDesc}
                </p>
              </div>
            </div>

            {/* Right Column: Specs & Stages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* Staging specs panel */}
              <div className="glass-panel" style={{ padding: '36px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-light)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} style={{ color: data.accent }} />
                  <span>Staging Specifications</span>
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {data.specs.map((spec, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: data.accent }} />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Execution stages timeline panel */}
              <div className="glass-panel" style={{ padding: '36px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-light)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Flame size={18} style={{ color: data.accent }} />
                  <span>Production Stages</span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {data.stages.map((stage, i) => (
                    <div key={i} style={{ display: 'flex', gap: '16px' }}>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: data.accent,
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: `1.5px solid ${data.accent}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 600 }}>{stage}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="glass-panel-gold" style={{ padding: '30px', textAlign: 'center' }}>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-light)', marginBottom: '8px' }}>
                  Design This Blueprint
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Let's initialize our 3D staging sandbox to mock your venue layout.
                </p>
                <Link
                  href="/"
                  className="glass-btn glass-btn-gold clickable"
                  style={{ display: 'block', width: '100%', padding: '12px 0' }}
                >
                  Configure Staging
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global popup modals */}
      <MultiStepWizard />
    </>
  );
}
