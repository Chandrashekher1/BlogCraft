import React, { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiPen } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaRobot } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate()
  const topRef = useRef(null)

  const {token,userImage} = useContext(AuthContext)

  const handleAuthClick = () => {
    scrollToTop()
    if (token) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({top:0, behavior: 'smooth' });
  };

  return (
    <nav className="text-white font-semibold shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="hidden md:flex space-x-6 text-lg">
          
          
          <Link to="/blog-generator">
            <button className='cursor-pointer border border-transparent hover:border-white px-6 py-2 rounded-lg flex' onClick={scrollToTop} ref={topRef}> <span className='my-1 mx-2'>{<FaRobot />}</span> AI Writer</button>
          </Link>
          
          <Link to="/create-post" onClick={scrollToTop}>
            <li className='cursor-pointer border bg-white text-black px-6 py-2 rounded-lg flex hover:opacity-90'><CiPen style={{fontSize:'20px', marginTop:'4px',marginRight:'6px'}}/> Write</li>
          </Link>
          <li className='rounded-lg flex my-1' onClick={handleAuthClick}>
            <button className="text-xl flex cursor-pointer ">
            {token ? 
              <div>
                 {userImage && userImage.trim() !== "" ? (
                  <img src={userImage} alt="User" className='rounded-full w-10 h-10 object-cover' />
                ) : (
                  <span className='border rounded-full border-transparent bg-gray-900 flex p-2 px-3'>
                    <FiUser style={{ marginTop: '4px' }} />
                  </span>
                )}
              </div> : 
              <span className='flex '><FiUser style={{marginTop:'4px', marginRight:'8px'}}/>Sign In</span> }
          </button>
          </li>
        </ul>
        <div className='flex '>
          
        <div className="md:hidden  flex items-center">
          <button className="text-xl md:hidden flex" onClick={handleAuthClick}>
            {token ? 
            <div>
                {userImage && userImage.trim() !== "" ? (
                  <img src={userImage} alt="User" className='rounded-full w-10 h-10 object-cover' />
                ) : (
                  <span className='border rounded-full border-transparent bg-gray-900 flex p-2 px-3'>
                    <FiUser style={{ marginTop: '4px' }} />
                  </span>
                )}
            </div> : 
            <span className='flex'><FiUser style={{marginTop:'4px', marginRight:'8px'}}/>Sign In</span> }
          </button>
        </div>
        </div>   
        
      </div>
    </nav>
  );
}

export default Navbar
