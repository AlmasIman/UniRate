import api from "./api.js";

const API_URL = 'university/open-api';

export const addToFavorites = async (userId, universityId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await api.post(
      "university/open-api/favorites", // примерный эндпоинт
      {
        userId,
        universityId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении в избранное:", error);
    throw error;
  }
};



export const deleteFromFavorites = async (favoriteId) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      throw new Error("User is not authenticated");
    }
  
    try {
      const response = await api.delete(
        `${API_URL}/favorites/${favoriteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка при удалении из избранного:", error);
      throw error;
    }
};

export const fetchFavourites = async (userId) => {
    try {
      const response = await api.get(`university/open-api/favorites/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching favourites:", error);
      throw error;
    }
};