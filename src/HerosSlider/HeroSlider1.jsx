
function HeroSlider1() {
  return (
    <div id="slide1" className="carousel-item relative w-full h-full">
    <img src="Hero design.png" className="w-full h-full object-cover" />
    <div className="absolute -translate-x-1/4 left-5  md:left-3  right-5 md:right-5 top-1/2 ">
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl  font-bold">
          Show The World Your <br />
          Own Unique Style
        </h2>

        <button className="btn rounded-none text-sm md:text-base px-4 mt-4 py-2 md:px-6 md:py-3 bg-SecondaryColor hover:bg-green-800">
          SHOP NOW
        </button>
      </div>
    </div>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-2 md:left-5 right-2 md:right-5 top-1/2">
      <a href="#slide3" className="btn rounded-none btn-square">
        ❮
      </a>
      <a href="#slide2" className="btn rounded-none btn-square">
        ❯
      </a>
    </div>
  </div>
  )
}

export default HeroSlider1