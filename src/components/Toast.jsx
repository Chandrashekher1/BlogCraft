import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const icons = {
  success: <CheckCircle size={16} strokeWidth={1.75} />,
  error: <AlertCircle size={16} strokeWidth={1.75} />,
  info: <Info size={16} strokeWidth={1.75} />,
};

const colors = {
  success: {
    bg: '#FFFFFF',
    border: '#D6E5C8',
    icon: '#7E9D63',
    text: '#1D1D1B',
    bar: '#A8B58A',
  },
  error: {
    bg: '#FFFFFF',
    border: '#F0CECE',
    icon: '#C66B63',
    text: '#1D1D1B',
    bar: '#C66B63',
  },
  info: {
    bg: '#FFFFFF',
    border: '#D0DCEB',
    icon: '#91A7C8',
    text: '#1D1D1B',
    bar: '#91A7C8',
  },
};

const Toast = ({ toasts, removeToast }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {toasts.map((t) => {
          const c = colors[t.type] || colors.info;
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                pointerEvents: 'all',
                background: c.bg,
                border: `1px solid ${c.border}`,
                borderRadius: '14px',
                boxShadow: '0 8px 24px rgba(0,0,0,.08)',
                minWidth: '280px',
                maxWidth: '360px',
                overflow: 'hidden',
              }}
            >
              {/* Progress bar */}
              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: t.duration / 1000, ease: 'linear' }}
                style={{
                  height: '2px',
                  background: c.bar,
                  transformOrigin: 'left',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '14px 16px',
                }}
              >
                <span style={{ color: c.icon, flexShrink: 0, marginTop: '1px' }}>
                  {icons[t.type]}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {t.title && (
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: c.text,
                        marginBottom: t.message ? '2px' : 0,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {t.title}
                    </p>
                  )}
                  {t.message && (
                    <p
                      style={{
                        fontSize: '13px',
                        color: '#6B6B63',
                        lineHeight: 1.5,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {t.message}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeToast(t.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94948C',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0,
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#1D1D1B')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94948C')}
                >
                  <X size={14} strokeWidth={1.75} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
