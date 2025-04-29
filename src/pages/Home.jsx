import Header from "../layouts/Header";
import homeStyle from "../assets/styles/Home.module.css";
import visuals from "../assets/icons/Visuals.svg";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import Rocket from "../assets/icons/RocketLaunch.svg";
import emailIcon from "../assets/icons/email.svg";
import Footer from "../layouts/Footer.jsx";
// import StorySrud from "../components/StorysFromStud.jsx";
import UniversitiesList from "../components/UniversityCardCarousel.jsx";
import { useRef, useState } from "react";
import Chatbot from "../components/Chatbot.jsx";
import LoginButton from "../components/LoginButton.jsx";
import ReviewCarousel from "../components/ReviewCarousel.jsx";
import OurFeature from "../components/OurFeature.jsx";
import TopUnis from "../components/ReactCarouselForUniversity.jsx";
import InfiniteLooper from "../components/BannerLoopCarousel.jsx";
import Confetti from "../assets/icons/Confetti.png";
import courthouse from "../assets/icons/courthouse.png";
import GlobeHemisphereWest from "../assets/icons/GlobeHemisphereWest.png";
function Home() {
  const universitiesRef = useRef(null);
  const [email, setEmail] = useState("");

  const scrollToUniversities = () => {
    universitiesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch(
        `https://unirate.kz/registry/open-api/notifications/subscribe?email=${encodeURIComponent(
          email
        )}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        alert("Successfully subscribed!");
        setEmail("");
      } else {
        let errorMessage = "Subscription failed.";
        try {
          const text = await response.text();
          if (text) errorMessage = text;
        } catch {
          // no-op
        }
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
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
      <br />
      <br />
      <InfiniteLooper speed={15} direction="right">
        <div className="contentBlock contentBlock--one">
          <img src={Confetti} alt="" />
        </div>
        <div className="contentBlock contentBlock--one">
          The best universities waiting for you!
        </div>
        <div className="contentBlock contentBlock--one">
          <img src={GlobeHemisphereWest} alt="" />
        </div>
        <div className="contentBlock contentBlock--one">
          Admission 2025 -2026
        </div>
        <div className="contentBlock contentBlock--one">
          <img src={courthouse} alt="" />
        </div>
        <div className="contentBlock contentBlock--one">
          The best universities waiting for you!
        </div>
      </InfiniteLooper>

      <OurFeature />

      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          textAlign: "center",
        }}
        ref={universitiesRef}
      >
        <p
          style={{
            fontFamily: "Mulish",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          Discover top universities in Kazakhstan.
        </p>
        <h1
          style={{
            fontFamily: "Poppins",
            fontWeight: "700",
            fontSize: "38px",
          }}
        >
          Most Popular
        </h1>
      </div>
      <br />
      <br />

      <TopUnis />

      <br />
      <br />

      <ReviewCarousel />

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className={homeStyle.emailInputBtn}>
              <div className={homeStyle.Btn} onClick={handleSubscribe}>
                <img src={emailIcon} alt="Email Icon" />
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
