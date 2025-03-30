import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import Post from './pages/Post'
import Header from './components/Header'
import Footer from './components/Footer'
import Profile from './pages/Profile'

function App() {

  return (
    <Router>
      <div className='bg-black text-white' >
        <Header/>
        
        <div className='font-roboto'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/create-post" element={<Post/>}/>
          <Route path="/profile" element={<Profile/>}/>

        </Routes>
      </div>
      <Footer/>
      </div>
    </Router>
  )
}

export default App
