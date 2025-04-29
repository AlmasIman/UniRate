import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import profile from "../assets/icons/Button.svg";
import favorite from "../assets/icons/Button-1.svg";
import signout from "../assets/icons/Button-3.svg";
import header from "../assets/styles/Header.module.css";
import menu from "../assets/icons/menu.svg";
import logo from "/logo1.svg";
import { useState, useEffect, useRef } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout, authChecked } = useAuth();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  if (!authChecked) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const links = [
    { name: "Main", path: "/" },
    { name: "Universities", path: "/universities" },
    { name: "Forum", path: "/forum" },
    { name: "Financial calculator", path: "/calculator" },
    { name: "Contacts", path: "/contacts" },
  ];

  return (
    <header className={header.navbar}>
      <Link to="/">
        <img className={header.logo} src={logo} alt="Logo" />
      </Link>
      <img
        src={menu}
        alt=""
        onClick={() => setMenuOpen(!menuOpen)}
        className={header.humburger}
      />

      {menuOpen && <div className={header.backdrop} onClick={() => setMenuOpen(false)}></div>}

      <div className={`${header.navigation} ${menuOpen ? header.open : ""}`} ref={menuRef}>
        {links.map((link, i) => (
          <Link key={i} to={link.path} className={header.link}>
            <p>{link.name}</p>
          </Link>
        ))}

        {!isAuthenticated ? (
          <Link to="/login" className={header.link}>
            <p>Sign In</p>
          </Link>
        ) : (
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
    </header>
  );
}

export default Header;