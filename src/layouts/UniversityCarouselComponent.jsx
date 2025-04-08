import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export function UniCarousel() {
  const universities = [
    {
      name: "Shymkent University of...",
      image: "/public/almaty.png",
      description: "Short Description",
      tag: "High employment rate",
      rating: "5.0",
    },
    {
      name: "Astana International U...",
      image: "/public/almaty.png",
      description: "Short Description",
      tag: "High employment rate",
      rating: "5.0",
    },
    {
      name: "Kazakh National Unive...",
      image: "/public/almaty.png",
      description: "Short Description",
      tag: "High employment rate",
      rating: "5.0",
    },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <div className="p-8">
      <Carousel
        responsive={responsive}
        swipeable
        draggable
        showDots
        infinite
        keyBoardControl
        containerClass="carousel-container"
        itemClass="px-2"
      >
        {universities.map((uni, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div className="relative">
              <img
                src={uni.image}
                alt={uni.name}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow">
                ❤️
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold truncate">{uni.name}</h2>
                <span className="border border-gray-300 rounded px-2 py-0.5 text-sm">
                  {uni.rating}
                </span>
              </div>
              <p className="text-sm text-gray-600">{uni.description}</p>
              <span className="inline-block mt-3 bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                {uni.tag}
              </span>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
