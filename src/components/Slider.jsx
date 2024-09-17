import { useState, useEffect } from "react";

function Slider() {


    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
      {
        backgroundColor: "bg-SecondaryColor",
        image: "preview.png",
        text: "Vita Classic Product",
        price: "$16.48",
        buttonText: "Add to Cart",
      },
      {
        backgroundColor: "bg-black",
        image: "removebg-preview.png",
        text: "Summer 2020",
        price: "$19.99",
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
            className={`absolute w-full h-full transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } ${slide.backgroundColor}`}
          >
            <div className="flex items-center justify-between h-full px-8">
              <div className="text-white">
                <h2 className="text-4xl font-bold">{slide.text}</h2>
                <p className="mt-4">{slide.price}</p>
                <button className="btn mt-6 rounded-none">{slide.buttonText}</button>
              </div>
              <img
                src={slide.image}
                alt={slide.text}
                className="w-1/2  h-auto object-cover"
              />
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