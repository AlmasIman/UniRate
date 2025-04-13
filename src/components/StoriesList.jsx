import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

const universities = [
  {
    "id": 1,
    "name": "Aisulu K.",
    "status": "2nd Year Medical Student at Farabi University",
    "img": "/public/avatars/2avatar.png",
    "review": "If UniRate had existed when I applied, it would’ve saved me so much time and stress. Comparing programs is so much easier now."
  },
  {
    "id": 2,
    "name": "Timur R.",
    "status": "1st Year Economics Student at KIMEP University",
    "img": "/public/avatars/3avatar.png",
    "review": "Back then, comparing universities was a mess. UniRate would’ve made my decision process way faster and more confident."
  },
  {
    "id": 3,
    "name": "Madina S.",
    "status": "Freshman in Architecture at KazGASA",
    "img": "/public/avatars/4avatar.png",
    "review": "I had no idea where to start with my uni search. If UniRate was around, I would’ve felt so much more prepared and informed."
  },
  {
    "id": 4,
    "name": "Daniyar T.",
    "status": "3rd Year CS Student at Satbayev University",
    "img": "/public/avatars/5avatar.png",
    "review": "I really needed a tool like UniRate during high school. That financial calculator would’ve helped me and my parents a lot."
  },
  {
    "id": 5,
    "name": "Akerke B.",
    "status": "Foundation Year Student at Nazarbayev University",
    "img": "/public/avatars/6avatar.png",
    "review": "It was hard to find real advice when I applied. UniRate’s forum would’ve been a huge help back then."
  },
  {
    "id": 6,
    "name": "Yerassyl M.",
    "status": "2nd Year Law Student at Eurasian National University",
    "img": "/public/avatars/7avatar.png",
    "review": "I made spreadsheets to compare programs. If UniRate existed, it would’ve saved me a ton of effort."
  }
]


const StoriesList = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (window.innerWidth < 576) {
        setCardsPerSlide(1);
      } else if (window.innerWidth < 992) {
        setCardsPerSlide(2);
      } else {
        setCardsPerSlide(3);
      }
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  return (
    <div className="position-relative container py-5">
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {[...Array(Math.ceil(universities.length / cardsPerSlide))].map((_, groupIndex) => (
            <div
              key={groupIndex}
              className={`carousel-item ${groupIndex === Math.floor(activeIndex / cardsPerSlide) ? "active" : ""}`}
            >
              <div
                className="d-flex justify-content-center flex-wrap"
                style={{ gap: "16px", margin: "auto", minHeight: "480px" }}
              >
                {universities
                  .slice(groupIndex * cardsPerSlide, groupIndex * cardsPerSlide + cardsPerSlide)
                  .map((uni) => (
                    <div
                      key={uni.id}
                      className="card mx-2"
                      style={{
                        width: "100%",
                        maxWidth: "405px",
                        height: "419px",
                        borderRadius: "20px",
                        padding: "40px 30px",
                        border: "1px solid rgba(229, 244, 242, 1)",
                        boxShadow: "34.85px 29.63px 48.34px 0px rgba(20, 174, 130, 0.05)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: "120px", height: "120px", overflow: "hidden", borderRadius: "50%" }}>
                        <img src={uni.img} className="card-img-top" />
                      </div>
                      <div className="card-body text-center">
                        <h5 className="card-title">{uni.name}</h5>
                        <p style={{
                          fontSize: "14px",
                          lineHeight: "160%",
                          color: "rgba(55, 65, 81, 1)",
                          margin: "0 auto",
                          marginBottom: "10px",
                        }}>
                          {uni.status}
                        </p>
                        <p style={{ textAlign: "center", fontStyle: "italic" }}>{`"${uni.review}"`}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-center mt-3">
        {[...Array(Math.ceil(universities.length / cardsPerSlide))].map((_, index) => (
          <button
            key={index}
            className="mx-1"
            style={{
              width: "8.9px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: index === Math.floor(activeIndex / cardsPerSlide)
                ? "rgba(0, 147, 121, 1)"
                : "rgba(225, 229, 238, 1)",
              border: "none",
            }}
            onClick={() => setActiveIndex(index * cardsPerSlide)}
          />
        ))}
      </div>
    </div>
  );
};

export default StoriesList;