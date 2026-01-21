
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
  useEffect(() => {
    document.title = `${title} | KNPI - Komite Nasional Pemuda Indonesia`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || 'Official Portal KNPI');
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = description || 'Official Portal KNPI';
      document.head.appendChild(meta);
    }
  }, [title, description]);

  return null;
};

export default SEO;
