'use client';

import { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const initialTheme = savedTheme || 'dark';
    setCurrentTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Determine background transparency based on scroll height
      setScrolled(currentScrollPos > 50);

      // Slide up navbar when scrolling down, show when scrolling up
      if (currentScrollPos > 200) {
        setVisible(prevScrollPos > currentScrollPos);
      } else {
        setVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const triggerWizard = () => {
    if (typeof window !== 'undefined' && (window as any).openConsultationWizard) {
      (window as any).openConsultationWizard();
    }
  };

  const navLinks = [
    { name: 'Services', href: '#services', isExternal: false },
    { name: 'Portfolio', href: '#portfolio', isExternal: false },
    { name: 'Journey', href: '#journey', isExternal: false },
    { name: 'Calculator', href: '#calculator', isExternal: false },
    { name: 'Pricing', href: '#pricing', isExternal: false },
    { name: 'Video Reels', href: '/work', isExternal: true },
    { name: 'FAQ', href: '#faq', isExternal: false },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '80px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s, border-color 0.4s, backdrop-filter 0.4s',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        backgroundColor: scrolled ? 'var(--bg-nav)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-glass)' : '1px solid transparent',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {/* Logo Image */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
          }}
          className="clickable"
        >
          <img
            src="/logo.png"
            alt="Eventoss Logo"
            style={{
              height: '38px',
              objectFit: 'contain',
              filter: currentTheme === 'dark' ? 'brightness(0) invert(1)' : 'brightness(0.15)', // Convert logo dark pixels to glowing white in dark mode, keep dark in light mode
              transition: 'filter 0.3s ease',
            }}
          />
        </Link>

        {/* Desktop Links */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 'clamp(10px, 1.8vw, 32px)',
          }}
          className="desktop-menu-container"
        >
          {navLinks.map((link) => {
            return link.isExternal ? (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-muted)',
                  fontWeight: 500,
                  fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)',
                  transition: 'color 0.25s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--purple)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={`/${link.href}`}
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-muted)',
                  fontWeight: 500,
                  fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)',
                  transition: 'color 0.25s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--purple)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* CTA Button & Theme Toggle */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '16px',
          }}
          className="desktop-menu-cta"
        >
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="clickable"
            title={`Switch to ${currentTheme === 'dark' ? 'Light' : 'Dark'} Mode`}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-glass)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-light)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'var(--purple)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'var(--border-glass)';
            }}
          >
            {currentTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={triggerWizard}
            className="glass-btn glass-btn-primary"
            style={{
              padding: '10px 22px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <PhoneCall size={14} />
            <span>Book Consultation</span>
          </button>
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-light)',
            cursor: 'none',
            display: 'block',
          }}
          className="mobile-menu-toggle"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          width: '100%',
          height: 'calc(100vh - 80px)',
          backgroundColor: 'var(--bg-deep)',
          borderTop: '1px solid var(--border-glass)',
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          zIndex: 999,
          padding: '24px',
          transition: 'all 0.3s ease',
        }}
      >
        {navLinks.map((link) => {
          return link.isExternal ? (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                textDecoration: 'none',
                color: 'var(--text-light)',
                fontSize: '1.5rem',
                fontWeight: 600,
                fontFamily: 'var(--font-display)',
              }}
            >
              {link.name}
            </Link>
          ) : (
            <a
              key={link.name}
              href={`/${link.href}`}
              onClick={() => setIsOpen(false)}
              style={{
                textDecoration: 'none',
                color: 'var(--text-light)',
                fontSize: '1.5rem',
                fontWeight: 600,
                fontFamily: 'var(--font-display)',
              }}
            >
              {link.name}
            </a>
          );
        })}
        <button
          onClick={() => {
            setIsOpen(false);
            triggerWizard();
          }}
          className="glass-btn glass-btn-gold"
          style={{
            fontSize: '1.1rem',
            padding: '14px 36px',
          }}
        >
          Book Consultation
        </button>

        {/* Mobile Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="glass-btn clickable"
          style={{
            fontSize: '1rem',
            padding: '10px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '-10px',
            borderColor: 'var(--border-glass)',
          }}
        >
          {currentTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span>{currentTheme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
        </button>
      </div>
    </nav>
  );
}
