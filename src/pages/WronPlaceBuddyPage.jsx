import { Link } from "react-router-dom";
import error404 from "/web.png";
import logo from "/logo2.svg";
function WrongPlace() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        gap: "30px",
        backgroundColor: "#F9F9F9",
        fontFamily: "Poppins",
      }}
    >
      <img
        src={logo}
        alt="logo"
        style={{ position: "absolute", top: "20px", zIndex: "2" }}
      />
      <img src={error404} alt="error" style={{ width: "200px" }} />
      <div style={{ textAlign: "center" }}>
        <h1 style={{ zIndex: 2 }}>404</h1>
        <h2 style={{ zIndex: 2 }}>Oops! Page not found</h2>
        <p style={{ zIndex: 2 }}>
          The page you are looking for does not exist.
        </p>
        <br />
        <Link to="/" style={{ zIndex: 2 }}>
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

export default WrongPlace;
