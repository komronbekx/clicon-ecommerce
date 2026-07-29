import api from "./axios";

export const getLatestNews = async (limit = 3) => {
  const res = await api.get(`/posts?limit=${limit}`);
  return res.data.posts;
};

export const getNewsById = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

export const getNewsComments = async (postId) => {
  const res = await api.get(`/posts/${postId}/comments`);
  return res.data.comments;
};
