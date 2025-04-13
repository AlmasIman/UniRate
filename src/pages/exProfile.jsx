import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import profilePic from "../assets/img/profilepic.png";
import editIcon from "../assets/icons/edit.svg";
import prof from "../assets/styles/Profile.module.css";
import Button from "../components/Button";
import EmptyButton from "../components/EmptyBtn.jsx";
import Select from "react-select";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getCurrentUser,
  updateUserProfile,
  resetPassword,
} from "../services/authService.js";

function ExProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const categoryOptions = [
    { value: "student", label: "Student" },
    { value: "teacher", label: "Teacher" },
  ];
  const [showPopup, setShowPopup] = useState(false); 
  const [newPassword, setNewPassword] = useState(""); 
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    async function fetchUser() {
      const data = await getCurrentUser();
      if (data) {
        setUserData({
          id: data.id,
          username: data.username,
          password: "",
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          telephone: data.telephone,
          status: data.status,
          role: data.role,
        });
      }
    }
    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      await updateUserProfile(userData.id, userData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch {
      alert("Failed to update profile.");
    }
  };

  return (
    <>
      <Header />

      <div className={prof.personalInfoSection}>
        <div className={prof.box}>
          <h1 style={{ marginBottom: "32px" }}>Personal Info</h1>
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
            <p style={{ margin: "22px 0 32px 0" }}>Account info</p>
            <div className={prof.infoUpdateSection}>
              <div className={prof.inputBox}>
                <p>Full Name</p>
                <input
                  type="text"
                  className={prof.inputYourInfo}
                  placeholder="Full name"
                  name="fullName"
                  value={
                    userData
                      ? `${userData.firstName || ""} ${
                          userData.lastName || ""
                        }`.trim()
                      : ""
                  }
                  onChange={(e) => {
                    const fullName = e.target.value.trim();
                    const [firstName, ...rest] = fullName.split(" ");
                    const lastName = rest.join(" ");
                    setUserData({
                      ...userData,
                      firstName: firstName,
                      lastName: lastName,
                    });
                  }}
                  disabled={!isEditing}
                />
              </div>
              <div className={prof.inputBox}>
                <p>User name</p>
                <input
                  type="text"
                  className={prof.inputYourInfo}
                  placeholder="User name"
                  name="username"
                  value={userData?.username || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className={prof.inputBox}>
                <p>Email</p>
                <input
                  type="text"
                  className={prof.inputYourInfo}
                  placeholder="Email"
                  name="email"
                  value={userData?.email || ""}
                  disabled={true}
                />
              </div>
              <div className={prof.inputBox}>
                <p>Phone</p>
                <input
                  type="text"
                  className={prof.inputYourInfo}
                  placeholder="Phone"
                  name="phoneNumber"
                  value={userData?.telephone || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, telephone: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>
            <br />
            <div className={prof.inputBox}>
              <p>Category(student, teacher??)</p>
              <div className={`${prof.inputBox} ${prof.selectingthecat}`}>
                <Select
                  options={categoryOptions}
                  value={categoryOptions.find(
                    (option) => option.value === userData?.status?.toLowerCase()
                  )}
                  onChange={(selected) =>
                    setUserData({
                      ...userData,
                      status: selected.value.toUpperCase(),
                    })
                  }
                  placeholder="Select"
                  isDisabled={!isEditing}
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: "white",
                      border: "1px solid rgba(216, 216, 216, 1)",
                      fontSize: "16px",
                      padding: "5px",
                      width: "100%",
                      height: "60px",
                      borderRadius: "16px",
                    }),
                    option: (base, { isFocused }) => ({
                      ...base,
                      backgroundColor: isFocused
                        ? "rgba(20, 174, 130, 0.05)"
                        : "",
                      color: "black",
                      fontSize: "14px",
                    }),
                  }}
                />
              </div>
            </div>
          </div>
          <div className={prof.updBtns}>
            {!isEditing ? (
              <div onClick={() => setIsEditing(true)}>
                <Button content="Update Profile" />
              </div>
            ) : (
              <>
                <div onClick={handleSave}>
                  <Button content="Save Changes" />
                </div>
                <p className={prof.cancel} onClick={() => setIsEditing(false)}>
                  Cancel
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={prof.mainLoginandsecuritySection}>
        <div className={prof.box}>
          <h1 className={prof.h1Title}>Login and security</h1>
          <h2>Login</h2>
          <div className={prof.container}>
            <p>Password</p>
            <div onClick={() => setShowPopup(true)}>
              <EmptyButton content="Update password" />
            </div>
            {showPopup && (
              <div className={prof.popupOverlay}>
                <div className={prof.popupContent}>
                  <h3>Update Password</h3>
                  <input
                    type="password"
                    className={`${prof.inputYourInfo} ${prof.inputPassword}`}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <div className={prof.popupButtons}>
                    <div
                      onClick={async () => {
                        setLoading(true);
                        const result = await resetPassword(
                          userData.email,
                          newPassword
                        );
                        setLoading(false);
                        alert(result.message);
                        if (result.success) {
                          setShowPopup(false);
                          setNewPassword("");
                        }
                      }}
                    >
                      <Button content={loading ? "Updating..." : "Update"} />
                    </div>
                    <p
                      className={prof.cancel}
                      onClick={() => setShowPopup(false)}
                    >
                      Cancel
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <hr style={{ border: "1px solid rgba(230, 232, 236, 1)" }} />
        </div>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}

export default ExProfile;
