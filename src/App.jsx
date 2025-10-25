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

function App() {

  const onlineStatus = useOnlineStatus()

  if(onlineStatus === false) {
    return (
      <div className='min-h-screen text-center flex flex-col justify-center items-center bg-zinc-950'>
        <h1 className='text-center text-4xl text-white'>Oops! You have lost your internet connection</h1>
      </div>
    )
  }

  return (
          <Router>
      <div className='text-white font-roboto bg-gray-950' >
        <Header/>
        <div className='font-roboto'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/create-post" element={<Post/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/blog-generator" element={<BlogGenerator/>}/>
          <Route path="/post-view/:id" element={<PostView/>}/>
        </Routes>
      </div>
      <Footer/>
      </div>
    </Router>
    
  )
}

export default App
