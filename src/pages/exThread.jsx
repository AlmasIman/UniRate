import { useState } from "react";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Select from "react-select";
import threadStyle from "../assets/styles/Thread.module.css";
import messages from "../assets/icons/messages.svg";
import Button from "../components/Button.jsx";
import Comment from "../components/Comment.jsx";
import EmptyBtn from "../components/EmptyBtn.jsx";

function Thread() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const cityOptions = [
    { value: "NU", label: "NU" },
    { value: "SDU", label: "SDU" },
    { value: "AstanaIT", label: "AstanaIT" },
  ];

  const handlePostComment = () => {
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        { text: newComment, id: Date.now(), replies: [] },
      ]);
      setNewComment("");
    }
  };

  const handlePostReply = (commentId, replyText) => {
    if (replyText.trim()) {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, replyText] }
            : comment
        )
      );
    }
  };

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
          <div style={{ width: "326px" }}>
            <Select
              options={cityOptions}
              placeholder="Search for Uni"
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
              alignItems: "center",
              fontSize: "16px",
              color: "rgba(98, 98, 100, 1)",
            }}
          >
            <img src={messages} alt="" />
            <p>{comments.length} comments</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "rgba(122, 122, 122, 1)",
              fontSize: "16px",
            }}
          >
            <h3 style={{ fontSize: "28px", color: "rgba(45, 45, 45, 1)" }}>
              Admission
            </h3>
            <p>Navigating University Admissions: Your Guide to Success</p>
            <p>The only moment, the only life we have is in the NOW...</p>
          </div>
        </div>
        <div className={threadStyle.commentSectionDiv}>
          <h3>Add a comment</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              type="text"
              placeholder="Share your thought"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{
                width: "81%",
                borderRadius: "20px",
                paddingLeft: "20px",
                border: '1px solid rgba(216, 216, 216, 1)'
              }}
            />
            <div onClick={handlePostComment}>
              <Button content="Post it" />
            </div>
          </div>
        </div>
        <div className={threadStyle.UserCommentsList}>
          <h3>Comments</h3>
          {comments.length === 0 ? (
            <p>No comments yet</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} style={{ marginTop: "32px" }}>
                <Comment
                  text={comment.text}
                  onReply={(replyText) =>
                    handlePostReply(comment.id, replyText)
                  }
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "63px",
                  }}
                >
                  {comment.replies &&
                    comment.replies.map((reply, index) => (
                      <div key={index} style={{ marginTop: "16px" }}>
                        <Comment
                          text={reply}
                          onReply={(replyText) =>
                            handlePostReply(comment.id, replyText)
                          } // Pass onReply to replies too
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))
          )}
          {comments.length > 3 && <EmptyBtn content="Load more" />}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Thread;
