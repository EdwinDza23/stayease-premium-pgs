
import React from 'react';
import { PG, AvailabilityStatus, BookingData } from '../types';

interface PGDetailsProps {
  pg: PG;
  onBack: () => void;
  onSelectBooking: (data: BookingData) => void;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
}

const PGDetails: React.FC<PGDetailsProps> = ({ pg, onBack, onSelectBooking, isWishlisted, onWishlistToggle }) => {
  const startingRent = Math.min(...pg.buildings.flatMap(b => b.roomTypes.map(rt => rt.rent)));

  return (
    <div className="pb-32 lg:pb-16 bg-white min-h-screen">
      {/* Header / Nav */}
      <div className="sticky top-0 inset-x-0 h-16 bg-white/90 backdrop-blur-md z-50 flex items-center border-b px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              <span className="hidden md:inline font-medium text-sm">Back</span>
            </button>
            <h2 className="ml-4 font-semibold text-lg line-clamp-1 max-w-[150px] md:max-w-none">{pg.name}</h2>
          </div>
          
          <button 
            onClick={onWishlistToggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg 
              className={`w-6 h-6 transition-colors ${isWishlisted ? 'text-[#FF385C] fill-[#FF385C]' : 'text-gray-600'}`} 
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="hidden sm:inline font-bold text-sm underline">{isWishlisted ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-0 md:px-8 lg:pt-8">
        {/* Image Display */}
        {/* Mobile: Carousel | Desktop: Grid */}
        <div className="block md:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar aspect-[4/3]">
            {pg.images.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                alt={`View ${idx + 1}`}
                className="flex-shrink-0 w-full h-full object-cover snap-center"
              />
            ))}
          </div>
        </div>

        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
          <div className="col-span-2 row-span-2">
            <img src={pg.images[0]} className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer" />
          </div>
          <div className="col-span-1 row-span-1">
             <img src={pg.images[1] || pg.images[0]} className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer" />
          </div>
          <div className="col-span-1 row-span-1">
             <img src={pg.images[0]} className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer" />
          </div>
          <div className="col-span-1 row-span-1">
             <img src={pg.images[0]} className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer" />
          </div>
          <div className="col-span-1 row-span-1 relative">
             <img src={pg.images[0]} className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer" />
             <button className="absolute bottom-4 right-4 bg-white border border-black rounded-lg px-4 py-1.5 text-xs font-bold shadow-sm">Show all photos</button>
          </div>
        </div>

        <div className="px-5 md:px-0 py-8 lg:flex lg:gap-16">
          {/* Main Info Column */}
          <div className="lg:flex-1 space-y-8">
            <section>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{pg.name}</h1>
                  <p className="text-gray-600 mt-1 md:text-lg">{pg.location}</p>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-xl bg-gray-50 min-w-[80px]">
                  <span className="text-xl font-bold">4.8</span>
                  <div className="flex text-amber-500 mb-1">
                    {[1,2,3,4,5].map(i => <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                  </div>
                  <span className="text-[10px] text-gray-500 underline uppercase font-bold">12 Reviews</span>
                </div>
              </div>
              <p className="mt-6 text-gray-700 leading-relaxed md:text-lg">
                {pg.description}
              </p>
            </section>

            <hr className="border-gray-100" />

            <section>
              <h3 className="text-xl font-bold mb-6">What this place offers</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6">
                {pg.amenities.map(item => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-xl">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-gray-600 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-gray-100" />

            <section>
              <h3 className="text-xl font-bold mb-2">Room Categories</h3>
              <p className="text-sm text-gray-500 mb-6">Transparent pricing based on sharing types</p>
              
              <div className="space-y-6">
                {pg.buildings.map(building => (
                  <div key={building.id} className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{building.name}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {building.roomTypes.map((rt, idx) => (
                        <div 
                          key={idx}
                          className={`bg-white border rounded-2xl p-5 flex justify-between items-center transition-all shadow-sm ${
                            rt.availability === AvailabilityStatus.FULL ? 'opacity-50' : 'hover:border-[#FF385C] hover:shadow-md'
                          }`}
                        >
                          <div>
                            <p className="font-bold text-gray-900">{rt.sharing} Sharing</p>
                            <p className="text-sm text-gray-600 font-semibold">₹{rt.rent.toLocaleString('en-IN')} /mo</p>
                            <span className={`text-[10px] font-extrabold uppercase mt-1 inline-block px-2 py-0.5 rounded ${
                              rt.availability === AvailabilityStatus.AVAILABLE ? 'bg-green-50 text-green-600' :
                              rt.availability === AvailabilityStatus.FEW_LEFT ? 'bg-orange-50 text-orange-600' :
                              'bg-red-50 text-red-600'
                            }`}>
                              {rt.availability}
                            </span>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              disabled={rt.availability === AvailabilityStatus.FULL}
                              onClick={() => onSelectBooking({ 
                                pg, 
                                building, 
                                roomType: rt, 
                                bookingType: rt.availability === AvailabilityStatus.FULL ? 'visit' : 'direct' 
                              })}
                              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                                rt.availability === AvailabilityStatus.FULL 
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-black text-white hover:bg-gray-800 active:scale-95'
                              }`}
                            >
                              {rt.availability === AvailabilityStatus.FULL ? 'Sold Out' : 'Select'}
                            </button>
                            
                            {(rt.availability === AvailabilityStatus.AVAILABLE || rt.availability === AvailabilityStatus.FEW_LEFT) && (
                              <button 
                                onClick={() => onSelectBooking({ 
                                  pg, 
                                  building, 
                                  roomType: rt, 
                                  bookingType: 'direct' 
                                })}
                                className="px-4 py-2.5 bg-[#FF385C] text-white rounded-xl text-xs font-bold shadow-sm hover:bg-[#e31c5f] transition-all active:scale-95 whitespace-nowrap"
                              >
                                Book Now
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-gray-100" />

            <section>
              <h3 className="text-xl font-bold mb-6">House Rules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pg.rules.map(rule => (
                  <div key={rule} className="flex gap-4 items-start p-4 bg-gray-50 rounded-xl">
                     <div className="mt-1 flex-shrink-0 w-5 h-5 bg-white shadow-sm rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                     </div>
                     <span className="text-sm text-gray-700 font-medium">{rule}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Booking Widget (Desktop) */}
          <aside className="hidden lg:block w-[400px]">
             <div className="sticky top-24 p-8 border rounded-3xl shadow-2xl bg-white space-y-6">
                <div>
                   <p className="text-2xl font-bold">₹{startingRent.toLocaleString('en-IN')} <span className="text-base font-normal text-gray-500">starting / month</span></p>
                   <div className="flex items-center gap-1 text-sm font-semibold mt-1">
                      <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      4.8 · <span className="underline text-gray-500">12 reviews</span>
                   </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-xl p-4 bg-gray-50">
                     <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1">Stay Duration</p>
                     <p className="text-sm font-bold">Flexible / No Lock-in</p>
                  </div>
                  <button 
                    onClick={() => {
                      const firstAvail = pg.buildings[0].roomTypes.find(r => r.availability !== AvailabilityStatus.FULL);
                      if(firstAvail) onSelectBooking({ pg, building: pg.buildings[0], roomType: firstAvail, bookingType: 'direct' });
                    }}
                    className="w-full bg-[#FF385C] hover:bg-[#e31c5f] text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-all"
                  >
                    Check Availability
                  </button>
                  <p className="text-center text-xs text-gray-500 font-medium">You won't be charged yet</p>
                </div>

                <hr className="border-gray-100" />
                
                <div className="flex justify-between items-center text-gray-600 font-medium">
                   <p className="underline underline-offset-4">Maintenance fee</p>
                   <p>Included</p>
                </div>
                <div className="flex justify-between items-center text-gray-600 font-medium">
                   <p className="underline underline-offset-4">Electricity (usage based)</p>
                   <p>Postpaid</p>
                </div>
             </div>
          </aside>
        </div>
      </div>

      {/* Sticky Bottom CTA (Mobile/Tablet Only) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t p-4 flex items-center justify-between z-50">
        <div>
           <p className="text-sm text-gray-500 font-medium">Starting at</p>
           <p className="font-bold text-lg text-gray-900">₹{startingRent.toLocaleString('en-IN')} <span className="text-sm font-normal text-gray-500">/mo</span></p>
        </div>
        <button 
           onClick={() => {
             const firstAvail = pg.buildings[0].roomTypes.find(r => r.availability !== AvailabilityStatus.FULL);
             if(firstAvail) {
               onSelectBooking({ pg, building: pg.buildings[0], roomType: firstAvail, bookingType: 'direct' });
             } else {
               onSelectBooking({ pg, building: pg.buildings[0], roomType: pg.buildings[0].roomTypes[0], bookingType: 'visit' });
             }
           }}
           className="bg-[#FF385C] text-white px-8 py-3 rounded-xl font-bold text-md active:scale-95 transition-all shadow-lg"
        >
          Check Availability
        </button>
      </div>
    </div>
  );
};

export default PGDetails;
