import Header from "../layouts/Header.jsx";
import Footer from "../layouts/Footer.jsx";
import favstyle from "../assets/styles/favouriteUni.module.css";
import Button from "../components/Button.jsx";
import FavouriteUniCarusel from "../components/FavouriteUniversitiesListCarousel.jsx";
import React, { useState } from "react";
import Select from "react-select";
import messageQuest from "../assets/icons/message-question.svg";
import trash from "../assets/icons/trash.svg";
const universities = [
  {
    value: "nazarbaev",
    label: "Nazarbaev University",
    faculties: [
      { name: "Engineering", expenses: 30000 },
      { name: "Computer Science", expenses: 28000 },
      { name: "Business", expenses: 32000 },
    ],
    dormitory: "Yes",
    militaryEducation: "No",
    rating: 5.0,
  },
  {
    value: "sdu",
    label: "Suleimen Demirel University",
    faculties: [
      { name: "Engineering", expenses: 12000 },
      { name: "Computer Science", expenses: 10000 },
      { name: "Business", expenses: 11000 },
    ],
    dormitory: "Yes",
    militaryEducation: "No",
    rating: 4.0,
  },
  {
    value: "kbu",
    label: "Kazakh British University",
    faculties: [
      { name: "Engineering", expenses: 15000 },
      { name: "Computer Science", expenses: 14000 },
      { name: "Business", expenses: 16000 },
    ],
    dormitory: "No",
    militaryEducation: "Yes",
    rating: 3.4,
  },
];

