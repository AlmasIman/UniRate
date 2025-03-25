// import React, { useState } from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import arrlowLeft from "../assets/icons/ArrowLeft.svg";
// import arrlowRight from "../assets/icons/ArrowRight.svg";
// import style from "../assets/styles/UniversityList.module.css"
// const responsive = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3,
//     slidesToSlide: 1,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2,
//     slidesToSlide: 1,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//     slidesToSlide: 1,
//   },
// };

// const items = [
//   {
//     img: "../assets/img/shym.png",
//     name: "Harvard University",
//     rating: "⭐⭐⭐⭐⭐",
//     description: "One of the most prestigious universities in the world.",
//     benefit: "Top-tier faculty and research opportunities."
//   },
//   {
//     img: "../assets/img/astana.png",
//     name: "Stanford University",
//     rating: "⭐⭐⭐⭐⭐",
//     description: "Known for its cutting-edge technology and innovation.",
//     benefit: "Strong industry connections and startup culture."
//   },
//   {
//     img: "../assets/img/almaty.png",
//     name: "MIT",
//     rating: "⭐⭐⭐⭐⭐",
//     description: "A leader in science and engineering education.",
//     benefit: "Highly ranked programs in tech and engineering."
//   },
//   {
//     img: "../assets/images/uni4.jpg",
//     name: "Oxford University",
//     rating: "⭐⭐⭐⭐⭐",
//     description: "Historic university with a strong academic reputation.",
//     benefit: "Rich tradition and academic excellence."
//   },
//   {
//     img: "../assets/images/uni5.jpg",
//     name: "Cambridge University",
//     rating: "⭐⭐⭐⭐⭐",
//     description: "World-renowned for its rigorous academics.",
//     benefit: "Highly ranked across multiple disciplines."
//   },
//   {
//     img: "../assets/images/uni6.jpg",
//     name: "Yale University",
//     rating: "⭐⭐⭐⭐⭐",
//     description: "An Ivy League institution with a strong legacy.",
//     benefit: "Outstanding liberal arts education."
//   }
// ];
// const MultiItemCarousel = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const handleBeforeChange = (nextSlide) => {
//     setCurrentSlide(nextSlide);
//   };

//   const CustomLeftArrow = ({ onClick }) => {
//     return (
//       <img
//         src={arrlowLeft}
//         alt=""
//         onClick={onClick}
//         className={`custom-arrow custom-arrow-left ${
//           currentSlide === 0 ? "bordered" : ""
//         }`}
//       />
//     );
//   };

//   const CustomRightArrow = ({ onClick }) => {
//     return (
//       <img
//         src={arrlowRight}
//         alt=""
//         onClick={onClick}
//         className={`custom-arrow custom-arrow-right ${
//           currentSlide >= items.length - 3 ? "bordered" : ""
//         }`}
//       />
//     );
//   };

//   return (
//     <div
//       style={{
//         width: "80%",
//         margin: "auto",
//         padding: "20px 0",
//         position: "relative",
//         height: "400px",
//       }}
//     >
//       <Carousel
//         responsive={responsive}
//         showDots={true}
//         infinite={false}
//         autoPlay={false}
//         keyBoardControl={true}
//         containerClass="carousel-container"
//         dotListClass="custom-dot-list-style"
//         itemClass="carousel-item-padding-40-px"
//         customLeftArrow={<CustomLeftArrow />}
//         customRightArrow={<CustomRightArrow />}
//         beforeChange={(_, nextSlide) => handleBeforeChange(nextSlide)}
//       >
//         {items.map((item, index) => (
//           <div
//             key={index}
//             className={style.container}
//             style={{
//               margin: "80px 10px 60px 10px",
//               textAlign: "center",
//               marginTop: "80px",
//             }}
//           >
//             <img src={item.img} alt={item.name} style={{ width: "100%", borderRadius: "10px" }} />
//             <h3>{item.name}</h3>
//             <p>{item.rating}</p>
//             <p>{item.description}</p>
//             <strong>{item.benefit}</strong>
//           </div>
//         ))}
//       </Carousel>
//       <style>{`
//         .carousel-container {
//           background-color: white !important;
//         }
//         .custom-dot-list-style li button {
//           background-color: rgba(225, 229, 238, 1) !important;
//           border: none !important;
//           width: 10px !important;
//           height: 10px !important;
//           border-radius: 50%;
//           margin-bottom: -40px !important; 
//         }
//         .custom-dot-list-style li.react-multi-carousel-dot--active button {
//           background-color: rgba(0, 147, 121, 1) !important;
//         }
//         .custom-arrow {
//           position: absolute;
//           top: 10px;
//           border: none;
//           cursor: pointer;
//           padding: 10px;
//           border-radius: 50%;
//         }
//         .custom-arrow-left {
//           right: 130px;
//         }
//         .custom-arrow-right {
//           right: 90px;
//         }
//         .custom-arrow.bordered {
//           border: 2px solid rgba(229, 244, 242, 1) !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default MultiItemCarousel;
