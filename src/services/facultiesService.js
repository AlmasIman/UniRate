import api from "./api";

export const createFaculty = async (facultyData) => {
  try {
    const response = await api.post('university/open-api/faculties', facultyData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании факультета:', error);
    throw error;
  }
};

export const getAllFaculties = async () => {
  try {
    const response = await api.get('university/open-api/faculties');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка факультетов:', error);
    throw error;
  }
};

export const getFacultyById = async (id) => {
  try {
    const response = await api.get(`university/open-api/faculties/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении факультета по ID:', error);
    throw error;
  }
};

