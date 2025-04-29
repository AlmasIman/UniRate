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
  updateUserAvatar,
} from "../services/authService.js";

import Success from "../layouts/SuccessAlert.jsx";
import Error from "../layouts/ErrorAlert.jsx";
import Warning from "../layouts/WarningAlert.jsx";

function ExProfile() {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(profilePic);

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const categoryOptions = [
    { value: "STUDENT", label: "Student" },
    { value: "APPLICANT", label: "Applicant" },
    { value: "EMPLOYEE", label: "Employee" },
  ];
  const [showPopup, setShowPopup] = useState(false); // Состояние для popup-а
  const [showPopupAvatar, setshowPopupAvatar] = useState(false); // Состояние для popup-а
  const [newPassword, setNewPassword] = useState(""); // Состояние для нового пароля
  const [loading, setLoading] = useState(false); // Состояние загрузки

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const avatars = [
    "https://i.postimg.cc/5X9hQqf2/10avatar.png",
    "https://i.postimg.cc/Ny5Zps9h/11avatar.png",
    "https://i.postimg.cc/JHWgrjTm/12avatar.png",
    "https://i.postimg.cc/5HTTrhLX/13avatar.png",
    "https://i.postimg.cc/z3n6dPBf/14avatar.png",
    "https://i.postimg.cc/7GzdrKnm/15avatar.png",
    "https://i.postimg.cc/rRCHKzb4/16avatar.png",
    "https://i.postimg.cc/f3PQNtnT/2avatar.png",
    "https://i.postimg.cc/S2zFNSkL/3avatar.png",
    "https://i.postimg.cc/GTw04WmW/4avatar.png",
    "https://i.postimg.cc/9wG6ZL4r/5avatar.png",
    "https://i.postimg.cc/3Wm5sxLY/6avatar.png",
    "https://i.postimg.cc/vcyFbwj9/7avatar.png",
    "https://i.postimg.cc/gnK90BF7/8avatar.png",
    "https://i.postimg.cc/mPd0YzrN/9avatar.png",
  ];

  const handleUpdateAvatar = async () => {
    if (!selectedAvatar) {
      setWarningMessage("Please select an avatar first.");
      return;
    }

    setLoading(true);
    try {
      await updateUserAvatar(userData.id, selectedAvatar);
      setUserData((prev) => ({
        ...prev,
        userProfileImageUrl: selectedAvatar,
      }));
      setSuccessMessage("Profile picture updated successfully!");
      setshowPopupAvatar(false);
    } catch (error) {
      console.error("Failed to update avatar:", error);
      setErrorMessage("Failed to update avatar.Please try again!");
    } finally {
      setLoading(false);
    }
  };

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
          userProfileImageUrl: data.userProfileImageUrl,
        });
      }
    }
    fetchUser();
  }, []);
  useEffect(() => {
    if (userData?.userProfileImageUrl) {
      const img = new Image();
      img.src = userData.userProfileImageUrl;
      img.onload = () => setImgSrc(userData.userProfileImageUrl);
    }
  }, [userData]);

  const handleSave = async () => {
    try {
      await updateUserProfile(userData.id, {
        password: userData.password,
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        telephone: userData.telephone,
        status: userData.status,
        userProfileImageUrl: userData.userProfileImageUrl,
      });
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
    } catch {
      setErrorMessage("Failed to update profile.");
    }
  };

  return (
    <>
      {successMessage && (
        <Success
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}{" "}
      {errorMessage && (
        <Error message={errorMessage} onClose={() => setErrorMessage("")} />
      )}{" "}
      {warningMessage && (
        <Warning
          message={warningMessage}
          onClose={() => setWarningMessage("")}
        />
      )}
      <Header />
      <div className={prof.personalInfoSection}>
        <div className={prof.box}>
          <h1 style={{ marginBottom: "32px" }}>Personal Info</h1>
          <div className={prof.profPicBox}>
            <div className={prof.profileImgWrapper}>
              {!isImgLoaded && (
                <div className={prof.imgSkeleton}>Loading...</div>
              )}

              <img
                src={imgSrc}
                alt="profile Picture"
                className={`${prof.profilePic} ${
                  isImgLoaded ? "" : prof.hidden
                }`}
                onLoad={() => setIsImgLoaded(true)}
              />
            </div>
            <div
              onClick={() => setshowPopupAvatar(true)}
              style={{ cursor: "pointer" }}
            >
              <img src={editIcon} alt="icon" /> Change
            </div>
          </div>
          {showPopupAvatar && (
            <div>
              <div className={prof.setAvatarDiv}>
                <div className={prof.setAvatarContent}>
                  <h3>Choose your profile picture</h3>
                  <div className={prof.avatarsPick}>
                    {avatars.map((avatar, index) => (
                      <img
                        key={index}
                        src={avatar}
                        alt={`Avatar ${index}`}
                        onClick={() => setSelectedAvatar(avatar)}
                        style={{
                          border:
                            selectedAvatar === avatar
                              ? "3px solid blue"
                              : "1px solid gray",
                          borderRadius: "50%",
                          width: "80px",
                          height: "80px",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <div onClick={handleUpdateAvatar}>
                      <Button content={loading ? "Updating..." : "Update"} />
                    </div>
                    <p
                      className={prof.cancelForAvatar}
                      onClick={() => setshowPopupAvatar(false)}
                    >
                      Cancel
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                  placeholder={
                    !userData || userData.status === null
                      ? "Select category"
                      : userData.status
                  }
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
