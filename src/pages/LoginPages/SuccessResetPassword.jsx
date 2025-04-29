import risingHand from "../../assets/RaisingHandBro.svg";
import logStyle from "../../assets/styles/Login.module.css";
import Input from "../../components/InputForm.jsx";
import LoginButton from "../../components/LoginButton.jsx";
import logo from "/public/logo1.svg";
import { Link } from "react-router-dom";

function SuccessResetPass() {
  sessionStorage.removeItem("isPasswordResetted");

  return (
    <div className={logStyle.mainBox}>
      <div className={logStyle.loginLeftSide}>
        <img src={logo} alt="" className={logStyle.logo} />
        <div className={logStyle.contentleftSide}>
          <h1 className={logStyle.greeting}>Welcome to UniRate!</h1>
          <p>
            Find and compare universities in Kazakhstan—quick, easy, and all in
            one place.
          </p>
          <img src={risingHand} alt="welcome" />
        </div>
      </div>

      <div className={logStyle.loginRightSide}>
        <div className={logStyle.contentrightSide}>
          <div>
            <h2>Success!</h2>
            <p className={logStyle.forgotEnterEmail}>
              Your password has been reset successfully!{" "}
            </p>
            <br />
          </div>
          <LoginButton content="Sign in" type="submit" path="/login" />
        </div>
      </div>
    </div>
  );
}

export default SuccessResetPass;
