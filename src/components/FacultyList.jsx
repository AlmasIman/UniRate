import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import arrlowLeft from "../assets/icons/ArrowLeft.svg";
import arrlowRight from "../assets/icons/ArrowRight.svg";
const faculties = [
  { id: 1, name: "Computer Science", img: "../../public/img1.png" },
  { id: 2, name: "Business Administration", img: "../../public/img2.png" },
  { id: 3, name: "Mechanical Engineering", img: "../../public/img3.png" },
  { id: 4, name: "Medicine", img: "../../public/img4.png" },
  { id: 5, name: "Architecture", img: "../../public/almaty.png" },
  { id: 6, name: "Medicine", img: "../../public/img4.png" },
  { id: 7, name: "Mechanical Engineering", img: "../../public/img3.png" },
  { id: 8, name: "Business Administration", img: "../../public/img2.png" },

];

const Carousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 992) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(4);
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0
        ? faculties.length - itemsPerSlide
        : prevIndex - itemsPerSlide
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex + itemsPerSlide >= faculties.length
        ? 0
        : prevIndex + itemsPerSlide
    );
  };

  return (
    <div className="position-relative container py-5" style={{position: "relative"}}>
      <div
        className="d-flex justify-content-end position-absolute top-0 end-0"
        style={{ gap: "8px" }}
      >
        <button
          onClick={handlePrev}
          style={{
            backgroundColor: "white",
            width: "36px",
            height: "36px",
            border: "none",
            borderRadius: "50%",
          }}
        >
          <img src={arrlowLeft} alt="Previous" />
        </button>
        <button
          onClick={handleNext}
          style={{
            backgroundColor: "white",
            width: "36px",
            height: "36px",
            border: "none",
            borderRadius: "50%",
          }}
        >
          <img src={arrlowRight} alt="Next" />
        </button>
      </div>
      <h1
        style={{
          fontFamily: "Poppins",
          fontWeight: "700",
          fontSize: "32px",
          lineHeight: "40px",
          letterSpacing: "-1%",
          textAlign: "center",
        }}
      >
        {props.department}
      </h1>

      <br />

      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" >
          {[...Array(Math.ceil(faculties.length / itemsPerSlide))].map(
            (_, groupIndex) => (
              <div
                key={groupIndex}
                className={`carousel-item ${
                  groupIndex === Math.floor(activeIndex / itemsPerSlide)
                    ? "active"
                    : ""
                }`}
                
              >
                <div
                  className="d-flex justify-content-center"
                  style={{ gap: "32px" }}
                >
                  {faculties
                    .slice(
                      groupIndex * itemsPerSlide,
                      groupIndex * itemsPerSlide + itemsPerSlide
                    )
                    .map((faculty) => (
                      <div
                        key={faculty.id}
                        className="mx-2"
                        style={{
                          position: "relative",
                          width: "295px",
                          height: "374px",
                          borderRadius: "20px",
                          border: "none",
                          boxShadow:
                            "34.85px 29.63px 48.34px 0px rgba(20, 174, 130, 0.05);",
                        }}
                      >
                        <img
                          src={faculty.img}
                          className="card-img-top"
                          style={{
                            borderTopLeftRadius: "20px",
                            borderTopRightRadius: "20px",
                            width: "295px",
                            height: "278px",
                          }}
                          alt={faculty.name}
                        />
                        <div className="card-body">
                          <h5
                            className="card-title"
                            style={{ margin: "20px 0 12px 20px" }}
                          >
                            {faculty.name}
                          </h5>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        {[...Array(Math.ceil(faculties.length / itemsPerSlide))].map(
          (_, index) => (
            <button
              key={index}
              className={`mx-1`}
              style={{
                width: "8.9px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor:
                  index === Math.floor(activeIndex / itemsPerSlide)
                    ? "rgba(0, 147, 121, 1)"
                    : "rgba(225, 229, 238, 1)",
                border: "none",
              }}
              onClick={() => setActiveIndex(index * itemsPerSlide)}
            ></button>
          )
        )}
      </div>
    </div>


  );
};

export default Carousel;
