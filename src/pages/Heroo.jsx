
const Heroo = () => {
  return (
    <div className="carousel w-full h-screen relative">
      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="hero.png"
          className="w-full h-full object-cover"
          alt="Fashion slide"
        />

        {/* النص الرئيسي */}
        <div className="absolute top-1/3 left-10 md:left-20 text-left text-white">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Crafting a new age of <span className="text-primary">fashion</span>
          </h1>
          <p className="text-lg mt-4">
            Discover the Latest Trends, Timeless Classics, and Ultimate Comfort.
          </p>
        </div>

        {/* الأسهم للتنقل جمب بعض */}
        <div className="absolute top-[43%] right-10 flex space-x-4">
          <a href="#slide3" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>

        {/* الأزرار تحت الجملة كل واحد في زر مستقل */}
        <div className="absolute top-[50%] right-10 flex felx-row space-y-4 ">
          <button className="btn btn-outline btn-sm">Denim Jacket</button>
          <button className="btn btn-outline btn-sm">Jeans</button>
        </div>

        {/* زر Start Shopping في منتصف الأسفل */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <button className="btn btn-secondary">Start Shopping ↗</button>
        </div>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://via.placeholder.com/1200x600"
          className="w-full h-full object-cover"
          alt="Fashion slide"
        />
        <div className="absolute top-1/3 left-10 md:left-20 text-left text-white">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Timeless Classics <span className="text-primary">for You</span>
          </h1>
          <p className="text-lg mt-4">
            Find your style with our latest collections.
          </p>
        </div>

        <div className="absolute top-[43%] right-10 flex space-x-4">
          <a href="#slide1" className="btn btn-circle">❮</a>
          <a href="#slide3" className="btn btn-circle">❯</a>
        </div>

        <div className="absolute top-[50%] right-10 flex flex-col space-y-4 text-right">
          <button className="btn btn-outline btn-sm">Denim Jacket</button>
          <button className="btn btn-outline btn-sm">Jeans</button>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <button className="btn btn-secondary">Explore Now </button>
          <button className="btn btn-secondary">↗ </button>
        </div>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="https://via.placeholder.com/1200x600"
          className="w-full h-full object-cover"
          alt="Fashion slide"
        />
        <div className="absolute top-1/3 left-10 md:left-20 text-left text-white">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Ultimate Comfort <span className="text-primary">Awaits</span>
          </h1>
          <p className="text-lg mt-4">
            Shop our exclusive collection designed for comfort and style.
          </p>
        </div>

        <div className="absolute top-[43%] right-10 flex space-x-4">
          <a href="#slide2" className="btn btn-circle">❮</a>
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>

        <div className="absolute top-[50%] right-10 flex flex-col space-y-4 text-right">
          <button className="btn btn-outline btn-sm">Denim Jacket</button>
          <button className="btn btn-outline btn-sm">Jeans</button>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <button className="btn btn-secondary">Discover More ↗</button>
        </div>
      </div>
    </div>
  );
};

export default Heroo;
