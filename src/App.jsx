import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import Post from './pages/Post'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (
    <Router>
      <div className='bg-black text-white h-screen' >
        <Header/>
        
        <div className='font-roboto'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/create-post" element={<Post/>}/>
        </Routes>
      </div>
      <Footer/>
      </div>
    </Router>
  )
}

export default App
