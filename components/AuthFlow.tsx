
import React, { useState } from 'react';

interface AuthFlowProps {
  onBack: () => void;
  onSuccess: () => void;
}

const AuthFlow: React.FC<AuthFlowProps> = ({ onBack, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col md:bg-gray-50 md:items-center md:justify-center">
      {/* Header (Mobile) */}
      <div className="flex items-center px-4 py-4 border-b md:hidden bg-white w-full">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h2 className="ml-4 font-bold text-lg">{mode === 'login' ? 'Log in' : 'Sign up'}</h2>
      </div>

      <div className="flex-1 w-full max-w-lg md:flex-none bg-white md:rounded-3xl md:shadow-2xl md:border md:border-gray-100 p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-center mb-4">
          <h2 className="text-2xl font-black text-gray-900">Welcome to StayEase</h2>
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:hidden">Welcome to StayEase</h1>
          <p className="text-gray-500 font-medium mt-2">Discover and book premium PGs with ease.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Full Name</label>
              <input 
                required
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul Sharma"
                className="w-full p-4 border border-gray-200 rounded-2xl focus:border-[#FF385C] focus:ring-4 focus:ring-[#FF385C]/10 outline-none transition-all font-medium placeholder-gray-300"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Email Address</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full p-4 border border-gray-200 rounded-2xl focus:border-[#FF385C] focus:ring-4 focus:ring-[#FF385C]/10 outline-none transition-all font-medium placeholder-gray-300"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-4 border border-gray-200 rounded-2xl focus:border-[#FF385C] focus:ring-4 focus:ring-[#FF385C]/10 outline-none transition-all font-medium placeholder-gray-300"
            />
          </div>

          <button 
            disabled={isLoading}
            type="submit"
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg shadow-rose-100 transition-all flex items-center justify-center gap-3 ${
              isLoading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#FF385C] text-white hover:bg-[#e31c5f] active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                Please wait...
              </>
            ) : (
              mode === 'login' ? 'Log in' : 'Create account'
            )}
          </button>
        </form>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="flex-shrink mx-4 text-xs font-bold text-gray-400 uppercase tracking-widest">or</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 p-4 border-2 border-gray-100 rounded-2xl hover:border-gray-200 transition-all font-bold text-sm active:scale-95 bg-white">
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 p-4 border-2 border-gray-100 rounded-2xl hover:border-gray-200 transition-all font-bold text-sm active:scale-95 bg-white">
            <img src="https://www.svgrepo.com/show/303108/apple-black-logo.svg" className="w-5 h-5" alt="Apple" />
            Apple
          </button>
        </div>

        <p className="text-center text-sm font-medium text-gray-600">
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-[#FF385C] font-bold underline underline-offset-4 hover:text-[#e31c5f]"
          >
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>

        <div className="pt-8">
           <p className="text-[10px] text-gray-400 text-center leading-relaxed">
             By continuing, you agree to StayEase's <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>. We may send you occasional updates about premium properties.
           </p>
        </div>
      </div>
    </div>
  );
};

export default AuthFlow;
