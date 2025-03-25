import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Select from "react-select";
import threadStyle from "../assets/styles/Thread.module.css";
import messages from "../assets/icons/messages.svg";
import Button from "../components/Button.jsx";
import Comment from "../components/Comment.jsx";
import EmptyBtn from "../components/EmptyBtn.jsx";
function Thread() {
  const cityOptions = [
    { value: "NU", label: "NU" },
    { value: "SDU", label: "SDU" },
    { value: "AstanaIT", label: "AstanaIT" },
  ];
  return (
    <>
      <Header />
      <div className={threadStyle.forumAdmissnDiv}>
        <div className={threadStyle.threadPath}>
          <p>Forum</p>
          <hr />
          <p>Threads</p>
          <hr />
          <p>Admission</p>
          <hr />
          <p>SDU</p>
        </div>
        <div>
          <p>University name</p>
          <div
            style={{
              width: "326px",
            }}
          >
            <Select
              options={cityOptions}
              placeholder="Search for Uni" // Custom placeholder
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "white",
                  border: "1px solid rgba(216, 216, 216, 1)",
                  fontSize: "16px",
                  padding: "5px",
                  width: "326px",
                  height: "60px",
                  borderRadius: "16px",
                }),
                option: (base, { isFocused }) => ({
                  ...base,
                  backgroundColor: isFocused
                    ? "rgba(20, 174, 130, 0.05)"
                    : "white",
                  fontSize: "14px",
                  textAlign: "center",
                  width: "326px",
                }),
              }}
            />
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div
        style={{
          width: "73%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "130px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              gap: "3px",
              alignItems: "center",
              fontSize: "16px",
              color: "rgba(98, 98, 100, 1)",
            }}
          >
            <img src={messages} alt="" />
            <p>10 comments</p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              color: "rgba(122, 122, 122, 1)",
              fontSize: "16px",
            }}
          >
            <h3 style={{ fontSize: "28px", color: "rgba(45, 45, 45, 1)" }}>
              Admission
            </h3>
            <p>Navigating University Admissions: Your Guide to Success</p>
            <p>
              The only moment, the only life we have is in the NOW. What
              happened a few moments or several years ago is gone, what will
              happen this evening, or next month when we go on holidays is not
              here yet.
            </p>
          </div>
        </div>

        <div className={threadStyle.commentSectionDiv}>
          <h3>Add a comment</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <input
              type="text"
              placeholder="Share your thought"
              style={{
                width: "81%",
                borderRadius: "20px",
                border: "1px solid rgba(216, 216, 216, 1)",
                paddingLeft: "20px",
              }}
            />
            <Button content="Post it" />
          </div>
        </div>

        <div className={threadStyle.UserCommentsList}>
          <h3>Add a comment</h3>
          <Comment />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "28px",
              paddingLeft: "63px",
            }}
          >
            <hr />
            <Comment />
          </div>
          <Comment />

          <div style={{ margin: "auto" }}>
            <br />
            <EmptyBtn content="Load more 100+" />
          </div>
        </div>
      </div>
      <br />

      <Footer />
    </>
  );
}

export default Thread;
