import fin from "../assets/styles/FinanceCalculator.module.css";
import Select from "react-select";
import Button from "../components/Button.jsx";
import React, { useState } from "react";

const universities = [
  {
    name: "NU",
    city: "Astana",
    faculties: [
      { name: "Engineering", cost: 9316 },
      { name: "Business", cost: 10200 },
    ],
    foodCost: 1564,
    dormitoryCost: 2670,
    militaryCost: 1987500,
  },
  {
    name: "SDU",
    city: "Almaty",
    faculties: [
      { name: "Medicine", cost: 12000 },
      { name: "Arts", cost: 8500 },
    ],
    foodCost: 1800,
    dormitoryCost: null,
    militaryCost: null,
  },
];

function FinanceCalculator() {
  const [selectedUni, setSelectedUni] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [includeDormitory, setIncludeDormitory] = useState(false);
  const [includeMilitary, setIncludeMilitary] = useState(false);
  const [total, setTotal] = useState(0);

  const handleUniversityChange = (selectedOption) => {
    const university = universities.find(
      (uni) => uni.name === selectedOption.value
    );
    setSelectedUni(university);
    setSelectedFaculty(null);
    setIncludeDormitory(false);
    setIncludeMilitary(false);
  };

  const calculateTotal = () => {
    if (!selectedUni || !selectedFaculty) return;

    let totalCost = selectedFaculty.cost + selectedUni.foodCost;
    if (includeDormitory && selectedUni.dormitoryCost)
      totalCost += selectedUni.dormitoryCost;
    if (includeMilitary && selectedUni.militaryCost)
      totalCost += selectedUni.militaryCost;

    setTotal(totalCost);

  };
  return (
    <div className={fin.calculatorMainDiv}>
    <div
      style={{
        paddingTop: "90px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <h1 className={fin.finCalcTitle}>Finance calculator</h1>
      <p className={fin.finCalcPr}>
        This tool will help you estimate the value of your education average
        cost.
      </p>
    </div>

    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "32px",
      }}
    >
      <div className={fin.inputTotalCostfilter}>
        <h5>Calculate the total cost of education</h5>
        <div
          style={{ display: "flex", gap: "10px", flexDirection: "column" }}
        >
          <p>University name</p>
          <Select
            options={universities.map((uni) => ({
              value: uni.name,
              label: uni.name,
            }))}
            placeholder="Select University"
            onChange={handleUniversityChange}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "white",
                border: "1px solid rgba(216, 216, 216, 1)",
                fontSize: "16px",
                padding: "5px",
                width: "326px",
                height: "60px",
                borderRadius: "16px",
              }),
              option: (base, { isFocused }) => ({
                ...base,
                backgroundColor: isFocused
                  ? "rgba(20, 174, 130, 0.05)"
                  : "white",
                color: "black",
                fontSize: "14px",
              }),
            }}
          />
        </div>
        <div
          style={{ display: "flex", gap: "10px", flexDirection: "column" }}
        >
          <p>Faculty</p>
          <Select
            options={
              selectedUni
                ? selectedUni.faculties.map((fac) => ({
                    value: fac.name,
                    label: fac.name,
                    cost: fac.cost,
                  }))
                : []
            }
            placeholder="Select Faculty"
            onChange={(option) => setSelectedFaculty(option)}
            isDisabled={!selectedUni}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "white",
                border: "1px solid rgba(216, 216, 216, 1)",
                fontSize: "16px",
                padding: "5px",
                width: "326px",
                height: "60px",
                borderRadius: "16px",
              }),
              option: (base, { isFocused }) => ({
                ...base,
                backgroundColor: isFocused
                  ? "rgba(20, 174, 130, 0.05)"
                  : "white",
                fontSize: "14px",
              }),
            }}
          />
        </div>
        <div
          style={{ display: "flex", gap: "10px", flexDirection: "column" }}
        >
          <p>City</p>
          <Select
            placeholder={
              selectedUni ? selectedUni.city : "University located City"
            }
            isDisabled={true}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "white",
                border: "1px solid rgba(216, 216, 216, 1)",
                fontSize: "16px",
                padding: "5px",
                width: "326px",
                height: "60px",
                borderRadius: "16px",
              }),
              option: () => ({
                opacity: "0",
              }),
            }}
          />
        </div>
        <div
          style={{ display: "flex", gap: "10px", flexDirection: "column" }}
        >
          <p>Food costs</p>

          <Select
            isDisabled={true}
            placeholder={selectedUni ? selectedUni.foodCost : 0} // Custom placeholder
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "white",
                border: "1px solid rgba(216, 216, 216, 1)",
                fontSize: "16px",
                padding: "5px",
                width: "326px",
                height: "60px",
                borderRadius: "16px",
              }),
              option: (base, { isFocused }) => ({
                ...base,
                backgroundColor: isFocused
                  ? "rgba(20, 174, 130, 0.05)"
                  : "white",
                fontSize: "14px",
              }),
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            gap: "24px",
          }}
        >
          <div>
            <div className={fin.checkboxDiv}>
              <input
                type="checkbox"
                id="Dormitory"
                name="Dormitory"
                value="Dormitory"
                checked={includeDormitory}
                onChange={() => setIncludeDormitory(!includeDormitory)}
                disabled={
                  !selectedUni || selectedUni.dormitoryCost === null
                }
                className={fin.checkboxStyle}
              />
              Dormitory (
              {selectedUni?.dormitoryCost ? "Available" : "Not Available"})
            </div>
            <br />

            <div className={fin.checkboxDiv}>
              <input
                type="checkbox"
                id="Military"
                name="Military"
                value="Military"
                checked={includeMilitary}
                onChange={() => setIncludeMilitary(!includeMilitary)}
                disabled={!selectedUni || selectedUni.militaryCost === null}
                className={fin.checkboxStyle}
              />
              Military (
              {selectedUni?.militaryCost ? "Available" : "Not Available"})
            </div>
          </div>

          <div style={{ margin: "auto" }} onClick={calculateTotal}>
            <Button content="Calculate" />
          </div>
        </div>
      </div>

      <div className={fin.showTotalcost}>
        <h4 style={{ paddingTop: "32px" }}>Totals</h4>
        <p>Pre and post tax estimates</p>
        <div className={fin.costsBox}>
          <p>Education costs</p>
          <p style={{ fontSize: "20px" }}>
            ₸{selectedFaculty ? selectedFaculty.cost : 0}
          </p>
        </div>
        
        <div className={fin.costsBox}>
          <p>Dormitory cost</p>
          <p style={{ fontSize: "20px" }}>
            {selectedUni?.dormitoryCost
              ? `₸${includeDormitory ? selectedUni.dormitoryCost : 0}`
              : "No"}
          </p>
        </div>
        <div className={fin.costsBox}>
          <p>Military edu cost</p>
          <p style={{ fontSize: "20px" }}>
            {selectedUni?.militaryCost
              ? `₸${includeMilitary ? selectedUni.militaryCost : 0}`
              : "No"}
          </p>
        </div>
        <div className={fin.costsBox}>
          <p>food and additional things</p>
          <p style={{ fontSize: "20px" }}>
            ₸{selectedUni ? selectedUni.foodCost : 0}
          </p>
        </div>
        <hr style={{ width: "100%" }} />
        <div className={fin.costsBox}>
          <p>TOTAL</p>
          <p style={{ fontSize: "28px" }}>₸{total}</p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default FinanceCalculator;
