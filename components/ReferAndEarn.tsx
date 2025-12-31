
import React, { useState } from 'react';

interface ReferAndEarnProps {
  onBack: () => void;
}

const ReferAndEarn: React.FC<ReferAndEarnProps> = ({ onBack }) => {
  const [copied, setCopied] = useState(false);
  const referralCode = "STAYEASE500";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referralHistory = [
    { name: 'Aditya Singh', date: '12 Oct, 2024', status: 'Completed', amount: '₹500' },
    { name: 'Priya Verma', date: '05 Nov, 2024', status: 'Pending', amount: '₹0' },
  ];

  return (
    <div className="min-h-[80vh] pb-12 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#FF385C] to-[#e31c5f] rounded-[2rem] p-8 md:p-12 text-white shadow-2xl shadow-rose-200 relative overflow-hidden mb-12">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">Refer Friends. <br/>Earn Cash Rewards.</h2>
          <p className="text-rose-100 text-lg font-medium mb-8 leading-relaxed">
            Get ₹500 for every friend who books their stay with StayEase. Your friend also gets ₹500 off on their first month!
          </p>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <p className="text-[10px] font-black uppercase tracking-widest text-rose-200 mb-3">Your Unique Referral Code</p>
            <div className="flex items-center gap-4">
              <div className="bg-white text-[#FF385C] font-black text-2xl px-6 py-3 rounded-xl tracking-wider flex-1 text-center shadow-lg">
                {referralCode}
              </div>
              <button 
                onClick={handleCopy}
                className={`p-4 rounded-xl font-bold transition-all active:scale-95 ${copied ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-gray-900'}`}
              >
                {copied ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column: Tracking */}
        <section className="space-y-8">
           <div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Your Earnings</h3>
              <p className="text-gray-500 font-medium">Tracking your rewards from referrals.</p>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 shadow-sm">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Earned</p>
                 <p className="text-3xl font-black text-gray-900">₹500</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 shadow-sm">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Pending</p>
                 <p className="text-3xl font-black text-gray-900">₹500</p>
              </div>
           </div>

           <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Recent Activity</h4>
              {referralHistory.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 border border-gray-100 rounded-2xl hover:shadow-md transition-shadow bg-white">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${item.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500 font-medium">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black ${item.status === 'Completed' ? 'text-green-600' : 'text-orange-500'}`}>{item.status}</p>
                    <p className="text-xs text-gray-400 font-bold">{item.amount}</p>
                  </div>
                </div>
              ))}
           </div>
        </section>

        {/* Right Column: How it works */}
        <section className="bg-gray-50/50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100">
          <h3 className="text-2xl font-black text-gray-900 mb-8">How it works</h3>
          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center font-black text-[#FF385C] flex-shrink-0">1</div>
              <div>
                <h4 className="font-bold text-lg text-gray-900">Share your code</h4>
                <p className="text-gray-500 mt-1 leading-relaxed">Send your code to friends who are looking for a premium PG in the city.</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center font-black text-[#FF385C] flex-shrink-0">2</div>
              <div>
                <h4 className="font-bold text-lg text-gray-900">Friend books a stay</h4>
                <p className="text-gray-500 mt-1 leading-relaxed">Your friend enters the code during booking and gets an instant ₹500 discount.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center font-black text-[#FF385C] flex-shrink-0">3</div>
              <div>
                <h4 className="font-bold text-lg text-gray-900">Unlock your reward</h4>
                <p className="text-gray-500 mt-1 leading-relaxed">Once they move in, we'll credit ₹500 directly to your StayEase wallet for your next rent payment.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white border border-gray-100 rounded-2xl">
             <h4 className="font-bold text-sm mb-4">Share via Socials</h4>
             <div className="flex gap-4">
                <button className="flex-1 bg-[#25D366] text-white p-3 rounded-xl flex items-center justify-center gap-2 hover:brightness-95 transition-all">
                  <span className="font-bold text-sm">WhatsApp</span>
                </button>
                <button className="flex-1 bg-[#1DA1F2] text-white p-3 rounded-xl flex items-center justify-center gap-2 hover:brightness-95 transition-all">
                  <span className="font-bold text-sm">Twitter</span>
                </button>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReferAndEarn;
