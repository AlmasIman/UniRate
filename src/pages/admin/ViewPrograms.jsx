import SideBar from "../../layouts/AdminSideBar";
import save from "../../assets/icons/saveadminicon.svg";
import crUni from "../../assets/styles/СreateUniverisity.module.css";
import Select from "react-select";
import { createSpecialty } from "../../services/specialitites.js";
import React, { useEffect, useState } from "react";
import { getAllFaculties } from "../../services/facultiesService.js";
import { getAllUniversities } from "../../services/universityService.js";
import { useParams } from "react-router-dom";
import { getSpecialtyById, updateSpecialty, deleteSpecialty } from "../../services/specialitites.js";
import edit from "../../assets/icons/EditAdmin.svg";
import del from "../../assets/icons/EditAdmin.svg";

function ViewProgram() {
  const { id } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };
  const handleSave = async () => {
    try {
      await updateSpecialty(id, {
        id,
        name,
        description,
        facultyId,
        specialtyImageUrl,
        gopCode,
        grants,
        minScores,
        facultyName: "",
        universityName: "", 
      });
      setIsEditing(false);
      alert("Specialty successfully updated");
    } catch (error) {
      console.error("Error updating specialty:", error);
      alert("Failed to update specialty");
    }
  };
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this specialty?");
    if (!confirmDelete) return;

    try {
      await deleteSpecialty(id);
      alert("Specialty deleted successfully");
      window.location.href = "/admin/university-create-program";
    } catch (error) {
      console.error("Error deleting specialty:", error);
      alert("Failed to delete specialty");
    }
  };


  const [facultyOptions, setFacultyOptions] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [facultyId, setFacultyId] = useState(null);
  const [specialtyImageUrl, setSpecialtyImageUrl] = useState("");
  const [gopCode, setGopCode] = useState("");
  const [grants, setGrants] = useState("");
  const [minScores, setMinScores] = useState("");

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadFaculties = async () => {
      try {
        const data = await getAllFaculties();
        const universities = await getAllUniversities();
        const universityMap = {};
        universities.forEach((uni) => {
          universityMap[uni.id] = uni.name;
        });

        const options = data.map((faculty) => ({
          value: faculty.id,
          label: `${universityMap[faculty.universityId] || "Unknown University"} - Faculty ID: ${faculty.name}`,
        }));
        setFacultyOptions(options);
      } catch (error) {
        console.error("Error loading faculties:", error);
      }
    };

    loadFaculties();

    const loadSpecialty = async () => {
      try {
        const specialty = await getSpecialtyById(id);
        setName(specialty.name || "");
        setDescription(specialty.description || "");
        setFacultyId(specialty.facultyId || null);
        setSpecialtyImageUrl(specialty.specialtyImageUrl || "");
        setGopCode(specialty.gopCode || "");
        setGrants(specialty.grants || "");
        setMinScores(specialty.minScores || "");
      } catch (error) {
        console.error("Error loading specialty:", error);
      }
    };

    loadSpecialty();
  }, []);

  const handleCreateSpecialty = async () => {
    try {
      await createSpecialty({
        name,
        description,
        facultyId,
        specialtyImageUrl,
        gopCode,
        grants,
        minScores,
      });
      setSuccess(true);
      setTimeout(() => window.location.reload(), 2000)
    } catch (error) {
      console.error("Error creating specialty:", error);
      alert("Failed to create specialty");
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
            <h1>View Program</h1>
            <p>View or edit program</p>
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
          {/* <div className={crUni.saveBtn} onClick={handleCreateSpecialty}>
            <img src={save} alt="" />
            <p>Save Changes</p>
          </div> */}
        </div>

        <div className={crUni.CreateUniveContainer}>
          <h2 className={crUni.title}>Program Details</h2>

          <div className={crUni.inputsContainer}>
            <div className={crUni.uniInfoContainer}>
              <p>Program name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Program name"
                disabled={!isEditing}
              />
            </div>
            <div className={crUni.SelectTheOptionscontainer}>
              <p>Select Faculty</p>
              <Select
                options={facultyOptions}
                placeholder={facultyOptions}
                value={
                  facultyOptions.find(
                    (option) => option.value === facultyId
                  ) || null
                }
                onChange={(e) => setFacultyId(e.value)}
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "white",
                    border: "1px solid rgba(216, 216, 216, 1)",
                    fontSize: "16px",
                    padding: "5px",
                    maxWidth: "350px",
                    width: "100%",
                    height: "57px",
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
                isDisabled={!isEditing}
              />
            </div>
            <div className={crUni.uniInfoContainer}>
              <p>Specialty Image URL</p>
              <input
                type="text"
                value={specialtyImageUrl}
                onChange={(e) => setSpecialtyImageUrl(e.target.value)}
                placeholder="Specialty Image URL"
                disabled={!isEditing}
              />
            </div>

            <div className={crUni.uniInfoContainer}>
              <p>GOP Code</p>
              <input
                type="text"
                value={gopCode}
                onChange={(e) => setGopCode(e.target.value)}
                placeholder="GOP Code"
                disabled={!isEditing}
              />
            </div>

            <div className={crUni.uniInfoContainer}>
              <p>Grants</p>
              <input
                type="text"
                value={grants}
                onChange={(e) => setGrants(e.target.value)}
                placeholder="Grants"
                disabled={!isEditing}
              />
            </div>
            <div className={crUni.uniInfoContainer}>
              <p>Description</p>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                disabled={!isEditing}
              />
            </div>
            <div className={crUni.uniInfoContainer}>
              <p>Minimum Scores</p>
              <input
                className={crUni.input}
                placeholder="0.00"
                value={minScores}
                onChange={(e) => setMinScores(e.target.value)}
                type="text"
                disabled={!isEditing}
              />
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
          Speciality successfully added!
        </div>
      )}

    </div>
  );
}

export default ViewProgram;
