import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Avatar imports
import ava1 from "/avatars/2avatar.png";
import ava2 from "/avatars/3avatar.png";
import ava3 from "/avatars/4avatar.png";
import ava4 from "/avatars/5avatar.png";
import ava5 from "/avatars/6avatar.png";
import ava6 from "/avatars/7avatar.png";
// "https://i.postimg.cc/f3PQNtnT/2avatar.png",
// "https://i.postimg.cc/S2zFNSkL/3avatar.png",
// "https://i.postimg.cc/GTw04WmW/4avatar.png",
// "https://i.postimg.cc/9wG6ZL4r/5avatar.png",
// "https://i.postimg.cc/3Wm5sxLY/6avatar.png",
// "https://i.postimg.cc/vcyFbwj9/7avatar.png",
// "https://i.postimg.cc/gnK90BF7/8avatar.png",
// "https://i.postimg.cc/mPd0YzrN/9avatar.png",

// Reviewers data
const reviewers = [
  {
    id: 1,
    name: "Aisulu K.",
    status: "2nd Year Medical Student at Farabi University",
    img: ava4,
    review:
      "If UniRate had existed when I applied, it would’ve saved me so much time and stress. Comparing programs is so much easier now.",
  },
  {
    id: 2,
    name: "Timur R.",
    status: "1st Year Economics Student at KIMEP University",
    img: ava2,
    review:
      "Back then, comparing universities was a mess. UniRate would’ve made my decision process way faster and more confident.",
  },
  {
    id: 3,
    name: "Madina S.",
    status: "Freshman in Architecture at KazGASA",
    img: ava3,
    review:
      "I had no idea where to start with my uni search. If UniRate was around, I would’ve felt so much more prepared and informed.",
  },
  {
    id: 4,
    name: "Daniyar T.",
    status: "3rd Year CS Student at Satbayev University",
    img: ava1,
    review:
      "I really needed a tool like UniRate during high school. That financial calculator would’ve helped me and my parents a lot.",
  },
  {
    id: 5,
    name: "Akerke B.",
    status: "Foundation Year Student at Nazarbayev University",
    img: ava6,
    review:
      "It was hard to find real advice when I applied. UniRate’s forum would’ve been a huge help back then.",
  },
  {
    id: 6,
    name: "Yerassyl M.",
    status: "2nd Year Law Student at Eurasian National University",
    img: ava5,
    review:
      "I made spreadsheets to compare programs. If UniRate existed, it would’ve saved me a ton of effort.",
  },
];

// Carousel breakpoints
const responsive = {
  desktopL: {
    breakpoint: { max: 3000, min: 1800 },
    items: 4,
  },
  desktopM: {
    breakpoint: { max: 1800, min: 1200 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1200, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

const CustomDot = ({ onClick, active }) => {
  return (
    <li
      onClick={onClick}
      style={{
        display: "inline-block",
        margin: "0 5px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: active
            ? "rgba(0, 147, 121, 1)"
            : "rgba(225, 229, 238, 1)",
        }}
      />
    </li>
  );
};

const ReviewCarousel = () => {
  return (
    <div style={{ padding: "40px", backgroundColor: "rgba(248, 255, 253, 1)" }}>
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
      >
        <p
          style={{
            fontFamily: "Mulish",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          See how our landing page platform is making an impact.
        </p>
        <h1
          style={{
            fontFamily: "Poppins",
            fontWeight: "700",
            fontSize: "38px",
          }}
        >
          Real Stories from Satisfied Students
        </h1>
      </div>

      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
        showDots={true}
        removeArrowOnDeviceType={["tablet", "mobile", "desktopM", "desktopL"]}
        customDot={<CustomDot />}
      >
        {reviewers.map((reviewer) => (
          <div
            key={reviewer.id}
            style={{
              background: "#f9f9f9",
              borderRadius: "10px",
              padding: "20px",
              height: "400px",
              maxWidth: "400px",
              width: "100%",
              boxShadow: "34px 29px 48px 0px rgba(20, 174, 130, 0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              border: "1px solid rgba(229, 244, 242, 1)",
              backgroundColor: "rgba(255, 255, 255, 1)",
              margin: "50px auto",
              boxSizing: "border-box",
            }}
          >
            <img
              src={reviewer.img}
              alt={reviewer.name}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                display: "block",
                margin: "0 auto",
              }}
            />
            <h3>{reviewer.name}</h3>
            <p style={{ fontStyle: "italic", color: "#555" }}>
              {reviewer.status}
            </p>
            <p style={{ marginTop: "10px", fontSize: "14px" }}>
              {reviewer.review}
            </p>
          </div>
        ))}
      </Carousel>
      <br />
      <br />
    </div>
  );
};

export default ReviewCarousel;
