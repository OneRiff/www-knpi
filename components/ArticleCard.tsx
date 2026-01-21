
import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { IMAGE_BASE_URL,API_BASE_URL } from '../constants';
import ReactMarkdown from "react-markdown";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {

  // Helper to strip HTML and truncate
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const text = doc.body.textContent || "";
    return text.length > 100 ? text.substring(0, 100) + '...' : text;
  };

  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long'
  }).format(new Date(article.createdAt));

  // Determine image source (check if it's external mock or local API)
  const imageUrl = article.image.startsWith("http")
  ? article.image
  : `${API_BASE_URL}/${article.image}`;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <Link to={`/blog/${article._id}`} className="block relative overflow-hidden aspect-video">
        <img 
          src={imageUrl} 
          alt={article.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600/90 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
            {article.category.name}
          </span>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <span className="font-medium text-slate-600">{article.author}</span>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>
        
        <Link to={`/blog/${article._id}`}>
          <h3 className="text-xl font-bold text-slate-800 leading-tight mb-3 group-hover:text-blue-700 transition-colors">
            {article.title}
          </h3>
        </Link>
        
        <div className="text-slate-600 text-sm line-clamp-3 prose prose-sm max-w-none">
  <ReactMarkdown>
    {article.content}
  </ReactMarkdown>
</div>
        
        <Link 
          to={`/blog/${article._id}`}
          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          Baca Selengkapnya
          <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