function FavouriteUniversities() {
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [selectedFaculties, setSelectedFaculties] = useState([]);
  const [isOn, setIsOn] = useState(false);

  const universityOptions = universities.map((uni) => ({
    value: uni.value,
    label: uni.label,
  }));

  const selectedUniObjects = universities.filter((uni) =>
    selectedUniversities.some((selected) => selected.value === uni.value)
  );

  const facultyOptions = Array.from(
    new Set(
      selectedUniObjects.flatMap((uni) =>
        uni.faculties.map((faculty) => faculty.name)
      )
    )
  ).map((name) => ({ value: name, label: name }));

  const handleApplyFilters = () => {
    const appliedFaculties = selectedFaculties.length
      ? selectedFaculties.map((fac) => fac.value)
      : facultyOptions.map((fac) => fac.value);

    console.log("Selected Universities:", selectedUniversities);
    console.log("Selected Faculties:", appliedFaculties);
  };

  return (
    <>
      <Header />
      <div className={favstyle.mainFavDiv}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 className={favstyle.titlePage}>Selected universities</h3>
          <Button content="Compare" />
        </div>
        <FavouriteUniCarusel />
        <div className={favstyle.filtersForComparDiv}>
          <div className={favstyle.mainDivForSelectingUni}>
            <h4>Filters</h4>
            <div className={favstyle.selecting}>
              <p>Select universities for comparison</p>
              <Select
                isMulti
                options={universityOptions}
                value={selectedUniversities}
                onChange={(selected) =>
                  setSelectedUniversities(selected.slice(0, 4))
                }
                className="mb-4"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "white",
                    border: "1px solid rgba(216, 216, 216, 1)",
                    fontSize: "16px",
                    padding: "5px",
                    height: "60px",
                    borderRadius: "16px",
                    width: "100%",
                  }),
                  option: (base, { isFocused }) => ({
                    ...base,
                    backgroundColor: isFocused
                      ? "rgba(20, 174, 130, 0.05)"
                      : "white",
                    fontSize: "14px",
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: "rgba(229, 244, 242, 1)",
                    borderRadius: "5px",
                    padding: "2px 6px",
                    alignItems: "center",
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: "rgba(45, 45, 45, 1)",
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    color: "rgba(0, 147, 121, 1)",
                    border: "1.5px solid rgba(0, 147, 121, 1)",
                    width: "20px",
                    height: "20px",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#007965",
                      color: "#fff",
                    },
                  }),
                }}
              />
            </div>
            <div className={favstyle.selecting}>
              <p>Select faculties for comparison</p>
              <Select
                isMulti
                options={facultyOptions}
                value={selectedFaculties}
                onChange={setSelectedFaculties}
                className="mb-4"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "white",
                    border: "1px solid rgba(216, 216, 216, 1)",
                    fontSize: "16px",
                    padding: "5px",
                    height: "60px",
                    borderRadius: "16px",
                    width: "100%",
                  }),
                  option: (base, { isFocused }) => ({
                    ...base,
                    backgroundColor: isFocused
                      ? "rgba(20, 174, 130, 0.05)"
                      : "white",
                    fontSize: "14px",
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: "rgba(229, 244, 242, 1)",
                    borderRadius: "5px",
                    padding: "2px 6px",
                    alignItems: "center",
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: "rgba(45, 45, 45, 1)",
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    color: "rgba(0, 147, 121, 1)",
                    border: "1.5px solid rgba(0, 147, 121, 1)",
                    width: "20px",
                    height: "20px",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#007965",
                      color: "#fff",
                    },
                  }),
                }}
              />
            </div>
          </div>
          <div onClick={handleApplyFilters}>
            <Button content="Apply Filters" />
          </div>
        </div>

        <div className={favstyle.comparisonResult}>
          <div
            style={{
              width: "96%",
              margin: "auto",
              display: "flex",
              gap: "16px",
              flexDirection: "column",
            }}
          >
            <h4>Program selection</h4>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <label className={favstyle.switch}>
                  <input
                    type="checkbox"
                    checked={isOn}
                    onChange={() => setIsOn(!isOn)}
                  />
                  <span className={favstyle.slider}></span>
                </label>
                <p>Show only differences</p>
              </div>
              <div
                style={{
                  fontWeight: "600",
                  color: "rgba(0, 147, 121, 1)",
                  alignItems: "center",
                  display: "flex",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <img src={trash} alt="" /> <p>Clear list</p>
              </div>
            </div>
          </div>
          <div className={favstyle.comparisonTable}>
            <div className={favstyle.universities}>
              <div className={favstyle.uniTit}>Universities</div>
              <div className={`${favstyle.uniTit} ${favstyle.uniName}`}>
                <p>SDU</p>
              </div>
              <div className={`${favstyle.uniTit} ${favstyle.uniName}`}>
                <p>NU</p>
              </div>
              <div className={`${favstyle.uniTit} ${favstyle.uniName}`}>
                <p>KBTU</p>
              </div>
            </div>
            <div className={favstyle.uniContentDiv}>
              <div className={favstyle.rateNa}>Rating</div>
              <div className={favstyle.uniContent}>
                <p>4.0</p>
              </div>
              <div className={favstyle.uniContent}>
                <p>5.0</p>
              </div>
              <div className={favstyle.uniContent}>
                <p>3.4</p>
              </div>
            </div>
            <div className={favstyle.uniContentDiv}>
              <div
                className={favstyle.rateNa}
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <p>Expences ~</p>
                <img src={messageQuest} alt="" />
              </div>
              <div className={favstyle.uniContent}>
                <p>1.200.000</p>
              </div>
              <div className={favstyle.uniContent}>
                <p>1.200.000</p>
              </div>
              <div className={favstyle.uniContent}>
                <p>1.200.000</p>
              </div>
            </div>
            <div className={favstyle.uniContentDiv}>
              <div className={favstyle.rateNa}>Dormitory</div>
              <div className={favstyle.uniContent}>
                <p>Yes</p>
              </div>
              <div className={favstyle.uniContent}>
                <p>Yes</p>
              </div>
              <div className={favstyle.uniContent}>
                <p>Yes</p>
              </div>
            </div>
            <div className={favstyle.uniContentDiv}>
              <div className={favstyle.rateNa}>Military education</div>
              <div className={favstyle.uniContent}>
                <p>No</p>
              </div>
              <div className={favstyle.uniContent}>
                <p>No</p>
              </div>
              <div className={favstyle.uniContent}>
                <p>Yes</p>
              </div>
            </div>
            <div className={favstyle.uniContentDiv}>
              <div className={favstyle.rateNa} style={{ margin: "auto" }}>
                Faculty
              </div>
              <div
                className={`${favstyle.uniContent} ${favstyle.facultiesDiv}`}
              >
                <p className={favstyle.facultiesP}>
                  Engineering and Natural Sciences
                </p>
                <p className={favstyle.facultiesP}>Business School</p>
                <p className={favstyle.facultiesP}>Education and humanities</p>
                <p className={favstyle.facultiesP}>Law and Social Sciences</p>
              </div>
              <div
                className={`${favstyle.uniContent} ${favstyle.facultiesDiv}`}
              >
                <p className={favstyle.facultiesP}>
                  Engineering and Natural Sciences
                </p>
                <p className={favstyle.facultiesP}>Business School</p>
                <p className={favstyle.facultiesP}>Education and humanities</p>
                <p className={favstyle.facultiesP}>Law and Social Sciences</p>
              </div>
              <div
                className={`${favstyle.uniContent} ${favstyle.facultiesDiv}`}
              >
                <p className={favstyle.facultiesP}>
                  Engineering and Natural Sciences
                </p>
                <p className={favstyle.facultiesP}>Business School</p>
                <p className={favstyle.facultiesP}>Education and humanities</p>
                <p className={favstyle.facultiesP}>Law and Social Sciences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default FavouriteUniversities;

{
  /* <Select
isMulti
options={universities}
value={selectedUniversities}
onChange={setSelectedUniversities}
className="mb-4"
styles={{
  control: (base) => ({
    ...base,
    backgroundColor: "white",
    border: "1px solid rgba(216, 216, 216, 1)",
    fontSize: "16px",
    padding: "5px",
    height: "60px",
    borderRadius: "16px",
    width: "100%",
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused
      ? "rgba(20, 174, 130, 0.05)"
      : "white",
    fontSize: "14px",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "rgba(229, 244, 242, 1)",
    borderRadius: "5px",
    padding: "2px 6px",
    alignItems: "center",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "rgba(45, 45, 45, 1)",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "rgba(0, 147, 121, 1)",
    border: "1.5px solid rgba(0, 147, 121, 1)",
    width: "20px",
    height: "20px",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#007965",
      color: "#fff",
    },
  }),
}}
/> */
}

{
  /* <Select
isMulti
options={faculties}
value={selectedFaculties}
onChange={setSelectedFaculties}
className="mb-4"
styles={{
  control: (base) => ({
    ...base,
    backgroundColor: "white",
    border: "1px solid rgba(216, 216, 216, 1)",
    fontSize: "16px",
    padding: "5px",
    height: "60px",
    borderRadius: "16px",
    width: "100%",
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused
      ? "rgba(20, 174, 130, 0.05)"
      : "white",
    fontSize: "14px",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "rgba(229, 244, 242, 1)",
    borderRadius: "5px",
    padding: "2px 6px",
    alignItems: "center",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "rgba(45, 45, 45, 1)",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "rgba(0, 147, 121, 1)",
    border: "1.5px solid rgba(0, 147, 121, 1)",
    width: "20px",
    height: "20px",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#007965",
      color: "#fff",
    },
  }),
}}
/> */
}
