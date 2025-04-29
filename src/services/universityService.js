import api from './api.js';
import { getCurrentUser } from "./authService.js";

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

export const getTopUniversities = async () => {
  try {
    const response = await api.get('university/open-api/universities/top?limit=10');    
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


export const rateUniversity = async (universityId, rating) => {
  const user = await getCurrentUser();

  if (!user) {
    console.warn("Вы не авторизованы. Пожалуйста, войдите, чтобы поставить рейтинг.");
    return;
  }
  // const url = `https://unirate.kz/university/open-api/universities/${universityId}/rating?rating=${rating}`;
  const url = `https://unirate.kz/university/api/admin/university/${universityId}/rating?rating=${rating}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${user.token}`
      },
      body: ''
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} - ${response.statusText}`);
    }

    const data = await response.text();
    console.log("Рейтинг успешно отправлен:", data);
    return data;
  } catch (error) {
    console.error("Ошибка при отправке рейтинга:", error.message);
  }
};