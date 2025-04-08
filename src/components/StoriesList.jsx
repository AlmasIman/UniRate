import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const universities = [
  {
    "id": 1,
    "name": "Aisulu K.",
    "status": "2nd Year Medical Student at Farabi University",
    "img": "/avatar_placeholder.png",
    "review": "If UniRate had existed when I applied, it would’ve saved me so much time and stress. Comparing programs is so much easier now."
  },
  {
    "id": 2,
    "name": "Timur R.",
    "status": "1st Year Economics Student at KIMEP University",
    "img": "/avatar_placeholder2.png",
    "review": "Back then, comparing universities was a mess. UniRate would’ve made my decision process way faster and more confident."
  },
  {
    "id": 3,
    "name": "Madina S.",
    "status": "Freshman in Architecture at KazGASA",
    "img": "/ava3.png",
    "review": "I had no idea where to start with my uni search. If UniRate was around, I would’ve felt so much more prepared and informed."
  },
  {
    "id": 4,
    "name": "Daniyar T.",
    "status": "3rd Year Computer Science Student at Satbayev University",
    "img": "/ava4.png",
    "review": "I really needed a tool like UniRate during high school. That financial calculator would’ve helped me and my parents a lot."
  },
  {
    "id": 5,
    "name": "Akerke B.",
    "status": "Foundation Year Student at Nazarbayev University",
    "img": "/Photo.png",
    "review": "It was hard to find real advice when I applied. UniRate’s forum would’ve been a huge help back then."
  },
  {
    "id": 6,
    "name": "Yerassyl M.",
    "status": "2nd Year Law Student at Eurasian National University",
    "img": "/Photo.png",
    "review": "I made spreadsheets to compare programs. If UniRate existed, it would’ve saved me a ton of effort."
  }
]


const StoriesList = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="position-relative container py-5">
      <div
        className="d-flex justify-content-end position-absolute top-0 end-0"
        style={{ gap: "8px" }}
      ></div>
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"

      >
        <div className="carousel-inner">
          {[...Array(Math.ceil(universities.length / 3))].map(
            (_, groupIndex) => (
              <div
                key={groupIndex}
                className={`carousel-item ${
                  groupIndex === Math.floor(activeIndex / 3) ? "active" : ""
                }`}
              >
                <div
                  className="d-flex justify-content-center"
                  style={{ gap: "32px", height: "500px", margin: "auto" }}
                >
                  {universities
                    .slice(groupIndex * 3, groupIndex * 3 + 3)
                    .map((uni) => (
                      <div
                        key={uni.id}
                        className="card mx-2"
                        style={{
                          position: "relative",
                          width: "405px",
                          height: "419px",
                          borderRadius: "20px",
                          padding: "40px 30px 40px 30px",
                          border: "1px solid rgba(229, 244, 242, 1)",
                          boxShadow:
                            "34.85px 29.63px 48.34px 0px rgba(20, 174, 130, 0.05)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "120px",
                            height: "120px",
                            overflow: "hidden",
                            borderRadius: "50%",
                          }}
                        >
                          <img
                            src={uni.img}
                            className="card-img-top"
                            style={{}}
                          />
                        </div>

                        <div
                          className="card-body"
                          style={{ position: "relative", textAlign: "center" }}
                        >
                          <h5
                            className="card-title"
                            style={{ textAlign: "center" }}
                          >
                            {uni.name}
                          </h5>
                          <p
                            style={{
                              fontFamily: "Inter",
                              fontWeight: "400",
                              fontSize: "14px",
                              lineHeight: "160%",
                              color: "rgba(55, 65, 81, 1)",
                              width: "60%",
                              margin: "0 auto",
                              height: "10px",
                            }}
                          >
                            {uni.status}
                          </p>
                        </div>

                        <p
                          className=""
                          style={{ marginBottom: "12px", textAlign: "center" }}
                        >
                          {`"${uni.review}"`}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        {[...Array(Math.ceil(universities.length / 3))].map((_, index) => (
          <button
            key={index}
            className={`mx-1 `}
            style={{
              width: "8.9px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor:
                index === Math.floor(activeIndex / 3)
                  ? "rgba(0, 147, 121, 1)"
                  : "rgba(225, 229, 238, 1)",
              border: "none",
            }}
            onClick={() => setActiveIndex(index * 3)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default StoriesList;
