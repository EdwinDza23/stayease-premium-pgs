
import React from 'react';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = "Processing..." }) => {
  return (
    <div className="fixed inset-0 bg-white/60 backdrop-blur-[2px] z-[150] flex flex-col items-center justify-center animate-in fade-in duration-300">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-100 rounded-full"></div>
        <div className="absolute top-0 w-12 h-12 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 font-bold text-gray-900 text-sm tracking-tight">{message}</p>
    </div>
  );
};

export default LoadingOverlay;
