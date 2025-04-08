import Select from "react-select";
import React, { useState } from "react";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import search from "../assets/icons/search.svg";
import Button from "../components/Button.jsx";
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

  const [searchQuery, setSearchQuery] = useState("");
  const [universityData, setUniversityData] = useState(null);

  // Fetch function for searching by university name
  const fetchUniversityByName = async (name) => {
    if (!name) return

    try {
      const response = await fetch(
        `https://unirate.kz/university/open-api/universities/name/${name}`
      );
      const data = await response.json();
      setUniversityData(data); // Save the response to state
    } catch (error) {
      console.error("Error fetching university:", error);
    }
  };

  // Handler for the search icon click
  const handleSearchClick = () => {
    fetchUniversityByName(searchQuery);
  };

  return (
    <>
      <Header />
      <div className={unistyle.searchBox}>
        <input
          type="text"
          placeholder="Search for university…"
          className={unistyle.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
        {/* Trigger search on click */}
        <img
          src={search}
          alt="Search"
          onClick={handleSearchClick} // Add click event to trigger search
          style={{ cursor: "pointer" }} // Makes the icon look clickable
        />
      </div>

      {universityData && universityData.name && (
          <div className={unistyle.searchReasult}>
            <h2>Search Results:</h2>
            <div className={unistyle.studDiv}>
              <img
                src="/public/almaty.png"
                alt={universityData.name}
                style={{
                  width: "620px",
                  height: "457px",
                  borderRadius: "20px",
                }}
              />
              {/* universityData.logoUrl */}
              <div className={unistyle.content}>
                <h1>{universityData.name}</h1>

                <p>{universityData.description}</p>
                <p>
                  <strong>Location:</strong> {universityData.location}
                </p>
                <p>
                  <strong>Rating:</strong> {universityData.rating} / 5
                </p>
                <a
                  href={universityData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </div>
      )}

      <div className={unistyle.filterBox}>
        <h3 className={unistyle.title}>Filters</h3>
        <div className={unistyle.filter}>
          <div style={{ width: "23%" }}>
            <div className={unistyle.filterTitle}>
              <img src={map} alt="Map" />
              <Select
                options={cityOptions}
                placeholder="Search for city"
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
                    backgroundColor: isFocused
                      ? "rgba(20, 174, 130, 0.05)"
                      : "white",
                    fontSize: "14px",
                    textAlign: "center",
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
              <label htmlFor="Dormitory"> Dormitory</label>
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
              <label htmlFor="Military"> Military</label>
            </div>
          </div>

          <div style={{ width: "23%" }}>
            <div className={unistyle.filterTitle}>
              <img src={dollar} alt="Dollar" />
              <p>Price</p>
            </div>
            <MultiRangeSlider />
          </div>

          <div style={{ width: "23%" }}>
            <div className={unistyle.filterTitle}>
              <img src={documentfilter} alt="Filter" />
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
              <label htmlFor="Highest"> Lowest to Highest</label>
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
              <label htmlFor="Lowest"> Highest to Lowest</label>
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
