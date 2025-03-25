function Button(props) {
  return (
    <button
      style={{
        padding: "0 24px 0 24px",
        height: "60px",
        width: "205px",
        borderRadius: "20px",
        border: "1px solid rgba(0, 147, 121, 1)",
        backgroundColor: "rgba(255, 255, 255, 1)",
        fontFamily: "Poppins",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "24px",
        letterSpacing: "0%",
        textAlign: "center",
        color: "rgba(0, 147, 121, 1)"
      }}
    >
      {props.content}
    </button>
  );
}

export default Button;
