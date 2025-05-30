import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import arrlowLeft from "../assets/icons/ArrowLeft.svg";
import arrlowRight from "../assets/icons/ArrowRight.svg";
import like from "../assets/icons/like2.svg";
import Loading from "../components/loading.jsx";
import { Link } from "react-router-dom";
import { addToFavorites } from "../services/favouriteService.js";
import { getCurrentUser } from "../services/authService.js";
import deleted from "../assets/icons/delete.svg";
import { deleteFromFavorites } from "../services/favouriteService.js"; // Import the deleteFromFavorites function

const Carousel = () => {
  const [universities, setUniversities] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setIsAuthenticated(!!user);
    };

    fetchUser();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://unirate.kz/university/open-api/universities/top?limit=10"
        );
        if (!response.ok) throw new Error("Ошибка загрузки данных");
        const data = await response.json();
        setUniversities(data);

        const user = await getCurrentUser();
        if (user) await fetchFavourites(user.id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchFavourites = async (userId) => {
      try {
        const res = await fetch(
          `https://unirate.kz/university/open-api/favorites/user/${userId}`
        );
        if (!res.ok) throw new Error("Ошибка загрузки избранного");
        const data = await res.json();
        setFavourites(data.map((fav) => fav.universityId));
      } catch (err) {
        console.error("Ошибка при получении избранных университетов:", err);
      }
    };

    fetchData();
  }, []);
  const handleDeleteFromFavorites = async (universityId) => {
    try {
      await deleteFromFavorites(universityId);
      alert("Университет удалён из избранного!");
      // Перезагрузить список избранных после удаления
    } catch (error) {
      console.error(error);
      alert("Не удалось удалить из избранного");
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>Something went wrong!</p>;

  const visibleCount =
    window.innerWidth >= 1200 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  const numGroups = Math.ceil(universities.length / visibleCount);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(universities.length - visibleCount, 0)
        : prevIndex - visibleCount
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex + visibleCount >= universities.length
        ? 0
        : prevIndex + visibleCount
    );
  };

  const handleAddToFavorites = async (universityId) => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        alert("Войдите в аккаунт, чтобы добавлять в избранное.");
        return;
      }

      await addToFavorites(user.id, universityId);
      setFavourites((prev) => [...prev, universityId]);
      alert("Университет добавлен в избранное!");
    } catch (error) {
      alert("Ошибка при добавлении в избранное.");
      console.error(error);
    }
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
          {[...Array(numGroups)].map((_, groupIndex) => (
            <div
              key={groupIndex}
              className={`carousel-item ${
                groupIndex === Math.floor(activeIndex / visibleCount)
                  ? "active"
                  : ""
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
                  .slice(
                    groupIndex * visibleCount,
                    groupIndex * visibleCount + visibleCount
                  )
                  .map((uni) => (
                    <Link
                      key={uni.id}
                      to={`/view-university/${uni.id}`}
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
                        {isAuthenticated ? (
                          favourites.includes(uni.id) ? (
                            <img
                              src={deleted}
                              alt="favouriteIcon"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDeleteFromFavorites(uni.id);
                              }}
                              style={{
                                position: "absolute",
                                right: "12px",
                                top: "12px",
                                cursor: "pointer",
                              }}
                            />
                          ) : (
                            <img
                              src={like}
                              alt="favouriteIcon"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleAddToFavorites(uni.id);
                              }}
                              style={{
                                position: "absolute",
                                right: "12px",
                                top: "12px",
                                cursor: "pointer",
                              }}
                            />
                          )
                        ) : null}

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
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {[...Array(numGroups)].map((_, index) => (
          <button
            key={index}
            className={`mx-1 `}
            style={{
              width: "8.9px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor:
                index === Math.floor(activeIndex / visibleCount)
                  ? "rgba(0, 147, 121, 1)"
                  : "rgba(225, 229, 238, 1)",
              border: "none",
            }}
            onClick={() => setActiveIndex(index * visibleCount)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
