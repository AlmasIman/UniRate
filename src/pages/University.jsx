import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import oneuni from "../assets/styles/OneUniversity.module.css";
import like from "../assets/icons/favourites.svg";
import filledStar from "../assets/icons/Star.svg";
import Button from "../components/Button";
import FacultyList from "../components/FacultyList.jsx";
import EmptyBtn from "../components/EmptyBtn.jsx";
import emptyStar from "../assets/icons/emptyStar.svg";
import arrow from "../assets/icons/ArrowBtn.svg";
import Comment from "../components/Comment.jsx";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService.js";
import Loading from "../components/loading.jsx";
import defPic from "../assets/img/profilepic.png";
import { rateUniversity } from "../services/universityService.js"; // функция отправки рейтинга
import { fetchByUniID, getStatisticOfForum } from "../services/forumService.js";
import { useAuth } from "../contexts/AuthContext";
import { postComment, replyToComment } from "../services/forumService.js";
import Warning from "../layouts/WarningAlert";

function University() {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [reviewStats, setReviewStats] = useState({
    reviewCount: 0,
    averageRating: 0,
  });
  const { isAuthenticated } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [forumId, setForumId] = useState(null);
  const navigate = useNavigate();
  const [newCommentText, setNewCommentText] = useState("");

  const handlePostComment = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error("You must be logged in to post a comment");

      if (reviews.length > 0) {
        const forumId = reviews[0].forumId;
        const result = await postComment({
          forumId,
          userId: user.id,
          comment: newCommentText,
        });

        setReviews((prev) => [result, ...prev]); // add new comment to top
        setNewCommentText(""); // clear input
        fetchReviews(); // reload comments
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };
  const handleReturnMessage = () => {
    setShowWarning(true);
  };

  const handleForumClick = (forumId) => {
    navigate(`/thread/${forumId}`);
  };
  const handleClick = async (rating) => {
    const user = await getCurrentUser();

    if (!user) {
      setError("Please. Log in to rate.");
      return;
    }

    setSelected(rating);
    await rateUniversity(university.id, rating);
    setMessage("Thanks for your rating! 🙌");
  };

  useEffect(() => {
    // const fetchComments = async () => {
    //   try {
    //     const data = await fetchByUniID(id);
    //     setReviews(data); // save fetched reviews into state
    //   } catch (error) {
    //     console.error("Failed to fetch comments:", error);
    //   }
    // };

    // fetchComments();
    fetchReviews();
  }, [id]);
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

  const fetchReviews = async () => {
    try {
      const reviewsData = await fetchByUniID(id);
      setReviews(reviewsData);

      if (reviewsData.length > 0) {
        const forumId = reviewsData[0].forumId;
        const stats = await getStatisticOfForum(forumId);
        setReviewStats(stats);
      }
    } catch (error) {
      console.error("Failed to fetch reviews or statistics:", error);
    }
  };

  useEffect(() => {
    const fetchReviewsAndStats = async () => {
      try {
        const reviewsData = await fetchByUniID(id);
        setReviews(reviewsData);

        if (reviewsData.length > 0) {
          const forumId = reviewsData[0].forumId;
          const stats = await getStatisticOfForum(forumId);
          setReviewStats(stats);
          setForumId(forumId);
        }
      } catch (error) {
        console.error("Failed to fetch reviews or statistics:", error);
      }
    };

    fetchReviewsAndStats();
  }, [id]);
  if (!university) {
    return <Loading />;
  }

  const stars = new Array(5)
    .fill(false)
    .map((_, index) => index < university.rating);

  return (
    <>
      {showWarning && (
        <Warning
          message="You need to log in first"
          onClose={() => setShowWarning("")}
        />
      )}

      <Header />
      <div className={oneuni.uniInfoMainContainer}>
        <div className={oneuni.unibox}>
          <img src={university.logoUrl} alt="" className={oneuni.uniImg} />

          <div className={oneuni.mainContent}>
            <div className={oneuni.infoDiv}>
              <div className={oneuni.Title}>
                <h1>{university.name}</h1>
                {isAuthenticated ? <img src={like} alt="" /> : null}
              </div>
              <div className="rate">
                <div>
                  {stars.map((isFilled, index) => (
                    <img
                      key={index}
                      src={isFilled ? filledStar : emptyStar} // Assuming you have a starEmpty for empty stars
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

      {university.faculty.map((faculty) => (
        <div key={faculty.facultyDto.id}>
          <FacultyList
            department={faculty.facultyDto.name}
            facultyList={faculty.specialtyDtos}
          />
          <br />
        </div>
      ))}

      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          width: "80%",
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
            {[1, 2, 3, 4, 5].map((star) => (
              <img
                key={star}
                src={star <= (hovered || selected) ? filledStar : emptyStar}
                alt={`${star} star`}
                className={oneuni.starRateGive}
                onClick={() => handleClick(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
          {message && (
            <p
              style={{
                marginTop: "10px",
                color: "rgba(0, 147, 121, 1)",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {message}
            </p>
          )}

          {error && (
            <p
              style={{
                marginTop: "10px",
                color: "red",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {error}
            </p>
          )}
        </div>
        {isAuthenticated ? null : (
          <p
            style={{
              color: "red",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            if you wanna send message, log in
          </p>
        )}
        <div className={oneuni.inputMessageDiv}>
          <input
            type="text"
            className={oneuni.review}
            disabled={!isAuthenticated}
            placeholder="Share your thoughts..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <button
            className={oneuni.postBtn}
            onClick={isAuthenticated ? handlePostComment : handleReturnMessage}
          >
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
            {reviewStats.reviewCount} comments
          </p>

          <p
            style={{ color: "rgba(0, 147, 121, 1)", cursor: "pointer" }}
            onClick={() => handleForumClick(forumId)}
          >
            Go to Forum
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
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.25 4.45947L16.875 10.0845L11.25 15.7095"
                stroke="rgba(0, 147, 121, 1)"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
        </div>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Comment
              key={review.id}
              text={review.comment} // comment text
              author={review.userName} // username
              role={review.status} // role ("Admin", "User", etc.)
              postedTime={new Date(review.createdAt).toLocaleDateString()} // formatted date
              profileImg={review.profileImgUrl || defPic} // fallback if missing
              onReply={async (replyText) => {
                try {
                  const user = await getCurrentUser();
                  if (!user) {
                    handleReturnMessage();
                    throw new Error("You must be logged in to reply");
                  }

                  await replyToComment(review.id, user.id, replyText);

                  console.log("Reply posted successfully");
                  fetchReviews(); // reload comments
                  // Optional: re-fetch reviews to show the new reply
                } catch (error) {
                  console.error("Failed to post reply:", error);
                }
              }}
            />
          ))
        ) : (
          <p>No reviews yet. Be the first to add one!</p>
        )}{" "}
      </div>
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <EmptyBtn content="See more" />
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default University;
