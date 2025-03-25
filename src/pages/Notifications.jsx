import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Emptybtn from "../components/EmptyBtn.jsx"
function Notifications() {
  return (
    <>
      <Header />
      <div
        style={{
          width: "90%",
          margin: "151px auto",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <h1
          style={{ fontSize: "38px", fontWeight: "700", textAlign: "center", marginBottom: '40px' }}
        >
          Notifications
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            paddingBottom: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "4px",
              fontSize: "14px",
              fontWeight: "500",
              color: "rgba(45, 45, 45, 1)",
            }}
          >
            <p>Osbaldo Beahan</p>
            <p
              style={{
                color: "rgba(144, 144, 144, 1)",
                padding: "0 6px 0 6px",
                borderRadius: "16px",
                backgroundColor: "rgba(230, 232, 236, 1)",
                fontWeight: "normal",
              }}
            >
              Student
            </p>
            <p>liked your comment</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id neque
            mattis molestie eget phasellus tellus amet duis in.
          </p>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "400",
              color: "rgba(144, 144, 144, 1)",
            }}
          >
            about 1 hour ago
          </p>
          <hr style={{border: '1px solid rgba(230, 232, 236, 1)'}}/>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            paddingBottom: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "4px",
              fontSize: "14px",
              fontWeight: "500",
              color: "rgba(45, 45, 45, 1)",
            }}
          >
            <p>Osbaldo Beahan</p>
            <p
              style={{
                color: "rgba(144, 144, 144, 1)",
                padding: "0 6px 0 6px",
                borderRadius: "16px",
                backgroundColor: "rgba(230, 232, 236, 1)",
                fontWeight: "normal",
              }}
            >
              Student
            </p>
            <p>liked your comment</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id neque
            mattis molestie eget phasellus tellus amet duis in.
          </p>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "400",
              color: "rgba(144, 144, 144, 1)",
            }}
          >
            about 1 hour ago
          </p>
          <hr style={{border: '1px solid rgba(230, 232, 236, 1)'}}/>
        </div>
        <div style={{textAlign: 'center'}}>
        <Emptybtn content="Show all"/>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Notifications;
