import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";
import googlePlay from "../assets/icons/google.svg";
import appStore from "../assets/icons/appstoresvg.svg";
import styles from "../assets/styles/Footer.module.css";
import instagram from "../assets/icons/Instagram.svg";
import twitter from "../assets/icons/Twitter.svg";
import linkedin from "../assets/icons/Linkedin.svg";
import facebook from "../assets/icons/facebook.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3 className={styles.logo}>UniRate</h3>
      <div className={styles.footerColumn}>
        <h3>Contact us</h3>
        <p>sdu@gmail.com</p>
        <p>+1-2345-6789</p>
        <p>Almaty, Kazakhstan</p>
        <div className={styles.footerSocial}>
          <img src={facebook} alt="" />
          <img src={linkedin} alt="" />
          <img src={twitter} alt="" />
          <img src={instagram} alt="" />
        </div>
      </div>

      <div className={styles.footerColumn}>
        <h3>Pages</h3>
        <a href="#">Main</a>
        <a href="#">Universities</a>
        <a href="#">Forum</a>
        <a href="#">Financial Calculator</a>
        <a href="#">Contacts</a>
      </div>

      <div className={styles.footerColumn} style={{ minWidth: "300px" }}>
        <h3>Get the app</h3>
        <img src={googlePlay} alt="Google Play" width="200" />
        <img src={appStore} alt="App Store" width="200" />
      </div>

      <div className={styles.footerBottom}>
        <div>
          <FaGlobe /> English
        </div>
        <div>FAQ</div>
        <div>Terms and conditions</div>
      </div>
      <div className={styles.reserved}>
        © 2025. UniRate All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
