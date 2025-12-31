
import React, { useState } from 'react';
import { PG, AvailabilityStatus } from '../types';

interface PGCardProps {
  pg: PG;
  onClick: () => void;
  isWishlisted: boolean;
  onWishlistToggle: (e: React.MouseEvent) => void;
}

const PGCard: React.FC<PGCardProps> = ({ pg, onClick, isWishlisted, onWishlistToggle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const rents = pg.buildings.flatMap(b => b.roomTypes.map(rt => rt.rent));
  const startingRent = Math.min(...rents);

  const statuses = pg.buildings.flatMap(b => b.roomTypes.map(rt => rt.availability));
  let overallStatus = AvailabilityStatus.AVAILABLE;
  if (statuses.every(s => s === AvailabilityStatus.FULL)) {
    overallStatus = AvailabilityStatus.FULL;
  } else if (statuses.some(s => s === AvailabilityStatus.FEW_LEFT)) {
    overallStatus = AvailabilityStatus.FEW_LEFT;
  }

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onWishlistToggle(e);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % pg.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + pg.images.length) % pg.images.length);
  };

  return (
    <div 
      onClick={onClick}
      className="flex flex-col gap-3 group cursor-pointer transition-all duration-300 relative"
    >
      {/* Image Container with Carousel */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm border border-gray-100">
        <img 
          src={pg.images[currentImageIndex]} 
          alt={`${pg.name} view ${currentImageIndex + 1}`}
          className="object-cover w-full h-full transition-all duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Navigation Arrows (Visible on Hover) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={prevImage}
            className="p-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all active:scale-90"
          >
            <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={nextImage}
            className="p-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all active:scale-90"
          >
            <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-3 right-3 z-10">
          <button 
            onClick={handleWishlistClick}
            className="p-2 bg-transparent transition-all active:scale-90"
          >
            <svg 
              className={`w-7 h-7 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] transition-colors ${isWishlisted ? 'text-[#FF385C] fill-[#FF385C]' : 'text-white'}`} 
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="white" 
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        {/* Carousel Indicators (Dots) */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10">
          {pg.images.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-3 bg-white' : 'w-1.5 bg-white/60'}`} 
            />
          ))}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {pg.isVerified && (
            <span className="bg-white/95 backdrop-blur-sm text-black text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 uppercase tracking-wider">
              <svg className="w-3 h-3 text-[#FF385C]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Verified
            </span>
          )}
          {pg.isLuxury && (
            <span className="bg-gradient-to-r from-slate-900 to-slate-800 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg uppercase tracking-wider border border-white/20">
              Premium Living
            </span>
          )}
        </div>

        {/* Quick View Button (Desktop Hover) */}
        <div className="absolute inset-x-0 bottom-10 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 hidden md:flex">
          <div className="bg-white text-black px-5 py-2.5 rounded-xl font-bold text-xs shadow-2xl border border-gray-100 hover:bg-gray-50 transition-colors">
            Quick View
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col px-0.5 space-y-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-gray-900 line-clamp-1 text-base leading-tight flex-1">{pg.name}</h3>
          <div className="flex items-center gap-1 text-sm font-bold text-gray-800 whitespace-nowrap">
            <svg className="w-3.5 h-3.5 text-gray-900" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            4.85
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
          <span className="truncate">{pg.location}</span>
          <span className="text-gray-300">•</span>
          <span className="whitespace-nowrap">{pg.type}</span>
        </div>

        <div className="pt-0.5 flex items-center justify-between">
          <p className="font-bold text-gray-900 text-[15px]">
            ₹{startingRent.toLocaleString('en-IN')} <span className="text-gray-500 font-normal text-sm">/ month</span>
          </p>
          <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md ${
            overallStatus === AvailabilityStatus.AVAILABLE ? 'text-green-600 bg-green-50' :
            overallStatus === AvailabilityStatus.FEW_LEFT ? 'text-orange-600 bg-orange-50' :
            'text-red-600 bg-red-50'
          }`}>
            {overallStatus === AvailabilityStatus.FEW_LEFT ? 'Filling Fast' : overallStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PGCard;
