
import React, { useState, useMemo, useEffect } from 'react';
import { PGS } from './data/mockData';
import { PG, GenderType, BookingData } from './types';
import FilterChips from './components/FilterChips';
import PGCard from './components/PGCard';
import PGDetails from './components/PGDetails';
import BookingFlow from './components/BookingFlow';
import SuccessScreen from './components/SuccessScreen';
import WishlistView from './components/WishlistView';
import AuthFlow from './components/AuthFlow';
import SkeletonCard from './components/SkeletonCard';
import LoadingOverlay from './components/LoadingOverlay';
import ReferAndEarn from './components/ReferAndEarn';

const App: React.FC = () => {
  // Navigation State
  const [view, setView] = useState<'home' | 'details' | 'booking' | 'success' | 'wishlist' | 'auth' | 'refer'>('home');
  const [selectedPG, setSelectedPG] = useState<PG | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [successType, setSuccessType] = useState<'visit' | 'direct'>('visit');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Loading States
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('stayease_auth') === 'true';
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('stayease_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Filter State
  const [selectedGender, setSelectedGender] = useState<GenderType | 'All'>('All');
  const [selectedSharing, setSelectedSharing] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Persist Wishlist
  useEffect(() => {
    localStorage.setItem('stayease_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Persist Auth
  useEffect(() => {
    localStorage.setItem('stayease_auth', String(isLoggedIn));
  }, [isLoggedIn]);

  const toggleWishlist = async (pgId: string) => {
    if (!isLoggedIn) {
      setView('auth');
      return;
    }
    
    setIsProcessingAction(true);
    // Simulate server update
    await new Promise(resolve => setTimeout(resolve, 600));
    
    setWishlist(prev => 
      prev.includes(pgId) ? prev.filter(id => id !== pgId) : [...prev, pgId]
    );
    setIsProcessingAction(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setView('home');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    setView('home');
  };

  const filteredPGs = useMemo(() => {
    return PGS.filter(pg => {
      const genderMatch = selectedGender === 'All' || pg.type === selectedGender;
      const sharingMatch = !selectedSharing || pg.buildings.some(b => 
        b.roomTypes.some(rt => rt.sharing === selectedSharing)
      );
      const searchMatch = pg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pg.location.toLowerCase().includes(searchQuery.toLowerCase());
      return genderMatch && sharingMatch && searchMatch;
    });
  }, [selectedGender, selectedSharing, searchQuery]);

  const handlePGClick = (pg: PG) => {
    setSelectedPG(pg);
    setView('details');
    window.scrollTo(0, 0);
  };

  const handleBookingStart = (data: BookingData) => {
    if (!isLoggedIn) {
      setView('auth');
      return;
    }
    setBookingData(data);
    setView('booking');
    window.scrollTo(0, 0);
  };

  const handleBookingComplete = (type: 'visit' | 'direct') => {
    setSuccessType(type);
    setView('success');
  };

  // Close menu on view change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [view]);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Global Processing State */}
      {isProcessingAction && <LoadingOverlay message="Saving your preference..." />}

      {/* Mobile Drawer Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Side Menu (Hamburger Drawer) */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[70] shadow-2xl transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <span className="font-extrabold text-xl text-[#FF385C]">StayEase</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1">
            {!isLoggedIn ? (
              <div className="space-y-4">
                <p className="text-gray-500 text-sm font-medium leading-relaxed">Login to view your bookings, manage your wishlist, and refer friends to earn rewards.</p>
                <button 
                  onClick={() => setView('auth')}
                  className="w-full bg-[#FF385C] text-white py-3.5 rounded-xl font-bold text-lg hover:bg-[#e31c5f] transition-all active:scale-[0.98] shadow-lg shadow-rose-100"
                >
                  Sign in
                </button>
                <div className="pt-6">
                  <button className="text-left font-semibold text-gray-900 py-2 hover:text-[#FF385C] transition-colors flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Help Center
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <button className="text-left font-semibold text-lg py-3 border-b border-gray-50 hover:text-[#FF385C] transition-colors flex items-center justify-between group">
                  My Bookings
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
                <button 
                  onClick={() => setView('wishlist')}
                  className={`text-left font-semibold text-lg py-3 border-b border-gray-50 hover:text-[#FF385C] transition-colors flex items-center justify-between group ${view === 'wishlist' ? 'text-[#FF385C]' : ''}`}
                >
                  Wishlist
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
                <button 
                  onClick={() => setView('refer')}
                  className={`text-left font-semibold text-lg py-3 border-b border-gray-50 hover:text-[#FF385C] transition-colors flex items-center justify-between group ${view === 'refer' ? 'text-[#FF385C]' : ''}`}
                >
                  Refer & Earn
                  <span className="bg-rose-50 text-[#FF385C] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">New</span>
                </button>
                <button className="text-left font-semibold text-lg py-3 border-b border-gray-50 hover:text-[#FF385C] transition-colors">
                  List your PG
                </button>
                <button className="text-left font-semibold text-lg py-3 border-b border-gray-100/50 hover:text-[#FF385C] transition-colors">
                  Account Settings
                </button>
              </div>
            )}
          </div>

          <div className="pt-8 border-t border-gray-100">
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 text-gray-500 font-bold hover:text-black transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Sign Out
              </button>
            ) : (
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">StayEase v1.0.4 Premium</p>
            )}
          </div>
        </div>
      </div>

      {(view === 'home' || view === 'wishlist' || view === 'refer') && (
        <div className="pb-24 lg:pb-10">
          {/* Enhanced Responsive Header */}
          <header className="sticky top-0 z-50 bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
              <h1 
                onClick={() => setView('home')} 
                className="text-2xl font-extrabold tracking-tight text-[#FF385C] cursor-pointer hover:opacity-80 transition-opacity"
              >
                StayEase
              </h1>
              
              {/* Distinctive Search Input Desktop */}
              <div className="relative group w-full max-w-xs md:max-w-md lg:max-w-lg hidden sm:block">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400 group-focus-within:text-[#FF385C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="HSR, Koramangala, Indiranagar..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 hover:border-[#FF385C] focus:border-[#FF385C] focus:ring-4 focus:ring-[#FF385C]/20 outline-none transition-all placeholder-gray-400 text-sm font-medium shadow-sm bg-white"
                />
              </div>

              {/* Action Nav & Hamburger */}
              <div className="flex items-center gap-3">
                <button className="hidden md:block text-sm font-bold text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-full transition-colors active:scale-95">List your PG</button>
                
                {/* 3-line Menu Button + Profile */}
                <div 
                  onClick={() => setIsMenuOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-full hover:shadow-md hover:border-[#FF385C] transition-all cursor-pointer bg-white group active:scale-95"
                >
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-[#FF385C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                  <div className={`w-8 h-8 ${isLoggedIn ? 'bg-slate-800' : 'bg-gray-100 text-gray-400'} rounded-full flex items-center justify-center shadow-sm ring-2 ring-white group-hover:ring-[#FF385C]/30 transition-all duration-300`}>
                    {isLoggedIn ? (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Search - Only visible on small screens */}
            {view === 'home' && (
              <div className="px-4 pb-2 sm:hidden">
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search location or PG name..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 hover:border-[#FF385C] focus:border-[#FF385C] focus:ring-4 focus:ring-[#FF385C]/20 outline-none transition-all text-sm font-medium placeholder-gray-400 bg-white"
                  />
                </div>
              </div>
            )}

            {view === 'home' && (
              <div className="max-w-7xl mx-auto">
                <FilterChips 
                  selectedGender={selectedGender}
                  setSelectedGender={setSelectedGender}
                  selectedSharing={selectedSharing}
                  setSelectedSharing={setSelectedSharing}
                />
              </div>
            )}
          </header>

          <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
            {view === 'home' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
                {isInitialLoading ? (
                  Array.from({ length: 8 }).map((_, idx) => (
                    <SkeletonCard key={idx} />
                  ))
                ) : filteredPGs.length > 0 ? (
                  filteredPGs.map(pg => (
                    <PGCard 
                      key={pg.id} 
                      pg={pg} 
                      onClick={() => handlePGClick(pg)}
                      isWishlisted={wishlist.includes(pg.id)}
                      onWishlistToggle={() => toggleWishlist(pg.id)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-24 text-gray-500 flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <p className="text-xl font-bold text-gray-900">No properties found</p>
                    <p className="mt-1">Try adjusting your filters or search terms.</p>
                    <button 
                      onClick={() => { setSelectedGender('All'); setSelectedSharing(null); setSearchQuery(''); }}
                      className="mt-6 bg-[#FF385C] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#e31c5f] transition-all"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            ) : view === 'wishlist' ? (
              <WishlistView 
                allPGs={PGS} 
                wishlistIds={wishlist} 
                onPGClick={handlePGClick}
                onWishlistToggle={toggleWishlist}
              />
            ) : (
              <ReferAndEarn onBack={() => setView('home')} />
            )}
          </main>
        </div>
      )}

      {view === 'details' && selectedPG && (
        <PGDetails 
          pg={selectedPG} 
          onBack={() => setView('home')} 
          onSelectBooking={handleBookingStart}
          isWishlisted={wishlist.includes(selectedPG.id)}
          onWishlistToggle={() => toggleWishlist(selectedPG.id)}
        />
      )}

      {view === 'booking' && bookingData && (
        <div className="bg-gray-50 min-h-screen">
          <div className="max-w-4xl mx-auto">
            <BookingFlow 
              data={bookingData} 
              onBack={() => setView('details')} 
              onComplete={handleBookingComplete}
            />
          </div>
        </div>
      )}

      {view === 'success' && (
        <SuccessScreen 
          type={successType} 
          onDone={() => {
            setView('home');
            setSelectedPG(null);
            setBookingData(null);
          }} 
        />
      )}

      {view === 'auth' && (
        <AuthFlow onBack={() => setView('home')} onSuccess={handleLoginSuccess} />
      )}

      {/* Persistent Bottom Nav (Mobile Only) */}
      {(view === 'home' || view === 'wishlist' || view === 'refer') && (
        <nav className="fixed bottom-0 md:hidden inset-x-0 bg-white/90 backdrop-blur-md border-t py-3 flex justify-around items-center shadow-2xl z-50">
          <button 
            onClick={() => setView('home')}
            className={`flex flex-col items-center gap-1 active:scale-90 transition-transform ${view === 'home' ? 'text-[#FF385C]' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6" fill={view === 'home' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-[10px] font-bold">Explore</span>
          </button>
          <button 
            onClick={() => setView('wishlist')}
            className={`flex flex-col items-center gap-1 active:scale-90 transition-transform ${view === 'wishlist' ? 'text-[#FF385C]' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6" fill={view === 'wishlist' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <span className="text-[10px] font-bold">Wishlist</span>
          </button>
          <button 
            onClick={() => setView('refer')}
            className={`flex flex-col items-center gap-1 active:scale-90 transition-transform ${view === 'refer' ? 'text-[#FF385C]' : 'text-gray-400'}`}
          >
             <svg className="w-6 h-6" fill={view === 'refer' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h3a2 2 0 110 4h-3m0 0h-3a2 2 0 100 4h3m0-4v8m11-5h-6m-6 0H3" /></svg>
             <span className="text-[10px] font-bold">Refer</span>
          </button>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-black active:scale-90 transition-transform"
          >
             <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isLoggedIn ? 'bg-slate-800 text-white' : 'border-2 border-gray-300'}`}>
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
             </div>
             <span className="text-[10px] font-bold">Menu</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
