import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import arrlowLeft from "../assets/icons/ArrowLeft.svg";
import arrlowRight from "../assets/icons/ArrowRight.svg";
import Loading from "../components/loading.jsx";
import { Link } from "react-router-dom"; 
import { getCurrentUser } from "../services/authService.js";
import deleted from "../assets/icons/delete.svg";
import { deleteFromFavorites, fetchFavourites } from "../services/favouriteService.js"; 
const Carousel = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const user = await getCurrentUser();
        const data = await fetchFavourites(user.id);
        setUniversities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const handleRemoveFromFavorites = async (favoriteId) => {
    try {
      await deleteFromFavorites(favoriteId);
      alert("Университет удалён из избранного!");
    } catch (error) {
      console.error(error);
      alert("Не удалось удалить из избранного");
    }
  };
  if (loading) return <Loading />;
  if (error) return <p>Something went wrong!</p>;

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? universities.length - 3 : prevIndex - 3
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex + 3 >= universities.length ? 0 : prevIndex + 3
    );
  };

  return (
    <div className="position-relative " style={{ margin: "auto" }}>
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <br />

        <div
          className="d-flex"
          style={{
            gap: "8px",
            margin: "auto",
            justifyContent: "center",
          }}
        >
          <button
            onMouseEnter={(e) =>
              (e.currentTarget.style.border =
                "2px solid rgba(229, 244, 242, 1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.border = "none")}
            onClick={handlePrev}
            style={{
              backgroundColor: "white",
              width: "36px",
              height: "36px",
              paddingBottom: "3px",
              border: "none",
              borderRadius: "50%",
            }}
          >
            <img src={arrlowLeft} alt="" />
          </button>
          <button
            onMouseEnter={(e) =>
              (e.currentTarget.style.border =
                "2px solid rgba(229, 244, 242, 1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.border = "none")}
            onClick={handleNext}
            style={{
              backgroundColor: "white",
              width: "36px",
              height: "36px",
              paddingBottom: "3px",
              border: "none",
              borderRadius: "50%",
            }}
          >
            <img src={arrlowRight} alt="" />
          </button>
        </div>
        <br />
        <div className="carousel-inner">
          {[...Array(Math.ceil(universities.length / 3))].map(
            (_, groupIndex) => (
              <div
                key={groupIndex}
                className={`carousel-item ${
                  groupIndex === Math.floor(activeIndex / 3) ? "active" : ""
                }`}
                style={{
                  height: "550px",
                }}
              >
                <div
                  className="d-flex "
                  style={{
                    width: "90%",
                    justifyContent: "center",
                    margin: "auto",
                    gap: "32px",
                  }}
                >
                  {universities
                    .slice(groupIndex * 3, groupIndex * 3 + 3)
                    .map((uni) => (
                      <Link
                        to={`/university/${uni.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          key={uni.id}
                          className="card mx-2"
                          style={{
                            position: "relative",
                            width: "405px",
                            minHeight: "476px",
                            borderRadius: "20px",
                            border: "none",
                            boxShadow:
                              "34.85px 29.63px 48.34px 0px rgba(20, 174, 130, 0.05)",
                          }}
                        >
                          <img
                            src={deleted}
                            alt="favouriteIcon"
                            onClick={() => handleRemoveFromFavorites(uni.id)} // именно ID избранного, не университета
                            style={{
                              position: "absolute",
                              right: "12px",
                              top: "12px",
                              cursor: "pointer",
                            }}
                          />{" "}
                          <img
                            src={uni.logoUrl}
                            className="card-img-top"
                            style={{
                              borderTopLeftRadius: "20px",
                              borderTopRightRadius: "20px",
                              width: "100%",
                              height: "278px",
                            }}
                            alt={uni.name}
                          />
                          <div
                            className="card-body"
                            style={{ position: "relative" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <h5
                                className="card-title"
                                style={{
                                  margin: "20px 0 12px 0",
                                  display: "-webkit-box",
                                  WebkitLineClamp: "1",
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {uni.name}
                              </h5>
                              <p
                                style={{
                                  border: "1px solid rgba(45, 45, 45, 1)",
                                  width: "41px",
                                  height: "38px",
                                  textAlign: "center",
                                  paddingTop: "6px",
                                  borderRadius: "4px",
                                }}
                              >
                                {uni.rating}
                              </p>
                            </div>
                            <br />
                            <p
                              className=""
                              style={{
                                textAlign: "start",
                                width: "90%",
                                display: "-webkit-box",
                                WebkitLineClamp: "3",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {uni.description}
                            </p>
                            <span
                              className="badge"
                              style={{
                                height: "32px",
                                borderRadius: "8px",
                                backgroundColor: "rgba(229, 244, 242, 1)",
                                fontFamily: "Mulish",
                                fontSize: "16px",
                                lineHeight: "150%",
                                fontWeight: "400",
                                color: "black",
                                padding: "4px",
                              }}
                            >
                              {uni.pros}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center">
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

export default Carousel;
