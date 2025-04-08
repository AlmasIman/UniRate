import { useState } from "react";
import comm from "../assets/styles/Comment.module.css";
import like from "../assets/icons/like.svg";
import Button from "../components/Button.jsx";

function Comment({
  text,
  author = "Anonymous",
  role = "User",
  postedTime = "Just now",
  onReply,
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplyClick = () => setIsReplying(!isReplying);

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
      <img
        src="../../public/avatar_placeholder.png"
        alt=""
        className={comm.avatar}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <p>{author}</p>
          <p className={comm.status}>{role}</p>
        </div>
        <p className={comm.comment}>{text}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <p className={comm.postedTime}>{postedTime}</p>
          <img src={like} alt="Like" />
          <p
            style={{
              fontWeight: "600",
              cursor: "pointer",
              color: "rgba(0, 147, 121, 1)",
            }}
            onClick={handleReplyClick}
          >
            {isReplying ? "Cancel" : "Reply"}
          </p>
        </div>
        {isReplying && (
          <div style={{ marginTop: "8px", display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              style={{
                width: "500px",
                padding: "8px",
                borderRadius: "20px",
                paddingLeft: "20px",
                border: "1px solid rgba(216, 216, 216, 1)",
              }}
            />
            <div
              onClick={() => {
                onReply(replyText);
                setReplyText("");
                setIsReplying(false);
              }}
              style={{cursor: 'pointer'}}
            >
              <Button content="Post Reply" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
