import React, { useState } from 'react';
import { ViewState } from '../types';
import { Menu, X, ShoppingBag, Search, UserCircle, Star } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { label: string; value: ViewState }[] = [
    { label: '首頁', value: 'HOME' },
    { label: '商品列表', value: 'PRODUCTS' },
    { label: '訂單查詢', value: 'TRACKING' },
  ];

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer gap-2" 
            onClick={() => handleNavClick('HOME')}
          >
            <div className="bg-brand-600 p-1.5 rounded-lg">
              <Star className="h-6 w-6 text-white" fill="white" />
            </div>
            <span className="font-bold text-2xl tracking-tighter text-brand-900">HS<span className="text-brand-500">代購</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentView === item.value
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => handleNavClick('ADMIN')}
              className={`p-2 rounded-full hover:bg-brand-100 transition ${currentView === 'ADMIN' ? 'text-brand-600' : 'text-gray-500'}`}
              title="Admin Panel"
            >
              <UserCircle className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-brand-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentView === item.value
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
             <button
                onClick={() => handleNavClick('ADMIN')}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentView === 'ADMIN'
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'
                }`}
              >
                後台管理 (Admin)
              </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;