import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logStyle from "../../assets/styles/Login.module.css";
import Input from "../../components/InputForm.jsx";
import LearningBro from "../../assets/LearningBro.svg";
import StudentsBro from "../../assets/StudentsBro.svg";
import LoginButton from "../../components/LoginButton.jsx";
import { Link } from "react-router-dom";
import logo from "/public/logo1.svg";
import { useAuth } from "../../contexts/AuthContext";

import {
  login as loginService,
  getCurrentUser,
} from "../../services/authService.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      setError("Please fill in all fields");
      return;
    }
    if (!email) {
      setError("Please fill in your email.");
      return;
    }
    if (!password) {
      setError("Please fill in your password.");
      return;
    }

    try {
      const { token } = await loginService(email, password);
      localStorage.setItem("token", token);

      const user = await getCurrentUser();
      login({ ...user, token });

      if (user?.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        setError("Access denied. You are not an admin.");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className={logStyle.mainBox}>
      <div className={logStyle.loginLeftSide}>
        <img src={logo} alt="" className={logStyle.logo} />
        <div className={logStyle.contentleftSide}>
          <div className={logStyle.backgroundDarker}>
            <h1 className={logStyle.greeting}>Welcome to UniRate!</h1>
            <p>It's login for admin panel</p>
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
          <h2>Login to Admin Panel</h2>
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
              {error && <p className={logStyle.error}>{error}</p>}
            </div>
            <div onClick={handleLogin}>
              <LoginButton content="Sign In" type="submit" />
            </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
