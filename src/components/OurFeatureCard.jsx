import cardStyle from "../assets/styles/OurFeatureCard.module.css";
function Card(props) {
  return (
    <div className={cardStyle.card}>
      <img src={props.featureIcon} alt="" className={cardStyle.featureIcon}/>
      <h2 className={cardStyle.title}>{props.cardTitle}</h2>
      <p className={cardStyle.description}>{props.cardDescription}</p>
    </div>
  );
}

export default Card;