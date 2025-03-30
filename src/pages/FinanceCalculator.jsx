import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import FinanceCalculatorComponent from "../components/FinanceCalculator.jsx";
function FinanceCalculator() {
  return (
    <>
      <Header />
      <FinanceCalculatorComponent />
      <Footer />
    </>
  );
}

export default FinanceCalculator;

// <div>
// <h1>Finance Calculator</h1>
// <p>Estimate the value of your education cost.</p>

// <Select
//   options={universities.map((uni) => ({
//     value: uni.name,
//     label: uni.name,
//   }))}
//   placeholder="Select University"
//   onChange={handleUniversityChange}
// />

// <Select
//   options={
//     selectedUni
//       ? selectedUni.faculties.map((fac) => ({
//           value: fac.name,
//           label: fac.name,
//           cost: fac.cost,
//         }))
//       : []
//   }
//   placeholder="Select Faculty"
//   onChange={(option) => setSelectedFaculty(option)}
//   isDisabled={!selectedUni}
// />
// <div>
//   <p>City: {selectedUni ? selectedUni.city : ""}</p>

// </div>
// <div>
//   <input
//     type="checkbox"
//     checked={includeDormitory}
//     onChange={() => setIncludeDormitory(!includeDormitory)}
//     disabled={!selectedUni || selectedUni.dormitoryCost === null}
//   />{" "}
//   Dormitory ({selectedUni?.dormitoryCost ? "Available" : "No"})
// </div>

// <div>
//   <input
//     type="checkbox"
//     checked={includeMilitary}
//     onChange={() => setIncludeMilitary(!includeMilitary)}
//     disabled={!selectedUni || selectedUni.militaryCost === null}
//   />{" "}
//   Military ({selectedUni?.militaryCost ? "Available" : "No"})
// </div>
// <div onClick={calculateTotal}>
//   <Button content="Calculate" />
// </div>

// <h3>Totals:</h3>
// <p>Education Cost: ₸{selectedFaculty ? selectedFaculty.cost : 0}</p>
// <p>Food Cost: ₸{selectedUni ? selectedUni.foodCost : 0}</p>
// <p>
//   Dormitory Cost:{" "}
//   {selectedUni?.dormitoryCost
//     ? `₸${includeDormitory ? selectedUni.dormitoryCost : 0}`
//     : "No"}
// </p>
// <p>
//   Military Cost:{" "}
//   {selectedUni?.militaryCost
//     ? `₸${includeMilitary ? selectedUni.militaryCost : 0}`
//     : "No"}
// </p>
// <hr />
// <h2>Total: ₸{total}</h2>
// </div>
