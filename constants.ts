// constants/config.ts

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const IMAGE_BASE_URL = `${API_BASE_URL}/uploads/articles/`;

export const LOGO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/a/aa/Komite_Nasional_Pemuda_Indonesia.png";

export const APP_COLORS = {
  primary: "#1e40af", // KNPI Blue
  secondary: "#ef4444", // National Red
  accent: "#f59e0b", // Gold / Amber
};
