import React from 'react';

const Shimmer = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 animate-pulse min-h-screen">
      <div className="flex flex-col justify-between items-start gap-6 mb-6">
        <div className="h-4 bg-gray-300 rounded w-full md:w-1/2 "></div>
        <div className="space-y-4">
          <div className="h-5 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className='flex flex-wrap'>
          <div className="md:w-96 h-60 w-80 bg-gray-300 rounded-lg my-4 mx-4"></div>
          <div className="md:w-96 w-80 h-60 bg-gray-300 rounded-lg my-4 mx-4"></div>
        </div>
        <div className="space-y-3 w-full md:w-1/2">
          <div className="h-6 bg-gray-300 rounded w-full"></div>
          <div className="h-6 bg-gray-300 rounded w-5/6"></div>
          <div className="h-6 bg-gray-300 rounded w-full"></div>
          <div className="h-6 bg-gray-300 rounded w-full"></div>
          <div className="h-6 bg-gray-300 rounded w-full"></div>
          <div className="h-6 bg-gray-300 rounded w-full"></div>
          <div className="h-6 bg-gray-300 rounded w-full"></div>
          <div className="h-6 bg-gray-300 rounded w-full"></div>

        </div>
      </div>


      
    </div>
  );
};

export default Shimmer;
