
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../services/apiService';
import { Article } from '../types';
import ArticleCard from '../components/ArticleCard';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchArticles();
      setArticles(data.slice(0, 3)); // Latest 3
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="pb-20">
      <SEO title="Beranda" description="Selamat datang di Portal Berita Resmi KNPI - Komite Nasional Pemuda Indonesia." />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-blue-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest animate-bounce">
              Official Portal KNPI Lombok Barat
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8">
              Pusat Informasi <span className="text-blue-400">Pemuda Indonesia</span> Terdepan
            </h1>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl">
              Dapatkan berita terbaru, pengumuman resmi, dan aspirasi pemuda dari seluruh penjuru nusantara langsung dari wadah perhimpunan pemuda nasional.
            </p>
          </div>
        </div>
      </section>

      {/* CEO Message / Ketua Umum Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="./taupik.jpg" 
                  alt="Ketua Umum KNPI" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-blue-600 text-white p-8 rounded-3xl shadow-2xl hidden md:block max-w-xs">
                <i className="fa-solid fa-quote-left text-4xl opacity-30 mb-4 block"></i>
                <p className="font-medium italic leading-relaxed">
                  "Pemuda bukan sekadar masa depan bangsa, melainkan pemegang kendali arah bangsa hari ini."
                </p>
              </div>
            </div>
            <div>
              <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Pesan Ketua Umum</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Mewujudkan Harmoni Pemuda Menuju Indonesia Emas 2045</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <p>
                  Sebagai wadah resmi organisasi kepemudaan, KNPI berkomitmen menjadi inkubator kepemimpinan yang progresif. Kami percaya bahwa sinergi adalah kunci utama dalam menghadapi tantangan global.
                </p>
                <p>
                  Melalui portal berita ini, kami ingin memastikan transparansi dan aksesibilitas informasi bagi seluruh pemuda di pelosok tanah air. Mari bersama-sama berkontribusi secara nyata demi kejayaan ibu pertiwi.
                </p>
              </div>
              <div className="mt-10 pt-10 border-t border-slate-100">
                <p className="text-2xl font-bold text-slate-900">M. Taufik</p>
                <p className="text-slate-500 font-medium">Ketua Umum KNPI Lombok Barat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Kabar Pemuda Terbaru</h2>
              <p className="text-slate-500 text-lg">Informasi aktual seputar kegiatan dan kebijakan organisasi KNPI.</p>
            </div>
            <Link 
              to="/blog" 
              className="group inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors"
            >
              Lihat Semua Berita
              <span className="ml-3 w-10 h-10 rounded-full border border-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl h-96 animate-pulse border border-slate-100 shadow-sm"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
