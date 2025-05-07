import { Link, useNavigate } from "react-router-dom";
import menu from "../assets/icons/menuAdmin.svg";
import dashboard from "../assets/icons/dashboard.svg";
import uni from "../assets/icons/uni.svg";
import forum from "../assets/icons/forum.svg";
import logoutIcon from "../assets/icons/logoutadmin.svg";
import profile from "../assets/img/profilepic.png";
import style from "../assets/styles/SideBar.module.css";
import { logout, getCurrentUser } from "../services/authService.js";
import { useState, useEffect, useRef } from "react";

function SideBar() {
  const links = [
    { icon: dashboard, label: "Dashboard", link: "/admin/dashboard" },
    { icon: uni, label: "University", link: "/admin/university-module" },
    { icon: forum, label: "Forum", link: "/admin/forum" },
  ];
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }
    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  const handleNavigate = (link) => {
    navigate(link)
  }

  return (
    <div className={style.sidebar}>
      <div className={style.navigations}>
        <img src={menu} alt="Menu" className={style.icon} />
        <p className={style.menuLabel}>MENU</p>

        <nav className={style.btnsDiv}>
          {links.map(({ icon, label, link }, index) => (
            <div key={index} className={style.navigationsButtons} onClick={() => handleNavigate(link)}>
              <img src={icon} alt={label} className={style.icon} />
              <p>{label}</p>
            </div>
          ))}
        </nav>
      </div>

      <div className={style.profileMainDiv}>
        {user && (
          <div className={style.profileMainDiv}>
            <img
              src={user.userProfileImageUrl}
              alt="Profile"
              className={style.profileImg}
            />
            <div>
              <p className={style.profileName}>{user.username}</p>
              <p className={style.profileEmail}>{user.email}</p>
            </div>
            <img
              src={logoutIcon}
              alt="Logout"
              className={style.logoutIcon}
              onClick={handleLogout}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
