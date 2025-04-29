import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import fo from "../assets/styles/Forum.module.css";
import ForumComponent from "../components/forumComponent.jsx";
import { searchForums } from "../services/forumService.js";
import { useState } from "react";
import search from "../assets/icons/search.svg";
function Forum() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = async () => {
    try {
      const results = await searchForums(searchTerm, searchTerm);
      console.log(results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className={fo.mainForum}>
        <div className={fo.searchDiv}>
          <p>University name</p>
          <div style={{display: 'flex', gap: '20px'}}>
            <input
              type="text"
              placeholder="Search for university…"
              className={fo.searchInput}
              value={searchTerm}
              onInput={(e) => setSearchTerm(e.target.value)}
            />
            <img src={search} alt="" onClick={handleSearchClick}  style={{cursor: 'pointer'}}/>
          </div>
        </div>
        <ForumComponent />
        <br />
      </div>
      <Footer />
    </>
  );
}

export default Forum;
