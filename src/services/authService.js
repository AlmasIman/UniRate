import api from "./api.js";

export const register = async (username, email, password) => {
  try {
    const response = await api.post("registry/open-api/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post("registry/open-api/auth/login", {
      email,
      password,
    });
    
    console.log('API Response:', response.data); 
    if (response.data) {
      localStorage.setItem("token", response.data); 
      return { token: response.data }; 
    } else {
      throw new Error("Invalid login response");
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data); 
      throw new Error(error.response.data?.message || "Login failed");
    } else {
      console.error("Error:", error);
      throw new Error("Server error, please try again later");
    }
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const response = await api.get("registry/api/user/current", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Ошибка получения пользователя:", error);
    return null;
  }
};

// Активация аккаунта
export const activateAccount = async (code) => {
  try {
    const response = await api.post("registry/open-api/auth/activation", null, {
      params: { code }, // Код передаётся как query параметр
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateUserPassword = async (username, newPassword) => {
  try {
    const response = await api.post(
      "registry/open-api/auth/reset-password",
      {
        login: username, // Передаём username в login, как требует сервер
        newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      }
    );

    console.log("Пароль успешно обновлён:", response.data);
    return { success: true, message: "Password updated successfully!" };
  } catch (error) {
    console.error("Ошибка при обновлении пароля:", error.response);
    console.log("Полный ответ сервера:", error.response?.data);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update password!",
    };
  }
};

export const updateUserProfile = async (userId, userData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Токен отсутствует");
    return null;
  }

  const formattedData = {
    id: userId,
    username: userData.username,
    email: userData.email,
    firstName: userData.fullName.split(" ")[0] || "",
    lastName: userData.fullName.split(" ")[1] || "",
    role: userData.category.toUpperCase(),
    telephone: userData.phoneNumber,
  };

  console.log(
    "Отправка запроса на обновление профиля:",
    userId,
    JSON.stringify(formattedData, null, 2)
  );

  try {
    const response = await api.post(
      `registry/api/user/${userId}/update`,
      formattedData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("Ответ сервера:", response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка обновления профиля:", error.response?.data || error);
    alert("Ошибка обновления профиля: " + JSON.stringify(error.response?.data));
    return null;
  }
};
