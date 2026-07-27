import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PenLine, Sparkles, BookOpen, Users, ArrowRight } from 'lucide-react';
import Postcard from '../components/PostCard';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const features = [
  {
    icon: PenLine,
    title: 'Notion-Style Editor',
    desc: 'A distraction-free writing experience with rich text tools that stay out of your way.',
  },
  {
    icon: Users,
    title: 'Growing Community',
    desc: 'Connect with thoughtful writers and readers from around the world.',
  },
  {
    icon: Sparkles,
    title: 'AI Assistance',
    desc: 'Generate ideas, overcome writer\'s block, and polish your prose with built-in AI.',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('userId');

  return (
    <div style={{ background: '#F6F4EF' }}>
      {/* ===== HERO ===== */}
      <section
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '96px 32px 80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          style={{ marginBottom: '24px' }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid #E7E2D8',
              background: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 500,
              color: '#6B6B63',
              letterSpacing: '0.01em',
            }}
          >
            <Sparkles size={13} strokeWidth={1.75} color="#A8B58A" />
            Now with AI-powered writing assistance
          </span>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: 'clamp(40px, 7vw, 72px)',
            lineHeight: 1.1,
            color: '#1D1D1B',
            maxWidth: '820px',
            marginBottom: '24px',
            fontWeight: 400,
          }}
        >
          Where great stories find their voice
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          style={{
            fontSize: '18px',
            color: '#6B6B63',
            maxWidth: '540px',
            lineHeight: 1.8,
            marginBottom: '40px',
          }}
        >
          Join a community of thoughtful writers and curious readers. Create, share, and discover stories that inspire.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button
            className="btn btn-primary"
            onClick={() => navigate('/create-post')}
            style={{ gap: '8px' }}
          >
            <PenLine size={16} strokeWidth={1.75} />
            Start Writing
          </button>

          {user && (
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/blog-generator')}
              style={{ gap: '8px' }}
            >
              <Sparkles size={16} strokeWidth={1.75} />
              Try AI Writer
            </button>
          )}
        </motion.div>
      </section>

      {/* ===== FEATURES ===== */}
      <section style={{ padding: '96px 32px', maxWidth: '1440px', margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <h2
            style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: '38px',
              color: '#1D1D1B',
              marginBottom: '12px',
              fontWeight: 400,
            }}
          >
            Everything you need to write brilliantly
          </h2>
          <p style={{ fontSize: '16px', color: '#6B6B63', maxWidth: '440px', margin: '0 auto' }}>
            A focused set of tools built for the modern writer.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E9E4DB',
                borderRadius: '24px',
                padding: '28px',
                boxShadow: '0 8px 24px rgba(0,0,0,.05)',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'rgba(168, 181, 138, 0.12)',
                  border: '1px solid rgba(168, 181, 138, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <Icon size={22} color="#A8B58A" strokeWidth={1.75} />
              </div>
              <h3
                style={{
                  fontFamily: 'Instrument Serif, serif',
                  fontSize: '22px',
                  color: '#1D1D1B',
                  marginBottom: '10px',
                  fontWeight: 400,
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: '15px', color: '#6B6B63', lineHeight: 1.7 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== AI CTA (logged in) ===== */}
      {user && (
        <section
          style={{
            padding: '0 32px 80px',
            maxWidth: '1440px',
            margin: '0 auto',
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{
              background: '#1D1D1B',
              borderRadius: '32px',
              padding: '56px 48px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '32px',
            }}
          >
            <div style={{ maxWidth: '480px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  border: '1px solid rgba(168,181,138,0.3)',
                  background: 'rgba(168,181,138,0.1)',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#A8B58A',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                <Sparkles size={12} strokeWidth={1.75} />
                Powered by Gemini
              </div>
              <h2
                style={{
                  fontFamily: 'Instrument Serif, serif',
                  fontSize: '34px',
                  color: '#F6F4EF',
                  marginBottom: '14px',
                  fontWeight: 400,
                  lineHeight: 1.25,
                }}
              >
                Beat writer's block with AI
              </h2>
              <p style={{ color: '#94948C', fontSize: '15px', lineHeight: 1.7 }}>
                Give it a topic and your AI assistant will craft a complete, publication-ready article in seconds.
              </p>
            </div>
            <button
              className="btn btn-accent"
              onClick={() => navigate('/blog-generator')}
              style={{ gap: '8px', height: '52px', padding: '0 28px', fontSize: '15px' }}
            >
              <Sparkles size={16} strokeWidth={1.75} />
              Generate with AI
              <ArrowRight size={16} strokeWidth={1.75} />
            </button>
          </motion.div>
        </section>
      )}

      {/* ===== POSTS FEED ===== */}
      <section
        style={{
          borderTop: '1px solid #EAE7E2',
          padding: '80px 32px 96px',
          background: '#FFFFFF',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{ marginBottom: '48px' }}
          >
            <p
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#94948C',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '8px',
              }}
            >
              Latest
            </p>
            <h2
              style={{
                fontFamily: 'Instrument Serif, serif',
                fontSize: '38px',
                color: '#1D1D1B',
                fontWeight: 400,
              }}
            >
              Stories from the community
            </h2>
          </motion.div>

          <Postcard />
        </div>
      </section>
    </div>
  );
};

export default Home;
