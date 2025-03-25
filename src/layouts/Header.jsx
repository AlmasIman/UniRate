import profile from "../assets/icons/Button.svg";
import favorite from "../assets/icons/Button-1.svg";
import notification from "../assets/icons/Button-2.svg";
import signout from "../assets/icons/Button-3.svg";
import header from "../assets/styles/Header.module.css";
import { Link } from "react-router-dom";
function Header() {
  const links = [
    { name: "Main", path: "/" },
    { name: "Universities", path: "/universities" },
    { name: "Forum", path: "/forum" },
    { name: "Financial calculator", path: "/calculator" },
    { name: "Contacts", path: "/contacts" },
  ];

  return (
    <header className={header.navbar}>
      <p className={header.logo}>UniRate</p>
      <div className={header.navigation}>
        {links.map((link, index) => (
          <Link key={index} to={link.path} className={header.link}>
            <p>{link.name}</p>
          </Link>
        ))}
        
        <Link to="/profile">
          <img src={profile} alt="" className={header.link} />
        </Link>

        <Link to="/favouriteuniversities">
          <img src={favorite} alt="" className={header.link} />
        </Link>

        <Link to="/notifications">
          <img src={notification} alt="" className={header.link} />
        </Link>

        <Link to="/signout">
          <img src={signout} alt="" className={header.link} />
        </Link>
      </div>
    </header>
  );
}

export default Header;

