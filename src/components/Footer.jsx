import React from 'react';
import SocialIcons from './SocialIcon';

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between px-6 py-6 border-t border-blue-800 bg-black text-white">
      <div className="flex items-center space-x-1 cursor-pointer">
        <h1 className="font-bold text-2xl">CP</h1>
        <p className="text-blue-500 font-semibold text-2xl">03</p>
      </div>

      <div className="text-center md:text-left">
        <p className="font-medium text-lg">
          Created by Cp03 <span className="text-gray-400">@2025</span>
        </p>
      </div>

      <div className="flex space-x-4 mt-4 md:mt-0">
        <SocialIcons />
      </div>
    </footer>
  );
};

export default Footer;
