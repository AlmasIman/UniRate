import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Icon imports
import money from "../assets/icons/money.svg";
import chat2 from "../assets/icons/chat2.svg";
import map from "../assets/icons/map.svg";
import point from "../assets/icons/point.svg";
import homeStyle from "../assets/styles/Home.module.css";

// Feature Data
const features = [
  {
    id: 1,
    feature: "Financial Calculator",
    img: money,
    desc: "Plan your budget with our financial calculator, which helps you estimate tuition, living expenses, and other costs.",
  },
  {
    id: 2,
    feature: "Connect with Students & Alumni.",
    img: chat2,
    desc: "Engage with real students and alumni to get valuable advice and insights to guide your decisions.",
  },
  {
    id: 3,
    feature: "University Rankings",
    img: point,
    desc: "View up-to-date rankings and compare universities by reputation in various disciplines.",
  },
  {
    id: 4,
    feature: "University Search & Comparison",
    img: map,
    desc: "I really needed a tool like UniRate during high school. That financial calculator would’ve helped me and my parents a lot.",
  },
];

// Responsive Settings
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1300 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1299, min: 1020 },
    items: 3,
    partialVisibilityGutter: 10,
  },
  mobile: {
    breakpoint: { max: 1019, min: 690 },
    items: 2,
    partialVisibilityGutter: 20,
  },
  small: {
    breakpoint: { max: 689, min: 0 },
    items: 1,
    partialVisibilityGutter: 20,
  },
};

const OurFeature = () => {
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setAutoPlayEnabled(window.innerWidth < 1300);
    };

    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ padding: "40px", backgroundColor: "rgba(248, 255, 253, 1)" }}>
      <br />
      <br />

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 className={homeStyle.ourFeatureh2}>Explore Our Core</h2>
        <br />
        <p className={homeStyle.ourFeatureParag}>
          Discover the Smart Way to Choose Your Future University
        </p>
      </div>

      <Carousel
        responsive={responsive}
        infinite
        autoPlay={autoPlayEnabled}
        autoPlaySpeed={3000}
        keyBoardControl
        containerClass="carousel-container"
        itemClass="carousel-item-padding"
        showDots={false}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop", "small"]}
        partialVisible
        pauseOnHover
      >
        {features.map((f) => (
          <div
            key={f.id}
            style={{
              background: "#f9f9f9",
              borderRadius: "10px",
              padding: "20px",
              height: "332px",
              maxWidth: "296px",
              width: "100%",
              boxShadow: "34px 29px 48px 0px rgba(20, 174, 130, 0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              border: "1px solid rgba(229, 244, 242, 1)",
              backgroundColor: "rgba(255, 255, 255, 1)",
              boxSizing: "border-box",
              margin: "0 auto",
            }}
          >
            <img
              src={f.img}
              alt={f.feature}
              style={{
                width: "72px",
                height: "72px",
                marginBottom: "20px",
              }}
            />
            <h3
              style={{ fontWeight: "600", fontSize: "23px", color: "#2D2D2D" }}
            >
              {f.feature}
            </h3>
            <p
              style={{ fontSize: "14px", color: "#2D2D2D", marginTop: "10px" }}
            >
              {f.desc}
            </p>
          </div>
        ))}
      </Carousel>
      <br />
      <br />
    </div>
  );
};

export default OurFeature;
