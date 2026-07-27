import React, { useState, useEffect } from 'react';
import { post_API } from '../utils/constant';
import GptBlog from '../components/GptBlog';
import { useNavigate } from 'react-router-dom';
import { PenLine, Sparkles, Image, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import Quill from '../components/Quill';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from '../components/Toast';
import useToast from '../utils/useToast';

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState('manual');
  const navigate = useNavigate();
  const token = localStorage.getItem('authorization');
  const { toasts, toast, removeToast } = useToast();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  const handleData = async () => {
    if (!title.trim()) {
      toast.error('Title required', 'Please add a title for your post.');
      return;
    }
    if (!author.trim()) {
      toast.error('Author required', 'Please enter the author name.');
      return;
    }
    if (!content.trim()) {
      toast.error('Content required', 'Please write some content before publishing.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('author', author);
      images.forEach((img) => formData.append('blog', img));

      const response = await fetch(post_API, {
        method: 'POST',
        headers: { Authorization: `${token}` },
        body: formData,
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.message || 'Failed to create post');
      toast.success('Published!', 'Your post is now live.');
      setTimeout(() => navigate(`/post-view/${json._id}`), 900);
    } catch (error) {
      toast.error('Publish failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#F6F4EF', minHeight: 'calc(100vh - 144px)', padding: '48px 32px 96px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: '40px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                background: '#1D1D1B',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileText size={18} color="#F6F4EF" strokeWidth={1.75} />
            </div>
            <div>
              <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '28px', color: '#1D1D1B', fontWeight: 400 }}>
                Create a Post
              </h1>
              <p style={{ fontSize: '14px', color: '#94948C' }}>Write something that matters</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="tabs" style={{ marginBottom: '32px', maxWidth: '320px' }}>
          <button className={`tab ${activeTab === 'manual' ? 'active' : ''}`} onClick={() => setActiveTab('manual')}>
            <PenLine size={14} strokeWidth={1.75} style={{ display: 'inline', marginRight: '6px' }} />
            Write
          </button>
          <button className={`tab ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}>
            <Sparkles size={14} strokeWidth={1.75} style={{ display: 'inline', marginRight: '6px' }} />
            AI Generate
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'manual' ? (
            <motion.div
              key="manual"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}
            >
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E9E4DB',
                  borderRadius: '28px',
                  padding: '32px',
                  boxShadow: '0 8px 24px rgba(0,0,0,.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
              >
                <div>
                  <label className="label">Post Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Write an engaging title for your story..."
                    className="input"
                    style={{ fontSize: '17px' }}
                  />
                </div>

                <div>
                  <label className="label">Author</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Your name"
                    className="input"
                  />
                </div>

                <div>
                  <label className="label">Content</label>
                  <div style={{ border: '1px solid #E5E0D8', borderRadius: '16px', overflow: 'hidden', minHeight: '300px' }}>
                    <Quill content={content} setContent={setContent} />
                  </div>
                </div>

                <div>
                  <label className="label">Cover Images</label>
                  <label
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '32px 16px',
                      borderRadius: '16px',
                      border: '1.5px dashed #D4CFC6',
                      background: '#F6F4EF',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#A8B58A')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#D4CFC6')}
                  >
                    <Image size={24} color="#94948C" strokeWidth={1.75} />
                    <span style={{ fontSize: '14px', color: '#6B6B63', fontWeight: 500 }}>
                      {images.length > 0 ? `${images.length} file(s) selected` : 'Click to upload images'}
                    </span>
                    <span style={{ fontSize: '12px', color: '#94948C' }}>PNG, JPG, WEBP up to 10MB</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        setImages([...e.target.files]);
                        toast.info(`${e.target.files.length} image(s) selected`, 'Ready to attach to your post.');
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button className="btn btn-secondary" onClick={() => navigate('/')} style={{ height: '44px', fontSize: '14px' }}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleData}
                    disabled={loading}
                    style={{ height: '44px', fontSize: '14px', gap: '8px' }}
                  >
                    {loading ? (
                      <span
                        style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: '#fff',
                          borderRadius: '50%',
                          animation: 'spin 0.7s linear infinite',
                        }}
                      />
                    ) : (
                      'Publish Post'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ai"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
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
                <GptBlog />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Toast toasts={toasts} removeToast={removeToast} />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Post;