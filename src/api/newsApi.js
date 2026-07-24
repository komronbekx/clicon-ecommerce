import api from "./axios";

// Barcha yangiliklarni (postlarni) olish (masalan, 3 ta)
export const getLatestNews = async (limit = 3) => {
  const res = await api.get(`/posts?limit=${limit}`);
  return res.data.posts;
};

// Bitta yangilikni ID bo'yicha olish
export const getNewsById = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

// Yangilikka tegishli izohlarni (comments) olish
export const getNewsComments = async (postId) => {
  const res = await api.get(`/posts/${postId}/comments`);
  return res.data.comments;
};
