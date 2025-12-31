
import React from 'react';

interface SuccessScreenProps {
  type: 'visit' | 'direct';
  onDone: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ type, onDone }) => {
  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 animate-bounce">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
      </div>
      
      <h2 className="text-3xl font-bold mb-4">
        {type === 'visit' ? 'Visit Scheduled!' : 'Room Reserved!'}
      </h2>
      
      <p className="text-gray-600 mb-12 leading-relaxed max-w-xs mx-auto">
        {type === 'visit' 
          ? 'Our team will contact you shortly to confirm your visit time and share the location map.'
          : 'Your room is reserved for 24 hours. Our property manager will call you for document verification.'}
      </p>

      <button 
        onClick={onDone}
        className="w-full max-w-xs py-4 bg-black text-white rounded-xl font-bold text-lg shadow-xl active:scale-95 transition-all"
      >
        Back to Home
      </button>

      <p className="mt-8 text-xs text-gray-400">Confirmation sent to your registered phone number.</p>
    </div>
  );
};

export default SuccessScreen;
