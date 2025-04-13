import { useEffect, useState } from "react";

function Input({ placeholder, nameOfInput, type = "text", value, onChange }) {

  const [inputWidth, setInputWidth] = useState(
    window.innerWidth <= 480 ? 300 : 424
  );

  useEffect(() => {
    const handleResize = () => {
      setInputWidth(window.innerWidth <= 480 ? 300 : 424);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const styles = {
    inputBox: {
      color: "rgba(45, 45, 45, 1)",
      fontSize: "14px",
    },
    inputField: {
      width: `${inputWidth}px`,
      height: "60px",
      borderRadius: "20px",
      paddingLeft: "16px",
      fontSize: "15px",
      border: "1px solid rgba(216, 216, 216, 1)",
      color: "rgba(45, 45, 45, 1)",
      boxSizing: "border-box",
    },
  };

  return (
    <div>
      <p style={styles.inputBox}>{nameOfInput}</p>
      <input
        type={type}
        placeholder={placeholder}
        style={styles.inputField}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
