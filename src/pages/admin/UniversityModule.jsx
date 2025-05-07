import SideBar from "../../layouts/AdminSideBar.jsx";
import adUni from "../../assets/styles/AdminUniversity.module.css";
import React, { useEffect, useState } from "react";
import createPlusicon from "../../assets/icons/createPlusicon.svg";
import { getAllUniversities } from "../../services/universityService.js";
import { getAllSpecialties } from "../../services/specialitites.js";
import { useNavigate } from "react-router-dom";

function UniversityModule() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("university");
  const [universities, setUniversities] = useState([]);
  const [specialities, setSpecialities] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUniversities = universities.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(universities.length / itemsPerPage);

  const navigateToCreateUniversity = () => {
    navigate("/admin/university-create");
  };
  const handleViewUni = (uniId) => {
    navigate(`/admin/university-view/${uniId}`);
  };

  const handleNavigateAddNewProgram = () => {
    navigate("/admin/university-create-program");
  };

  const handleNavigateAddNewFaculty = () => {
    navigate('/admin/university-create-faculty')
  }

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const data = await getAllUniversities();
        setUniversities(data);
      } catch (error) {
        console.error("Ошибка при загрузке университетов:", error);
      }
    };

    fetchUniversities();
  }, []);

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const data = await getAllSpecialties();
        setSpecialities(data);
      } catch {
        console.error("Ошибка при загрузке специальнстей:", error);
      }
    };
    fetchSpecialities();
  }, []);

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

      <div className={adUni.mainContentDiv}>
        <div className={adUni.pageTitle}>
          <h1>University Module</h1>
          <p>View all University and programs</p>
        </div>

        <div className={adUni.uniContentMainConteinter}>
          <div className={adUni.pickSection}>
            <h1
              style={{
                cursor: "pointer",
                color: activeTab === "university" ? "#280559" : "#999",
              }}
              onClick={() => setActiveTab("university")}
            >
              University
            </h1>
            <h1
              style={{
                cursor: "pointer",
                color: activeTab === "programs" ? "#280559" : "#999",
              }}
              onClick={() => setActiveTab("programs")}
            >
              Academic Programs
            </h1>
            <h1
              style={{
                cursor: "pointer",
                color: activeTab === "faculties" ? "#280559" : "#999",
              }}
              onClick={() => setActiveTab("faculties")}
            >
              Faculites
            </h1>
          </div>

          <div className={adUni.picedSectionContent}>
            {activeTab === "university" && (
              <>
                <div className={adUni.headerRow}>
                  <h2>University</h2>
                  <div className={adUni.actions}>
                    <div
                      className={adUni.createBtn}
                      onClick={navigateToCreateUniversity}
                    >
                      <img src={createPlusicon} alt="" width={20} />
                      Add New Uni
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="text"
                    className={adUni.searchInput}
                    placeholder="Search for academic programs name here"
                  />
                  <div className={adUni.exportDropdown}>
                    <button className={adUni.exportBtn}>
                      <img src="" alt="" />
                      Search
                    </button>
                  </div>
                </div>

                <table className={adUni.universityTable}>
                  <thead>
                    <tr>
                      <th>University name</th>
                      <th>Location</th>
                      <th>University Info</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUniversities.map((uni) => (
                      <tr key={uni.id}>
                        <td>{uni.name}</td>
                        <td>{uni.location}</td>
                        <td className="descriptionCell">{uni.description}</td>
                        <td>
                          <button
                            className={adUni.viewBtn}
                            onClick={() => handleViewUni(uni.id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div
                  className={adUni.pagination}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <p>
                    Page {currentPage} of {totalPages}
                  </p>
                  <div
                    className={adUni.pagiDiv}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() =>
                        currentPage > 1 && setCurrentPage(currentPage - 1)
                      }
                      disabled={currentPage === 1}
                    >
                      {"<"}
                    </button>
                    <select
                      value={currentPage}
                      onChange={(e) => setCurrentPage(Number(e.target.value))}
                    >
                      {Array.from({ length: totalPages }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() =>
                        currentPage < totalPages &&
                        setCurrentPage(currentPage + 1)
                      }
                      disabled={currentPage === totalPages}
                    >
                      {">"}
                    </button>
                  </div>
                </div>
              </>
            )}
            {activeTab === "programs" && (
              <>
                <div className={adUni.headerRow}>
                  <h2>Academic Programs</h2>
                  <div className={adUni.actions}>
                    <div
                      className={adUni.createBtn}
                      onClick={() => handleNavigateAddNewProgram()}
                    >
                      <img src={createPlusicon} alt="" width={20} />
                      Add new Programs
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="text"
                    className={adUni.searchInput}
                    placeholder="Search for academic programs name here"
                  />
                  <div className={adUni.exportDropdown}>
                    <button className={adUni.exportBtn}>
                      <img src="" alt="" />
                      Search
                    </button>
                  </div>
                </div>

                {(() => {
                  const indexOfLastSpeciality = page * itemsPerPage;
                  const indexOfFirstSpeciality =
                    indexOfLastSpeciality - itemsPerPage;
                  const currentSpecialities = specialities.slice(
                    indexOfFirstSpeciality,
                    indexOfLastSpeciality
                  );

                  return (
                    <>
                      <table className={adUni.universityTable}>
                        <thead>
                          <tr>
                            <th>Faculty name</th>
                            <th>Program name</th>
                            <th>Program Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentSpecialities.map((specialities) => (
                            <tr key={specialities.id}>
                              <td className={adUni.programDescription}>
                                {specialities.facultyName}
                              </td>
                              <td className={adUni.programDescription}>
                                {specialities.name}
                              </td>
                              <td className={adUni.programDescription}>
                                {specialities.description}
                              </td>
                              <td>
                                <button className={adUni.viewBtn}>View</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div
                        className={adUni.pagination}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "20px",
                        }}
                      >
                        <p>
                          Page {page} of{" "}
                          {Math.ceil(specialities.length / itemsPerPage)}
                        </p>
                        <div
                          className={adUni.pagiDiv}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <button
                            onClick={() => page > 1 && setPage(page - 1)}
                            disabled={page === 1}
                          >
                            {"<"}
                          </button>
                          <select
                            value={page}
                            onChange={(e) => setPage(Number(e.target.value))}
                          >
                            {Array.from(
                              {
                                length: Math.ceil(
                                  specialities.length / itemsPerPage
                                ),
                              },
                              (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              )
                            )}
                          </select>
                          <button
                            onClick={() =>
                              page <
                                Math.ceil(specialities.length / itemsPerPage) &&
                              setPage(page + 1)
                            }
                            disabled={
                              page ===
                              Math.ceil(specialities.length / itemsPerPage)
                            }
                          >
                            {">"}
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </>
            )}
            {activeTab === "faculties" && (
              <>
                <div className={adUni.headerRow}>
                  <h2>Faculties</h2>
                  <div className={adUni.actions}>
                    <div
                      className={adUni.createBtn}
                      onClick={() => handleNavigateAddNewFaculty()}
                    >
                      <img src={createPlusicon} alt="" width={20} />
                      Add new Faculty
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="text"
                    className={adUni.searchInput}
                    placeholder="Search for academic programs name here"
                  />
                  <div className={adUni.exportDropdown}>
                    <button className={adUni.exportBtn}>
                      <img src="" alt="" />
                      Search
                    </button>
                  </div>
                </div>

                {(() => {
                  const indexOfLastSpeciality = page * itemsPerPage;
                  const indexOfFirstSpeciality =
                    indexOfLastSpeciality - itemsPerPage;
                  const currentSpecialities = specialities.slice(
                    indexOfFirstSpeciality,
                    indexOfLastSpeciality
                  );

                  return (
                    <>
                      <table className={adUni.universityTable}>
                        <thead>
                          <tr>
                            <th>Faculty name</th>
                            <th>Program name</th>
                            <th>Program Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentSpecialities.map((specialities) => (
                            <tr key={specialities.id}>
                              <td className={adUni.programDescription}>
                                {specialities.facultyName}
                              </td>
                              <td className={adUni.programDescription}>
                                {specialities.name}
                              </td>
                              <td className={adUni.programDescription}>
                                {specialities.description}
                              </td>
                              <td>
                                <button className={adUni.viewBtn}>View</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div
                        className={adUni.pagination}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "20px",
                        }}
                      >
                        <p>
                          Page {page} of{" "}
                          {Math.ceil(specialities.length / itemsPerPage)}
                        </p>
                        <div
                          className={adUni.pagiDiv}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <button
                            onClick={() => page > 1 && setPage(page - 1)}
                            disabled={page === 1}
                          >
                            {"<"}
                          </button>
                          <select
                            value={page}
                            onChange={(e) => setPage(Number(e.target.value))}
                          >
                            {Array.from(
                              {
                                length: Math.ceil(
                                  specialities.length / itemsPerPage
                                ),
                              },
                              (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              )
                            )}
                          </select>
                          <button
                            onClick={() =>
                              page <
                                Math.ceil(specialities.length / itemsPerPage) &&
                              setPage(page + 1)
                            }
                            disabled={
                              page ===
                              Math.ceil(specialities.length / itemsPerPage)
                            }
                          >
                            {">"}
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniversityModule;
