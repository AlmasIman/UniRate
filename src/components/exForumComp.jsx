import messages from "../assets/icons/messages.svg";
import forumCom from "../assets/styles/forumComponent.module.css";
import ava1 from "/ava3.png";
import like from "../assets/icons/like.svg";
import EmptyBtn from "./EmptyBtn.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // To navigate to thread

function ForumComponent() {
  const [forums, setForums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://unirate.kz/university/open-api/forums")
      .then((response) => response.json())
      .then((data) => setForums(data))
      .catch((error) => console.error("Error fetching forums:", error));
  }, []);
  const handleForumClick = (forumId) => {
    navigate(`/thread/${forumId}`); // Navigate to the specific thread page
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
        {forums.length > 0 ? (
          forums.map((forum) => (
            <div key={forum.id} className={forumCom.main} >
              <img
                src="/public/almaty.png"
                alt=""
                className={forumCom.UniImg}
              />

              <div  className={forumCom.commentsSections}>
                <div className={forumCom.title}>
                  <div
                    style={{
                      display: "flex",
                      gap: "3px",
                      alignItems: "center",
                    }}
                  >
                    <h5>Thread</h5>
                    <img src={messages} alt="" />
                    <p>{forum.topReviews.length} comments</p>
                  </div>
                  <h3>{forum.name}</h3>
                  <p>{forum.description}</p>
                </div>
                {forum.topReviews.map((review) => (
                  <div
                    key={review.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <div className={forumCom.author}>
                      <img src={ava1} alt="" />
                      <p>{review.userName || "Anonymous"}</p>
                      <p
                        style={{
                          backgroundColor: "rgba(230, 232, 236, 1)",
                          borderRadius: "16px",
                          padding: "0 6px",
                          color: "rgba(144, 144, 144, 1)",
                        }}
                      >
                        Student
                      </p>
                    </div>
                    <p className={forumCom.comment}>{review.comment}</p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "16px",
                        alignItems: "center",
                      }}
                    >
                      <p className={forumCom.timsPosted}>Just now</p>
                      <img src={like} alt="" />
                      <p
                        style={{
                          fontWeight: "600",
                          fontSize: "16px",
                          lineHeight: "24px",
                          color: "rgba(0, 147, 121, 1)",
                        }}
                      >
                        Reply
                      </p>
                    </div>
                  </div>
                ))}
                <hr style={{ width: "100%" }} />
                <div onClick={() => handleForumClick(forum.id)} >
                  <EmptyBtn content="See more" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading forums...</p>
        )}
      </div>
    </>
  );
}

export default ForumComponent;
