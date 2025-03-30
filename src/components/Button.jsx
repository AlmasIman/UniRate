import { Link } from "react-router-dom";
import style from "../assets/styles/Button.module.css";

function Button(props) {
  return (
    <Link to={props.path} style={{textDecoration: "none"}}>
      <div className={style.Btn}><img src={props.contentIcon}/> {props.content} <img src={props.rightIcon} alt="" /></div>
    </Link>
  );
}
export default Button;
