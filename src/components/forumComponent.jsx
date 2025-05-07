import messages from "../assets/icons/messages.svg";
import forumCom from "../assets/styles/forumComponent.module.css";
import EmptyBtn from "./EmptyBtn.jsx";
import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // To navigate to thread
import { getAllForum } from "../services/forumService.js";
function ForumComponent() {
  const [forums, setForums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForum = async () => {
      try {
        const data = await getAllForum();
        setForums(data);
      } catch (error) {
        console.error("Error fetching forums:", error);
      }
    };
    fetchForum();
  }, []);
  // useEffect(() => {
  //   fetch("https://unirate.kz/university/open-api/forums")
  //     .then((response) => response.json())
  //     .then((data) => setForums(data))
  //     .catch((error) => console.error("Error fetching forums:", error));
  // }, []);
  const handleForumClick = (forumId) => {
    navigate(`/thread/${forumId}`);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
        {forums.length > 0 ? (
          forums.map((forum) => (
            <div key={forum.id} className={forumCom.main}>
              <img
                src={
                  forum.universityImgUrl || "https://via.placeholder.com/150"
                }
                alt=""
                className={forumCom.UniImg}
              />

              <div className={forumCom.commentsSections}>
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
                  </div>
                  <h3>{forum.name}</h3>
                  <p>{forum.description}</p>
                </div>
                <div onClick={() => handleForumClick(forum.id)}>
                  <hr style={{ width: "100%" }} />
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
