import SideBar from "../../layouts/AdminSideBar";

function Dashboard() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "lightblue",
          width: "100vw",
          height: "100vh",
        }}
      >
        <SideBar />

        <div>
          <div>
            <h1>Dashboard</h1>
            <p>View all status from the dashbaord</p>
          </div>
          <div>
            <h4>University</h4>
            <button>View all</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
