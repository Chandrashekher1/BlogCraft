import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Post from './pages/Post'
import Header from './components/Header'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import PostView from './pages/PostView'
import useOnlineStatus from './utils/useOnlinestatus'
import BlogGenerator from './components/BlogGenerator'
import { Analytics } from "@vercel/analytics/react"
import { WifiOff } from 'lucide-react'

function App() {
  const onlineStatus = useOnlineStatus()

  if (onlineStatus === false) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F6F4EF',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: '#F2EFE9',
            border: '1px solid #E7E2D8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <WifiOff size={28} color="#94948C" strokeWidth={1.75} />
        </div>
        <h1
          style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: '28px',
            color: '#1D1D1B',
            textAlign: 'center',
          }}
        >
          No Internet Connection
        </h1>
        <p style={{ color: '#6B6B63', fontSize: '15px', textAlign: 'center', maxWidth: '300px' }}>
          Please check your connection and try again.
        </p>
      </div>
    )
  }

  return (
    <Router>
      <Analytics />
      <div style={{ minHeight: '100vh', background: '#F6F4EF', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-post" element={<Post />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/blog-generator" element={<BlogGenerator />} />
            <Route path="/post-view/:id" element={<PostView />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
