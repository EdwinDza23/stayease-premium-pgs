
import React from 'react';
import { PG } from '../types';
import PGCard from './PGCard';

interface WishlistViewProps {
  allPGs: PG[];
  wishlistIds: string[];
  onPGClick: (pg: PG) => void;
  onWishlistToggle: (pgId: string) => void;
}

const WishlistView: React.FC<WishlistViewProps> = ({ 
  allPGs, 
  wishlistIds, 
  onPGClick, 
  onWishlistToggle 
}) => {
  const wishlistedPGs = allPGs.filter(pg => wishlistIds.includes(pg.id));

  return (
    <div className="min-h-[60vh] py-4">
      <div className="flex flex-col mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Wishlist</h2>
        <p className="text-gray-500 font-medium mt-1">
          {wishlistedPGs.length} {wishlistedPGs.length === 1 ? 'place' : 'places'} saved
        </p>
      </div>

      {wishlistedPGs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
          {wishlistedPGs.map(pg => (
            <PGCard 
              key={pg.id} 
              pg={pg} 
              onClick={() => onPGClick(pg)}
              isWishlisted={true}
              onWishlistToggle={() => onWishlistToggle(pg.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <svg 
              className="w-12 h-12 text-gray-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Your wishlist is empty</h3>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">
            Tap the heart icon on any PG to save it to your wishlist and view it later.
          </p>
          <button 
            onClick={() => window.location.reload()} // Simplified way to return to home if using a refresh-based routing
            className="mt-8 px-8 py-3 border-2 border-black rounded-xl font-bold hover:bg-black hover:text-white transition-all active:scale-95"
          >
            Explore PGs
          </button>
        </div>
      )}
    </div>
  );
};

export default WishlistView;
