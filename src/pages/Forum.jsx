import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import fo from "../assets/styles/Forum.module.css";
import ForumComponent from "../components/forumComponent.jsx";
import forumCom from "../assets/styles/ForumComponent.module.css";
import messages from "../assets/icons/messages.svg";
import EmptyBtn from "../components/EmptyBtn.jsx";
import { searchForums } from "../services/forumService.js";
import { useState } from "react";
import search from "../assets/icons/search.svg";
import { useNavigate } from "react-router-dom"; // To navigate to thread

function Forum() {
  const [searchTerm, setSearchTerm] = useState("");
  const [serchResult, setSerchResult] = useState()
  const navigate = useNavigate();

  const handleSearchClick = async () => {
    try {
      const results = await searchForums(searchTerm, searchTerm);
      setSerchResult(results)
      console.log(results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleForumClick = (id) => {
    navigate(`/thread/${id}`);
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <br />
      <div className={fo.mainForum}>
        <div className={fo.searchDiv}>
          <div style={{ display: "flex", gap: "20px" }}>
            <input
              type="text"
              placeholder="Search for university…"
              className={fo.searchInput}
              value={searchTerm}
              onInput={(e) => setSearchTerm(e.target.value)}
            />
            <img
              src={search}
              alt=""
              onClick={handleSearchClick}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        {serchResult ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {serchResult.length > 0 ? (
              serchResult.map((forum) => (
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
              <p>No results found.</p>
            )}
          </div>
        ) : (
          <ForumComponent />
        )}
        <br />
      </div>
      <Footer />
    </div>
  );
}

export default Forum;
