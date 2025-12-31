
import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      {/* Image Placeholder */}
      <div className="aspect-square rounded-2xl bg-gray-200 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
      </div>
      
      {/* Content Placeholders */}
      <div className="flex flex-col px-0.5 space-y-2">
        <div className="flex justify-between items-start gap-2">
          <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-5 bg-gray-200 rounded-md w-12"></div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-100 rounded-md w-1/2"></div>
          <div className="h-4 bg-gray-200/50 rounded-full w-4"></div>
          <div className="h-4 bg-gray-100 rounded-md w-1/4"></div>
        </div>

        <div className="pt-1 flex items-center justify-between">
          <div className="h-5 bg-gray-200 rounded-md w-1/3"></div>
          <div className="h-5 bg-gray-100 rounded-md w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
