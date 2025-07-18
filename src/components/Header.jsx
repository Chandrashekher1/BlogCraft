import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { TbCircleLetterB } from "react-icons/tb";
import { BsStars } from 'react-icons/bs';

const Header = () => {
  const navigate = useNavigate()
  const [isShrunk, setIsShrunk] = useState(false);

  const handleLogo = () => {
      navigate("/")
  }
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsShrunk(true);
            } else {
                setIsShrunk(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <div className={`flex justify-between p-4 md:px-16  shadow-md sticky top-0 bg-gray-950  border-b border-b-gray-800 ${isShrunk ? 'z-50':'null' }`}>
      <div className=''>
        <h1 className='font-bold text-xl md:text-2xl cursor-pointer flex mt-1' onClick={handleLogo} ><span className='bg-gradient-to-r from-white to-gray-900 rounded-md mx-2'><TbCircleLetterB className='text-black text-2xl md:text-4xl'/></span> <p className='bg-gradient-to-r from-white to-gray-700 bg-clip-text text-transparent'>BlogCraft</p></h1>
      </div>
      <div className=''>
        <Navbar/>
      </div>
    </div>
  )
}

export default Header