
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOGO_URL } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Berita & Artikel', path: '/blog' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img src={LOGO_URL} alt="KNPI Logo" className="h-12 w-auto" />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-blue-900 leading-none">KNPI</span>
                <span className="text-[10px] font-semibold text-red-600 uppercase tracking-widest mt-0.5">Lombok Barat</span>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors ${
                  isActive(link.path) 
                    ? 'text-blue-600 underline underline-offset-8 decoration-2' 
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95">
              Hubungi Kami
            </button> */}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-blue-600 focus:outline-none p-2"
            >
              <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 py-4 animate-in fade-in slide-in-from-top-4">
          <div className="px-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-xl text-base font-semibold ${
                  isActive(link.path) ? 'bg-blue-50 text-blue-600' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* <div className="pt-4 px-3">
              <button className="w-full bg-red-600 text-white px-5 py-3 rounded-xl text-base font-bold">
                Hubungi Kami
              </button>
            </div> */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
