
export interface Category {
  _id: string;
  name: string;
}

export interface Article {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: Category;
  image: string;
  createdAt: string;
}

export interface ApiResponse {
  articles: Article[];
}
