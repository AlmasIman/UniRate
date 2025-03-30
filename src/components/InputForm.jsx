function Input({ placeholder, nameOfInput, type = "text", value, onChange }) {
  const styles = {
    inputBox: {
      color: "rgba(45, 45, 45, 1)",
      fontSize: "14px",
    },
    inputField: {
      width: "424px",
      height: "60px",
      borderRadius: "20px",
      paddingLeft: "16px",
      fontSize: "15px",
      border: "1px solid rgba(216, 216, 216, 1)",
      color: "rgba(45, 45, 45, 1)"

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
