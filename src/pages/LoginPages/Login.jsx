import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logStyle from "../../assets/styles/Login.module.css";
import Input from "../../components/InputForm.jsx";
import LearningBro from "../../assets/LearningBro.svg";
import StudentsBro from "../../assets/StudentsBro.svg";
import LoginButton from "../../components/LoginButton.jsx";
import { Link } from "react-router-dom";

import { login } from "../../services/authService.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className={logStyle.mainBox}>
      <div className={logStyle.loginLeftSide}>
        <button className={logStyle.logo}>Logo</button>
        <div className={logStyle.contentleftSide}>
          <div className={logStyle.backgroundDarker}>
            <h1 className={logStyle.greeting}>Welcome to UniRate!</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate
              ut laoreet velit ma.
            </p>
          </div>

          <img
            src={StudentsBro}
            alt="welcome"
            className={logStyle.welcomeLoginIcon}
          />
        </div>
      </div>

      <div className={logStyle.loginRightSide}>
        <div className={logStyle.contentrightSide}>
          <h2>Welcome Back</h2>
          <Input
            placeholder="Type your email"
            nameOfInput="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ position: "relative" }}>
            <Input
              placeholder="Type your password"
              nameOfInput="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/forgotPassword">
              <p className={logStyle.forgotPassLink}>Forgot password?</p>
            </Link>
            {error && <p className={logStyle.error}>{error}</p>}
          </div>

          {/* Кнопка входа теперь внутри <form> */}
          <div onClick={handleLogin}>
            <LoginButton content="Sign In" type="submit" />
          </div>

          <p className={logStyle.donthaveAAcc}>
            Don't have an account?{" "}
            <a href="/signup" className={logStyle.signUpLink}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
