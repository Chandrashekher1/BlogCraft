import React, { useRef, useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Copy, Check, Settings, BookOpen, Lightbulb, RefreshCw } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Quill from './Quill';
import Toast from './Toast';
import useToast from '../utils/useToast';

const BlogGenerator = () => {
  const [content, setContent] = useState('');
  const query = useRef();
  const tone = useRef();
  const contentLength = useRef();
  const keywords = useRef();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toasts, toast, removeToast } = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem('authorization');

  const getAiClient = () => {
    const apiKey = import.meta.env.VITE_GPT_API_KEY;
    if (!apiKey || !apiKey.trim()) {
      throw new Error('Gemini API key is missing. Please set VITE_GPT_API_KEY in your .env file.');
    }
    return new GoogleGenAI({ apiKey });
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    const topic = query.current.value.trim();
    const selectedTone = tone.current.value;
    const selectedLength = contentLength.current.value;
    const keywordInput = keywords.current.value.trim();

    if (!topic) {
      toast.error('Topic required', 'Please enter a blog topic before generating.');
      return;
    }
    setLoading(true);
    setContent('');

    try {
      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `
Write a beautifully structured blog post on the topic: "${topic}".
Use the writing tone: "${selectedTone}" and length: "${selectedLength}".
Include keywords: "${keywordInput}".
Break it into: Introduction, Key sections with meaningful subheadings, A thoughtful conclusion.
- Start with a <h1> title containing the topic.
- Use <h2> and <h3> for section headers.
- Use valid HTML content only (<p>, <ul>, <li>, <strong>, <em>, etc.).
- Do NOT include <!DOCTYPE>, <html>, <head>, or <body> tags.
- Do NOT include markdown or any explanation.
- The result must be pure HTML blog content.
- Focus on storytelling, readability, and depth of thought.`,
      });
      setContent(response.text);
      toast.success('Article generated!', 'Your blog post is ready to review.');
    } catch (err) {
      console.error(err);
      toast.error('Generation failed', err.message || 'Could not connect to AI. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    toast.success('Copied!', 'Article content copied to clipboard.');
  };

  const tips = [
    'Be specific with your topic for better results',
    'Include relevant keywords to improve SEO',
    'Choose the right tone for your audience',
  ];

  return (
    <div style={{ background: '#F6F4EF', minHeight: 'calc(100vh - 144px)', padding: '48px 32px 96px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '20px',
              background: '#1D1D1B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <Sparkles size={26} color="#A8B58A" strokeWidth={1.75} />
          </div>
          <h1
            style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: '40px',
              color: '#1D1D1B',
              fontWeight: 400,
              marginBottom: '12px',
            }}
          >
            AI Blog Generator
          </h1>
          <p style={{ fontSize: '16px', color: '#6B6B63', maxWidth: '440px', margin: '0 auto', lineHeight: 1.7 }}>
            Provide a topic and let AI craft a complete, well-structured blog post for you.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Settings Panel */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #E9E4DB',
                borderRadius: '28px',
                padding: '32px',
                boxShadow: '0 8px 24px rgba(0,0,0,.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                <Settings size={18} color="#6B6B63" strokeWidth={1.75} />
                <h2
                  style={{
                    fontFamily: 'Instrument Serif, serif',
                    fontSize: '22px',
                    color: '#1D1D1B',
                    fontWeight: 400,
                  }}
                >
                  Content Settings
                </h2>
              </div>

              <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label className="label">Blog Topic *</label>
                  <input
                    type="text"
                    ref={query}
                    placeholder="e.g., The Future of Remote Work"
                    required
                    className="input"
                  />
                </div>

                <div>
                  <label className="label">Writing Tone</label>
                  <select className="select" ref={tone}>
                    <option value="Professional">Professional</option>
                    <option value="Casual">Casual</option>
                    <option value="Humorous">Humorous</option>
                    <option value="Academic">Academic</option>
                  </select>
                </div>

                <div>
                  <label className="label">Content Length</label>
                  <select className="select" ref={contentLength}>
                    <option value="Short">Short (500 words)</option>
                    <option value="Medium">Medium (1000 words)</option>
                    <option value="Long">Long (1500+ words)</option>
                  </select>
                </div>

                <div>
                  <label className="label">Keywords (optional)</label>
                  <input
                    type="text"
                    ref={keywords}
                    placeholder="e.g., productivity, remote, culture"
                    className="input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ width: '100%', height: '52px', fontSize: '15px', gap: '8px', marginTop: '4px' }}
                >
                  {loading ? (
                    <>
                      <span
                        style={{
                          width: '18px',
                          height: '18px',
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: '#fff',
                          borderRadius: '50%',
                          animation: 'spin 0.7s linear infinite',
                        }}
                      />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} strokeWidth={1.75} />
                      Generate Article
                    </>
                  )}
                </button>
              </form>

              {/* Tips */}
              <div
                style={{
                  marginTop: '24px',
                  padding: '20px',
                  borderRadius: '16px',
                  background: '#F6F4EF',
                  border: '1px solid #EAE7E2',
                }}
              >
                <p
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#1D1D1B',
                    marginBottom: '12px',
                  }}
                >
                  <Lightbulb size={14} strokeWidth={1.75} color="#D2A94D" />
                  Pro Tips
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {tips.map((tip, i) => (
                    <p key={i} style={{ fontSize: '13px', color: '#6B6B63', lineHeight: 1.5, paddingLeft: '8px', borderLeft: '2px solid #E7E2D8' }}>
                      {tip}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Generated Content Panel */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #E9E4DB',
                borderRadius: '28px',
                padding: '32px',
                boxShadow: '0 8px 24px rgba(0,0,0,.05)',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <BookOpen size={18} color="#6B6B63" strokeWidth={1.75} />
                  <h2
                    style={{
                      fontFamily: 'Instrument Serif, serif',
                      fontSize: '22px',
                      color: '#1D1D1B',
                      fontWeight: 400,
                    }}
                  >
                    Generated Article
                  </h2>
                </div>
                {content && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <CopyToClipboard text={content} onCopy={handleCopy}>
                      <button
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '8px 14px',
                          borderRadius: '10px',
                          border: '1px solid #E7E2D8',
                          background: '#FFFFFF',
                          color: copied ? '#7E9D63' : '#6B6B63',
                          fontSize: '13px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {copied ? <Check size={13} strokeWidth={1.75} /> : <Copy size={13} strokeWidth={1.75} />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </CopyToClipboard>
                    <button
                      onClick={() => setContent('')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '8px 14px',
                        borderRadius: '10px',
                        border: '1px solid #E7E2D8',
                        background: '#FFFFFF',
                        color: '#6B6B63',
                        fontSize: '13px',
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      <RefreshCw size={13} strokeWidth={1.75} />
                      Reset
                    </button>
                  </div>
                )}
              </div>

              <div style={{ flex: 1 }}>
                {loading ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '16px' }}>
                    {[100, 80, 90, 70, 85, 60].map((w, i) => (
                      <div
                        key={i}
                        className="skeleton"
                        style={{ height: '14px', width: `${w}%` }}
                      />
                    ))}
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '32px',
                        color: '#94948C',
                        fontSize: '14px',
                        marginTop: '16px',
                      }}
                    >
                      <Sparkles size={24} color="#A8B58A" strokeWidth={1.75} style={{ margin: '0 auto 8px' }} />
                      Crafting your article...
                    </div>
                  </div>
                ) : content ? (
                  <div
                    style={{
                      border: '1px solid #EAE7E2',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      maxHeight: '600px',
                      overflowY: 'auto',
                    }}
                  >
                    <Quill content={content} />
                  </div>
                ) : (
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '64px 24px',
                      textAlign: 'center',
                      color: '#C4C4BD',
                      border: '1.5px dashed #EAE7E2',
                      borderRadius: '20px',
                      minHeight: '300px',
                    }}
                  >
                    <Sparkles size={40} strokeWidth={1.5} style={{ marginBottom: '16px', opacity: 0.5 }} />
                    <p style={{ fontSize: '15px', fontWeight: 500, marginBottom: '8px' }}>
                      Your article will appear here
                    </p>
                    <p style={{ fontSize: '13px' }}>Fill in the settings and click Generate</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Toast toasts={toasts} removeToast={removeToast} />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default BlogGenerator;
