import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import arrlowLeft from "../assets/icons/ArrowLeft.svg";
import arrlowRight from "../assets/icons/ArrowRight.svg";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../assets/styles/facultylistStyle.css'
const CarouselComponent = (props) => {
  const faculties = props.facultyList || [];

  const CustomButtonGroup = ({ next, previous }) => (
    <div
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        display: "flex",
        gap: "8px",
      }}
    >
      <button
        onClick={previous}
        style={{
          backgroundColor: "white",
          width: "36px",
          height: "36px",
          border: "none",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={arrlowLeft} alt="Previous" />
      </button>
      <button
        onClick={next}
        style={{
          backgroundColor: "white",
          width: "36px",
          height: "36px",
          border: "none",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={arrlowRight} alt="Next" />
      </button>
    </div>
  );

  return (
    <div
      className="position-relative container py-5"
      style={{
        position: "relative",
      }}
    >
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

      <Carousel
        responsive={{
          superLargeDesktop: { breakpoint: { max: 4000, min: 1400 }, items: 4 },
          desktop: { breakpoint: { max: 1400, min: 1000 }, items: 3 },
          tablet: { breakpoint: { max: 1000, min: 768 }, items: 2 },
          mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
        }}
        infinite={true}
        autoPlay={false}
        itemClass="carousel-item-padding-32px" // Here, set the padding to 32px
        customButtonGroup={<CustomButtonGroup />}
        renderButtonGroupOutside={true}
        arrows={false}
        partialVisible={true}
        focusOnSelect={true}
      >
        {faculties.map((faculty) => (
          <Link
            key={faculty.id}
            to={`/view-university/speciality/${faculty.id}`}
            style={{
              textDecoration: "none",
              color: "black",
              marginTop: "50px",
              marginBottom: "50px",
              display: "flex", // Center the cards in the container
              justifyContent: "center",
            }}
          >
            <div
              className="mx-2"
              style={{
                position: "relative",
                width: "295px",
                height: "374px",
                borderRadius: "20px",
                border: "none",
                boxShadow:
                  "34.85px 29.63px 48.34px 0px rgba(20, 174, 130, 0.05)",
                marginRight: "20px", // Ensure there's space between items
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "295px",
                  height: "278px",
                }}
              >
                <img
                  src={faculty.specialtyImageUrl}
                  className="card-img-top"
                  style={{
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  alt={faculty.name}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(48, 55, 51, 0.3)",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                  }}
                />
              </div>
              <div className="card-body">
                <h5
                  className="card-title"
                  style={{ margin: "20px 0 12px 20px" }}
                >
                  {faculty.name}
                </h5>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
