import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function LoginButton(props) {
  const [buttonWidth, setButtonWidth] = useState(
    window.innerWidth <= 480 ? 300 : 424
  );

  useEffect(() => {
    const handleResize = () => {
      setButtonWidth(window.innerWidth <= 480 ? 300 : 424);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Link to={props.path} style={{ textDecoration: "none" }}>
      <button
        style={{
          width: `${buttonWidth}px`,
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
