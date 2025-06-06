import Header from "../layouts/Header.jsx";
import Footer from "../layouts/Footer.jsx";
import favstyle from "../assets/styles/favouriteUni.module.css";
import Button from "../components/Button.jsx";
import FavouriteUniCarusel from "../components/FavouriteUniversitiesListCarousel.jsx";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import messageQuest from "../assets/icons/message-question.svg";
import trash from "../assets/icons/trash.svg";
import { getCurrentUser } from "../services/authService.js";
import { fetchFavourites } from "../services/favouriteService.js";


function FavuniExample() {
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [selectedFaculties, setSelectedFaculties] = useState([]);
  const [error, setError] = useState("");
  const [facultyEnabled, setFacultyEnabled] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userRes = await getCurrentUser();
        if (!userRes) return;

        const userId = userRes.id;

        const favRes = await fetchFavourites(userId);
        const favData = favRes;

        const universityOptions = favData.map((uni) => ({
          value: uni.universityId,
          label: uni.name,
          faculties: uni.faculty || [],
          rating: uni.rating || 0,
          baseCost: uni.baseCost || 0,
          dormitory: uni.dormitory || false,
          militaryDepartment: uni.militaryDepartment || false,
          logoUrl: uni.logoUrl || "",
          location: uni.location || "",
        }));
        setUniversities(universityOptions);
      } catch (err) {
        console.error("Ошибка при получении данных", err);
      }
    };

    fetchFavorites();
  }, []);

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

  const allFaculties = selectedUniObjects.flatMap((uni) =>
    uni.faculties.map((faculty) => ({
      name: faculty.name,
      commonName: faculty.commonName,
    }))
  );

  const facultyGroups = allFaculties.reduce((acc, { name, commonName }) => {
    acc[commonName] = acc[commonName] || new Set();
    acc[commonName].add(name);
    return acc;
  }, {});

  const facultyCounts = selectedUniObjects.reduce((acc, uni) => {
    uni.faculties.forEach((faculty) => {
      acc[faculty.commonName] = (acc[faculty.commonName] || 0) + 1;
    });
    return acc;
  }, {});

  const sharedFacultyOptions = Object.entries(facultyGroups)
    .filter(([commonName]) => facultyCounts[commonName] === selectedUniObjects.length)
    .map(([commonName, namesSet]) => ({
      value: commonName,
      label: Array.from(namesSet)[0] || commonName,
    }));

  const facultyOptions = sharedFacultyOptions;

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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
              Program selection
            </h3>

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
              onClick={handleClearList} 
            >
              <img src={trash} alt="" />
              <p>Clear List</p>
            </div>
          </div>
          <div className={favstyle.comparisonTable}>
            {/* Заголовок таблицы */}
            <div className={favstyle.universities}>
              <div className={favstyle.uniTit}>Universities</div>
              {selectedUniversities.length === 0
                ? Array(4).fill(null).map((_, idx) => (
                    <div key={idx} className={`${favstyle.uniTit} ${favstyle.uniName}`}>
                      <div className={favstyle.skeletonBox}></div>
                    </div>
                  ))
                : selectedUniversities.map((uni) => (
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
              {(selectedUniversities.length === 0 || !isFiltered)
                ? selectedUniversities.length === 0
                  ? Array(4).fill(null).map((_, idx) => (
                      <div key={idx} className={favstyle.uniContent}>
                        <div className={favstyle.skeletonBox}></div>
                      </div>
                    ))
                  : selectedUniversities.map((uni) => (
                    <div key={uni.value} className={favstyle.uniContent}>
                      <div className={favstyle.skeletonBox}></div>
                    </div>
                  ))
                : selectedUniversities.map((uni) => (
                  <div key={uni.value} className={favstyle.uniContent}>
                    <p>
                      {universities.find((u) => u.value === uni.value)?.rating}
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
              {(selectedUniversities.length === 0 || !isFiltered)
                ? selectedUniversities.length === 0
                  ? Array(4).fill(null).map((_, idx) => (
                      <div key={idx} className={favstyle.uniContent}>
                        <div className={favstyle.skeletonBox}></div>
                      </div>
                    ))
                  : selectedUniversities.map((uni) => (
                    <div key={uni.value} className={favstyle.uniContent}>
                      <div className={favstyle.skeletonBox}></div>
                    </div>
                  ))
                : selectedUniversities.map((uni) => {
                  const uniData = universities.find((u) => u.value === uni.value);

                  if (!uniData) return null;

                  const selectedFacultyExpenses = uniData.faculties
                    .filter((faculty) =>
                      selectedFaculties.some(
                        (selected) => selected.value === faculty.commonName
                      )
                    )
                    .map((faculty) => faculty.baseCost);

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
                        {avgExpenses > 0
                          ? `${avgExpenses.toLocaleString()} ₸`
                          : <div className={favstyle.skeletonBox}></div>}
                      </p>
                    </div>
                  );
                })}
            </div>

            {/* Общежитие */}
            <div className={favstyle.uniContentDiv}>
              <div className={favstyle.rateNa}>Dormitory</div>
              {(selectedUniversities.length === 0 || !isFiltered)
                ? selectedUniversities.length === 0
                  ? Array(4).fill(null).map((_, idx) => (
                      <div key={idx} className={favstyle.uniContent}>
                        <div className={favstyle.skeletonBox}></div>
                      </div>
                    ))
                  : selectedUniversities.map((uni) => (
                    <div key={uni.value} className={favstyle.uniContent}>
                      <div className={favstyle.skeletonBox}></div>
                    </div>
                  ))
                : selectedUniversities.map((uni) => (
                  <div key={uni.value} className={favstyle.uniContent}>
                    <p>
                      {universities.find((u) => u.value === uni.value)
                        ?.dormitory
                        ? "Yes"
                        : "No"}
                    </p>
                  </div>
                ))}
            </div>
            {/* Военное образование */}
            <div className={favstyle.uniContentDiv}>
              <div className={favstyle.rateNa}>Military education</div>
              {(selectedUniversities.length === 0 || !isFiltered)
                ? selectedUniversities.length === 0
                  ? Array(4).fill(null).map((_, idx) => (
                      <div key={idx} className={favstyle.uniContent}>
                        <div className={favstyle.skeletonBox}></div>
                      </div>
                    ))
                  : selectedUniversities.map((uni) => (
                    <div key={uni.value} className={favstyle.uniContent}>
                      <div className={favstyle.skeletonBox}></div>
                    </div>
                  ))
                : selectedUniversities.map((uni) => (
                  <div key={uni.value} className={favstyle.uniContent}>
                    <p>
                      {universities.find((u) => u.value === uni.value)
                        ?.militaryDepartment
                        ? "Yes"
                        : "No"}
                    </p>
                  </div>
                ))}
            </div>

            {/* Факультеты */}
            <div className={favstyle.uniContentDiv}>
              <div className={favstyle.rateNa}>Faculty</div>
              {(selectedUniversities.length === 0 || !isFiltered)
                ? selectedUniversities.length === 0
                  ? Array(4).fill(null).map((_, idx) => (
                      <div key={idx} className={`${favstyle.uniContent} ${favstyle.facultiesDiv}`}>
                        <div className={favstyle.skeletonBox}></div>
                      </div>
                    ))
                  : selectedUniversities.map((uni) => (
                    <div key={uni.value} className={`${favstyle.uniContent} ${favstyle.facultiesDiv}`}>
                      <div className={favstyle.skeletonBox}></div>
                    </div>
                  ))
                : selectedUniversities.map((uni) => {
                  const uniData = universities.find((u) => u.value === uni.value);

                  const faculties = uniData.faculties
                    .filter((faculty) =>
                      selectedFaculties.some(
                        (selected) => selected.value === faculty.commonName
                      )
                    )
                    .map((faculty) => faculty.name);

                  return (
                    <div
                      key={uni.value}
                      className={`${favstyle.uniContent} ${favstyle.facultiesDiv}`}
                    >
                      {faculties.length > 0 ? (
                        faculties.map((facultyName) => (
                          <p key={facultyName} className={favstyle.facultiesP}>
                            {facultyName}
                          </p>
                        ))
                      ) : (
                        <div className={favstyle.skeletonBox}></div>
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

export default FavuniExample;
