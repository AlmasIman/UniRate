import { useState, useContext, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import api from "../../services/api";
import SideBar from "../../layouts/AdminSideBar";
import save from "../../assets/icons/saveadminicon.svg";
import crUni from "../../assets/styles/СreateUniverisity.module.css";
import Select from "react-select";
import { createForum, deleteByForumId, fetchForumById } from "../../services/forumService.js";
import { getAllUniversities } from "../../services/universityService.js";
import { useParams } from "react-router-dom";
import del from "../../assets/icons/EditAdmin.svg";

function ViewForum() {
  const { id } = useParams();
  const [universityOptions, setUniversityOptions] = useState([]);
  const [selectedUniversityId, setSelectedUniversityId] = useState(null);
  const [forum, setForum] = useState()
  const [error, setError] = useState(null);
  useEffect(() => {
    const getByForumID= async () => {
      try {
        const data = await fetchForumById(id);
        setForum(data);
      } catch (error) {
        setError("Failed to load forum data.");
      }
    }
    getByForumID()
  }, [id])

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const data = await getAllUniversities();
        const formattedOptions = data.map((uni) => ({
          value: uni.id,
          label: uni.name,
        }));
        setUniversityOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchUniversities();
  }, []);

  const options = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ];

  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logoUrl: "",
    universityId: "",
  });
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    if (!user) {
      alert("You must be logged in");
      return;
    }

    try {
      await deleteByForumId(id);
      alert("Forum deleted successfully");
      window.location.href = "/admin/forums";
    } catch (error) {
      console.error("Failed to delete forum", error);
      alert("Failed to delete forum");
    }
  };

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
      await createForum({
        name: formData.name,
        description: formData.description,
        universityId: selectedUniversityId,
        forumPicture: formData.logoUrl,
      });

      setSuccess(true);
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.error("Failed to create forum", error);
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
            <h1>Create Forum</h1>
          </div>

          <div
            className={crUni.saveBtn}
            onClick={handleDelete}
            style={{ cursor: "pointer" }}
          >
            <img src={del} alt="" />
            <p>Delete</p>
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
                placeholder={forum?.universityImgUrl || ""}
                disabled
              />
            </div>
            <div className={crUni.uniInfoContainer}>
              <p>Forum name</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={forum?.name || ""}
                disabled
              />
            </div>
            <div className={crUni.uniInfoContainer}>
              <p>Description</p>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={forum?.description || ""}
                disabled
              />
            </div>
            <div className={crUni.SelectTheOptionscontainer}>
              <p>University</p>
              <Select
                options={universityOptions}
                placeholder={
                  forum?.universityId
                    ? universityOptions.find((u) => u.value === forum.universityId)?.label
                    : "Select university"
                }
                onChange={(option) => setSelectedUniversityId(option.value)}
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
                isDisabled
              />{" "}
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

export default ViewForum;
