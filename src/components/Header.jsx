import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

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
    <div className={`flex justify-between p-4  shadow-md sticky top-0 bg-black ${isShrunk ? 'z-50':'null' }`}>
      <div>
        <h1 className='font-bold text-2xl cursor-pointer flex' onClick={handleLogo} >CP <p className='text-blue-700'>03</p></h1>
      </div>
      <div>
        <Navbar/>
      </div>
    </div>
  )
}

export default Header