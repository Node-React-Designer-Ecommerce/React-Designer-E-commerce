import TeamMembers from "../components/TeamMembers";

export default function AboutUs() {
  return (
    <div>
      <div>
        <img src="/public/aboutus.png" alt="hero" />
      </div>
      <div className="text-center text-4xl my-8 font-bold ">
        <div className="text-textColor">Who Are We ?</div>
        <div
          className="text-xl mx-auto font-normal mt-5"
          style={{ width: "1000px" }}
        >
          At Samm, we believe in the power of personal expression. Our journey
          began with a simple idea: everyone should have the opportunity to wear
          something that represents their unique style and personality.
          That&apos;s why we created a platform where fashion meets creativity,
          allowing customers to design their own T-shirts and create
          one-of-a-kind pieces.
        </div>
      </div>

      <div className="text-center text-4xl my-8 font-bold bg-lightBackGround p-10 ">
        <div className="text-textColor">Our Mission</div>
        <div
          className="text-xl mx-auto font-normal mt-5"
          style={{ width: "1000px" }}
        >
          Our mission is to provide high-quality clothing that you can
          personalize, empowering you to express yourself in your way.
        </div>
      </div>

      <div className="text-center text-4xl my-8   p-10 ">
        <div className="text-textColor mb-5 font-bold">Our Values</div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ms-20 ">
          <div className=" w-80  card card-side bg-base-100 shadow-xl    flex flex-col ">
            <div className="card-body  flex flex-col  items-center">
              <h2 className="card-title text-xl sm:text-2xl text-textColor">
                Quality
              </h2>
              <p className="text-base sm:text-xl text-center ">
                We use premium materials and advanced printing techniques to
                ensure each custom design is vibrant, durable, and crafted with
                care.
              </p>
            </div>
          </div>

          <div className="w-80  card card-side bg-base-100 shadow-xl   flex flex-col ">
            <div className="card-body  flex flex-col  items-center">
              <h2 className="card-title text-xl sm:text-2xl text-textColor font-bold">
                Sustainability
              </h2>
              <p className="text-base sm:text-xl text-center">
                We prioritize eco-friendly practices, using organic cotton and
                non-toxic, water-based inks to reduce our environmental impact.
              </p>
            </div>
          </div>
          <div className="w-80  card card-side bg-base-100 shadow-xl   flex flex-col ">
            <div className="card-body  flex flex-col  items-center">
              <h2 className="card-title text-xl sm:text-2xl text-textColor font-bold">
                Customer-Centered
              </h2>
              <p className="text-base sm:text-xl text-center">
                We focus on providing an easy, enjoyable design process and
                reliable delivery, with customer satisfaction as our top
                priority.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pt-5"
        style={{
          background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
        }}
      >
        <div>
          {/* Title Section */}
          <div className="text-white text-4xl font-bold  text-center pt-5  ">
            <h1>Our Team</h1>
          </div>

          {/* Center the Team Members */}
          <div>
            <TeamMembers />
          </div>
        </div>
      </div>

      {/* Other sections can go here */}
    </div>
  );
}
