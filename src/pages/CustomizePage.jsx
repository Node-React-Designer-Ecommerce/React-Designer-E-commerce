export default function CustomizePage() {
  return (
    <div className="mb-44">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-32">
        <div className="bg-SecondaryColor flex justify-center items-center">
          <img
            className="w-60 h-80 mt-20 mx-auto"
            src="girl.png"
            alt="men t-shirt"
          />
        </div>
        <div className="bg-white flex justify-start items-center text-gray-600 md:col-span-2 p-4">
          <div className="text-lg w-full md:w-[600px]">
            <div className="mb-5 font-bold text-3xl text-black">
              Create Your Perfect T-Shirt!
            </div>
            Design custom T-shirts with ease using our intuitive tools. Express
            your style, commemorate events, or make unique gifts. Choose colors,
            fonts, and images, or upload your own artwork. Start designing today
            and wear your creativity with pride!
          </div>

          <div className="hidden md:flex w-44 h-44 rounded-full bg-SecondaryColor mt-44 ms-48"></div>
        </div>
      </div>
      {/* how it work section */}
      <div className="p-4">
        <div>
          <div className="mb-5 font-bold text-4xl text-black text-center">
            How it works?
          </div>
          <div className="mb-5 text-2xl text-black text-center">
            It’s that simple to create and shop your perfect T-shirt!
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
            <div className="card card-side bg-base-100 shadow-xl w-full max-w-md mx-auto">
              <div className="rounded-full w-10 h-20 sm:w-14 sm:h-16 md:w-16 md:h-20 bg-SecondaryColor pt-4  mb-5 font-bold text-3xl sm:text-4xl md:text-4xl text-white text-center m-5">
                1
              </div>

              <div className="card-body">
                <h2 className="card-title text-xl sm:text-2xl">choose</h2>
                <p className="text-base sm:text-xl">
                  Start by selecting your favorite style and color.
                </p>
                <div className="card-actions justify-end">
                  <img
                    src="icon1.png"
                    alt="icon1"
                    className="w-8 sm:w-12 md:w-16"
                  />
                </div>
              </div>
            </div>

            <div className="card card-side bg-base-100 shadow-xl w-full max-w-md mx-auto">
              <div className="rounded-full w-16 h-20 sm:w-24 sm:h-16 md:w-28 md:h-20 pt-4 bg-SecondaryColor mb-5 font-bold text-3xl sm:text-4xl md:text-4xl text-white text-center m-5">
                2
              </div>
              <div className="card-body">
                <h2 className="card-title text-xl sm:text-2xl">Design</h2>
                <p className="text-base sm:text-xl">
                  Use our intuitive design tools to personalize your T-shirt
                  with text and images.
                </p>
                <div className="card-actions justify-end">
                  <img
                    src="icon2.png"
                    alt="icon2"
                    className="w-8 sm:w-12 md:w-16"
                  />
                </div>
              </div>
            </div>
            <div className="card card-side bg-base-100 shadow-xl w-full max-w-md mx-auto">
              <div className="rounded-full w-16 h-20 sm:w-24 sm:h-16 md:w-28 md:h-20 pt-4 bg-SecondaryColor mb-5 font-bold text-3xl sm:text-4xl md:text-4xl text-white text-center m-5">
                3
              </div>

              <div className="card-body">
                <h2 className="card-title text-xl sm:text-2xl">Add to cart</h2>
                <p className="text-base sm:text-xl">
                  Once your masterpiece is complete, add it to your cart with
                  just a click and proceed to checkout.
                </p>
                <div className="card-actions justify-end">
                  <img
                    src="icon3.png"
                    alt="icon3"
                    className="w-8 sm:w-12 md:w-16"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
