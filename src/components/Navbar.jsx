import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("authorization"))
  const navigate = useNavigate()
  const topRef = useRef(null)
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
    <nav className="bg-black text-white font-semibold shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* <Link to="/" className="text-xl font-bold">MyBlog</Link> */}
        <ul className="hidden md:flex space-x-6 text-lg">
          
          <Link to="/">
            <li className='cursor-pointer hover:border border-cyan-600 px-3 py-2 rounded-lg' onClick={scrollToTop} ref={topRef}>Home</li>
          </Link>
          <Link to="/">
            <li className='cursor-pointer hover:border border-cyan-600 px-3 py-2 rounded-lg' onClick={scrollToTop} ref={topRef}>About</li>
          </Link>
          
          <Link to="/create-post" onClick={scrollToTop}>
            <li className='cursor-pointer px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 active:scale-95'>New Post</li>
          </Link>
          <li className='cursor-pointer hover:border border-cyan-600 px-3 py-2 rounded-lg' onClick={handleAuthClick}>
            {token ? "Profile" : "Sign In"}
          </li>
        </ul>
        <div className="md:hidden  flex items-center">
          <button className="text-xl md:hidden" onClick={handleAuthClick}>
            {token ? "Profile" : "Sign In"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
