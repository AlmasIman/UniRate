import { useState, useRef } from "react";
import styles from "../../assets/styles/Login.module.css";

const CodeInput = ({ length = 4, onCodeChange }) => {
  const [code, setCode] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/, ""); // Разрешаем только цифры
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    const fullCode = newCode.join("");
    onCodeChange(fullCode); // Передаем полный код в ConfirmEmail

    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (newCode[index]) {
        newCode[index] = ""; // Очищаем текущий ввод
      } else if (index > 0) {
        inputsRef.current[index - 1].focus(); // Переключаемся на предыдущий ввод
        newCode[index - 1] = ""; // Очищаем предыдущий ввод
      }
      setCode(newCode);
      onCodeChange(newCode.join("")); // Обновляем код
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
