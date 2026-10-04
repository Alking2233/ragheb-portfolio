import axios from 'axios';

// قراءة الرابط ديناميكياً من Vercel وإذا لم يجده يقرأ رابط Render الحقيقي مباشرة
const API_BASE = import.meta.env.VITE_STRAPI_API_URL || import.meta.env.VITE_STRAPI_URL || 'https://ragheb-strapi-backend.onrender.com';

// ضمان أن الرابط ينتهي بـ /api
const STRAPI_URL = API_BASE.endsWith('/api') ? API_BASE : `${API_BASE.replace(/\/$/, '')}/api`;

const strapi = axios.create({
  baseURL: STRAPI_URL,
});

// دالة لجلب كل المشاريع
export const getProjects = async () => {
  try {
    const response = await strapi.get('/projects?populate=*');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return null; // نرجع null ليتعرف الفرونت إند على الفشل بسلاسة
  }
};

// دالة لجلب مشروع واحد بالـ slug
export const getProjectBySlug = async (slug) => {
  try {
    const response = await strapi.get('/projects', {
      params: {
        filters: { slug: { $eq: slug } },
        populate: '*'
      }
    });
    return response.data.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};