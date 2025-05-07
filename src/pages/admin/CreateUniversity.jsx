import { useState, useContext } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import api from "../../services/api";
import SideBar from "../../layouts/AdminSideBar";
import save from "../../assets/icons/saveadminicon.svg";
import crUni from "../../assets/styles/СreateUniverisity.module.css";
import Select from "react-select";
function CreateUniversity() {
  const options = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ];

  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    rating: 0,
    baseCost: 0,
    website: "",
    accreditation: "",
    contactEmail: "",
    logoUrl: "",
    ratingCount: 0,
    militaryDepartmentCost: 0,
    dormitoryCost: 0,
    militaryDepartment: false,
    dormitory: false,
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (field, selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOption.value === "true",
    }));
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("You must be logged in");
      return;
    }
    try {
      await api.post("/university/api/admin/university", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to add university", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(232, 233, 235, 1)",
      }}
    >
      <SideBar />

      <div className={crUni.mainContentDiv}>
        <div className={crUni.titleMainContainer}>
          <div className={crUni.pageTitle}>
            <h1>Create University</h1>
            <p>Create or edit university</p>
          </div>

          <div
            className={crUni.saveBtn}
            onClick={handleSubmit}
            style={{ cursor: "pointer" }}
          >
            <img src={save} alt="" />
            <p>Save Changes</p>
          </div>
        </div>

        <div className={crUni.CreateUniveContainer}>
          <h2 className={crUni.title}>University Details</h2>

          <div className={crUni.inputsContainer}>
            <div className={crUni.uniInfoContainer}>
              <p>Logo Url</p>
              <input
                type="text"
                name="logoUrl"
                value={formData.logoUrl}
                onChange={handleChange}
                placeholder="Logo Url"
              />
            </div>
            <div className={crUni.uniInfoContainer}>
              <p>University Name</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="University Name"
              />
            </div>
            <div className={crUni.uniInfoContainer}>
              <p>Location</p>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
              />
            </div>
            <div className={crUni.uniInfoContainer}>
              <p>Description</p>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
              />
            </div>
            <div className={crUni.uniInfoContainer}>
              <p>Phone Number</p>
              <input
                type="text"
                name="accreditation"
                value={formData.accreditation}
                onChange={handleChange}
                placeholder="+7778 959 23 42"
              />
            </div>
            <div className={crUni.uniInfoContainer}>
              <p>Web Site Link</p>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Web Site"
              />
            </div>
            <div className={crUni.SelectTheOptionscontainer}>
              <p>Dormitory</p>
              <Select
                options={options}
                placeholder="Dormitory"
                onChange={(option) => handleSelectChange("dormitory", option)}
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "white",
                    border: "1px solid rgba(216, 216, 216, 1)",
                    fontSize: "16px",
                    padding: "5px",
                    maxWidth: "350px",
                    width: "100%",
                    height: "60px",
                    borderRadius: "16px",
                  }),
                  option: (base, { isFocused }) => ({
                    ...base,
                    backgroundColor: isFocused
                      ? "rgba(20, 174, 130, 0.05)"
                      : "white",
                    color: "black",
                    fontSize: "14px",
                  }),
                }}
              />{" "}
            </div>

            <div className={crUni.SelectTheOptionscontainer}>
              <p>Military department</p>
              <Select
                options={options}
                placeholder="Militry Department"
                onChange={(option) =>
                  handleSelectChange("militaryDepartment", option)
                }
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "white",
                    border: "1px solid rgba(216, 216, 216, 1)",
                    fontSize: "16px",
                    padding: "5px",
                    maxWidth: "350px",
                    width: "100%",
                    height: "60px",
                    borderRadius: "16px",
                  }),
                  option: (base, { isFocused }) => ({
                    ...base,
                    backgroundColor: isFocused
                      ? "rgba(20, 174, 130, 0.05)"
                      : "white",
                    color: "black",
                    fontSize: "14px",
                  }),
                }}
              />{" "}
            </div>

            <div className={crUni.uniInfoContainer}>
              <p>Contact e-mail</p>
              <input
                type="text"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="example@gmail.com"
              />
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <h5>Fees and Commissions</h5>
          <br />

          <div>
            <div className={crUni.inputsContainer}>
              <div>
                <p>Base-Cost Tuition</p>
                <div className={crUni.inputGroup}>
                  <label className={crUni.currency}>KZT:</label>
                  <input
                    type="number"
                    className={crUni.input}
                    name="baseCost"
                    value={formData.baseCost}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <p>Military Department Cost</p>
                <div className={crUni.inputGroup}>
                  <label className={crUni.currency}>KZT:</label>
                  <input
                    type="number"
                    className={crUni.input}
                    name="militaryDepartmentCost"
                    value={formData.militaryDepartmentCost}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <p>Dormitory Cost</p>
                <div className={crUni.inputGroup}>
                  <label className={crUni.currency}>KZT:</label>
                  <input
                    type="number"
                    className={crUni.input}
                    name="dormitoryCost"
                    value={formData.dormitoryCost}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {success && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          }}
        >
          University successfully added!
        </div>
      )}
    </div>
  );
}

export default CreateUniversity;
