import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import oneuni from "../assets/styles/OneUniversity.module.css";
import like from "../assets/icons/favourites.svg";
import star from "../assets/icons/Star.svg";
import Button from "../components/Button";
import FacultyList from "../components/FacultyList.jsx";
import EmptyBtn from "../components/EmptyBtn.jsx";
import emptyStar from "../assets/icons/emptyStar.svg";
import arrow from "../assets/icons/ArrowBtn.svg";
import Comment from "../components/Comment.jsx";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom
import { getCurrentUser } from "../services/authService.js";

function University() {
  const { id } = useParams(); // Get the university ID from the URL
  const [university, setUniversity] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setIsAuthenticated(!!user); 
    };
    
    fetchUser();
  }, []);
  useEffect(() => {
    const fetchUniversityData = async () => {
      const response = await fetch(
        `https://unirate.kz/university/open-api/universities/${id}`
      );
      const data = await response.json();
      setUniversity(data);
    };

    fetchUniversityData();
  }, [id]);

  if (!university) {
    return <div>Loading...</div>;
  }

  const stars = new Array(5)
    .fill(false)
    .map((_, index) => index < university.rating);

  return (
    <>
      <Header />

      <div className={oneuni.uniInfoMainContainer}>
        <div className={oneuni.unibox}>
          <img src={oneuni.logoUrl} alt="" className={oneuni.uniImg} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              justifyContent: "center",
            }}
          >
            <div>
              <div className={oneuni.Title}>
                <h1>{university.name}</h1>
                {
                  isAuthenticated ? (<img src={like} alt="" />) : null
                }
                
              </div>
              <div className="rate">
                <div>
                  {stars.map((isFilled, index) => (
                    <img
                      key={index}
                      src={isFilled ? star : emptyStar} // Assuming you have a starEmpty for empty stars
                      alt={`star-${index}`}
                    />
                  ))}
                </div>
                <p>({university.ratingCount})</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: "64px" }}>
                <p
                  style={{ width: "200px", height: "22px", minWidth: "200px" }}
                >
                  Average tuition price
                </p>
                <p>{university.baseCost}</p>
              </div>
              <div style={{ display: "flex", gap: "64px" }}>
                <p
                  style={{ width: "200px", height: "22px", minWidth: "200px" }}
                >
                  Dormitory
                </p>
                <p>{university.dormitory ? "Yes" : "No"}</p>
              </div>
              <div style={{ display: "flex", gap: "64px" }}>
                <p
                  style={{ width: "200px", height: "22px", minWidth: "200px" }}
                >
                  Military department
                </p>
                <p>{university.militaryDepartment ? "Yes" : "No"}</p>
              </div>
            </div>
            <Button content="Calculate tuition cost" path="/calculator" />
          </div>
        </div>
      </div>

      <FacultyList department="Business school" />
      <br />
      <FacultyList department="School of Engineering" />

      <div style={{ textAlign: "center", marginTop: "92px" }}>
        <EmptyBtn content="Load more 100+" />
      </div>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          width: "1105px",
          margin: "auto",
        }}
      >
        <div>
          <h1
            style={{ fontSize: "24px", lineHeight: "32px", fontWeight: "600" }}
          >
            Add Review
          </h1>
          <p style={{ color: "rgba(144, 144, 144, 1)", fontSize: "14px" }}>
            Be the first to review
          </p>
          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <img src={emptyStar} alt="" className={oneuni.starRateGive} />
            <img src={emptyStar} alt="" className={oneuni.starRateGive} />
            <img src={emptyStar} alt="" className={oneuni.starRateGive} />
            <img src={emptyStar} alt="" className={oneuni.starRateGive} />
            <img src={emptyStar} alt="" className={oneuni.starRateGive} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <input
            type="text"
            className={oneuni.review}
            placeholder="Share your thought"
          />
          <button className={oneuni.postBtn}>
            Post it <img src={arrow} alt="" />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{ fontWeight: "600", fontSize: "24px", lineHeight: "32px" }}
          >
            3 comments
          </p>

          <p style={{ color: "rgba(0, 147, 121, 1)", cursor: "pointer" }}>
            Go to Forum{" "}
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.125 10.0845H16.875"
                stroke="rgba(0, 147, 121, 1)"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.25 4.45947L16.875 10.0845L11.25 15.7095"
                stroke="rgba(0, 147, 121, 1)"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </p>
        </div>
        <Comment />
        <Comment />
      </div>
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <EmptyBtn content="Load more 100+" />
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default University;
