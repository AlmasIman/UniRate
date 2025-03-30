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
    value: "kbtu",
    label: "kbtu",
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
  const [error, setError] = useState("");
  const [facultyEnabled, setFacultyEnabled] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleClearList = () => {
    setSelectedUniversities([]);
    setSelectedFaculties([]);
    setFacultyEnabled(false);
    setIsFiltered(false);
  };

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

  const handleUniversityChange = (selected) => {
    if (selected.length < 2 || selected.length > 4) {
      setError("You can only add from 2 to 4 universities at once");
      setFacultyEnabled(false);
    } else {
      setError("");
      setFacultyEnabled(true);
    }
    setSelectedUniversities(selected.slice(0, 4));
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
                onChange={handleUniversityChange}
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
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <div className={favstyle.selecting}>
              <p>Select faculties for comparison</p>
              <Select
                isMulti
                options={facultyOptions}
                value={selectedFaculties}
                onChange={setSelectedFaculties}
                isDisabled={!facultyEnabled}
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
          <div onClick={() => setIsFiltered(true)}>
            <Button content="Apply Filters" />
          </div>
        </div>
        <div className={favstyle.comparisonResult}>
          <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
            Program selection
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "16px",
                fontWeight: "400",
                color: "rgba(24, 33, 53, 1)",
              }}
            >
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
                display: "flex",
                gap: "8px",
                alignItems: "center",
                color: "rgba(0, 147, 121, 1)",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
              onClick={handleClearList} // Привязываем функцию очистки
            >
              <img src={trash} alt="" />
              <p>Clear List</p>
            </div>
          </div>
          <div className={favstyle.comparisonTable}>
            {/* Заголовок таблицы */}
            <div className={favstyle.universities}>
              <div className={favstyle.uniTit}>Universities</div>
              {selectedUniversities.map((uni) => (
                <div
                  key={uni.value}
                  className={`${favstyle.uniTit} ${favstyle.uniName}`}
                >
                  <p>{uni.label}</p>
                </div>
              ))}
            </div>

            {/* Рейтинг */}
            <div className={favstyle.uniContentDiv}>
              <div className={favstyle.rateNa}>Rating</div>
              {selectedUniversities.map((uni) => (
                <div key={uni.value} className={favstyle.uniContent}>
                  <p>
                    {isFiltered
                      ? universities.find((u) => u.value === uni.value)?.rating
                      : "-"}
                  </p>
                </div>
              ))}
            </div>

            {/* Расходы */}
            <div className={favstyle.uniContentDiv}>
              <div
                className={favstyle.rateNa}
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <p>Expenses ~</p>
                <img src={messageQuest} alt="" />
              </div>
              {selectedUniversities.map((uni) => {
                const uniData = universities.find((u) => u.value === uni.value);

                if (!uniData) return null;

                // Отбираем только выбранные факультеты
                const selectedFacultyExpenses = uniData.faculties
                  .filter((faculty) =>
                    selectedFaculties.some(
                      (selected) => selected.value === faculty.name
                    )
                  )
                  .map((faculty) => faculty.expenses);

                // Вычисляем средние расходы для выбранных факультетов
                const avgExpenses =
                  selectedFacultyExpenses.length > 0
                    ? Math.round(
                        selectedFacultyExpenses.reduce(
                          (acc, expense) => acc + expense,
                          0
                        ) / selectedFacultyExpenses.length
                      )
                    : 0;

                return (
                  <div key={uni.value} className={favstyle.uniContent}>
                    <p>
                      {isFiltered && avgExpenses > 0
                        ? `${avgExpenses.toLocaleString()} ₸`
                        : "-"}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Общежитие */}
            <div className={favstyle.uniContentDiv}>
              <div className={favstyle.rateNa}>Dormitory</div>
              {selectedUniversities.map((uni) => (
                <div key={uni.value} className={favstyle.uniContent}>
                  <p>
                    {isFiltered
                      ? universities.find((u) => u.value === uni.value)
                          ?.dormitory
                      : "-"}
                  </p>
                </div>
              ))}
            </div>

            {/* Военное образование */}
            <div className={favstyle.uniContentDiv}>
              <div className={favstyle.rateNa}>Military education</div>
              {selectedUniversities.map((uni) => (
                <div key={uni.value} className={favstyle.uniContent}>
                  <p>
                    {isFiltered
                      ? universities.find((u) => u.value === uni.value)
                          ?.militaryEducation
                      : "-"}
                  </p>
                </div>
              ))}
            </div>

            {/* Факультеты */}
            <div className={favstyle.uniContentDiv}>
              <div className={favstyle.rateNa}>Faculty</div>
              {selectedUniversities.map((uni) => {
                const uniData = universities.find((u) => u.value === uni.value);

                // Фильтруем выбранные факультеты по данному университету
                const faculties = uniData.faculties
                  .filter((faculty) =>
                    selectedFaculties.some(
                      (selected) => selected.value === faculty.name
                    )
                  )
                  .map((faculty) => faculty.name);

                return (
                  <div
                    key={uni.value}
                    className={`${favstyle.uniContent} ${favstyle.facultiesDiv}`}
                  >
                    {isFiltered && faculties.length > 0 ? (
                      faculties.map((facultyName) => (
                        <p key={facultyName} className={favstyle.facultiesP}>
                          {facultyName}
                        </p>
                      ))
                    ) : (
                      <p className={favstyle.facultiesP}>-</p>
                    )}
                  </div>
                );
              })}
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
