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
import PostView from './pages/PostView'
import useOnlineStatus from './utils/useOnlinestatus'

function App() {

  const onlineStatus = useOnlineStatus()

  if(onlineStatus === false) {
    return (
      <div className='h-screen text-center flex flex-col justify-center items-center'>
        <h1 className='text-center text-4xl'>Oops! You have lost your internet connection</h1>
      </div>
    )
  }

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
          <Route path="/post-view/:id" element={<PostView/>}/>

        </Routes>
      </div>
      <Footer/>
      </div>
    </Router>
  )
}

export default App
