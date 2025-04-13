import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import spec from "../assets/styles/universitySpeciality.module.css";
import Button from "../components/Button";
import FinanceCalculator from "../components/FinanceCalculator";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Speciality() {
  const { id } = useParams(); // Retrieve the speciality ID from the URL
  const [speciality, setSpeciality] = useState(null);

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
            <p>SDU</p>
            <hr />
            <p>Engineering</p>
            <hr />
            <p style={{ color: "rgba(0, 147, 121, 1)", fontWeight: "600" }}>
              {speciality.name}
            </p>
          </div>

          <div className={spec.unibox}>
            <img src="../../public/shym.png" alt="" className={spec.uniImg} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "40px",
                width: "50vw",
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
                <div style={{ position: "absolute", bottom: "0px" }}>
                  <Button content="Calculate tuition cost" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FinanceCalculator />

      <Footer />
    </>
  );
}

export default Speciality;
