import SideBar from "../../layouts/AdminSideBar";
import dashStyle from "../../assets/styles/Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { getAllUniversities } from "../../services/universityService";
import { getAllSpecialties } from "../../services/specialitites";
import { getAllForum } from "../../services/forumService";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();

  const [universities, setUniversities] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [forums, setForums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uniData = await getAllUniversities();
        const progData = await getAllSpecialties();
        const forumData = await getAllForum();

        setUniversities(uniData.slice(0, 5));
        setPrograms(progData.slice(0, 5));
        setForums(forumData.slice(0, 5));
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const handleViewAllUni = () => {
    navigate(`/admin/university-module`);
  };

  const handleViewAllForum = () => {
    navigate("/admin/forum");
  };

  const handleViewAllProgram = () => {
    navigate(`/admin/university-module`);
  };
  const handleViewChoosedUni = (uniId) => {
    navigate(`/admin/university-view/${uniId}`);
  };

  const handleViewChoosedProgram = (progId) => {
    navigate(`/admin/university-view/program/${progId}`);
  };

  const handleViewChoosedForum = (forumId) => {
    navigate(`/admin/forum-view/${forumId}`);
  };

  return (
    <>
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

        <div className={dashStyle.contentMainContainer}>
          <div className={dashStyle.dashTitle}>
            <h1>Dashboard</h1>
            <p>View all status from the dashbaord</p>
          </div>

          <div className={dashStyle.infoCard}>
            <div className={dashStyle.cardName}>
              <p>University</p>
              <button
                onClick={() => handleViewAllUni()}
                className={dashStyle.viewAllBtn}
              >
                View all
              </button>
            </div>
            <div className={dashStyle.cardName}>
              <p className={dashStyle.desc}>University name</p>
              <p className={dashStyle.desc}>Action</p>
            </div>
            <div className={dashStyle.content}>
              {universities.map((uni, index) => (
                <div key={index} className={dashStyle.cardName}>
                  <p className={dashStyle.uniName}>{uni.name}</p>
                  <button
                    className={dashStyle.viewBtn}
                    onClick={() => handleViewChoosedUni(uni.id)}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className={dashStyle.infoCard}>
            <div className={dashStyle.cardName}>
              <p>Programs</p>
              <button
                onClick={() => handleViewAllProgram()}
                className={dashStyle.viewAllBtn}
              >
                View all
              </button>
            </div>
            <div className={dashStyle.cardName}>
              <p className={dashStyle.desc}>Program name</p>
              <p className={dashStyle.desc}>Action</p>
            </div>
            <div className={dashStyle.content}>
              {programs.map((prog, index) => (
                <div key={index} className={dashStyle.cardName}>
                  <p className={dashStyle.uniName}>{prog.name}</p>
                  <button
                    className={dashStyle.viewBtn}
                    onClick={() => handleViewChoosedProgram(prog.id)}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className={dashStyle.infoCard}>
            <div className={dashStyle.cardName}>
              <p>Forum</p>
              <button
                onClick={() => handleViewAllForum()}
                className={dashStyle.viewAllBtn}
              >
                View all
              </button>
            </div>
            <div className={dashStyle.cardName}>
              <p className={dashStyle.desc}>Forum name</p>
              <p className={dashStyle.desc}>Action</p>
            </div>
            <div className={dashStyle.content}>
              {forums.map((forum, index) => (
                <div key={index} className={dashStyle.cardName}>
                  <p className={dashStyle.uniName}>{forum.name}</p>
                  <button className={dashStyle.viewBtn} onClick={() => handleViewChoosedForum(forum.id)}>View</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
