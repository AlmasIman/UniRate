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

    console.log("API Response:", response.data);
    if (response.data) {
      localStorage.setItem("token", response.data);
      return { token: response.data };
    } else {
      throw new Error("Invalid login response");
    }
  } catch (error) {
    console.error("Reset password code error:", error.response);
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

    return { ...response.data, token };
  } catch (error) {
    console.error("Ошибка получения пользователя:", error);
    return null;
  }
};

export const activateAccount = async (code) => {
  try {
    const response = await api.post("registry/open-api/auth/activation", null, {
      params: { code }, 
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
          Accept: "application/json",
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

export async function updateUserProfile(userId, updatedData) {
  try {
    const token = localStorage.getItem("token");

    const payload = {
      id: userId,
      password: updatedData.password,
      username: updatedData.username,
      email: updatedData.email,
      firstName: updatedData.firstName,
      lastName: updatedData.lastName,
      telephone: updatedData.telephone,
      status: updatedData.status,
      userProfileImageUrl: updatedData.userProfileImageUrl,
    };

    const response = await api.post(
      `registry/api/user/${userId}/update`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

// function for reset password from profile page
export async function resetPassword(email, newPassword) {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await api.post("registry/open-api/auth/reset-password", {
      email,
      newPassword,
    });
    return { success: true, message: "Password updated successfully!" };
  } catch (error) {
    console.error("Error resetting password:", error.response);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update password!",
    };
  }
}


export async function updateUserAvatar(userId, imageUrl) {
  try {
    const token = localStorage.getItem("token");

    const response = await api.put(
      `registry/api/user/${userId}/profile-url`,
      null,
      {
        params: { url: imageUrl },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении аватара:", error);
    throw error;
  }
}


export const requestResetPasswordCode = async (email) => {
  try {
    const response = await api.post(
      `registry/open-api/auth/send-reset-password-code`,
      null,
      {
        params: { email },
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );

    return {
      success: true,
      message: response.data?.message || "Reset code sent successfully",
    };
  } catch (error) {
    console.error("Error sending reset code:", error.response?.data || error);
    const messageFromServer = error.response?.data?.message;
    return {
      success: false,
      message: messageFromServer || "Something went wrong. Please try again later.",
    };
  }
};

export const verifyResetPasswordCode = async (email, resetCode) => {
  try {
    const response = await api.post(
      `registry/open-api/auth/verify-reset-password-code`,
      null,
      {
        params: { email, resetCode },
        headers: {
          Accept: "*/*",
        },
      }
    );

    return {
      success: true,
      message: response.data?.message || "Code verified successfully",
    };
  } catch (error) {
    console.error("Error verifying reset code:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to verify code.",
    };
  }
};

export const submitResetPassword = async (email, newPassword) => {
  try {
    const response = await api.post(
      `registry/open-api/auth/reset-password`,
      {
        email,
        newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return {
      success: true,
      message: response.data?.message || "Password has been reset successfully.",
    };
  } catch (error) {
    console.error("Error resetting password:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to reset password.",
    };
  }
};
