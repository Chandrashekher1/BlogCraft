import React from 'react';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const SocialIcons = () => {
    return (
        <div style={{ display: 'flex', gap: '30px',marginLeft:'0px', marginTop:'0px' }}>
            <a 
                href="https://x.com/cpsaw03" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-cyan-400 text-gray-400"
            >
                <FaTwitter size={30} />
            </a>
            <a 
                href="https://www.linkedin.com/in/chandrashekher-prasad-a496a2293/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-400 text-gray-400"
            >
                <FaLinkedin size={30} />
            </a>
            <a 
                href="https://www.instagram.com/_chandrashekher_03/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-red-600 text-gray-400"
            >
                <FaInstagram size={30} />
            </a>
        </div>
    );
};

export default SocialIcons;