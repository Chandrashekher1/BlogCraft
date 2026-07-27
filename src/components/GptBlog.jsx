import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Copy, Check, RefreshCw, Sparkles } from 'lucide-react';
import he from 'he';
import { useNavigate } from 'react-router-dom';
import Quill from './Quill';
import Toast from './Toast';
import useToast from '../utils/useToast';

const GptBlog = () => {
  const [content, setContent] = useState('');
  const query = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const token = localStorage.getItem('authorization');
  const navigate = useNavigate();
  const { toasts, toast, removeToast } = useToast();

  const getAiClient = () => {
    const apiKey = import.meta.env.VITE_GPT_API_KEY;
    if (!apiKey || !apiKey.trim()) {
      throw new Error('Gemini API key is missing. Please set VITE_GPT_API_KEY in your .env file.');
    }
    return new GoogleGenAI({ apiKey });
  };

  const handleCopied = () => {
    setCopied(true);
    toast.success('Copied!', 'Content copied to clipboard.');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleReset = () => {
    setContent('');
    if (query.current) query.current.value = '';
    toast.info('Reset', 'Ready for a new topic.');
  };

  async function main() {
    const inputText = query.current?.value?.trim();
    if (!inputText) {
      toast.error('Topic required', 'Please enter a topic for the AI to write about.');
      return;
    }
    setIsLoading(true);
    try {
      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Write a clear and informative blog post on the topic: "${inputText}". 
Break it into: Introduction, Key sections with meaningful subheadings, A thoughtful conclusion.
Ensure the response is written entirely in valid, semantic HTML.
Do not include markdown or explanation—only return clean HTML content that can be directly rendered in a web editor.`,
      });
      setContent(response.text);
      toast.success('Done!', 'Your blog post has been generated.');
    } catch (err) {
      console.error(err);
      toast.error('Generation failed', err.message || 'Could not reach the AI. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!token) navigate('/login');
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Input */}
      <div>
        <label className="label">Blog Topic</label>
        <input
          ref={query}
          placeholder="Enter a topic for AI to generate..."
          className="input"
          style={{ fontSize: '15px' }}
        />
        <p style={{ fontSize: '13px', color: '#94948C', marginTop: '6px' }}>
          Describe what you want the AI to write about
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={main}
          disabled={isLoading || !!content}
          className="btn"
          style={{
            background: isLoading || content ? '#E5E0D8' : '#1D1D1B',
            color: isLoading || content ? '#94948C' : '#FFFFFF',
            cursor: isLoading || content ? 'not-allowed' : 'pointer',
            gap: '8px',
            height: '48px',
          }}
        >
          {isLoading ? (
            <>
              <span
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(148,148,140,0.3)',
                  borderTopColor: '#94948C',
                  borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite',
                }}
              />
              Generating...
            </>
          ) : content ? (
            <>
              <Check size={15} strokeWidth={1.75} />
              Generated
            </>
          ) : (
            <>
              <Sparkles size={15} strokeWidth={1.75} />
              Generate with AI
            </>
          )}
        </button>

        {content && (
          <button
            onClick={handleReset}
            className="btn btn-secondary"
            style={{ height: '48px', gap: '6px', fontSize: '14px' }}
          >
            <RefreshCw size={14} strokeWidth={1.75} />
            Reset
          </button>
        )}
      </div>

      {/* Content Preview */}
      {content && (
        <div
          style={{
            border: '1px solid #EAE7E2',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px',
              borderBottom: '1px solid #EAE7E2',
              background: '#F6F4EF',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#6B6B63' }}>
              Generated Content
            </span>
            <CopyToClipboard text={content} onCopy={handleCopied}>
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1px solid #E7E2D8',
                  background: '#FFFFFF',
                  color: copied ? '#7E9D63' : '#6B6B63',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {copied ? <Check size={12} strokeWidth={1.75} /> : <Copy size={12} strokeWidth={1.75} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </CopyToClipboard>
          </div>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <Quill content={he.decode(content)} />
          </div>
        </div>
      )}

      <Toast toasts={toasts} removeToast={removeToast} />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default GptBlog;
