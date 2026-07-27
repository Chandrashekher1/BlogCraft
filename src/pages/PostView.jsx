import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { post_API, sample_image } from '../utils/constant';
import parse from 'html-react-parser';
import he from 'he';
import { motion } from 'framer-motion';
import { User, Calendar, Heart, Bookmark, Share2, Link2, Clock, ArrowLeft } from 'lucide-react';

const PostView = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const token = localStorage.getItem('authorization');
  const navigate = useNavigate();
  const contentRef = useRef(null);

  useEffect(() => {
    if (!id || !token) {
      navigate('/login');
      return;
    }
    const fetchPost = async () => {
      try {
        const response = await fetch(`${post_API}/${id}`, {
          method: 'GET',
          headers: { Authorization: `${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch');
        const postJson = await response.json();
        setPostData(postJson);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPost();
  }, [id, token]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      const progress = total > 0 ? (el.scrollTop / total) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!postData) {
    return (
      <div style={{ background: '#F6F4EF', minHeight: 'calc(100vh - 144px)', padding: '64px 32px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="skeleton" style={{ height: '20px', width: '120px' }} />
          <div className="skeleton" style={{ height: '48px', width: '80%' }} />
          <div className="skeleton" style={{ height: '20px', width: '40%' }} />
          <div className="skeleton" style={{ height: '400px', borderRadius: '20px', marginTop: '16px' }} />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: '16px', width: `${75 + Math.random() * 20}%` }} />
          ))}
        </div>
      </div>
    );
  }

  const date = new Date(postData.date).toLocaleDateString([], {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const wordCount = postData.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <>
      {/* Reading Progress Bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          width: `${scrollProgress}%`,
          background: '#A8B58A',
          zIndex: 9999,
          transition: 'width 0.1s linear',
        }}
      />

      <div style={{ background: '#F6F4EF', minHeight: 'calc(100vh - 144px)', padding: '48px 32px 96px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          {/* Back */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate('/')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '12px',
              border: '1px solid #E7E2D8',
              background: '#FFFFFF',
              color: '#6B6B63',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              marginBottom: '40px',
              transition: 'all 0.2s ease',
            }}
          >
            <ArrowLeft size={15} strokeWidth={1.75} />
            Back
          </motion.button>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#7A8F5A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  background: 'rgba(168,181,138,0.12)',
                  border: '1px solid rgba(168,181,138,0.25)',
                  padding: '3px 10px',
                  borderRadius: '999px',
                }}
              >
                Article
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#94948C' }}>
                <Clock size={13} strokeWidth={1.75} />
                {readTime} min read
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: 'Instrument Serif, serif',
                fontSize: 'clamp(30px, 5vw, 44px)',
                lineHeight: 1.15,
                color: '#1D1D1B',
                fontWeight: 400,
                marginBottom: '24px',
              }}
            >
              {postData.title}
            </h1>

            {/* Author row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                padding: '16px 0',
                borderTop: '1px solid #EAE7E2',
                borderBottom: '1px solid #EAE7E2',
                marginBottom: '40px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '999px',
                    background: '#EFEAE2',
                    border: '1px solid #E7E2D8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <User size={18} color="#6B6B63" strokeWidth={1.75} />
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#1D1D1B' }}>{postData.author || 'Unknown'}</p>
                  <p style={{ fontSize: '13px', color: '#94948C', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} strokeWidth={1.75} />
                    {date}
                  </p>
                </div>
              </div>

              {/* Floating Actions */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { icon: Heart, active: liked, onClick: () => setLiked(!liked), activeColor: '#C66B63' },
                  { icon: Bookmark, active: bookmarked, onClick: () => setBookmarked(!bookmarked), activeColor: '#A8B58A' },
                  { icon: Share2, active: false, onClick: () => {}, activeColor: '#91A7C8' },
                  { icon: Link2, active: copied, onClick: handleCopyLink, activeColor: '#B88C64', label: copied ? 'Copied!' : '' },
                ].map(({ icon: Icon, active, onClick, activeColor }, idx) => (
                  <button
                    key={idx}
                    onClick={onClick}
                    title={['Like', 'Bookmark', 'Share', copied ? 'Copied!' : 'Copy link'][idx]}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      border: '1px solid #E7E2D8',
                      background: active ? `${activeColor}18` : '#FFFFFF',
                      color: active ? activeColor : '#6B6B63',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </button>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            {Array.isArray(postData.image) && postData.image.length > 0 ? (
              <img
                src={postData.image[0]}
                alt={postData.title}
                style={{
                  width: '100%',
                  height: '420px',
                  objectFit: 'cover',
                  borderRadius: '24px',
                  marginBottom: '48px',
                  border: '1px solid #F0ECE5',
                }}
                onError={e => {
                  e.currentTarget.src = sample_image;
                }}
              />
            ) : (
              <img
                src={sample_image}
                alt="Default"
                style={{
                  width: '100%',
                  height: '420px',
                  objectFit: 'cover',
                  borderRadius: '24px',
                  marginBottom: '48px',
                  border: '1px solid #F0ECE5',
                }}
              />
            )}

            {/* Content */}
            <div ref={contentRef} className="prose-content">
              {parse(he.decode(postData.content))}
            </div>
          </motion.div>
        </div>
      </div>

      {copied && (
        <div className="toast success">Link copied to clipboard!</div>
      )}
    </>
  );
};

export default PostView;
