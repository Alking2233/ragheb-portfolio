import axios from 'axios';

// عنوان API الخاص بـ Strapi المحلي
const STRAPI_URL = 'http://localhost:1337/api';

const strapi = axios.create({
  baseURL: STRAPI_URL,
});

// دالة لجلب كل المشاريع
export const getProjects = async () => {
  try {
    const response = await strapi.get('/projects?populate=*');
    // Strapi v4/v5 يرجع البيانات داخل data.data
    return response.data.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

// دالة لجلب مشروع واحد بالـ slug
export const getProjectBySlug = async (slug) => {
  try {
    const response = await strapi.get(`/projects`, {
      params: {
        filters: { slug: { $eq: slug } },
        populate: '*'
      }
    });
    return response.data.data[0];
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};