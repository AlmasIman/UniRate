import Header from "../layouts/Header";
import homeStyle from "../assets/styles/Home.module.css";
import chat from "../assets/icons/chat.svg";
import visuals from "../assets/icons/Visuals.svg";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import Rocket from "../assets/icons/RocketLaunch.svg";
import Carousel from "../components/Carousel.jsx";
import Card from "../components/OurFeatureCard.jsx";
import money from "../assets/icons/money.svg";
import chat2 from "../assets/icons/chat2.svg";
import map from "../assets/icons/map.svg";
import point from "../assets/icons/point.svg";
import emailIcon from "../assets/icons/email.svg";
import Footer from "../layouts/Footer.jsx";
// import StorySrud from "../components/StorysFromStud.jsx";
import UniversitiesList from "../components/UniversityCardCarousel.jsx";
import StoriesList from "../components/StoriesList.jsx";
import { useRef } from "react";

function Home() {
  const universitiesRef = useRef(null);

  const scrollToUniversities = () => {
    universitiesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header />

      <div className={homeStyle.banner}>
        <div className={homeStyle.bannerContent}>
          <h1 className={homeStyle.welcomMessage}>
            UniRate <br /> platform!
          </h1>
          <p className={homeStyle.unirateSlogan}>
            Discover, Compare, and Choose <br /> the Best Universities Worldwide
            with UniRate
          </p>
          <div onClick={scrollToUniversities} >
            <Button path="/" content="Discover" contentIcon={Rocket} />
          </div>
          <img src={visuals} alt="" className={homeStyle.bgBagnner} />
        </div>
        <img src={chat} alt="chat-icon" className={homeStyle.chatIcon} />
      </div>

      <div className={homeStyle.ourFeature}>
        <h2 className={homeStyle.ourFeatureh2}>Our Feature</h2>
        <p className={homeStyle.ourFeatureParag}>
          Something special ab our features
        </p>
        <div className={homeStyle.ourFeatureCARDDiv}>
          <Card
            featureIcon={point}
            cardTitle="Donec vitae."
            cardDescription="Search and compare universities worldwide based on programs, rankings, and more"
          />
          <Card
            featureIcon={map}
            cardTitle="Donec vitae."
            cardDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nunc vestibulum ect"
          />
          <Card
            featureIcon={money}
            cardTitle="Donec vitae."
            cardDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nunc vestibulum ect"
          />
          <Card
            featureIcon={chat2}
            cardTitle="Donec vitae."
            cardDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nunc vestibulum ect"
          />
        </div>
      </div>

      <div className={homeStyle.uniListContainer} ref={universitiesRef}>
        <p>Most Popular</p>
        <h1>University lists</h1>

        <div className={homeStyle.studDiv}>
          <UniversitiesList />
        </div>
      </div>

      <div className={homeStyle.uniListContainer2}>
        <p>See how our landing page platform is making an impact.</p>
        <h1>Real Stories from Satisfied Students</h1>

        <div className={homeStyle.studDiv}>
          <StoriesList />
        </div>
      </div>

      <div className={homeStyle.newsletterMainDiv}>
        <div className={homeStyle.newsletter}>
          <p className={homeStyle.ourFeatureParag}>Join Our Newsletter</p>
          <p className={homeStyle.unistylemessage}>
            Never miss a beat on new landing page designs and features.
          </p>

          <div className={homeStyle.emailInputContainer}>
            <input
              type="email"
              className={homeStyle.emailInput}
              placeholder="Enter your email here"
            />
            <div className={homeStyle.emailInputBtn}>
              <Button path="/" content="Subscribe" contentIcon={emailIcon} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
