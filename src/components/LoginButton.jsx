import { Link } from "react-router-dom";

function LoginButton(props) {
  return (
    <Link to={props.path} style={{ textDecoration: "none" }}>
      <button
        style={{
          width: "424px",
          height: "60px",
          borderRadius: "20px",
          color: "white",
          backgroundColor: "rgba(0, 147, 121, 1)",
          border: "none",
        }}
      >
        {props.content}
      </button>
    </Link>
  );
}

export default LoginButton;
