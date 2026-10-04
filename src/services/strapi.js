import axios from 'axios';

const RENDER_BACKEND_URL = 'https://ragheb-strapi-backend.onrender.com';

// دالة ذكية لتحديد الرابط الصحيح بنسبة 100%
const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_STRAPI_API_URL || import.meta.env.VITE_STRAPI_URL;

  // إذا كنا على سيرفر Vercel (Production)
  if (import.meta.env.PROD) {
    // إذا كان المتغير غير موجود أو يحتوي على كلمة localhost، أرفضه واجبره على رابط Render
    if (!envUrl || envUrl.includes('localhost')) {
      return `${RENDER_BACKEND_URL}/api`;
    }
  }

  // في البيئة المحلية (Local Development)
  if (!envUrl) {
    return 'http://localhost:1337/api';
  }

  return envUrl.endsWith('/api') ? envUrl : `${envUrl.replace(/\/$/, '')}/api`;
};

const STRAPI_URL = getBaseUrl();

console.log('📡 Connected Strapi Endpoint:', STRAPI_URL);

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
    return null;
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

export default strapi;