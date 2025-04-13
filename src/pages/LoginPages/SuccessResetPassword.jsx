import risingHand from "../../assets/RaisingHandBro.svg";
import logStyle from "../../assets/styles/Login.module.css";
import Input from "../../components/InputForm.jsx";
import LoginButton from "../../components/LoginButton.jsx";
import { Link } from "react-router-dom";

function SuccessResetPass() {

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
