
import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO_URL } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-4 mb-6">
              <img src={LOGO_URL} alt="KNPI Logo" className="h-16 w-auto bg-white p-1 rounded-lg" />
              <div>
                <h2 className="text-2xl font-bold tracking-tight">KNPI</h2>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-[0.2em]">Komite Nasional Pemuda Indonesia Lombok Barat</p>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Organisasi pemuda lintas organisasi di Indonesia yang menjadi wadah perhimpunan organisasi kepemudaan seluruh Indonesia demi mewujudkan kejayaan bangsa.
            </p>
            <div className="flex gap-4 mt-8">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 transition-colors">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 transition-colors">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 transition-colors">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Navigasi</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Beranda</Link></li>
              <li><Link to="/blog" className="text-slate-400 hover:text-white transition-colors">Berita & Artikel</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Kontak</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Kontak</h3>
            <ul className="space-y-4 text-slate-400">
              <li className="flex gap-3">
                <i className="fa-solid fa-location-dot mt-1 text-blue-500"></i>
                <span>Lombok Barat</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Komite Nasional Pemuda Indonesia Lombok Barat. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
