import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import oneuni from "../assets/styles/OneUniversity.module.css";
import favourite from "../assets/icons/favourites.svg";
import star from "../assets/icons/Star.svg";
import Button from "../components/Button";
import FacultyList from "../components/FacultyList.jsx";
import EmptyBtn from "../components/EmptyBtn.jsx";
import emptyStar from "../assets/icons/emptyStar.svg";
import arrow from "../assets/icons/ArrowBtn.svg";
import Comment from "../components/Comment.jsx";
function University() {
  function giveRate() {}
  return (
    <>
      <Header />

      <div className={oneuni.uniInfoMainContainer}>
        <div className={oneuni.unibox}>
          <img src="../../public/shym.png" alt="" className={oneuni.uniImg} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              justifyContent: "center",
            }}
          >
            <div>
              <div className={oneuni.Title}>
                <h1>SDU</h1>
                <img src={favourite} alt="" />
              </div>
              <div className={oneuni.rate}>
                <div>
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                </div>
                <p>(120)</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: "64px" }}>
                <p
                  style={{ width: "200px", height: "22px", minWidth: "200px" }}
                >
                  Average tuition price
                </p>
                <p>760 000</p>
              </div>
              <div style={{ display: "flex", gap: "64px" }}>
                <p
                  style={{ width: "200px", height: "22px", minWidth: "200px" }}
                >
                  Dormitory
                </p>
                <p>exist</p>
              </div>
              <div style={{ display: "flex", gap: "64px" }}>
                <p
                  style={{ width: "200px", height: "22px", minWidth: "200px" }}
                >
                  Military department
                </p>
                <p>No</p>
              </div>
            </div>
            <Button content="Calculate tuition cost" />
          </div>
        </div>
      </div>

      <FacultyList department="Business school" />
      <br />
      <FacultyList department="School of Engineering" />

      <div style={{ textAlign: "center", marginTop: "92px" }}>
        <EmptyBtn content="Load more 100+" />
      </div>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          width: "1105px",
          margin: "auto",
        }}
      >
        <div>
          <h1
            style={{ fontSize: "24px", lineHeight: "32px", fontWeight: "600" }}
          >
            Add Review
          </h1>
          <p style={{ color: "rgba(144, 144, 144, 1)", fontSize: "14px" }}>
            Be the first to review
          </p>
          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <img
              src={emptyStar}
              alt=""
              className={oneuni.starRateGive}
              onClick={giveRate()}
            />
            <img
              src={emptyStar}
              alt=""
              className={oneuni.starRateGive}
              onClick={giveRate()}
            />
            <img
              src={emptyStar}
              alt=""
              className={oneuni.starRateGive}
              onClick={giveRate()}
            />
            <img
              src={emptyStar}
              alt=""
              className={oneuni.starRateGive}
              onClick={giveRate()}
            />
            <img
              src={emptyStar}
              alt=""
              className={oneuni.starRateGive}
              onClick={giveRate()}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <input
            type="text"
            className={oneuni.review}
            placeholder="Share your thought"
          />
          <button className={oneuni.postBtn}>
            Post it <img src={arrow} alt="" />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{ fontWeight: "600", fontSize: "24px", lineHeight: "32px" }}
          >
            3 comments
          </p>

          <p style={{ color: "rgba(0, 147, 121, 1)", cursor: "pointer" }}>
            Go to Forum{" "}
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.125 10.0845H16.875"
                stroke="rgba(0, 147, 121, 1)"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.25 4.45947L16.875 10.0845L11.25 15.7095"
                stroke="rgba(0, 147, 121, 1)"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </p>
        </div>
        <Comment />
        <Comment />
      </div>
      <br />
      <br />
      <div style={{textAlign: "center"}}>
        <EmptyBtn content="Load more 100+" />
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default University;
