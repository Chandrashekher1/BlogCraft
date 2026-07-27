import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login_API, Register_API } from '../utils/constant';
import { User, Eye, EyeOff, Upload, ArrowRight } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';
import Toast from '../components/Toast';
import useToast from '../utils/useToast';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGuest, setLoadingGuest] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { toasts, toast, removeToast } = useToast();

  const handleGuestLogin = async () => {
    setLoadingGuest(true);
    try {
      const response = await fetch(Login_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'guest@gmail.com', password: 'Guest@123' }),
      });
      const data = await response.json();
      const token = response.headers.get('authorization');
      if (response.ok && token) {
        login(token, data?.image, data._id);
        toast.success('Welcome back!', 'Signed in as guest.');
        setTimeout(() => navigate('/'), 800);
      } else {
        toast.error('Guest login failed', 'Please try again.');
      }
    } catch (err) {
      toast.error('Network error', err.message);
    } finally {
      setLoadingGuest(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      const url = isSignIn ? Register_API : Login_API;
      if (isSignIn) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profile', image);
        response = await fetch(url, { method: 'POST', body: formData });
      } else {
        response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
      }
      const data = await response.json();
      const token = response.headers.get('authorization');
      if (token) {
        login(token, data?.image, data._id);
        toast.success('Welcome!', isSignIn ? 'Account created successfully.' : 'Signed in successfully.');
        setTimeout(() => navigate('/'), 800);
      } else {
        throw new Error(data?.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('Sign in failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 144px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 16px',
        background: '#F6F4EF',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ width: '100%', maxWidth: '440px' }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: '#1D1D1B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <User size={22} color="#F6F4EF" strokeWidth={1.75} />
          </div>
          <h1
            style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: '32px',
              color: '#1D1D1B',
              marginBottom: '8px',
              fontWeight: 400,
            }}
          >
            {isSignIn ? 'Create your account' : 'Welcome back'}
          </h1>
          <p style={{ fontSize: '15px', color: '#6B6B63' }}>
            {isSignIn ? 'Start your writing journey today' : 'Sign in to continue writing'}
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E9E4DB',
            borderRadius: '28px',
            padding: '32px',
            boxShadow: '0 8px 24px rgba(0,0,0,.05)',
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {isSignIn && (
              <div>
                <label className="label">Full name</label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                />
              </div>
            )}

            <div>
              <label className="label">Email address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
            </div>

            <div>
              <label className="label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  style={{ paddingRight: '48px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94948C',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showPass ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
                </button>
              </div>
            </div>

            {isSignIn && (
              <div>
                <label className="label">Profile photo</label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    border: '1px dashed #D4CFC6',
                    background: '#F6F4EF',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#6B6B63',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Upload size={16} strokeWidth={1.75} color="#94948C" />
                  {image ? image.name : 'Upload a photo'}
                  <input
                    type="file"
                    required
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', height: '52px', fontSize: '15px', gap: '8px' }}
            >
              {loading ? (
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
              ) : (
                <>
                  {isSignIn ? 'Create Account' : 'Sign In'}
                  <ArrowRight size={16} strokeWidth={1.75} />
                </>
              )}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#EAE7E2' }} />
            <span style={{ fontSize: '13px', color: '#94948C' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: '#EAE7E2' }} />
          </div>

          <button
            type="button"
            onClick={handleGuestLogin}
            disabled={loadingGuest}
            className="btn btn-secondary"
            style={{ width: '100%', height: '48px', fontSize: '14px', gap: '8px' }}
          >
            {loadingGuest ? (
              <span
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(29,29,27,0.2)',
                  borderTopColor: '#1D1D1B',
                  borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite',
                }}
              />
            ) : (
              <>
                <User size={15} strokeWidth={1.75} />
                Continue as Guest
              </>
            )}
          </button>

          <p style={{ textAlign: 'center', fontSize: '14px', color: '#94948C', marginTop: '20px' }}>
            {isSignIn ? 'Already have an account? ' : "Don't have an account? "}
            <button
              type="button"
              onClick={() => { setIsSignIn(!isSignIn); }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#1D1D1B',
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'underline',
                textUnderlineOffset: '2px',
              }}
            >
              {isSignIn ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </motion.div>

      <Toast toasts={toasts} removeToast={removeToast} />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Login;
