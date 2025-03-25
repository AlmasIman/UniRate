import comm from "../assets/styles/Comment.module.css";
import like from "../assets/icons/like.svg";
function Comment() {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
      <img
        src="../../public/avatar_placeholder.png"
        alt=""
        className={comm.avatar}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <p>Almas Imanbayev</p>
          <p className={comm.status}>Student</p>
        </div>
        <p className={comm.comment}>
          Attending Crestwood University has been a transformative experience
          for me. The professors are not only knowledgeable but also genuinely
          care about their students' success. The campus is vibrant and full of
          resources, making it easy to get involved in various activities. I
          highly recommend Crestwood for anyone looking to further their
          education in a supportive environment.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <p className={comm.postedTime}>about 1 hour ago</p>
          <img src={like} alt="" />
          <p
            style={{
              fontWeight: "600",
              fontSize: "16px",
              lineHeight: "24px",
              color: "rgba(0, 147, 121, 1)"
            }}
          >
            Reply
          </p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
