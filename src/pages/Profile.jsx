import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import profilePic from "../assets/img/profilepic.png";
import editIcon from "../assets/icons/edit.svg";
import prof from "../assets/styles/Profile.module.css";
import Button from "../components/Button";
import EmptyButton from "../components/EmptyBtn.jsx";
function Profile() {
  return (
    <>
      <Header />
      <div className={prof.personalInfoSection}>
        <div className={prof.box}>
          <h1 style={{marginBottom: "32px"}}>Personal Info</h1>
          <div className={prof.profPicBox}>
            <img
              src={profilePic}
              alt="profile Picture"
              className={prof.profilePic}
            />
            <div>
              <img src={editIcon} alt="icon" /> Change
            </div>
          </div>

          <div className={prof.acountinfoBox}>
            <p style={{margin: "22px 0 32px 0"}}>Account info</p>
            <div className={prof.infoUpdateSection}>
              <div className={prof.inputBox}>
                <p>Full Name</p>
                <input
                  type="text"
                  className={prof.inputYourInfo}
                  placeholder="Full name"
                />
              </div>
              <div className={prof.inputBox}>
                <p>User name</p>
                <input
                  type="text"
                  className={prof.inputYourInfo}
                  placeholder="User name"
                />
              </div>
              <div className={prof.inputBox}>
                <p>Email</p>
                <input
                  type="text"
                  className={prof.inputYourInfo}
                  placeholder="Email"
                />
              </div>
              <div className={prof.inputBox}>
                <p>Phone</p>
                <input
                  type="text"
                  className={prof.inputYourInfo}
                  placeholder="Phone"
                />
              </div>
              <div className={prof.inputBox}>
                <p>Category(student, teacher??)</p>
                <select
                  name="Category"
                  id="category-select"
                  className={prof.selectCategory}
                >
                  <option value="">Select</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            </div>
          </div>
          <div className={prof.updBtns}>
            <Button content="Update Profile" />
            <p className={prof.cancel}>Cancel</p>
          </div>
        </div>
      </div>
      
      <div className={prof.mainLoginandsecuritySection}>
        <div className={prof.box}>
          <h1 className={prof.h1Title}>Login and security</h1>
          <h2>Login</h2>
          <div className={prof.container}>
            <div>
              <p>Password</p>
              <p style={{ color: "rgba(144, 144, 144, 1)" }}>
                Last updated 1 month ago
              </p>
            </div>
            <EmptyButton content="Update password" />
          </div>
          <hr style={{ border: "1px solid rgba(230, 232, 236, 1)" }} />

          <h2>Device history</h2>

          <div className={prof.container}>
            <div className={prof.pcontainer}>
              <p>Password</p>
              <p style={{ color: "rgba(144, 144, 144, 1)" }}>
                Last updated 1 month ago
              </p>
            </div>
            <EmptyButton content="Log out device" />
          </div>
          <hr style={{ border: "1px solid rgba(230, 232, 236, 1)" }} />

          <div className={prof.container}>
            <div className={prof.pcontainer}>
              <p>Password</p>
              <p style={{ color: "rgba(144, 144, 144, 1)" }}>
                Last updated 1 month ago
              </p>
            </div>
            <EmptyButton content="Log out device" />
          </div>
          <hr style={{ border: "1px solid rgba(230, 232, 236, 1)" }} />

          <div className={prof.container}>
            <div className={prof.pcontainer}>
              <p>Session</p>
              <p style={{ color: "rgba(144, 144, 144, 1)" }}>
                May 14, 2021 at 08:36pm{" "}
              </p>
            </div>
            <EmptyButton content="Log out device" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
