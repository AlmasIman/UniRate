import React, { useState, useEffect, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import arrlowLeft from "../assets/icons/ArrowLeft.svg";
import arrlowRight from "../assets/icons/ArrowRight.svg";
import like from "../assets/icons/like2.svg";
import deleted from "../assets/icons/delete.svg";
import Loading from "../components/loading.jsx";
import { Link } from "react-router-dom";
import {
  addToFavorites,
  deleteFromFavorites,
  fetchFavourites,
} from "../services/favouriteService.js";
import { getCurrentUser } from "../services/authService.js";
import { getTopUniversities } from "../services/universityService.js";

const UniversityCarousel = () => {
  const carouselRef = useRef();
  const [universities, setUniversities] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePrev = () => {
    carouselRef.current?.previous();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        setIsAuthenticated(!!user);

        const data = await getTopUniversities();
        setUniversities(data);

        if (user) {
          const favData = await fetchFavourites(user.id);
          setFavourites(
            favData.map((fav) => ({
              id: fav.id,
              universityId: fav.universityId,
            }))
          );
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToFavorites = async (universityId) => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        alert("Войдите в аккаунт, чтобы добавлять в избранное.");
        return;
      }

      await addToFavorites(user.id, universityId);
      setFavourites((prev) => [...prev, { id: universityId, universityId }]);
      alert("Университет добавлен в избранное!");
    } catch (error) {
      alert("Ошибка при добавлении в избранное.");
      console.error(error);
    }
  };

  const handleDeleteFromFavorites = async (universityId) => {
    try {
      const favorite = favourites.find((f) => f.universityId === universityId);
      if (!favorite) {
        alert("Университет не найден в избранном.");
        return;
      }

      await deleteFromFavorites(favorite.id);
      alert("Университет удалён из избранного!");
      setFavourites((prev) =>
        prev.filter((f) => f.universityId !== universityId)
      );
    } catch (error) {
      console.error(error);
      alert("Не удалось удалить из избранного");
    }
  };

  const handleFavClick = (e, universityId, isFavorite) => {
    e.preventDefault();
    e.stopPropagation();
    isFavorite
      ? handleDeleteFromFavorites(universityId)
      : handleAddToFavorites(universityId);
  };

  if (loading) return <Loading />;
  if (error) return <p>Что-то пошло не так!</p>;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
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

  const CustomDot = ({ onClick, active }) => (
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

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          gap: "40px",
          zIndex: 2,
        }}
      >
        <button
          onMouseEnter={(e) =>
            (e.currentTarget.style.border = "2px solid rgba(229, 244, 242, 1)")
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
            (e.currentTarget.style.border = "2px solid rgba(229, 244, 242, 1)")
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
      <Carousel
        ref={carouselRef}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
        showDots={true}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        customDot={<CustomDot />}
      >
        {universities.map((uni) => {
          const isFavorite = favourites.some((f) => f.universityId === uni.id);
          return (
            <Link
              key={uni.id}
              to={`/view-university/${uni.id}`}
              style={{ textDecoration: "none", color: "rgba(45, 45, 45, 1)" }}
            >
              <div
                key={uni.id}
                style={{
                  background: "#fff",
                  borderRadius: "10px",
                  height: "476px",
                  maxWidth: "405px",
                  width: "100%",
                  boxShadow: "34px 29px 48px 0px rgba(20, 174, 130, 0.05)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  margin: "50px auto",
                  boxSizing: "border-box",
                  position: "relative",
                }}
              >
                <img
                  src={uni.logoUrl}
                  alt={uni.name}
                  style={{
                    objectFit: "cover",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    width: "100%",
                    height: "278px",
                  }}
                />
                {isAuthenticated && (
                  <img
                    src={isFavorite ? deleted : like}
                    alt={
                      isFavorite
                        ? "Удалить из избранного"
                        : "Добавить в избранное"
                    }
                    onClick={(e) => handleFavClick(e, uni.id, isFavorite)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "20px",
                      cursor: "pointer",
                    }}
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleFavClick(e, uni.id, isFavorite)
                    }
                  />
                )}
                <div style={{ padding: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3
                      style={{
                        margin: "20px 0 12px 0",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        width: "90%",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {uni.name}
                    </h3>
                    <p
                      style={{
                        border: "1px solid rgba(45, 45, 45, 1)",
                        width: "41px",
                        height: "38px",
                        textAlign: "center",
                        padding: "5px",
                        borderRadius: "4px",
                      }}
                    >
                      {uni.rating}
                    </p>
                  </div>

                  <p
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
          );
        })}
      </Carousel>
    </div>
  );
};

export default UniversityCarousel;
