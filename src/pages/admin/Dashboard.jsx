import SideBar from "../../layouts/AdminSideBar";
import dashStyle from "../../assets/styles/Dashboard.module.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate()

  const handleViewAllUni = () => {
    navigate(`/admin/university-module`);
  };

  const handleViewAllForum = () => {
    navigate('/admin/forum')
  }
  
    const handleViewAllProgram = () => {
      navigate(`/admin/university-module`);
    }
  

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
              <button onClick={() => handleViewAllUni()} className={dashStyle.viewAllBtn}>View all</button>
            </div>
            <div className={dashStyle.cardName}>
              <p className={dashStyle.desc}>University name</p>
              <p className={dashStyle.desc}>Action</p>
            </div>
            <div className={dashStyle.content}>
              <div className={dashStyle.cardName}>
                <p className={dashStyle.uniName}>Northeastern University</p>
                <button className={dashStyle.viewBtn}>View</button>
              </div>
              <div className={dashStyle.cardName}>
                <p className={dashStyle.uniName}>Northeastern University</p>
                <button className={dashStyle.viewBtn}>View</button>
              </div>
              <div className={dashStyle.cardName}>
                <p className={dashStyle.uniName}>Northeastern University</p>
                <button className={dashStyle.viewBtn}>View</button>
              </div>
              <div className={dashStyle.cardName}>
                <p className={dashStyle.uniName}>Northeastern University</p>
                <button className={dashStyle.viewBtn}>View</button>
              </div>
              <div className={dashStyle.cardName}>
                <p className={dashStyle.uniName}>Northeastern University</p>
                <button className={dashStyle.viewBtn}>View</button>
              </div>
            </div>
          </div>
          <div className={dashStyle.infoCard}>
            <div className={dashStyle.cardName}>
              <p>Programs</p>
              <button onClick={() => handleViewAllProgram()} className={dashStyle.viewAllBtn}>View all</button>
            </div>
            <div className={dashStyle.cardName}>
              <p className={dashStyle.desc}>Program name</p>
              <p className={dashStyle.desc}>Action</p>
            </div>
            <div className={dashStyle.content}>
              <div className={dashStyle.cardName}>
                <p className={dashStyle.uniName}>Northeastern University</p>
                <button className={dashStyle.viewBtn}>View</button>
              </div>
              <div className={dashStyle.cardName}>
                <p className={dashStyle.uniName}>Northeastern University</p>
                <button className={dashStyle.viewBtn}>View</button>
              </div>
              <div className={dashStyle.cardName}>
                <p className={dashStyle.uniName}>Northeastern University</p>
                <button className={dashStyle.viewBtn}>View</button>
              </div>
              <div className={dashStyle.cardName}>
                <p className={dashStyle.uniName}>Northeastern University</p>
                <button className={dashStyle.viewBtn}>View</button>
              </div>
              <div className={dashStyle.cardName}>
                <p className={dashStyle.uniName}>Northeastern University</p>
                <button className={dashStyle.viewBtn}>View</button>
              </div>
            </div>
          </div>
          <div className={dashStyle.infoCard}>
            <div className={dashStyle.cardName}>
              <p>Forum</p>
              <button onClick={() => handleViewAllForum()} className={dashStyle.viewAllBtn}>View all</button>
            </div>
            <div className={dashStyle.cardName}>
              <p className={dashStyle.desc}>Forum name</p>
              <p className={dashStyle.desc}>Action</p>
            </div>
            <div className={dashStyle.content}>
              <div className={dashStyle.cardName}>
                <p className={dashStyle.uniName}>Northeastern University</p>
                <button className={dashStyle.viewBtn}>View</button>
              </div>
              <div className={dashStyle.cardName}>
                <p className={dashStyle.uniName}>Northeastern University</p>
                <button className={dashStyle.viewBtn}>View</button>
              </div>
              <div className={dashStyle.cardName}>
                <p className={dashStyle.uniName}>Northeastern University</p>
                <button className={dashStyle.viewBtn}>View</button>
              </div>
              <div className={dashStyle.cardName}>
                <p className={dashStyle.uniName}>Northeastern University</p>
                <button className={dashStyle.viewBtn}>View</button>
              </div>
              <div className={dashStyle.cardName}>
                <p className={dashStyle.uniName}>Northeastern University</p>
                <button className={dashStyle.viewBtn}>View</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
