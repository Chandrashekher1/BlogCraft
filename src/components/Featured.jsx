import React from 'react';
import { BookOpen, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: BookOpen,
    title: 'Easy Publishing',
    desc: 'Create and publish your stories with our intuitive editor and AI assistance.',
  },
  {
    icon: Users,
    title: 'Growing Community',
    desc: 'Connect with readers and writers from around the world.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered',
    desc: 'Generate content ideas and overcome writer\'s block with AI.',
  },
];

const Featured = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
      {features.map(({ icon: Icon, title, desc }, i) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
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
              fontSize: '20px',
              color: '#1D1D1B',
              fontWeight: 400,
              marginBottom: '8px',
            }}
          >
            {title}
          </h3>
          <p style={{ fontSize: '14px', color: '#6B6B63', lineHeight: 1.7 }}>{desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Featured;