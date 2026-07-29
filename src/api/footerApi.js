import api from "./axios";

export const getFooterCategories = async () => {
  try {
    const res = await api.get("/products/categories");
    return res.data.slice(0, 6);
  } catch (error) {
    console.error("Kategoriyalarni olishda xatolik:", error);
    return [];
  }
};
