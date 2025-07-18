import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiPen } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { MdOutlineWbSunny } from "react-icons/md";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("authorization"))
  const navigate = useNavigate()
  const topRef = useRef(null)
  const userImage = localStorage.getItem('userImage')
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("authorization"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
        {/* <Link to="/" className="text-xl font-bold">MyBlog</Link> */}
        <ul className="hidden md:flex space-x-6 text-lg">
          
          <button>
            <li className='cursor-pointer' onClick={scrollToTop} ref={topRef}><MdOutlineWbSunny style={{}}/></li>
          </button>
          
          <Link to="/">
            <li className='cursor-pointer border border-transparent hover:border-white px-6 py-2 rounded-lg' onClick={scrollToTop} ref={topRef}>Home</li>
          </Link>
          
          <Link to="/create-post" onClick={scrollToTop}>
            <li className='cursor-pointer border  bg-white text-black px-6 py-1 rounded-lg flex '><CiPen style={{fontSize:'20px', marginTop:'4px',marginRight:'6px'}}/> Write</li>
          </Link>
          <li className='rounded-lg flex' onClick={handleAuthClick}>
            <button className="text-xl flex cursor-pointer">
            {token ? 
              <div>
                {userImage ? (<img src={userImage} alt="" className='rounded-full w-10 h-10 object-cover' />) : <span className='border rounded-full border-transparent bg-gray-900 flex p-2 px-3'><FiUser style={{marginTop:'4px'}}/></span> }
              </div> : 
              <span className='flex my-1'><FiUser style={{marginTop:'4px', marginRight:'8px'}}/>Sign In</span> }
          </button>
          </li>
        </ul>
        <div className='flex '>
          <div className='mx-4'>
          <button className='md:hidden'>
            <MdOutlineWbSunny style={{marginTop:'10px', fontSize:'20px'}}/>
          </button>
        </div>

        <div className="md:hidden  flex items-center">
          <button className="text-xl md:hidden flex" onClick={handleAuthClick}>
            {token ? 
            <div>
                {userImage ? (<img src={userImage} alt="" className='rounded-full w-10 h-10 object-cover' />) : <span className='border rounded-full border-transparent bg-gray-900 flex p-2 px-3'><FiUser style={{marginTop:'4px'}}/></span> }
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
