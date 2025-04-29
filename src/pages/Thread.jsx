import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // to access the forumId from the URL
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Select from "react-select";
import threadStyle from "../assets/styles/Thread.module.css";
import messages from "../assets/icons/messages.svg";
import Button from "../components/Button.jsx";
import Comment from "../components/Comment.jsx";
import EmptyBtn from "../components/EmptyBtn.jsx";
import { getCurrentUser } from "../services/authService.js"; // Предполагается, что эта функция находится в utils/auth
import {
  fetchForumById,
  postComment,
  fetchForumReviews,
  replyToComment,
} from "../services/forumService.js";
import defProf from "../assets/img/profilepic.png";
import { useAuth } from "../contexts/AuthContext";
import Warning from "../layouts/WarningAlert";
function Thread() {
  const { forumId } = useParams();
  const [forum, setForum] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { isAuthenticated } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const cityOptions = [
    { value: "NU", label: "NU" },
    { value: "SDU", label: "SDU" },
    { value: "AstanaIT", label: "AstanaIT" },
  ];

  useEffect(() => {
    fetchForumById(forumId)
      .then((data) => setForum(data))
      .catch((error) => console.error("Error fetching forum:", error));

    fetchForumReviews(forumId, page, 20, "desc")
      .then((data) => {
        setPage(1);
        const reviews = data.content.map((review) => ({
          id: review.id,
          text: review.comment,
          author: review.userName,
          role: review.status,
          postedTime: new Date(review.createdAt).toLocaleString(),
          profileImg: review.profileImgUrl ? review.profileImgUrl : defProf,
          replies: review.comments.map((reply) => ({
            text: reply.comment,
            author: reply.userName,
            role: reply.status,
            postedTime: new Date(reply.createdAt).toLocaleString(),
            profileImg: reply.profileImgUrl,
          })),
        }));
        setComments(reviews);
      })
      .catch((error) => console.error("Error fetching forum reviews:", error));
  }, [forumId]);

  const loadMoreReviews = () => {
    fetchForumReviews(forumId, page, 20, "desc")
      .then((data) => {
        const newReviews = data.content.map((review) => ({
          id: review.id,
          text: review.comment,
          author: review.userName,
          role: review.status,
          postedTime: new Date(review.createdAt).toLocaleString(),
          profileImg: review.profileImgUrl ? review.profileImgUrl : defProf,
          replies: review.comments.map((reply) => ({
            text: reply.comment,
            author: reply.userName,
            role: reply.status,
            postedTime: new Date(reply.createdAt).toLocaleString(),
            profileImg: reply.profileImgUrl,
          })),
        }));

        setComments((prev) => [...prev, ...newReviews]);
        setPage((prevPage) => prevPage + 1);
        if (data.last) {
          setHasMore(false);
        }
      })
      .catch((error) => console.error("Error loading more reviews:", error));
  };
  const handleReturnMessage = () => {
    setShowWarning(true);
  };

  const handlePostComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const currentUser = await getCurrentUser();

      const newPostedComment = await postComment({
        forumId,
        userId: currentUser.id,
        comment: newComment,
      });

      setComments((prevComments) => [
        ...prevComments,
        {
          text: newPostedComment.comment,
          id: newPostedComment.id,
          author: currentUser.userName,
          role: currentUser.role,
          postedTime: new Date().toLocaleString(),
          profileImg: newPostedComment.profileImgUrl || defProf,
          replies: [],
        },
      ]);

      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handlePostReply = async (commentId, replyText) => {
    if (replyText.trim()) {
      try {
        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser.id) {
          setShowWarning(true);
          return;
        }

        const newReply = await replyToComment(
          commentId,
          currentUser.id,
          replyText
        );

        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  replies: [
                    ...comment.replies,
                    {
                      text: newReply.comment,
                      author: currentUser.userName,
                      role: currentUser.role,
                      postedTime: new Date().toLocaleString(),
                    },
                  ],
                }
              : comment
          )
        );
      } catch (error) {
        console.error("Error posting reply:", error);
      }
    }
  };

  return (
    <>
      {showWarning && (
        <Warning
          message="You need to log in first"
          onClose={() => setShowWarning("")}
        />
      )}

      <Header />
      <div className={threadStyle.forumAdmissnDiv}>
        <div className={threadStyle.threadPath}>
          <a href="/forum">Forum</a>
          <hr />
          <p>{forum ? forum.name : "Loading..."}</p>
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
        {forum && (
          <>
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
                  {forum.name}
                </h3>
                <p>{forum.description}</p>
              </div>
            </div>
            <div className={threadStyle.commentSectionDiv}>
              <h3>Add a comment</h3>
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  type="text"
                  placeholder="Share your thought"
                  value={newComment}
                  disabled={!isAuthenticated}
                  onChange={(e) => setNewComment(e.target.value)}
                  style={{
                    width: "81%",
                    borderRadius: "20px",
                    paddingLeft: "20px",
                    border: "1px solid rgba(216, 216, 216, 1)",
                  }}
                />
                <div
                  onClick={
                    isAuthenticated ? handlePostComment : handleReturnMessage
                  }
                >
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
                      author={comment.author}
                      role={comment.role}
                      postedTime={comment.postedTime}
                      onReply={(replyText) =>
                        handlePostReply(comment.id, replyText)
                      }
                      profileImg={comment.profileImg}
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
                              text={reply.text}
                              author={reply.author}
                              role={reply.role}
                              postedTime={reply.postedTime}
                              profileImg={reply.profileImg}
                              onReply={(replyText) =>
                                handlePostReply(comment.id, replyText)
                              }
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                ))
              )}
            </div>
            {hasMore && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={loadMoreReviews}
              >
                <Button content="Load More" />
              </div>
            )}
          </>
        )}
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}

export default Thread;
