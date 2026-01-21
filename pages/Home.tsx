import React from 'react';
import { ViewState } from '../types';
import { ArrowRight, Music, Heart, Package } from 'lucide-react';

interface HomeProps {
  setView: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ setView }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-brand-900 text-white min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0 opacity-40">
            <img 
                src="https://images.unsplash.com/photo-1514525253440-b393452e3726?q=80&w=2000&auto=format&fit=crop" 
                className="w-full h-full object-cover"
                alt="Concert background"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-800/80 to-transparent z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="max-w-2xl animate-in slide-in-from-left duration-700">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Bring K-pop <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-brand-300">
                To Your Door
              </span>
            </h1>
            <p className="text-lg md:text-xl text-brand-100 mb-8 max-w-lg leading-relaxed">
              HS代購 提供最快速、最安心的韓國代購服務。專輯、周邊、特典卡，一站式滿足您的追星需求。
            </p>
            <button
              onClick={() => setView('PRODUCTS')}
              className="group bg-white text-brand-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-50 transition-all flex items-center gap-2 shadow-xl shadow-brand-900/50"
            >
              開始購物
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">為什麼選擇 HS代購?</h2>
          <div className="w-20 h-1.5 bg-brand-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Music className="w-10 h-10 text-brand-500" />,
              title: "官方通路",
              desc: "所有商品皆來自 Synnara, Weverse, YES24 等韓國官方通路，計入銷量。"
            },
            {
              icon: <Package className="w-10 h-10 text-brand-500" />,
              title: "安全包裝",
              desc: "使用加厚氣泡紙與紙箱包裝，確保您的專輯與小卡在運送途中完好無損。"
            },
            {
              icon: <Heart className="w-10 h-10 text-brand-500" />,
              title: "拆卡服務",
              desc: "提供專業拆卡排序服務，幫您湊齊本命成員小卡 (需於訂單備註)。"
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow text-center">
              <div className="bg-brand-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-6 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;