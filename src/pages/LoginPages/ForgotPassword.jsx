import logStyle from "../../assets/styles/Login.module.css";
import Input from "../../components/InputForm.jsx";
import LoginButton from "../../components/LoginButton.jsx";
import arrowback from "../../assets/icons/ArrowLeft.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import risingHand from "../../assets/RaisingHandBro.svg";
import { useState } from "react";
import { requestResetPasswordCode } from "../../services/authService.js";
import logo from "/public/logo1.svg";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    console.log("Sending reset code to:", email);
    const result = await requestResetPasswordCode(email);
    if (result.success) {
      sessionStorage.setItem("isEmailProvided", "true");

      setSuccess(result.message);
      navigate("/otp", { state: { email } });
    } else {
      setError(result.message);
    }
  };

  const handleBack = () => {
    navigate("/login");
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
            <h2>Forgot password</h2>
            <p className={logStyle.forgotEnterEmail}>
              Please enter your e-mail
            </p>
            <br />

            <Input
              placeholder="Type your email"
              nameOfInput="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            {error && (
              <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
            )}
            {success && (
              <p style={{ color: "green", marginTop: "10px" }}>{success}</p>
            )}
            <div onClick={handleSubmit}>
              <LoginButton content="Reset password" type="submit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
