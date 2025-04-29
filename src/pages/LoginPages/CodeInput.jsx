import { useState, useRef } from "react";
import styles from "../../assets/styles/Login.module.css";

const CodeInput = ({ length = 4, onCodeChange }) => {
  const [code, setCode] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/, ""); 
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    const fullCode = newCode.join("");
    onCodeChange(fullCode); 

    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (newCode[index]) {
        newCode[index] = ""; 
      } else if (index > 0) {
        inputsRef.current[index - 1].focus(); 
        newCode[index - 1] = ""; 
      }
      setCode(newCode);
      onCodeChange(newCode.join("")); 
    }
  };

  return (
    <div className={styles.codeContainer}>
      {code.map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          maxLength="1"
          value={code[index]}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className={styles.codeInput}
        />
      ))}
    </div>
  );
};

export default CodeInput;
