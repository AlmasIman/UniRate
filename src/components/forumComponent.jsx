import messages from "../assets/icons/messages.svg";
import forumCom from "../assets/styles/forumComponent.module.css";
import ava1 from "/ava3.png";
import like from "../assets/icons/like.svg";
import EmptyBtn from "../components/EmptyBtn.jsx";
import Comment from "../components/Comment.jsx";

function ForumComponent() {
  return (
    <div className={forumCom.main}>
      <img src="/astana.png" alt="" className={forumCom.UniImg} />
      <div className={forumCom.commentsSections}>
        <div className={forumCom.title}>
          <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
            <h5>Thread</h5>
            <img src={messages} alt="" />
            <p>10 comments</p>
          </div>

          <h3>Admission</h3>
          <p>Navigating University Admissions: Your Guide to Success</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div className={forumCom.author}>
            <img src={ava1} alt="" />
            <p>Nesibeli Bein</p>
            <p
              style={{
                backgroundColor: "rgba(230, 232, 236, 1)",
                borderRadius: "16px",
                padding: "0 6px 0 6px",
                color: "rgba(144, 144, 144, 1)",
              }}
            >
              Student
            </p>
          </div>
          <p className={forumCom.comment}>
            Attending Crestwood University has been a transformative experience
            for me. The professors are not only knowledgeable but also genuinely
            care about their students' success. The campus is vibrant and full
            of resources, making it easy to get involved in various activities.
            I highly recommend Crestwood for anyone looking to further their
            education in a supportive environment.{" "}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "16px",
              alignItems: "center",
            }}
          >
            <p className={forumCom.timsPosted}>about 1 hour ago</p>
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
        <hr style={{ width: "100%" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div className={forumCom.author}>
            <img src={ava1} alt="" />
            <p>Nesibeli Bein</p>
            <p
              style={{
                backgroundColor: "rgba(230, 232, 236, 1)",
                borderRadius: "16px",
                padding: "0 6px 0 6px",
                color: "rgba(144, 144, 144, 1)",
              }}
            >
              Student
            </p>
          </div>
          <p className={forumCom.comment}>
            Attending Crestwood University has been a transformative experience
            for me. The professors are not only knowledgeable but also genuinely
            care about their students' success. The campus is vibrant and full
            of resources, making it easy to get involved in various activities.
            I highly recommend Crestwood for anyone looking to further their
            education in a supportive environment.{" "}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "16px",
              alignItems: "center",
            }}
          >
            <p className={forumCom.timsPosted}>about 1 hour ago</p>
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
        <hr style={{ width: "100%" }} />
        <div style={{ textAlign: "center" }}>
          <EmptyBtn content="See more" />
        </div>
      </div>
    </div>
  );
}

export default ForumComponent;
