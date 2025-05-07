import api from './api.js';


export const getAllSpecialties= async () => {
  try {
    const response = await api.get('university/open-api/specialties');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении всех специальностей:', error);
    throw error;
  }
};

export const getSpecialtyById = async (id) => {
  try {
    const response = await api.get(`university/open-api/specialties/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении специальности с id ${id}:`, error);
    throw error;
  }
};


export const createSpecialty = async (specialtyData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.post(
      'university/api/admin/specialty',
      specialtyData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании специальности:', error);
    throw error;
  }
};

export const updateSpecialty = async (id, specialtyData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.put(
      `university/api/admin/specialty/${id}`,
      specialtyData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Ошибка при обновлении специальности с id ${id}:`, error);
    throw error;
  }
};

export const deleteSpecialty = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.delete(`university/api/admin/specialty/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Ошибка при удалении специальности с id ${id}:`, error);
    throw error;
  }
};