
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-8 px-4 border-b border-gray-800/50">
      <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-2">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x">
          Illustration Art Generator
        </span>
      </h1>
      <p className="text-lg md:text-xl text-gray-400">
        Bring your imagination to life with the power of Gemini
      </p>
       <style>{`
          @keyframes gradient-x {
              0%, 100% {
                  background-size: 200% 200%;
                  background-position: left center;
              }
              50% {
                  background-size: 200% 200%;
                  background-position: right center;
              }
          }
          .animate-gradient-x {
              animation: gradient-x 5s ease infinite;
          }
      `}</style>
    </header>
  );
};
