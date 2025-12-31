
import React, { useState } from 'react';
import { BookingData } from '../types';
import LoadingOverlay from './LoadingOverlay';

interface BookingFlowProps {
  data: BookingData;
  onBack: () => void;
  onComplete: (type: 'direct' | 'visit') => void;
}

const BookingFlow: React.FC<BookingFlowProps> = ({ data, onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [activePath, setActivePath] = useState<'visit' | 'direct'>(data.bookingType);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [granularLocation, setGranularLocation] = useState('');

  // Visit states
  const [selectedVisitDay, setSelectedVisitDay] = useState<string | null>(null);
  const [selectedVisitSlot, setSelectedVisitSlot] = useState<string | null>(null);

  const handleNext = async () => {
    if (step === 1) {
      setStep(2);
    } else {
      setIsSubmitting(true);
      // Simulate API call for booking
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      onComplete(activePath);
    }
  };

  const isNextDisabled = () => {
    if (step === 1) return !name || !phone || !moveInDate || !granularLocation;
    if (step === 2 && activePath === 'visit') return !selectedVisitDay || !selectedVisitSlot;
    return false;
  };

  const phases = ["1st Phase", "2nd Phase", "3rd Phase", "4th Phase", "5th Phase", "6th Phase", "7th Phase", "8th Phase"];

  return (
    <div className="min-h-screen lg:min-h-0 lg:py-10 bg-white md:bg-gray-50 lg:bg-transparent">
      {isSubmitting && <LoadingOverlay message={activePath === 'visit' ? "Scheduling your tour..." : "Securing your room..."} />}
      
      <div className="max-w-2xl mx-auto bg-white lg:rounded-3xl lg:shadow-2xl overflow-hidden border border-transparent lg:border-gray-100">
        {/* Header */}
        <div className="sticky top-0 h-16 bg-white flex items-center px-6 border-b z-50 justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h2 className="font-bold text-lg">{activePath === 'visit' ? 'Schedule Visit' : 'Confirm & Reserve'}</h2>
          </div>
          <div className="text-sm font-bold text-gray-400">Step {step} of 2</div>
        </div>

        <div className="px-6 py-8 space-y-10">
          {step === 1 && (
            <>
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Personal Information</h3>
                  <div className="p-2 bg-rose-50 rounded-lg">
                    <svg className="w-5 h-5 text-[#FF385C]" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" /></svg>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full p-3.5 border border-gray-200 rounded-xl hover:border-[#FF385C] focus:border-[#FF385C] focus:ring-4 focus:ring-[#FF385C]/20 outline-none transition-all placeholder-gray-400 font-medium bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">WhatsApp Number</label>
                      <div className="flex gap-2">
                        <span className="flex items-center justify-center w-14 border border-gray-200 rounded-xl bg-gray-50 font-bold text-xs">+91</span>
                        <input 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="9876543210"
                          className="w-full p-3.5 border border-gray-200 rounded-xl hover:border-[#FF385C] focus:border-[#FF385C] focus:ring-4 focus:ring-[#FF385C]/20 outline-none transition-all placeholder-gray-400 font-medium bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Preferred Area / Phase</label>
                    <div className="relative">
                      <select 
                        value={granularLocation}
                        onChange={(e) => setGranularLocation(e.target.value)}
                        className="w-full p-3.5 border border-gray-200 rounded-xl hover:border-[#FF385C] focus:border-[#FF385C] focus:ring-4 focus:ring-[#FF385C]/20 outline-none transition-all font-medium bg-white appearance-none"
                      >
                        <option value="" disabled className="text-gray-400">Select Subdivision (e.g. Phase)</option>
                        {phases.map(p => (
                          <option key={p} value={`${data.pg.location.split(' ')[0]} ${p}`}>
                            {data.pg.location.split(' ')[0]} {p}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Target Move-in Date</label>
                    <input 
                      type="date" 
                      value={moveInDate}
                      onChange={(e) => setMoveInDate(e.target.value)}
                      className="w-full p-3.5 border border-gray-200 rounded-xl hover:border-[#FF385C] focus:border-[#FF385C] focus:ring-4 focus:ring-[#FF385C]/20 outline-none transition-all placeholder-gray-400 font-medium bg-white"
                    />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">How would you like to proceed?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => setActivePath('visit')}
                    className={`p-6 border-2 rounded-2xl text-left transition-all relative ${activePath === 'visit' ? 'border-[#FF385C] bg-rose-50/30' : 'border-gray-200 hover:border-[#FF385C]'}`}
                  >
                    {activePath === 'visit' && <div className="absolute top-4 right-4 text-[#FF385C]"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>}
                    <p className="font-bold text-lg">Schedule Visit</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">Book a 15-min tour of the building before deciding.</p>
                  </button>
                  <button 
                    onClick={() => setActivePath('direct')}
                    className={`p-6 border-2 rounded-2xl text-left transition-all relative ${activePath === 'direct' ? 'border-[#FF385C] bg-rose-50/30' : 'border-gray-200 hover:border-[#FF385C]'}`}
                  >
                    {activePath === 'direct' && <div className="absolute top-4 right-4 text-[#FF385C]"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>}
                    <p className="font-bold text-lg">Instant Reserve</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">Secure this room immediately with a token amount.</p>
                  </button>
                </div>
              </section>
            </>
          )}

          {step === 2 && activePath === 'direct' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
               <h3 className="text-2xl font-bold">Booking Details</h3>
               <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">Property</p>
                      <p className="font-bold text-lg">{data.pg.name}</p>
                    </div>
                    <img src={data.pg.images[0]} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-[10px] font-extrabold uppercase text-gray-400">Room</p>
                        <p className="font-bold text-sm">{data.roomType.sharing} Sharing</p>
                     </div>
                     <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-[10px] font-extrabold uppercase text-gray-400">Rent</p>
                        <p className="font-bold text-sm">₹{data.roomType.rent.toLocaleString('en-IN')}</p>
                     </div>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between items-center bg-[#FF385C] text-white p-6 rounded-2xl shadow-lg">
                    <span className="font-bold">Reservation Token</span>
                    <span className="text-2xl font-black">₹2,000</span>
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-xl font-bold">Secure Payment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     {['GPay / PhonePe UPI', 'Cards / NetBanking'].map(pm => (
                       <label key={pm} className="flex items-center justify-between p-5 border-2 rounded-2xl hover:border-[#FF385C] cursor-pointer group transition-all">
                          <span className="font-bold text-sm">{pm}</span>
                          <input type="radio" name="payment" className="accent-[#FF385C] w-5 h-5" />
                       </label>
                     ))}
                  </div>
               </div>
            </section>
          )}

          {step === 2 && activePath === 'visit' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
               <div>
                 <h3 className="text-2xl font-bold mb-1">Pick a day</h3>
                 <p className="text-gray-500 text-sm">Visits available at {granularLocation}</p>
               </div>
               <div className="grid grid-cols-3 gap-3">
                 {['Tomorrow', 'Day after', 'Sat/Sun'].map(day => (
                   <button 
                    key={day} 
                    onClick={() => setSelectedVisitDay(day)}
                    className={`py-5 border-2 rounded-2xl font-bold text-sm transition-all shadow-sm flex flex-col items-center gap-1 ${
                      selectedVisitDay === day 
                        ? 'bg-[#FF385C] text-white border-[#FF385C] scale-95 shadow-xl shadow-rose-200' 
                        : 'bg-white border-gray-100 text-gray-600 hover:border-[#FF385C]'
                    }`}
                   >
                      {day}
                      {selectedVisitDay === day && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                   </button>
                 ))}
               </div>
               <div className="space-y-4">
                 <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Select preferred window</label>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { label: 'Morning (10-12)', icon: '☀️' },
                      { label: 'Afternoon (1-3)', icon: '🌤️' },
                      { label: 'Evening (4-6)', icon: '🌇' },
                      { label: 'Night (6-8)', icon: '🌙' }
                    ].map(slot => (
                       <button 
                        key={slot.label} 
                        onClick={() => setSelectedVisitSlot(slot.label)}
                        className={`p-5 border-2 rounded-2xl text-left font-bold text-sm transition-all flex items-center justify-between ${
                          selectedVisitSlot === slot.label 
                            ? 'bg-[#FF385C] text-white border-[#FF385C] scale-[0.98] shadow-lg shadow-rose-200' 
                            : 'bg-white border-gray-100 text-gray-600 hover:border-[#FF385C]'
                        }`}
                       >
                          <span>{slot.label}</span>
                          <span className="text-lg">{slot.icon}</span>
                       </button>
                    ))}
                 </div>
               </div>

               {selectedVisitDay && selectedVisitSlot && (
                 <div className="p-4 bg-green-50 border border-green-100 rounded-2xl animate-in fade-in slide-in-from-top-2 flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-green-800">Appointment confirmed for {selectedVisitDay}</p>
                      <p className="text-xs text-green-600 font-medium">Timeslot: {selectedVisitSlot}</p>
                    </div>
                 </div>
               )}
            </section>
          )}
        </div>

        {/* Action Footer */}
        <div className="p-6 bg-white border-t lg:p-10">
           <button 
             onClick={handleNext}
             disabled={isNextDisabled() || isSubmitting}
             className={`w-full py-4 rounded-2xl font-bold text-xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 ${
               isNextDisabled() || isSubmitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#FF385C] text-white hover:bg-[#e31c5f]'
             }`}
           >
             {isSubmitting ? (
               <>
                 <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                 Please wait...
               </>
             ) : (
               step === 1 ? 'Continue to Finalize' : activePath === 'visit' ? 'Book Appointment' : 'Complete Reservation'
             )}
           </button>
           <p className="text-center text-xs text-gray-400 mt-6 font-medium">Safe & Secure 256-bit encrypted booking</p>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
