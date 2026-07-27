import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allPost_API, post_API, profile_APi } from '../utils/constant';
import parse from 'html-react-parser';
import he from 'he';
import AuthContext from '../context/AuthContext';
import Quill from '../components/Quill';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, BookOpen, Grid, Bookmark, LogOut, Edit3, Trash2, Check, X, Clock } from 'lucide-react';

const Profile = () => {
  const token = localStorage.getItem('authorization');
  const userId = localStorage.getItem('userId');
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [activeTab, setActiveTab] = useState('posts');
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const fetchUserData = async () => {
    try {
      const res = await fetch(profile_APi, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to fetch profile');
      const data = await res.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await fetch(`${allPost_API}/${userId}`, {
        method: 'GET',
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to fetch posts');
      const posts = await res.json();
      setUserPosts(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchPostDelete = async (id) => {
    try {
      const res = await fetch(`${post_API}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to delete post');
      fetchUserPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const fetchPostEdit = async (id) => {
    try {
      const res = await fetch(`${post_API}/${id}`, {
        method: 'PATCH',
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });
      if (!res.ok) throw new Error('Failed to update post');
      setEditingPostId(null);
      fetchUserPosts();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchUserData();
    fetchUserPosts();
  }, []);

  return (
    <div style={{ background: '#F6F4EF', minHeight: 'calc(100vh - 144px)', padding: '48px 32px 96px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: '#FFFFFF',
            border: '1px solid #E9E4DB',
            borderRadius: '32px',
            padding: '40px',
            boxShadow: '0 8px 24px rgba(0,0,0,.05)',
            marginBottom: '32px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
            {/* Avatar */}
            <div>
              {userData?.data?.image ? (
                <img
                  src={userData.data.image}
                  alt="Profile"
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '999px',
                    objectFit: 'cover',
                    border: '3px solid #F6F4EF',
                    boxShadow: '0 4px 16px rgba(0,0,0,.08)',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '999px',
                    background: '#EFEAE2',
                    border: '3px solid #F6F4EF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <User size={40} color="#94948C" strokeWidth={1.5} />
                </div>
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              {isLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="skeleton" style={{ height: '28px', width: '180px' }} />
                  <div className="skeleton" style={{ height: '18px', width: '240px' }} />
                </div>
              ) : (
                <>
                  <h1
                    style={{
                      fontFamily: 'Instrument Serif, serif',
                      fontSize: '30px',
                      color: '#1D1D1B',
                      fontWeight: 400,
                      marginBottom: '4px',
                    }}
                  >
                    {userData?.data?.name || 'Your Name'}
                  </h1>
                  <p
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '14px',
                      color: '#94948C',
                      marginBottom: '16px',
                    }}
                  >
                    <Mail size={14} strokeWidth={1.75} />
                    {userData?.data?.email}
                  </p>
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontFamily: 'Instrument Serif, serif', fontSize: '24px', color: '#1D1D1B', lineHeight: 1 }}>
                        {userPosts.length}
                      </p>
                      <p style={{ fontSize: '12px', color: '#94948C', fontWeight: 500, marginTop: '4px' }}>Posts</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 16px',
                borderRadius: '12px',
                border: '1px solid rgba(198,107,99,0.25)',
                background: 'rgba(198,107,99,0.06)',
                color: '#C66B63',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(198,107,99,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(198,107,99,0.06)'}
            >
              <LogOut size={15} strokeWidth={1.75} />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="tabs" style={{ marginBottom: '24px', maxWidth: '280px' }}>
          <button className={`tab ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>
            <Grid size={14} strokeWidth={1.75} style={{ display: 'inline', marginRight: '5px' }} />
            My Posts
          </button>
          <button className={`tab ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}>
            <Bookmark size={14} strokeWidth={1.75} style={{ display: 'inline', marginRight: '5px' }} />
            Saved
          </button>
        </div>

        {/* Posts */}
        {activeTab === 'posts' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {userPosts.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '64px 24px',
                  background: '#FFFFFF',
                  border: '1px solid #E9E4DB',
                  borderRadius: '24px',
                }}
              >
                <BookOpen size={40} color="#C4C4BD" strokeWidth={1.5} style={{ margin: '0 auto 16px' }} />
                <p style={{ color: '#94948C', fontSize: '15px' }}>You haven't written anything yet.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/create-post')}
                  style={{ marginTop: '20px', fontSize: '14px', height: '44px' }}
                >
                  Write your first post
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {userPosts.map((post, i) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E9E4DB',
                      borderRadius: '20px',
                      padding: '20px',
                      boxShadow: '0 4px 16px rgba(0,0,0,.04)',
                    }}
                  >
                    {editingPostId === post._id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="input"
                          placeholder="Post title"
                          style={{ fontSize: '16px' }}
                        />
                        <div
                          style={{
                            border: '1px solid #E5E0D8',
                            borderRadius: '12px',
                            overflow: 'hidden',
                          }}
                        >
                          <Quill content={editContent} setContent={setEditContent} />
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            className="btn btn-primary"
                            onClick={() => fetchPostEdit(post._id)}
                            style={{ height: '40px', fontSize: '14px', gap: '6px' }}
                          >
                            <Check size={15} strokeWidth={1.75} /> Save
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setEditingPostId(null)}
                            style={{ height: '40px', fontSize: '14px', gap: '6px' }}
                          >
                            <X size={15} strokeWidth={1.75} /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h3
                            style={{
                              fontFamily: 'Instrument Serif, serif',
                              fontSize: '20px',
                              color: '#1D1D1B',
                              fontWeight: 400,
                              marginBottom: '6px',
                            }}
                          >
                            {post.title}
                          </h3>
                          <p
                            style={{
                              fontSize: '13px',
                              color: '#6B6B63',
                              lineHeight: 1.6,
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              marginBottom: '14px',
                            }}
                          >
                            {he.decode(post.content).replace(/<[^>]*>/g, '').slice(0, 120)}...
                          </p>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => {
                                setEditingPostId(post._id);
                                setEditTitle(post.title);
                                setEditContent(post.content);
                              }}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                padding: '7px 14px',
                                borderRadius: '10px',
                                border: '1px solid #E7E2D8',
                                background: '#FFFFFF',
                                color: '#6B6B63',
                                fontSize: '13px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = '#F6F4EF'}
                              onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
                            >
                              <Edit3 size={13} strokeWidth={1.75} />
                              Edit
                            </button>
                            <button
                              onClick={() => fetchPostDelete(post._id)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                padding: '7px 14px',
                                borderRadius: '10px',
                                border: '1px solid rgba(198,107,99,0.25)',
                                background: 'rgba(198,107,99,0.06)',
                                color: '#C66B63',
                                fontSize: '13px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              <Trash2 size={13} strokeWidth={1.75} />
                              Delete
                            </button>
                          </div>
                        </div>
                        {post.image?.[0] && (
                          <img
                            src={post.image[0]}
                            alt=""
                            style={{
                              width: '80px',
                              height: '60px',
                              borderRadius: '10px',
                              objectFit: 'cover',
                              flexShrink: 0,
                              border: '1px solid #F0ECE5',
                            }}
                          />
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'saved' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '64px 24px',
              background: '#FFFFFF',
              border: '1px solid #E9E4DB',
              borderRadius: '24px',
            }}
          >
            <Bookmark size={40} color="#C4C4BD" strokeWidth={1.5} style={{ margin: '0 auto 16px' }} />
            <p style={{ color: '#94948C', fontSize: '15px' }}>No saved posts yet.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Profile;
