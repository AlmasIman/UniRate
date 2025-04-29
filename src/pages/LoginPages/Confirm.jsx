import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../assets/styles/Login.module.css";
import CodeInput from "./CodeInput.jsx";
import StudentsBro from "../../assets/StudentsBro.svg";
import { activateAccount } from "../../services/authService.js"; // Подключаем API
import { useNavigate } from "react-router-dom";
import logo from "/public/logo1.svg";
import ProtectedRoute from "../../components/ProtectedRoute.jsx";

function ConfirmEmail() {
  const [isVerified, setIsVerified] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      await activateAccount(enteredCode);
      setIsVerified(true);
      sessionStorage.removeItem("isRegisterInfoSended");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Invalid confirmation code");
    }
  };

  return (
    <div className={styles.mainBox}>
      <div className={styles.loginLeftSide}>
      <img src={logo} alt=""className={styles.logo} />
      <div className={styles.contentleftSide}>
          <div className={styles.backgroundDarker}>
            <h1 className={styles.greeting}>Welcome to UniRate!</h1>
            <p>We have sent a confirmation code to your email.</p>
            <img
              src={StudentsBro}
              alt="welcome"
              className={styles.welcomeLoginIcon}
            />
          </div>
        </div>
      </div>
      <div className={styles.loginRightSide}>
        {!isVerified ? (
          <div className={styles.contentrightSideConfirm}>
            <h1 className={styles.confirmH2}>Confirm your e-mail</h1>
            <p className={styles.createAccParagraph}>
              Enter the code you received
            </p>
            {error && <p className={styles.error}>{error}</p>}
            <CodeInput length={4} onCodeChange={setEnteredCode} />
            <button className={styles.BtnLong} onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        ) : (
          <div className={styles.contentrightSideConfirm}>
            <h1 className={styles.confirmH2}>Success!</h1>
            <p className={styles.createAccParagraph}>
              Your email has been verified.
            </p>
            <button
              className={styles.BtnLong}
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConfirmEmail;
