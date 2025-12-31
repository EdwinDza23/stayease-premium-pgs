
import React from 'react';
import { GenderType } from '../types';

interface FilterChipsProps {
  selectedGender: GenderType | 'All';
  setSelectedGender: (gender: GenderType | 'All') => void;
  selectedSharing: number | null;
  setSelectedSharing: (sharing: number | null) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ 
  selectedGender, 
  setSelectedGender,
  selectedSharing,
  setSelectedSharing
}) => {
  const sharingOptions = [1, 2, 3, 4, 5, 6];

  return (
    <div className="bg-white pt-2 pb-4 px-4 md:px-8 border-t md:border-t-0 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-8 max-w-7xl mx-auto">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar scroll-smooth">
          {['All', ...Object.values(GenderType)].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGender(g as GenderType | 'All')}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                selectedGender === g 
                  ? 'bg-black text-white border-black shadow-lg shadow-black/10' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        
        <div className="hidden md:block h-6 w-px bg-gray-200"></div>

        <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-1">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex-shrink-0">Room Sharing:</span>
          {sharingOptions.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSharing(selectedSharing === s ? null : s)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                selectedSharing === s
                  ? 'bg-[#FF385C] text-white border-[#FF385C] shadow-lg shadow-[#FF385C]/20' 
                  : 'bg-white text-gray-500 border-gray-100 hover:bg-rose-50 hover:text-[#FF385C] hover:border-rose-200'
              }`}
            >
              {s} Sharing
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterChips;
