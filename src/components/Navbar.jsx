import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("authorization"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("authorization"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleAuthClick = () => {
    if (token) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-black text-white font-semibold shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* <Link to="/" className="text-xl font-bold">MyBlog</Link> */}
        <ul className="hidden md:flex space-x-6 text-lg">
          <Link to="/">
            <li className='cursor-pointer hover:border px-3 py-2 rounded-lg'>Home</li>
          </Link>
          <li className='cursor-pointer hover:border px-3 py-2 rounded-lg' onClick={handleAuthClick}>
            {token ? "Profile" : "Sign In"}
          </li>
          <Link to="/create-post">
            <li className='cursor-pointer hover:border px-3 py-2 rounded-lg'>Create Your Blog</li>
          </Link>
        </ul>
        <div className="md:hidden flex items-center">
          <button className="text-xl" onClick={handleAuthClick}>
            {token ? "Profile" : "Sign In"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
