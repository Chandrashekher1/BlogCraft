import React, { useEffect, useState } from 'react';
import { post_API } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import he from 'he';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Postcard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(post_API);
        if (!response.ok) throw new Error('Failed to fetch posts');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/post-view/${postId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getReadTime = (content) => {
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E9E4DB',
              borderRadius: '24px',
              padding: '24px',
              display: 'flex',
              gap: '24px',
              alignItems: 'flex-start',
            }}
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="skeleton" style={{ height: '14px', width: '80px' }} />
              <div className="skeleton" style={{ height: '26px', width: '70%' }} />
              <div className="skeleton" style={{ height: '14px', width: '90%' }} />
              <div className="skeleton" style={{ height: '14px', width: '60%' }} />
            </div>
            <div
              className="skeleton"
              style={{ width: '200px', height: '130px', borderRadius: '16px', flexShrink: 0 }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '64px 24px',
          color: '#94948C',
          fontSize: '16px',
        }}
      >
        <p>No stories yet. Be the first to write one.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {data.map((post, i) => {
        const readTime = getReadTime(post.content);
        const cleanExcerpt = he
          .decode(post.content)
          .replace(/<[^>]*>/g, '')
          .slice(0, 140);

        return (
          <motion.article
            key={post._id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            onClick={() => handlePostClick(post._id)}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E9E4DB',
              borderRadius: '24px',
              padding: '24px',
              display: 'flex',
              gap: '24px',
              alignItems: 'flex-start',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,.04)',
              transition: 'box-shadow 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,.04)';
            }}
          >
            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  flexWrap: 'wrap',
                }}
              >
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
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '13px',
                    color: '#94948C',
                  }}
                >
                  <Clock size={13} strokeWidth={1.75} />
                  {readTime} min read
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'Instrument Serif, serif',
                  fontSize: '22px',
                  color: '#1D1D1B',
                  fontWeight: 400,
                  lineHeight: 1.3,
                  marginBottom: '10px',
                }}
              >
                {post.title}
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  color: '#6B6B63',
                  lineHeight: 1.7,
                  marginBottom: '16px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {cleanExcerpt}...
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '13px', color: '#94948C' }}>
                  By <strong style={{ color: '#6B6B63', fontWeight: 500 }}>{post.author}</strong>
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '13px',
                    color: '#A8B58A',
                    fontWeight: 500,
                  }}
                >
                  Read more <ArrowRight size={14} strokeWidth={1.75} />
                </span>
              </div>
            </div>

            {/* Image */}
            <div style={{ flexShrink: 0 }} className="hide-mobile">
              <img
                src={
                  post?.image?.length > 0
                    ? post.image[0]
                    : 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80'
                }
                alt={post.title}
                style={{
                  width: '200px',
                  height: '130px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  border: '1px solid #F0ECE5',
                }}
                onError={e => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80';
                }}
              />
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};

export default Postcard;
