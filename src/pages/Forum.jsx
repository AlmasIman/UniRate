import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import fo from "../assets/styles/Forum.module.css";
import ForumComponent from "../components/forumComponent";
function Forum() {
  return (
    <>
      <Header />
      <div className={fo.mainForum}>
        <div className={fo.searchDiv}>
          <p>University name</p>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for university…"
            className={fo.searchInput}
          />
        </div>
        <ForumComponent/>
        <ForumComponent/>
        <ForumComponent/>
        <br />
      </div>
      <Footer />
    </>
  );
}

export default Forum;
