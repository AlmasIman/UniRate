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