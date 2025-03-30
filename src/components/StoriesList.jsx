import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const universities = [
  {
    id: 1,
    name: "Lauren M.",
    status: "Visual Communication Student at Maple College",
    img: "/avatar_placeholder.png",
    review:
      "The UniRate has become an essential tool in my academic journey. It provides everything I need to navigate my choices efficiently and effortlessly.",
  },
  {
    id: 2,
    name: "Lauren M.",
    status: "Graphic Design Major at Crestwood University",
    img: "/avatar_placeholder2.png",
    review:
      "The UniRate has truly transformed my college search experience. It offers all the resources I need to explore options quickly and effectively.",
  },
  {
    id: 3,
    name: "Lauren M.",
    status: "Interaction Design Scholar at Riverstone University",
    img: "/ava3.png",
    review:
      "Using the UniRate has been a game changer for me. It has all the features I require to make informed decisions about my education in no time.",
  },
  {
    id: 4,
    name: "Lauren M.",
    status: "Interaction Design Scholar at Riverstone University",
    img: "/ava4.png",
    review:
      "Using the UniRate has been a game changer for me. It has all the features I require to make informed decisions about my education in no time.",
  },
  {
    id: 5,
    name: "Lauren M.",
    status: "Interaction Design Scholar at Riverstone University",
    img: "/Photo.png",
    review:
      "Using the UniRate has been a game changer for me. It has all the features I require to make informed decisions about my education in no time.",
  },
  {
    id: 6,
    name: "Lauren M.",
    status: "Interaction Design Scholar at Riverstone University",
    img: "/almaty.png",
    review:
      "Using the UniRate has been a game changer for me. It has all the features I require to make informed decisions about my education in no time.",
  },
];

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
                  style={{ gap: "32px" }}
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
                        <img
                          src={uni.img}
                          className="card-img-top"
                          style={{
                            borderRadius: "60px",
                            width: "120px",
                            height: "120px",
                          }}
                        />
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
                              width: '60%',
                              margin: 'auto'

                            }}
                          >
                            {uni.status}
                          </p>
                        </div>

                        <p className="" style={{ marginBottom: "12px", textAlign: 'center' }}>
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
