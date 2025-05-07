import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser(); 
        if (user) {
          setUser(user);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        localStorage.removeItem("token"); 
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);
  
  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    setUser(userData);
    setAuthChecked(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        authChecked,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
