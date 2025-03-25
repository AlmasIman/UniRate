import Select from "react-select";
import React from "react";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import search from "../assets/icons/search.svg";
import Button from "../components/Button.jsx";
import UniversityCarousel from "../components/UniversityCardCarousel.jsx";
import unistyle from "../assets/styles/university.module.css";
import MultiRangeSlider from "../components/PriceFilter.jsx";
import map from "../assets/icons/MapPinLine.svg";
import dollar from "../assets/icons/dollar-circle.svg";
import documentfilter from "../assets/icons/document-filter.svg";
import UniversityCardCarousel from "../components/UniversityCardCarousel.jsx";
function Universities() {
  const cityOptions = [
    { value: "Atyrau", label: "Atyrau" },
    { value: "Almaty", label: "Almaty" },
    { value: "Astana", label: "Astana" },
  ];

  return (
    <>
      <Header />
      <div className={unistyle.searchBox}>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search for university…"
          className={unistyle.searchInput}
        />
        <img src={search} alt="" />
      </div>
      <div className={unistyle.filterBox}>
        <h3 className={unistyle.title}>Filters</h3>
        <div className={unistyle.filter}>
          <div>
            <div className={unistyle.filterTitle}>
              <img src={map} alt="" />
              <Select
                options={cityOptions}
                placeholder="Search for city" // Custom placeholder
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "white",
                    border: "1px solid rgba(216, 216, 216, 1)",
                    fontSize: "16px",
                    padding: "5px",
                    width: "199px",
                    height: "48px",
                    borderRadius: "16px",
                  }),
                  option: (base, { isFocused }) => ({
                    ...base,
                    backgroundColor: isFocused ? "rgba(20, 174, 130, 0.05)" : "white",
                    fontSize: "14px",
                    textAlign: "center"
                    }),
                }}
              />
            </div>
            <div className={unistyle.checkboxDiv}>
              <input
                type="checkbox"
                id="Dormitory"
                name="Dormitory"
                value="Dormitory"
                className={unistyle.checkboxStyle}
              />
              <label for="Dormitory"> Dormitory</label>
            </div>
            <br />
            <div className={unistyle.checkboxDiv}>
              <input
                type="checkbox"
                id="Military"
                name="Military"
                value="Military"
                className={unistyle.checkboxStyle}
              />
              <label for="Military"> Military</label>
            </div>
          </div>

          <div>
            <div className={unistyle.filterTitle}>
              <img src={dollar} alt="" />
              <p>Price</p>
            </div>
            <MultiRangeSlider />
          </div>

          <div>
            <div className={unistyle.filterTitle}>
              <img src={documentfilter} alt="" />
              <p>Price</p>
            </div>
            <div className={unistyle.checkboxDiv}>
              <input
                type="radio"
                id="Highest"
                value="Highest"
                name="sorting"
                className={unistyle.roundedInput}
              />
              <label for="Highest"> Lowest to Highest</label>
            </div>
            <br />
            <div className={unistyle.checkboxDiv}>
              <input
                type="radio"
                id="Lowest"
                name="sorting"
                value="Lowest"
                className={unistyle.roundedInput}
              />
              <label for="Lowest"> Highest to Lowest</label>
            </div>
          </div>
        </div>
        <div className={unistyle.applybtn}>
          <Button content="Apply Filters" />
        </div>
      </div>

      <br />

      <div className={unistyle.uniListContainer}>
        <p>Most Popular</p>
        <h1>University lists</h1>

        <div className={unistyle.studDiv}>
          <UniversityCardCarousel />
        </div>
      </div>
      <br />

      <Footer />
    </>
  );
}

export default Universities;
