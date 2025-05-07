import SideBar from "../../layouts/AdminSideBar";
import crUni from "../../assets/styles/СreateUniverisity.module.css";
import Select from "react-select";
import edit from "../../assets/icons/EditAdmin.svg";
import del from "../../assets/icons/EditAdmin.svg";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getUniversityById,
  updateUniversity,
  deleteUniversity
} from "../../services/universityService";

function ViewUniversity() {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const data = await getUniversityById(id);
        setUniversity(data);
        setFormData({
          logoUrl: data.logoUrl || "",
          name: data.name || "",
          location: data.location || "",
          description: data.description || "",
          contactPhoneNumber:
            data.faculty && data.faculty.length > 0
              ? data.faculty[0].facultyDto.contactPhoneNumber
              : "",
          website: data.website || "",
          dormitory: String(data.dormitory),
          militaryDepartment: String(data.militaryDepartment),
          contactEmail: data.contactEmail || "",
          baseCost: data.baseCost || "",
          militaryDepartmentCost: data.militaryDepartmentCost || "",
          dormitoryCost: data.dormitoryCost || "",
        });
      } catch (err) {
        setError("Failed to load university data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [id]);

  const options = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFormData((prev) => ({ ...prev, [name]: selectedOption ? selectedOption.value : "" }));
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => {
      if (!prev) {
        // Entering edit mode, populate formData with current university data
        setFormData({
          logoUrl: university.logoUrl || "",
          name: university.name || "",
          location: university.location || "",
          description: university.description || "",
          contactPhoneNumber:
            university.faculty && university.faculty.length > 0
              ? university.faculty[0].facultyDto.contactPhoneNumber
              : "",
          website: university.website || "",
          dormitory: String(university.dormitory),
          militaryDepartment: String(university.militaryDepartment),
          contactEmail: university.contactEmail || "",
          baseCost: university.baseCost || "",
          militaryDepartmentCost: university.militaryDepartmentCost || "",
          dormitoryCost: university.dormitoryCost || "",
        });
      }
      return !prev;
    });
  };

  const handleSave = async () => {
    try {
      // Prepare data to send, converting dormitory and militaryDepartment back to booleans
      const updatedData = {
        ...formData,
        dormitory: formData.dormitory === "true",
        militaryDepartment: formData.militaryDepartment === "true",
      };
      await updateUniversity(id, updatedData);
      const refreshedData = await getUniversityById(id);
      setUniversity(refreshedData);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update university data.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUniversity(id);
      window.location.href = "/admin/university-module"; 
    } catch (err) {
      setError("Failed to delete university.");
    }
  };

  if (loading) return <p>Loading university info...</p>;
  if (error) return <p>{error}</p>;
  if (!university) return <p>No university data found.</p>;

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
            <h1>View University</h1>
            <p>Create or edit university</p>
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            {!isEditing ? (
              <>
                <div className={crUni.editSaveBtn} onClick={handleEditToggle} style={{ cursor: "pointer" }}>
                  <img src={edit} alt="" />
                  <p>Edit</p>
                </div>
                <div className={crUni.editSaveBtn} onClick={handleDelete} style={{ cursor: "pointer" }}>
                  <img src={del} alt="" />
                  <p>Delete</p>
                </div>
              </>
            ) : (
              <div className={crUni.editSaveBtn} onClick={handleSave} style={{ cursor: "pointer" }}>
                <p>Save Changes</p>
              </div>
            )}
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
                id="logoUrl"
                placeholder="Logo Url"
                value={isEditing ? formData.logoUrl : university.logoUrl}
                onChange={isEditing ? handleInputChange : undefined}
                readOnly={!isEditing}
              />
            </div>
            <div className={crUni.uniInfoContainer}>
              <p>University Name</p>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="University Name"
                value={isEditing ? formData.name : university.name}
                onChange={isEditing ? handleInputChange : undefined}
                readOnly={!isEditing}
              />
            </div>
            <div className={crUni.uniInfoContainer}>
              <p>Location</p>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Location"
                value={isEditing ? formData.location : university.location}
                onChange={isEditing ? handleInputChange : undefined}
                readOnly={!isEditing}
              />
            </div>
            <div className={crUni.uniInfoContainer}>
              <p>Description</p>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                value={isEditing ? formData.description : university.description}
                onChange={isEditing ? handleInputChange : undefined}
                readOnly={!isEditing}
              />
            </div>
            <div className={crUni.uniInfoContainer}>
              <p>Phone Number</p>
              <input
                type="text"
                name="contactPhoneNumber"
                id="contactPhoneNumber"
                placeholder="Phone Number"
                value={isEditing ? formData.contactPhoneNumber : (university.faculty && university.faculty.length > 0 ? university.faculty[0].facultyDto.contactPhoneNumber : "N/A")}
                onChange={isEditing ? handleInputChange : undefined}
                readOnly={!isEditing}
              />
            </div>
            <div className={crUni.uniInfoContainer}>
              <p>Web Site Link</p>
              <input
                type="text"
                name="website"
                id="website"
                placeholder="Website"
                value={isEditing ? formData.website : university.website}
                onChange={isEditing ? handleInputChange : undefined}
                readOnly={!isEditing}
              />
            </div>
            <div className={crUni.SelectTheOptionscontainer}>
              <p>Dormitory</p>
              <Select
                options={options}
                placeholder="Dormitory"
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
                value={options.find(
                  (opt) => opt.value === (isEditing ? formData.dormitory : String(university.dormitory))
                )}
                isDisabled={!isEditing}
                name="dormitory"
                onChange={isEditing ? handleSelectChange : undefined}
              />{" "}
            </div>

            <div className={crUni.SelectTheOptionscontainer}>
              <p>Military department</p>
              <Select
                options={options}
                placeholder="Military Department"
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
                value={options.find(
                  (opt) => opt.value === (isEditing ? formData.militaryDepartment : String(university.militaryDepartment))
                )}
                isDisabled={!isEditing}
                name="militaryDepartment"
                onChange={isEditing ? handleSelectChange : undefined}
              />{" "}
            </div>

            <div className={crUni.uniInfoContainer}>
              <p>Contact e-mail</p>
              <input
                type="text"
                name="contactEmail"
                id="contactEmail"
                placeholder="Contact e-mail"
                value={isEditing ? formData.contactEmail : university.contactEmail || ""}
                onChange={isEditing ? handleInputChange : undefined}
                readOnly={!isEditing}
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
                    placeholder="Base-Cost Tuition"
                    value={isEditing ? formData.baseCost : university.baseCost}
                    onChange={isEditing ? handleInputChange : undefined}
                    readOnly={!isEditing}
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
                    placeholder="Military Department Cost"
                    value={isEditing ? formData.militaryDepartmentCost : (university.militaryDepartmentCost || "")}
                    onChange={isEditing ? handleInputChange : undefined}
                    readOnly={!isEditing}
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
                    placeholder="Dormitory Cost"
                    value={isEditing ? formData.dormitoryCost : university.dormitoryCost}
                    onChange={isEditing ? handleInputChange : undefined}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUniversity;
