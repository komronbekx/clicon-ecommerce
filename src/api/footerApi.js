import api from "./axios";

// DummyJSON'dan kategoriyalarni olish
export const getFooterCategories = async () => {
  try {
    const res = await api.get("/products/categories");
    // Birinchi 6 tasini kesib olamiz
    return res.data.slice(0, 6);
  } catch (error) {
    console.error("Kategoriyalarni olishda xatolik:", error);
    return [];
  }
};
