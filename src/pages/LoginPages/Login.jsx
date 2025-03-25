import logStyle from "../../assets/styles/Login.module.css";
import Input from "../../components/InputForm.jsx";
import LearningBro from "../../assets/LearningBro.svg";
import { Link } from "react-router-dom";
import LoginButton from "../../components/LoginButton.jsx";
function Login() {
  return (
    <div className={logStyle.mainBox}>
      <div className={logStyle.loginLeftSide}>
        <button className={logStyle.logo}>Logo</button>
        <div>
          <h1 className={logStyle.greeting}>Welcome to UniRate!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate
            ut laoreet velit ma.
          </p>
          <img
            src={LearningBro}
            alt="welcome"
            className={logStyle.welcomeLoginIcon}
          />
        </div>
      </div>

      <div className={logStyle.loginRightSide}>
        <div>
          <h2>Welcome Back</h2>
          <Input placeholder="Type your e-mail" nameOfInput="Email" />
          <Input
            placeholder="Type your password"
            nameOfInput="Password"
            type="password"
          />
          <a href="#" className={logStyle.forgotPassLink}>
            Forgot password?
          </a>
          <br />
            <LoginButton content="Sign In" path="/home"/>
          <p className={logStyle.donthaveAAcc}>
            Don't have an account?{" "}
            <Link to="/signup" className={logStyle.signUpLink}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
