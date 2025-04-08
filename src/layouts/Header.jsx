import profile from "../assets/icons/Button.svg";
import favorite from "../assets/icons/Button-1.svg";
import notification from "../assets/icons/Button-2.svg";
import signout from "../assets/icons/Button-3.svg";
import header from "../assets/styles/Header.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем наличие токена в localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Удаляем токен
    setIsAuthenticated(false); // Обновляем состояние
    navigate("/"); // Перенаправляем на страницу входа
  };

  const links = [
    { name: "Main", path: "/" },
    { name: "Universities", path: "/universities" },
    { name: "Forum", path: "/forum" },
    { name: "Financial calculator", path: "/calculator" },
    { name: "Contacts", path: "/contacts" },
  ];
  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      setIsAuthenticated(!!user);
    };

    checkAuth();
  }, []);

  return (
    <header className={header.navbar}>
      <p className={header.logo}>UniRate</p>
      <div className={header.navigation}>
        {links.map((link, index) => (
          <Link key={index} to={link.path} className={header.link}>
            <p>{link.name}</p>
          </Link>
        ))}

        {!isAuthenticated && (
          <>
            <Link to="/login" className={header.link}>
              <p>Sign In</p>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <Link to="/profile">
              <img src={profile} alt="Profile" className={header.link} />
            </Link>

            <Link to="/favouriteuniversities">
              <img src={favorite} alt="Favorite" className={header.link} />
            </Link>

            <Link to="/notifications">
              <img
                src={notification}
                alt="Notifications"
                className={header.link}
              />
            </Link>

            <Link to="/" onClick={handleLogout}>
              <img src={signout} alt="Sign Out" className={header.link} />
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
``;
