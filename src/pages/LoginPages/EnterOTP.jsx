import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../assets/styles/Login.module.css";
import CodeInput from "./CodeInput.jsx";
import StudentsBro from "../../assets/StudentsBro.svg";
import { activateAccount } from "../../services/authService.js"; // Подключаем API
import { useNavigate } from "react-router-dom";
import risingHand from "../../assets/RaisingHandBro.svg";

function ConfirmEmail() {
  const [isVerified, setIsVerified] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleConfirm = async () => {
    try {
      await activateAccount(enteredCode);
      setIsVerified(true);
      setTimeout(() => navigate("/setNewPassword", { state: { email, resetCode: enteredCode } }), 2000);
    } catch (err) {
      setError(err.message || "Invalid confirmation code");
    }
  };

  return (
    <div className={styles.mainBox}>
      <div className={styles.loginLeftSide}>
        <button className={styles.logo}>Logo</button>
        <div className={styles.contentleftSide}>
          <div className={styles.backgroundDarker}>
            <h1 className={styles.greeting}>Welcome to UniRate!</h1>
            <p>We have sent a confirmation code to your email.</p>
            <img
              src={risingHand}
              alt="welcome"
              className={styles.welcomeLoginIcon}
            />
          </div>
        </div>
      </div>

      {!isVerified ? (
        <div className={styles.loginRightSide}>
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
        </div>
      ) : (
        <div className={styles.loginRightSideHidden}>
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
        </div>
      )}
    </div>
  );
}

export default ConfirmEmail;
