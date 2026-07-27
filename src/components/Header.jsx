import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PenLine, Sparkles, User, Menu, X } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, userImage } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleAuthClick = () => {
    scrollTop();
    navigate(token ? '/profile' : '/login');
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          height: '72px',
          background: scrolled
            ? 'rgba(246,244,239,0.92)'
            : 'rgba(246,244,239,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid #ECE7DE',
          boxShadow: scrolled ? '0 4px 18px rgba(0,0,0,.04)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 32px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={scrollTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                background: '#1D1D1B',
                borderRadius: '9px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PenLine size={16} color="#F6F4EF" strokeWidth={1.75} />
            </div>
            <span
              style={{
                fontFamily: 'Instrument Serif, serif',
                fontSize: '22px',
                color: '#1D1D1B',
                letterSpacing: '-0.01em',
              }}
            >
              BlogCraft
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hide-mobile"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Link to="/blog-generator" onClick={scrollTop}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  border: '1px solid transparent',
                  background: 'transparent',
                  color: '#6B6B63',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#EFEAE2';
                  e.currentTarget.style.color = '#1D1D1B';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#6B6B63';
                }}
              >
                <Sparkles size={16} strokeWidth={1.75} />
                AI Writer
              </button>
            </Link>

            <Link to="/create-post" onClick={scrollTop}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 18px',
                  borderRadius: '14px',
                  border: '1px solid #E6E3DC',
                  background: '#FFFFFF',
                  color: '#1D1D1B',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#F7F5F1';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#FFFFFF';
                }}
              >
                <PenLine size={15} strokeWidth={1.75} />
                Write
              </button>
            </Link>

            <button
              onClick={handleAuthClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 6px',
                borderRadius: '999px',
                border: '1px solid transparent',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {token ? (
                userImage && userImage.trim() !== '' ? (
                  <img
                    src={userImage}
                    alt="Avatar"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '999px',
                      objectFit: 'cover',
                      border: '2px solid #E7E2D8',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '999px',
                      background: '#EFEAE2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <User size={16} color="#6B6B63" strokeWidth={1.75} />
                  </div>
                )
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    border: '1px solid transparent',
                    background: 'transparent',
                    color: '#6B6B63',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <User size={16} strokeWidth={1.75} />
                  Sign In
                </div>
              )}
            </button>
          </nav>

          {/* Mobile */}
          <div className="show-mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleAuthClick}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            >
              {token && userImage && userImage.trim() !== '' ? (
                <img
                  src={userImage}
                  alt="Avatar"
                  style={{ width: '32px', height: '32px', borderRadius: '999px', objectFit: 'cover' }}
                />
              ) : (
                <User size={20} color="#6B6B63" strokeWidth={1.75} />
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            >
              {mobileOpen
                ? <X size={22} color="#1D1D1B" strokeWidth={1.75} />
                : <Menu size={22} color="#1D1D1B" strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '72px',
              left: 0,
              right: 0,
              background: 'rgba(246,244,239,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid #ECE7DE',
              zIndex: 99,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <Link to="/" style={{ padding: '12px 16px', borderRadius: '12px', color: '#1D1D1B', fontWeight: 500, fontSize: '15px' }}>
              Home
            </Link>
            <Link to="/blog-generator" style={{ padding: '12px 16px', borderRadius: '12px', color: '#6B6B63', fontWeight: 500, fontSize: '15px' }}>
              AI Writer
            </Link>
            <Link to="/create-post" style={{ padding: '12px 16px', borderRadius: '12px', color: '#6B6B63', fontWeight: 500, fontSize: '15px' }}>
              Write a Post
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;