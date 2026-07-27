import React from 'react';
import { Link } from 'react-router-dom';
import { PenLine } from 'lucide-react';
import SocialIcons from './SocialIcon';

const Footer = () => {
  return (
    <footer
      style={{
        background: '#FCFBF8',
        borderTop: '1px solid #EAE7E2',
        padding: '48px 32px 32px',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '32px',
            marginBottom: '40px',
          }}
        >
          {/* Brand */}
          <div>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  background: '#1D1D1B',
                  borderRadius: '9px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PenLine size={14} color="#F6F4EF" strokeWidth={1.75} />
              </div>
              <span
                style={{
                  fontFamily: 'Instrument Serif, serif',
                  fontSize: '20px',
                  color: '#1D1D1B',
                }}
              >
                BlogCraft
              </span>
            </Link>
            <p
              style={{
                fontSize: '14px',
                color: '#94948C',
                maxWidth: '240px',
                lineHeight: '1.6',
              }}
            >
              A premium editorial platform for writers and readers who care about craft.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#94948C',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '12px',
                }}
              >
                Platform
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { to: '/', label: 'Home' },
                  { to: '/create-post', label: 'Write' },
                  { to: '/blog-generator', label: 'AI Generator' },
                ].map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    style={{
                      fontSize: '14px',
                      color: '#6B6B63',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#1D1D1B')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#6B6B63')}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: '1px solid #EAE7E2',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <p style={{ fontSize: '13px', color: '#94948C' }}>
            Crafted by{' '}
            <span style={{ fontWeight: 600, color: '#6B6B63' }}>Chandrashekher</span>{' '}
            &copy; 2025
          </p>
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
