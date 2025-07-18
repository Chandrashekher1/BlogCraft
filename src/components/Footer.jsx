import React from 'react';
import SocialIcons from './SocialIcon';

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between px-6 py-6 border-t border-gray-800 bg-gray-950 text-white">
      <div className="flex items-center space-x-1 cursor-pointer">
        <p className='bg-gradient-to-r from-white to-gray-700 bg-clip-text text-transparent font-bold text-2xl'>BlogCraft</p>
      </div>

      <div className="text-center md:text-left">
        <p className="text-gray-400">
          Created by <span className='font-semibold text-lg'>Chandrashekher</span> <span className="text-gray-400">@2025</span>
        </p>
      </div>

      <div className="flex  mt-4 md:mt-0">
        <SocialIcons />
      </div>
    </footer>
  );
};

export default Footer;
