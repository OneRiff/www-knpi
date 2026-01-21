
import React, { useEffect, useState, useMemo } from 'react';
import { fetchArticles } from '../services/apiService';
import { Article } from '../types';
import ArticleCard from '../components/ArticleCard';
import SEO from '../components/SEO';

const BlogList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchArticles();
      setArticles(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const categories = useMemo(() => {
    const cats = ['Semua', ...Array.from(new Set(articles.map(a => a.category.name)))];
    return cats;
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || article.category.name === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <SEO title="Berita & Artikel" description="Temukan seluruh berita, pengumuman, dan artikel opini dari KNPI." />
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Berita & Artikel <span className="text-blue-600">KNPI</span></h1>
            <p className="text-lg text-slate-600">
              Wadah aspirasi dan transparansi kegiatan Komite Nasional Pemuda Indonesia di seluruh tingkatan kepengurusan.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12 items-center justify-between">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 w-full lg:w-auto overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="fa-solid fa-magnifying-glass text-slate-400 group-focus-within:text-blue-600 transition-colors"></i>
            </div>
            <input
              type="text"
              placeholder="Cari berita pemuda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Results Info */}
        {!loading && (
          <div className="mb-8 text-slate-500 font-medium">
            Menampilkan <span className="text-slate-900 font-bold">{filteredArticles.length}</span> artikel
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse shadow-sm border border-slate-100"></div>
            ))}
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-20 text-center border border-slate-200 shadow-sm max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <i className="fa-solid fa-newspaper text-5xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Tidak Ada Hasil</h3>
            <p className="text-slate-500 mb-8">Maaf, kami tidak dapat menemukan artikel yang Anda cari. Coba kata kunci lain atau pilih kategori yang berbeda.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('Semua');}}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all"
            >
              Reset Pencarian
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
