import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import profilePic from "../assets/img/profilepic.png";
import editIcon from "../assets/icons/edit.svg";
import prof from "../assets/styles/Profile.module.css";
import Button from "../components/Button";
import EmptyButton from "../components/EmptyBtn.jsx";
import Select from "react-select";

import { useEffect, useState } from "react";
import {
  getCurrentUser,
  updateUserProfile,
  updateUserPassword,
} from "../services/authService.js";

function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    category: "",
  });
  const [originalData, setOriginalData] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Состояние для popup-а
  const [newPassword, setNewPassword] = useState(""); // Состояние для нового пароля
  const [loading, setLoading] = useState(false); // Состояние загрузки

  const categoryOptions = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "USER" },
    { value: "employee", label: "Employee" },
  ];

  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUser();
      if (userData) {
        setUser(userData);
        setFormData({
          fullName: userData.fullName || "",
          username: userData.username || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
          category: userData.category || "",
        });
        setOriginalData({
          fullName: userData.fullName || "",
          username: userData.username || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
          category: userData.category || "",
        });
      }
      setLoading(false);
    }

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption.value });
  };

  const handleUpdate = async () => {
    if (!user) return;

    const updatedUser = await updateUserProfile(user.id, formData);
    if (updatedUser) {
      setUser(updatedUser);
      setOriginalData(updatedUser);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  const handlePasswordUpdate = async () => {
    if (!newPassword) {
      alert("Введите новый пароль!");
      return;
    }

    setLoading(true);
    const result = await updateUserPassword(user.username, newPassword);
    setLoading(false);

    if (result.success) {
      alert(result.message);
      setShowPopup(false);
      setNewPassword("");
    } else {
      alert(result.message);
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
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className={prof.inputBox}>
                <p>User name</p>
                <input
                  type="text"
                  className={prof.inputYourInfo}
                  placeholder="User name"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className={prof.inputBox}>
                <p>Email</p>
                <input
                  type="text"
                  className={prof.inputYourInfo}
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className={prof.inputBox}>
                <p>Phone</p>
                <input
                  type="text"
                  className={prof.inputYourInfo}
                  placeholder="Phone"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className={prof.inputBox}>
                <p>Category(student, teacher??)</p>
                <Select
                  options={categoryOptions}
                  value={categoryOptions.find(
                    (option) => option.value === formData.category
                  )}
                  onChange={handleCategoryChange}
                  placeholder="Select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: "white",
                      border: "1px solid rgba(216, 216, 216, 1)",
                      fontSize: "16px",
                      padding: "5px",
                      width: "1060px",
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
            <div onClick={handleUpdate}>
              <Button content="Update Profile" />
            </div>
            <p className={prof.cancel} onClick={handleCancel}>
              Cancel
            </p>
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
            <div onClick={() => setShowPopup(true)}>
              <EmptyButton content="Update password" />
            </div>
            {/* Popup окно */}
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
                    <div onClick={handlePasswordUpdate}>
                      <Button
                        content={loading ? "Updating..." : "Update"}
                        disabled={loading}
                      />
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
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}

export default Profile;
