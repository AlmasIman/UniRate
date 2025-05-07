import SideBar from "../../layouts/AdminSideBar";
import save from "../../assets/icons/saveadminicon.svg";
import crUni from "../../assets/styles/СreateUniverisity.module.css";
import Select from "react-select";
import { createFaculty } from "../../services/facultiesService.js";
import React, { useEffect, useState } from "react";
import { getAllUniversities } from "../../services/universityService";

function CreateFaculty() {
  const options = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ];
  const [universityOptions, setUniversityOptions] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [baseCost, setBaseCost] = useState("");
  const [universityId, setUniversityId] = useState(null);
  const [commonNameValue, setCommonNameValue] = useState(null);

  const [success, setSuccess] = useState(false);

  const commonName = [
    { value: "COMPUTER_SCIENCE", label: "Computer Science" },
    { value: "BUSINESS_SCHOOL", label: "Business School" },
    { value: "EDUCATION", label: "Education" },
    { value: "LAW", label: "Law" },
    { value: "JOURNALISM", label: "Journalism" },
    { value: "ENGINEERING", label: "Engineering" },
    { value: "NATURAL_SCIENCES", label: "Natural Sciences" },
    { value: "ARTS", label: "Arts" },
    { value: "MEDICINE", label: "Medicine" },
    { value: "SOCIAL_SCIENCES", label: "Social Sciences" },
  ];

  useEffect(() => {
    const loadUniversities = async () => {
      try {
        const data = await getAllUniversities();
        const options = data.map((univ) => ({
          value: univ.id,
          label: univ.name,
        }));
        setUniversityOptions(options);
      } catch (error) {
        console.error("Error loading universities:", error);
      }
    };

    loadUniversities();
  }, []);

  const handleSave = async () => {
    try {
      await createFaculty({
        name,
        description,
        contactEmail,
        contactPhoneNumber,
        baseCost: parseFloat(baseCost),
        universityId,
        commonName: commonNameValue,
      });
      setSuccess(true);
      setTimeout(() => window.location.reload(), 2000)
    } catch (error) {
      console.error("Failed to create faculty:", error);
      alert("Error creating faculty.");
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
            <h1>Create Faculty</h1>
            <p>Create or edit program</p>
          </div>

          <div className={crUni.saveBtn} onClick={handleSave}>
            <img src={save} alt="" />
            <p>Save Changes</p>
          </div>
        </div>

        <div className={crUni.CreateUniveContainer}>
          <h2 className={crUni.title}>Faculty Details</h2>

          <div className={crUni.inputsContainer}>
            <div className={crUni.uniInfoContainer}>
              <p>Faculty name</p>
              <input type="text" placeholder="Faculty name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={crUni.SelectTheOptionscontainer}>
              <p>Select University</p>
              <Select
                options={universityOptions}
                value={universityOptions.find(opt => opt.value === universityId)}
                onChange={(selected) => setUniversityId(selected.value)}
                placeholder="Select University"
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
              />
            </div>
            <div className={crUni.uniInfoContainer}>
              <p>Phone Number</p>
              <input type="text" placeholder="+7778 959 23 42" value={contactPhoneNumber} onChange={(e) => setContactPhoneNumber(e.target.value)} />
            </div>

            <div className={crUni.uniInfoContainer}>
              <p>Contact e-mail</p>
              <input
                type="text"
                placeholder="example@gmail.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            <div className={crUni.SelectTheOptionscontainer}>
              <p>Common Name</p>
              <Select
                options={commonName}
                value={commonName.find(opt => opt.value === commonNameValue)}
                onChange={(selected) => setCommonNameValue(selected.value)}
                placeholder="Common Name"
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
              />{" "}
            </div>
            <div className={crUni.uniInfoContainer}>
              <p>Description</p>
              <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
              <p>Tuition Fees</p>
              <div className={crUni.inputGroup}>
                <label className={crUni.currency}>KZT:</label>
                <input
                  type="number"
                  className={crUni.input}
                  placeholder="0.00"
                  value={baseCost}
                  onChange={(e) => setBaseCost(e.target.value)}
                />
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

export default CreateFaculty;
