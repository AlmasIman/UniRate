import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logStyle from "../../assets/styles/Login.module.css";
import Input from "../../components/InputForm.jsx";
import StudentsBro from "../../assets/StudentsBro.svg";
import LoginButton from "../../components/LoginButton.jsx";

import { register } from "../../services/authService.js"; // Подключаем API


function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {

    // const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    // if (!emailPattern.test(email)) {
    //   setError("Invalid email format. Must be a Gmail address.");
    //   return;
    // }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      await register(username, email, password);

      console.log("Signing up with:", { username, email, password });
      
      navigate("/confirm", { state: { email } }); 

    } catch {
      setError("Something went wrong. Please try again later.");
    }
  };


  return (
    <div className={logStyle.mainBox}>
      <div className={logStyle.loginLeftSide}>
        <button className={logStyle.logo}>Logo</button>
        <div className={logStyle.contentleftSide}>
          <h1 className={logStyle.greeting}>Welcome to UniRate!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate
            ut laoreet velit ma.
          </p>
          <img
            src={StudentsBro}
            alt="welcome"
            className={logStyle.welcomeLoginIcon}
          />
        </div>
      </div>

      <div className={logStyle.loginRightSideForSignUp}>
        <div className={logStyle.signupcontentrightSide}>
          <div>
            <h2>Create your account</h2>
            <p>It’s free and easy</p>
            
          </div>
          <Input
            placeholder="Enter your username"
            nameOfInput="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Type your e-mail"
            nameOfInput="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Type your password"
            nameOfInput="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>
          <Input
            placeholder="Re-enter your password"
            nameOfInput="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p className={logStyle.atLeast8char}>Must be 8 characters at least</p>
          {error && <p className={logStyle.error}>{error}</p>}

          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <input
              type="checkbox"
              id="terms"
              name="terms"
              value="terms"
              className={logStyle.checkboxStyle}
            />
            <p style={{ width: "388px", fontSize: "14px" }}>
              By creating an account, you agree to the Terms and Conditions and
              our Privacy Policy.
            </p>
          </div>
          <div onClick={handleSignUp}>
            <LoginButton content="Sign Up" type="submit" />
          </div>
          <p className={logStyle.donthaveAAcc}>
            Already have an account?{" "}
            <a href="/login" className={logStyle.signUpLink}>
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
