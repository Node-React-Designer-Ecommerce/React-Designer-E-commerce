import slider1 from "../images/slider1.png";
import slider2 from "../images/slider2.png";
import slider3 from "../images/slider3.png";
function Hero() {
  return (
    <div className="carousel font-serif w-full h-screen">
    <div id="slide1" className="carousel-item relative w-full h-full">
      <img src={slider1} className="w-full h-full object-cover" />
      <div className="absolute -translate-x-1/4 left-5  md:left-3  right-5 md:right-5 top-1/2 ">
        <div className="text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold">NEW COLLECTION</h2>
          <p className="my-2 md:my-4 text-sm md:text-base">
            We know how large objects will act, but things on a small scale.
          </p>
          <button className="btn text-sm md:text-base px-4 py-2 md:px-6 md:py-3">
            SHOP NOW
          </button>
        </div>
      </div>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-2 md:left-5 right-2 md:right-5 top-1/2">
        <a href="#slide3" className="btn btn-circle">
          ❮
        </a>
        <a href="#slide2" className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>

    <div id="slide2" className="carousel-item  relative w-full h-full">
      <img src={slider2} className="w-full h-full object-cover" />
      <div className="absolute -translate-x-1/4 left-5  md:left-3  right-5 md:right-5 top-1/2">
        <div className="text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold">
            WINTER COLLECTION
          </h2>
          <p className="my-2 md:my-4 text-sm md:text-base">
            We know how large objects will act, but things on a small scale.
          </p>
          <button className="btn text-sm md:text-base px-4 py-2 md:px-6 md:py-3">
            SHOP NOW
          </button>
        </div>
      </div>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-2 md:left-5 right-2 md:right-5 top-1/2">
        <a href="#slide1" className="btn btn-circle">
          ❮
        </a>
        <a href="#slide3" className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>

    <div id="slide3" className="carousel-item relative w-full h-full">
      <img src={slider3} className="w-full h-full object-cover" />
      <div className="absolute -translate-x-1/4 left-5  md:left-3  right-5 md:right-5 top-1/2">
        <div className="text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold">SUMMER SALE</h2>
          <p className="my-2 md:my-4 text-sm md:text-base">
            We know how large objects will act, but things on a small scale.
          </p>
          <button className="btn text-sm md:text-base px-4 py-2 md:px-6 md:py-3">
            SHOP NOW
          </button>
        </div>
      </div>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-2 md:left-5 right-2 md:right-5 top-1/2">
        <a href="#slide2" className="btn btn-circle">
          ❮
        </a>
        <a href="#slide1" className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
  </div>
  )
}

export default Hero