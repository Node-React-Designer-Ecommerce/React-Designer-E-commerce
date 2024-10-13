export default function HeroSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4  mb-20">
      <div className="md:col-span-2  ">
        <img
          //style={{ width: "800px", height: "400px" }}
          src="/public/GirlHeader.png"
          alt="girlHeader"
        />
      </div>
      <div className="bg-white flex justify-start items-center text-gray-600 md:col-span-2  p-4 ">
        <div className="text-lg w-full md:w-[600px]">
          <div className="mb-5 font-bold text-4xl text-textColor text-center">
            Create Your Perfect T-Shirt !
          </div>
          <p className="text-center">
            {" "}
            Design custom T-shirts with ease using our intuitive tools. Choose
            colors, fonts, and images, or upload your own artwork. Start
            designing today and wear your creativity with pride!
          </p>
        </div>
      </div>
    </div>
  );
}
