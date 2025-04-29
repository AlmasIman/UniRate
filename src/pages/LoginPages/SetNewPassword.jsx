import { useNavigate, useLocation } from "react-router-dom";
import risingHand from "../../assets/RaisingHandBro.svg";
import logStyle from "../../assets/styles/Login.module.css";
import Input from "../../components/InputForm.jsx";
import LoginButton from "../../components/LoginButton.jsx";
import arrowback from "../../assets/icons/ArrowLeft.svg";
import { useState } from "react";
import { submitResetPassword } from "../../services/authService";
import logo from "/public/logo1.svg";

function SetNewPass() {
  const location = useLocation();
  const email = location.state?.email || "";
  const resetCode = location.state?.resetCode || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/login");
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const result = await submitResetPassword(email, resetCode, password);
    if (result.success) {
      sessionStorage.removeItem("otpVerified");
      setSuccess(result.message);
      setTimeout(() => navigate("/success-reset-password"), 1500);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className={logStyle.mainBox}>
      <div className={logStyle.loginLeftSide}>
        <img src={logo} alt="" className={logStyle.logo} />
        <div className={logStyle.contentleftSide}>
          <div className={logStyle.backgroundDarker}>
            <h1 className={logStyle.greeting}>Welcome to UniRate!</h1>
            <p>
              Find and compare universities in Kazakhstan—quick, easy, and all
              in one place.
            </p>
          </div>

          <img
            src={risingHand}
            alt="welcome"
            className={logStyle.welcomeLoginIcon}
          />
        </div>
      </div>

      <div className={logStyle.loginRightSide}>
        <div className={logStyle.contentrightSide}>
          <img
            src={arrowback}
            alt=""
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "20px",
              border: "2px solid rgba(229, 244, 242, 1)",
              cursor: "pointer",
            }}
            onClick={() => handleBack()}
          />

          <div>
            <h2>Set a new password</h2>
            <p className={logStyle.forgotEnterEmail}>
              Create a new password. <br /> Ensure it differs from previous ones
              for security.
            </p>
            <br />
            <Input
              placeholder="Type your password"
              nameOfInput="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Input
              placeholder="Re-enter your password"
              nameOfInput="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p className={logStyle.atLeast8char}>
              Must be 8 characters at least
            </p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
          </div>
          <div onClick={handleSubmit}>
            <LoginButton content="Reset password" type="button" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetNewPass;
