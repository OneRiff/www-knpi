import { Article } from "../types";
import { API_BASE_URL } from "../constants";

const BASE_URL = `${API_BASE_URL}/api/article`;

export const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data: Article[] = await response.json();
  return data;
};

export const fetchArticleById = async (
  id: string
): Promise<Article> => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch article detail");
  }

  const data: Article = await response.json();
  return data;
};
