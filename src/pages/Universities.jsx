import Select from "react-select";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import search from "../assets/icons/search.svg";
import Button from "../components/Button.jsx";
import unistyle from "../assets/styles/university.module.css";
import MultiRangeSlider from "../components/PriceFilter.jsx";
import map from "../assets/icons/MapPinLine.svg";
import dollar from "../assets/icons/dollar-circle.svg";
import documentfilter from "../assets/icons/document-filter.svg";
import uniPlacehodlder from "/public/uniPlaceholder.jpg";
import TopUnis from "../components/ReactCarouselForUniversity.jsx";

function Universities() {
  const cityOptions = [
    { value: "Almaty", label: "Almaty" },
    { value: "Astana", label: "Astana" },
    { value: "Atyrau", label: "Atyrau" },
    { value: "Shymkent", label: "Shymkent" },
    { value: "Karaganda", label: "Karaganda" },
    { value: "Aktobe", label: "Aktobe" },
    { value: "Taraz", label: "Taraz" },
    { value: "Pavlodar", label: "Pavlodar" },
    { value: "Oskemen", label: "Oskemen" },
    { value: "Semey", label: "Semey" },
    { value: "Kostanay", label: "Kostanay" },
    { value: "Kyzylorda", label: "Kyzylorda" },
    { value: "Oral", label: "Oral" },
    { value: "Aktau", label: "Aktau" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [universityData, setUniversityData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [hasDormitory, setHasDormitory] = useState(false);
  const [hasMilitary, setHasMilitary] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [sortOrder, setSortOrder] = useState(null);
  const priceRef = useRef();

  const fetchUniversityByName = async (name) => {
    if (!name) {
      setUniversityData([]);
      return;
    }

    try {
      const response = await fetch(
        `https://unirate.kz/university/open-api/universities/name/${name}`
      );

      if (!response.ok) {
        setUniversityData([]);
        return;
      }

      const data = await response.json();

      if (!data || Object.keys(data).length === 0) {
        setUniversityData([]);
      } else {
        setUniversityData(Array.isArray(data) ? data : [data]);
      }
    } catch (error) {
      console.error("Error fetching university:", error);
      setUniversityData([]); // Очистим, если ошибка
    }
  };
  const handleSearchClick = () => {
    fetchUniversityByName(searchQuery);
  };

  const handleApplyFilters = async () => {
    try {
      const response = await fetch(
        "https://unirate.kz/university/open-api/universities/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchFiled: searchQuery,
            city: selectedCity,
            minTuition: priceRef.current?.minVal || 0,
            maxTuition: priceRef.current?.maxVal || 0,
            hasMilitaryDepartment: hasMilitary,
            hasDormitory,
            rating: 0,
            page: 0,
            size: 10,
          }),
        }
      );

      const data = await response.json();
      setUniversityData(data.content || []); // assuming backend returns single or array of universities
    } catch (error) {
      console.error("Error applying filters:", error);
    }
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
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchClick();
          }}
        />{" "}
     
        <img
          src={search}
          alt="Search"
          onClick={handleSearchClick} 
          style={{ cursor: "pointer" }} 
        />
      </div>

      <div className={unistyle.filterBox}>
        <h3 className={unistyle.title}>Filters</h3>
        <div className={unistyle.filter}>
          <div className={unistyle.filterContentWidth}>
            <div className={unistyle.filterTitle}>
              <img src={map} alt="Map" />
              <Select
                options={cityOptions}
                placeholder="Search for city"
                onChange={(selectedOption) =>
                  setSelectedCity(selectedOption?.value)
                }
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
                    color: "black",

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
                checked={hasDormitory}
                onChange={(e) => setHasDormitory(e.target.checked)}
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
                checked={hasMilitary}
                onChange={(e) => setHasMilitary(e.target.checked)}
              />
              <label htmlFor="Military"> Military</label>
            </div>
          </div>

          <div className={unistyle.filterContentWidth}>
            <div className={unistyle.filterTitle}>
              <img src={dollar} alt="Dollar" />
              <p>Price</p>
            </div>
            <MultiRangeSlider ref={priceRef} />
          </div>

          <div className={unistyle.filterContentWidth}>
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
                onChange={() => setSortOrder("Highest")}
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
                onChange={() => setSortOrder("Lowest")}
              />
              <label htmlFor="Lowest"> Highest to Lowest</label>
            </div>
          </div>
        </div>
        <div onClick={handleApplyFilters} className={unistyle.applybtn}>
          <Button content="Apply Filters" />
        </div>
      </div>

      {Array.isArray(universityData) && universityData.length > 0 && (
        <div className={unistyle.searchReasult}>
          <h2>Search Results:</h2>
          <br />
          <div className={unistyle.resultList}>
            {universityData.map((uni) => (
                <div key={uni.id} className={unistyle.uniCard}>
                  <img
                    src={!uni.logoUrl ? uniPlacehodlder : uni.logoUrl}
                    alt={uni.name}
                    className={unistyle.uniLogoImg}
                  />
                  <div className={unistyle.info}>
                    <h3>{uni.name}</h3>
                    <p className={unistyle.description}>{uni.description}</p>
                    <p className={unistyle.description}>
                      <strong style={{ color: "black" }}>Location:</strong>{" "}
                      {uni.location}
                    </p>
                    <p className={unistyle.description}>
                      <strong style={{ color: "black" }}>Rating:</strong>{" "}
                      {uni.rating} / 5
                    </p>
                    <div style={{display:'flex', justifyContent: 'flex-end'}}>
                      <Button content="Visit Website" path={uni.website} />
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      )}

      {universityData &&
        Array.isArray(universityData) &&
        universityData.length === 0 && (
          <div className={unistyle.searchReasult}>
            <h2>Nothing is found</h2>
            <p>Try adjusting your filters or search terms.</p>
          </div>
        )}

      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "Mulish",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          Discover top universities in Kazakhstan.
        </p>
        <h1
          style={{
            fontFamily: "Poppins",
            fontWeight: "700",
            fontSize: "38px",
          }}
        >
          Most Popular
        </h1>
      </div>
      <br />
      <br />

      <TopUnis />

      <br />
      <br />
      <br />

      <Footer />
    </>
  );
}

export default Universities;
