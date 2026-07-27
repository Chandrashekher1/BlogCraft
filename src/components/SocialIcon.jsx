import React from 'react';
import { Twitter, Linkedin, Instagram } from 'lucide-react';

const SocialIcons = () => {
  const socials = [
    { href: 'https://x.com/cpsaw03', icon: Twitter, label: 'Twitter' },
    { href: 'https://www.linkedin.com/in/chandrashekher-prasad-a496a2293/', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://www.instagram.com/_chandrashekher_03/', icon: Instagram, label: 'Instagram' },
  ];

  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      {socials.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            border: '1px solid #E7E2D8',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6B6B63',
            transition: 'all 0.2s ease',
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#F2EFE9';
            e.currentTarget.style.color = '#1D1D1B';
            e.currentTarget.style.borderColor = '#D4CFC6';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#FFFFFF';
            e.currentTarget.style.color = '#6B6B63';
            e.currentTarget.style.borderColor = '#E7E2D8';
          }}
        >
          <Icon size={16} strokeWidth={1.75} />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;