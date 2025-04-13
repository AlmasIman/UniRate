import profile from "../assets/icons/Button.svg";
import favorite from "../assets/icons/Button-1.svg";
import signout from "../assets/icons/Button-3.svg";
import header from "../assets/styles/Header.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import menu from "../assets/icons/menu.svg";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <header className={header.navbar}>
      <p className={header.logo}>UniRate</p>
      <img src={menu} alt="" onClick={toggleMenu} className={header.humburger}/>
      <>
        {menuOpen && <div className={header.backdrop} onClick={toggleMenu}></div>}
        <div
          className={`${header.navigation} ${menuOpen ? header.open : ""}`}
          ref={menuRef}
        >
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
            <div className={header.authIcons}>
              <Link to="/profile">
                <img src={profile} alt="Profile" className={header.link} />
              </Link>

              <Link to="/favouriteuniversities">
                <img src={favorite} alt="Favorite" className={header.link} />
              </Link>

              <Link to="/" onClick={handleLogout}>
                <img src={signout} alt="Sign Out" className={header.link} />
              </Link>
            </div>
          )}
        </div>
      </>
    </header>
  );
}

export default Header;
