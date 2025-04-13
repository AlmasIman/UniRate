import Header from "../layouts/Header";
import homeStyle from "../assets/styles/Home.module.css";
import visuals from "../assets/icons/Visuals.svg";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import Rocket from "../assets/icons/RocketLaunch.svg";
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
import Chatbot from "../components/Chatbot.jsx";
import LoginButton from "../components/LoginButton.jsx";

function Home() {
  const universitiesRef = useRef(null);

  const scrollToUniversities = () => {
    universitiesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <div className={homeStyle.responsiveBanner}>
        <div className={homeStyle.welcomContent}>
          <h1 className={homeStyle.welcomMessage}>
            UniRate <br /> platform!
          </h1>
          <p className={homeStyle.unirateSlogan}>
            Discover, Compare, and Choose <br /> the Best Universities Worldwide
            with UniRate
          </p>
          <div onClick={scrollToUniversities} className={homeStyle.scrollBtn}>
            <Button path="/" content="Discover" contentIcon={Rocket} />
          </div>
        </div>

        <div className={homeStyle.bannerDiv}>
          <img src={visuals} alt="" className={homeStyle.bgBagnner} />
          <Chatbot />
        </div>
      </div>

      <div className={homeStyle.ourFeature}>
        <h2 className={homeStyle.ourFeatureh2}>Explore Our Core</h2>
        <p className={homeStyle.ourFeatureParag}>
          Discover the Smart Way to Choose Your Future University
        </p>
        <div className={homeStyle.ourFeatureCARDDiv}>
          <Card
            featureIcon={map}
            cardTitle="University Search & Comparison."
            cardDescription="Search and compare universities based on programs, rankings, and location to find the best fit for you."
          />
          <Card
            featureIcon={money}
            cardTitle="Financial Calculator."
            cardDescription="Plan your budget with our financial calculator, which helps you estimate tuition, living expenses, and other costs."
          />
          <Card
            featureIcon={point}
            cardTitle="University Rankings."
            cardDescription="View up-to-date rankings and compare universities by reputation in various disciplines."
          />
          <Card
            featureIcon={chat2}
            cardTitle="Connect with Students & Alumni."
            cardDescription="Engage with real students and alumni to get valuable advice and insights to guide your decisions."
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

        <StoriesList />
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
              <div className={homeStyle.Btn}>
                <img src={emailIcon} />
                Subscribe
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
