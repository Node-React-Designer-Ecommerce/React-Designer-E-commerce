import { useState, useEffect } from "react";

function Slider() {


  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      backgroundColor: "bg-black",
      image: "/slider2.jpg",
      text: "Vita Classic Product",
      price: "$50.99",
      buttonText: "Add to Cart",
    },
    {
      backgroundColor: "bg-custom-bg",
      image: "/couples3.jpg",
      text: "Custom Hoodie  ",
      price: "$99.99",
      buttonText: "Buy Now",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Slide every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentSlide, nextSlide]);
  return (
    <div className="carousel font-serif  mt-8 w-full h-screen relative">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0"
            } ${slide.backgroundColor}`}
        >
          <div className="flex items-center justify-between h-full px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="text-white text-center sm:text-start flex flex-col justify-center items-center">
                <h2 className="text-4xl font-bold">{slide.text}</h2>
                <p className="mt-4">{slide.price}</p>
                <button className="btn mt-6 rounded-none">{slide.buttonText}</button>
              </div>
              <div className="flex justify-center items-center">
                <img
                  src={slide.image}
                  alt={slide.text}
                  className="w-3/4 h-3/4  object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>

        </div>
      ))}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white"
        onClick={prevSlide}
      >
        ❮
      </button>
      <button
        className="absolute  right-2 top-1/2 transform -translate-y-1/2 text-white"
        onClick={nextSlide}
      >
        ❯
      </button>
    </div>
  )
}

export default Slider