import api from './api.js';

// Получение университета по ID
export const getUniversityById = async (id) => {
  try {
    const response = await api.get(`university/open-api/universities/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении университета:', error);
    throw error;
  }
};

// Получение всех университетов
export const getAllUniversities = async () => {
  try {
    const response = await api.get('university/open-api/universities');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении всех университетов:', error);
    throw error;
  }
};

// Получение топ университетов
export const getTopUniversities = async () => {
  try {
    const response = await api.get('university/open-api/universities/top');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении топ университетов:', error);
    throw error;
  }
};

// Получение университетов с пагинацией
export const getUniversitiesByPage = async (page) => {
  try {
    const response = await api.get(`university/open-api/universities/page?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении университетов с пагинацией:', error);
    throw error;
  }
};

// Поиск университетов по имени
export const searchUniversityByName = async (name) => {
  try {
    const response = await api.get(`university/open-api/universities/name/${name}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при поиске университета:', error);
    throw error;
  }
};
