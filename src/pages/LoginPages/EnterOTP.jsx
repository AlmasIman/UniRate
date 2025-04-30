import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../assets/styles/Login.module.css";
import CodeInput from "./CodeInput.jsx";
import StudentsBro from "../../assets/StudentsBro.svg";
import { verifyResetPasswordCode } from "../../services/authService.js"; // Подключаем API
import { useNavigate } from "react-router-dom";
import risingHand from "../../assets/RaisingHandBro.svg";
import logo from "/public/logo1.svg";

function ConfirmEmail() {
  const [isVerified, setIsVerified] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleConfirm = async () => {
    try {
      if (!enteredCode || enteredCode.length !== 4) {
        setError("Please enter a valid 4-digit code.");
        return;
      }

      // Try to validate the reset code by submitting with a fake password
      const result = await verifyResetPasswordCode(email, enteredCode);

      if (result.success) {
        setIsVerified(true);
        sessionStorage.setItem("otpVerified", "true");
        sessionStorage.setItem("isPasswordResetted", "true");
        setTimeout(() => {
          navigate("/setNewPassword", {
            state: { email, resetCode: enteredCode },
          });
        }, 1000);
      } else {
        setError(result.message || "Invalid confirmation code");
      }
    } catch (err) {
      setError(err.message || "Invalid confirmation code");
    }
  };

  return (
    <div className={styles.mainBox}>
      <div className={styles.loginLeftSide}>
        <img src={logo} alt="" className={styles.logo} />
        <div className={styles.contentleftSide}>
          <div className={styles.backgroundDarker}>
            <h1 className={styles.greeting}>Welcome to UniRate!</h1>
            <p>We have sent a confirmation code to your email.</p>
          </div>

          <img
            src={risingHand}
            alt="welcome"
            className={styles.welcomeLoginIcon}
          />
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
          <div className={styles.contentrightSideConfirm} style={{margin: '0 auto'}}>
            <h1 className={styles.confirmH2}>Success!</h1>
            <p className={styles.createAccParagraph}>
              Your email has been verified.
            </p>
          </div>
      )}
    </div>
  );
}

export default ConfirmEmail;
