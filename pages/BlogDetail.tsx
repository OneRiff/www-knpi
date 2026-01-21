import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchArticleById } from '../services/apiService';
import { Article } from '../types';
import { IMAGE_BASE_URL, API_BASE_URL } from '../constants';
import SEO from '../components/SEO';
import ReactMarkdown from 'react-markdown';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadArticle = async () => {
      setLoading(true);
      const data = await fetchArticleById(id);
      setArticle(data);
      setLoading(false);
      window.scrollTo(0, 0);
    };

    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 space-y-8">
        <div className="h-10 w-24 bg-slate-200 animate-pulse rounded-full"></div>
        <div className="h-20 bg-slate-200 animate-pulse rounded-2xl"></div>
        <div className="aspect-video bg-slate-200 animate-pulse rounded-3xl"></div>
        <div className="space-y-4">
          <div className="h-6 bg-slate-100 animate-pulse rounded w-full"></div>
          <div className="h-6 bg-slate-100 animate-pulse rounded w-11/12"></div>
          <div className="h-6 bg-slate-100 animate-pulse rounded w-10/12"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl font-bold mb-4">Artikel Tidak Ditemukan</h2>
        <p className="text-slate-500 mb-8">Maaf, artikel yang Anda cari mungkin telah dihapus atau dipindahkan.</p>
        <Link to="/blog" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold">
          Kembali ke Berita
        </Link>
      </div>
    );
  }

  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
  }).format(new Date(article.createdAt));

  const imageUrl = article.image.startsWith('http')
    ? article.image
    : `${API_BASE_URL}/${article.image}`;

  return (
    <div className="bg-white pb-24">
      <SEO title={article.title} description={article.title} />

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 pt-12 md:pt-20">
        <div className="flex items-center gap-3 mb-8">
          <Link
            to="/blog"
            className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Kembali ke Berita
          </Link>
          <span className="text-slate-300">•</span>
          <span className="bg-blue-50 text-blue-600 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {article.category.name}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-8">
          {article.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12 border-b border-slate-100 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="text-slate-900 font-bold">{article.author}</p>
              <p className="text-slate-500 text-sm">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 mr-2">Bagikan:</span>
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all">
              <i className="fa-brands fa-facebook-f"></i>
            </button>
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 transition-all">
              <i className="fa-brands fa-twitter"></i>
            </button>
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all">
              <i className="fa-solid fa-link"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image (Full, Tidak Terpotong) */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4">
        <div className="article-content prose prose-lg prose-slate max-w-none text-slate-700 text-lg md:text-xl leading-relaxed font-normal">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Tagar:</span>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold">#KNPI</span>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold">#PemudaIndonesia</span>
          </div>

          <button
            onClick={() => navigate('/blog')}
            className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center gap-3"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Baca Berita Lainnya
          </button>
        </div>
      </article>

      {/* CTA */}
      <section className="mt-32 max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <i className="fa-solid fa-bullhorn text-[10rem] rotate-12"></i>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Jangan Lewatkan Kabar Terbaru</h2>
            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Dapatkan notifikasi berita resmi KNPI langsung ke perangkat Anda. Bergabunglah dengan ribuan pemuda lainnya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Alamat Email Anda"
                className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[300px]"
              />
              <button className="bg-white text-blue-900 px-10 py-4 rounded-full font-bold hover:bg-blue-50 transition-all">
                Langganan
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;