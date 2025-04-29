import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import spec from "../assets/styles/universitySpeciality.module.css";
import Button from "../components/Button";
import FinanceCalculator from "../components/FinanceCalculator";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function Speciality() {
  const { id } = useParams(); // Retrieve the speciality ID from the URL
  const [speciality, setSpeciality] = useState(null);

  const tutuitionCost = useRef(null);
  const scrollToTutuitionCost = () => {
    tutuitionCost.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchSpeciality = async () => {
      const response = await fetch(
        `https://unirate.kz/university/open-api/specialties/${id}`
      );
      const data = await response.json();
      setSpeciality(data);
    };
    fetchSpeciality();
  }, [id]);

  if (!speciality) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className={spec.mainDiv}>
        <div className={spec.uniInfoMainContainer}>
          <div className={spec.path}>
            <p>Universities</p>
            <hr />
            <p>{speciality.universityName}</p>
            <hr />
            <p>{speciality.facultyName}</p>
            <hr />
            <p className={spec.activePath}>{speciality.name}</p>
          </div>
    <br />
          <div className={spec.unibox}>
            <img
              src={speciality.specialtyImageUrl}
              alt=""
              className={spec.uniImg}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "40px",
              }}
            >
              <div>
                <div className={spec.Title}>
                  <h1> {speciality.name}</h1>
                  <p>{speciality.description}</p>
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
                  <p>{speciality.gopCode}</p>
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
                  <p>{speciality.grants}</p>
                </div>
                <div style={{ display: "flex", gap: "64px" }}>
                  <p
                    style={{
                      width: "200px",
                      height: "22px",
                      minWidth: "200px",
                    }}
                  >
                    Minimum scores (for grant)
                  </p>
                  <p>{speciality.minScores}</p>
                </div>
              </div>
              <div onClick={scrollToTutuitionCost}>
                <Button content="Calculate tuition cost" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div ref={tutuitionCost}>
        <FinanceCalculator />
      </div>

      <Footer />
    </>
  );
}

export default Speciality;
