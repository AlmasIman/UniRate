import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import spec from "../assets/styles/universitySpeciality.module.css";
import Button from "../components/Button";
import FinanceCalculator from "../components/FinanceCalculator";
function Speciality() {
  return (
    <>
      <Header />
      <div className={spec.mainDiv}>
        <div className={spec.path}>
          <p>Universities</p>
          <hr />
          <p>SDU</p>
          <hr />
          <p>Engineering</p>
          <hr />
          <p style={{ color: "rgba(0, 147, 121, 1)", fontWeight: "600" }}>
            Information Systems
          </p>
        </div>

        <div className={spec.uniInfoMainContainer}>
          <div className={spec.unibox}>
            <img src="../../public/shym.png" alt="" className={spec.uniImg} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "40px",
                justifyContent: "center",
              }}
            >
              <div>
                <div className={spec.Title}>
                  <h1>Information System</h1>
                  <p>
                    The Information Systems Department plays a crucial role in
                    managing and optimizing the technology infrastructure of our
                    organization. This team is responsible for developing
                    innovative solutions that enhance data management,
                    streamline operations, and support decision-making
                    processes. With a focus on integrating cutting-edge
                    technologies, the department ensures that all systems are
                    secure, efficient, and aligned with the strategic goals of
                    the company.
                  </p>
                </div>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column" }}
                className={spec.specDetails}
              >
                <h4>Details</h4>
                <div style={{ display: "flex", gap: "64px" }}>
                  <p
                    style={{
                      width: "200px",
                      height: "22px",
                      minWidth: "200px",
                    }}
                  >
                    GOP code
                  </p>
                  <p>B098</p>
                </div>
                <div style={{ display: "flex", gap: "64px" }}>
                  <p
                    style={{
                      width: "200px",
                      height: "22px",
                      minWidth: "200px",
                    }}
                  >
                    Grants
                  </p>
                  <p>330</p>
                </div>
                <div style={{ display: "flex", gap: "64px" }}>
                  <p
                    style={{
                      width: "200px",
                      height: "22px",
                      minWidth: "200px",
                    }}
                  >
                    Minimum scores
                  </p>
                  <p>119</p>
                </div>
                <div style={{ position: "absolute", bottom: "-40px" }}>
                  <Button content="Calculate tuition cost" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={spec.descriptinSectionDiv}>
        <div style={{ display: "flex", gap: "16px" }}>
          <p className={`${spec.slider} ${spec.sliderActive}`}>Description</p>
          <p className={spec.slider}>Syllabus</p>
        </div>
        <p className={spec.descriptionParagraph}>
          The Information Systems Department plays a crucial role in managing
          and optimizing the technology infrastructure of our organization. This
          team is responsible for developing innovative solutions that enhance
          data management, streamline operations, and support decision-making
          processes. With a focus on integrating cutting-edge technologies, the
          department ensures that all systems are secure, efficient, and aligned
          with the strategic goals of the company.
        </p>
      </div>

      <FinanceCalculator />

      <Footer />
    </>
  );
}

export default Speciality;
