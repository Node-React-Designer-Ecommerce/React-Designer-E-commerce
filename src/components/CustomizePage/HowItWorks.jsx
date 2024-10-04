export default function HowItWorks() {
  return (
    <div className="p-8 sm:p-16  bg-lightBackGround">
      <div>
        <div className="mb-5 font-bold text-3xl sm:text-4xl text-purpleColor text-center">
          How it works?
        </div>
        <div className="mb-5 text-lg sm:text-2xl text-black text-center">
          It’s that simple to create and shop your perfect T-shirt!
        </div>
        <div
          style={{
            backgroundImage: "url('/public/Curve.png')",
            backgroundRepeat: "no-repeat",
          }}
          className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ms-20 "
        >
          <div className=" w-80  card card-side bg-base-100 shadow-xl    flex flex-col ">
            <div className="mx-auto bg-purpleColor text-white text-4xl p-3 mt-3 rounded">
              1
            </div>
            <div className="card-body  flex flex-col  items-center">
              <h2 className="card-title text-xl sm:text-2xl">choose</h2>
              <p className="text-base sm:text-xl text-center">
                Start by selecting your favorite style and color.
              </p>
            </div>
          </div>

          <div className="w-80  card card-side bg-base-100 shadow-xl   flex flex-col ">
            <div className="mx-auto bg-purpleColor text-white text-4xl p-3 mt-3 rounded">
              2
            </div>
            <div className="card-body  flex flex-col  items-center">
              <h2 className="card-title text-xl sm:text-2xl">Design</h2>
              <p className="text-base sm:text-xl text-center">
                Use our intuitive design tools to personalize your T-shirt with
                text and images.
              </p>
            </div>
          </div>
          <div className="w-80  card card-side bg-base-100 shadow-xl   flex flex-col ">
            <div className="mx-auto bg-purpleColor text-white text-4xl p-3 mt-3 rounded">
              3
            </div>
            <div className="card-body  flex flex-col  items-center">
              <h2 className="card-title text-xl sm:text-2xl">Add to cart</h2>
              <p className="text-base sm:text-xl text-center">
                Once your masterpiece is complete, add it to your cart.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
