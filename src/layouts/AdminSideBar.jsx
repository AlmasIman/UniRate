import { Link } from "react-router-dom";
import menu from "../assets/icons/menuAdmin.svg";
import dashboard from "../assets/icons/dashboard.svg";
import uni from "../assets/icons/uni.svg";
import forum from "../assets/icons/forum.svg";
import logout from "../assets/icons/logoutadmin.svg";
import profile from "../assets/img/profilepic.png";
import style from "../assets/styles/SideBar.module.css";

function SideBar() {
  const links = [
    { icon: dashboard, label: "Dashboard" },
    { icon: uni, label: "University" },
    { icon: forum, label: "Forum" },
  ];

  return (
    <div className={style.sidebar}>
      <div className={style.navigations}>
        <img src={menu} alt="Menu" className={style.icon} />
        <p className={style.menuLabel}>MENU</p>

        <nav className={style.btnsDiv}>
          {links.map(({ icon, label }, index) => (
            <div key={index} className={style.navigationsButtons}>
              <img src={icon} alt={label} className={style.icon} />
              <p>{label}</p>
            </div>
          ))}
        </nav>
      </div>

      <div className={style.profileMainDiv}>
        <img
          src={profile}
          alt="Profile"
          className={style.profileImg}
        />
        <div>
          <p className={style.profileName}>Admin</p>
          <p className={style.profileEmail}>admin@gmail.com</p>
        </div>
        <img src={logout} alt="Logout" className={style.logoutIcon} />
      </div>
    </div>
  );
}

export default SideBar;