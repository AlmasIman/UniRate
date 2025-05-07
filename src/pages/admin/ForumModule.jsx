import SideBar from "../../layouts/AdminSideBar";
import adUni from "../../assets/styles/AdminUniversity.module.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import createPlusicon from "../../assets/icons/createPlusicon.svg";
import { getAllReviews } from "../../services/forumService.js";
import { getAllForum } from "../../services/forumService.js";
import { getAllUsers } from "../../services/authService.js";

function ForumModule() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("thread");
  const [forums, setForums] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [users, setUsers] = useState([]);
  const [userPage, setUserPage] = useState(1);
  const usersPerPage = 3;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers({
          page: userPage - 1,
          size: usersPerPage,
          sort: ["desc"],
        });
        setUsers(response.content || []);
      } catch (error) {
        console.error("Ошибка при загрузке пользователей:", error);
      }
    };
    fetchUsers();
  }, [userPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentForums = forums.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(forums.length / itemsPerPage);

  const navigateToCreateForum = () => {
    navigate("/admin/forum-create");
  };

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const data = await getAllForum();
        setForums(data);
      } catch (error) {
        console.error("Ошибка при загрузке форумов:", error);
      }
    };

    fetchForums();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews();
        setReviews(data.content || []);
      } catch (error) {
        console.error("Ошибка при загрузке отзывов:", error);
      }
    };
    fetchReviews();
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
          <h1>Forum Module</h1>
          <p>View all threads</p>
        </div>

        <div className={adUni.uniContentMainConteinter}>
          <div className={adUni.pickSection}>
            <h1
              style={{
                cursor: "pointer",
                color: activeTab === "thread" ? "#280559" : "#999",
              }}
              onClick={() => setActiveTab("thread")}
            >
              Thread
            </h1>
            <h1
              style={{
                cursor: "pointer",
                color: activeTab === "comments" ? "#280559" : "#999",
              }}
              onClick={() => setActiveTab("comments")}
            >
              Comments
            </h1>
            <h1
              style={{
                cursor: "pointer",
                color: activeTab === "users" ? "#280559" : "#999",
              }}
              onClick={() => setActiveTab("users")}
            >
              Users
            </h1>
          </div>

          <div className={adUni.picedSectionContent}>
            {activeTab === "thread" && (
              <>
                <div className={adUni.headerRow}>
                  <h2>Threads</h2>
                  <div className={adUni.actions}>
                    <div
                      className={adUni.createBtn}
                      onClick={navigateToCreateForum}
                    >
                      <img src={createPlusicon} alt="" width={20} />
                      Create New Form
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="text"
                    className={adUni.searchInput}
                    placeholder="Search for thread"
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
                      <th>Forum Title</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentForums.map((forum) => (
                      <tr key={forum.id}>
                        <td>{forum.name}</td>
                        <td className="descriptionCell">{forum.description}</td>
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
            {activeTab === "comments" && (
              <>
                <div className={adUni.headerRow}>
                  <h2>Comments</h2>
                  <div className={adUni.actions}>
                    <div className={adUni.createBtn}>
                      <img src={createPlusicon} alt="" width={20} />
                      Add new Reviews
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="text"
                    className={adUni.searchInput}
                    placeholder="Search for review title here"
                  />
                  <div className={adUni.exportDropdown}>
                    <button className={adUni.exportBtn}>
                      <img src="" alt="" />
                      Search
                    </button>
                  </div>
                </div>

                {(() => {
                  const indexOfLastReview = page * itemsPerPage;
                  const indexOfFirstReview = indexOfLastReview - itemsPerPage;
                  const currentReviews = reviews.slice(
                    indexOfFirstReview,
                    indexOfLastReview
                  );

                  return (
                    <>
                      <table className={adUni.universityTable}>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Comment</th>
                            <th>Thread Name</th>
                            <th>User</th>
                            <th>Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentReviews.map((review) => (
                            <tr key={review.id}>
                              <td>
                                {new Date(
                                  review.createdAt
                                ).toLocaleDateString()}
                              </td>
                              <td>
                                {new Date(review.createdAt).toLocaleTimeString(
                                  [],
                                  { hour: "2-digit", minute: "2-digit" }
                                )}
                              </td>
                              <td className={adUni.programDescription}>
                                {review.comment}
                              </td>
                              <td>{review.forumName}</td>
                              <td>{review.userName}</td>
                              <td>{review.status}</td>
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
                          {Math.ceil(reviews.length / itemsPerPage)}
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
                                  reviews.length / itemsPerPage
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
                              page < Math.ceil(reviews.length / itemsPerPage) &&
                              setPage(page + 1)
                            }
                            disabled={
                              page === Math.ceil(reviews.length / itemsPerPage)
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
            {activeTab === "users" && (
              <>
                <div className={adUni.headerRow}>
                  <h2>Users</h2>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="text"
                    className={adUni.searchInput}
                    placeholder="Search for users here"
                  />
                  <div className={adUni.exportDropdown}>
                    <button className={adUni.exportBtn}>Search</button>
                  </div>
                </div>

                <table className={adUni.universityTable}>
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.firstName || "-"} {user.lastName}</td>
                        <td>{user.username }</td>
                        <td>{user.email || "-"}</td>
                        <td>{user.role || "-"}</td>
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
                  <p>Page {userPage}</p>
                  <div
                    className={adUni.pagiDiv}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() => userPage > 1 && setUserPage(userPage - 1)}
                      disabled={userPage === 1}
                    >
                      {"<"}
                    </button>
                    <button onClick={() => setUserPage(userPage + 1)}>{">"}</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumModule;
