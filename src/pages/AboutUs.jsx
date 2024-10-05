import TeamMembers from "../components/TeamMembers";

export default function AboutUs() {
  return (
    <div>
      <div
        className="pt-5"
        style={{
          background: "linear-gradient(to right, #73C3A0, #DC8DEA)",
        }}
      >
        <div>
          {/* Title Section */}
          <div className="text-white text-2xl font-bold  text-center  ">
            <h1>Our Team</h1>
          </div>

          {/* Center the Team Members */}
          <div>
            <TeamMembers />
          </div>
        </div>
      </div>

      {/* Other sections can go here */}
      <div
        style={{ width: "600px" }}
        className="bg-lightBackGround  h-72 rounded my-10 mx-auto p-10 rounded text-lg"
      >
        At Samm, we believe in the power of personal expression. Our journey
        began with a simple idea: everyone should have the opportunity to wear
        something that represents their unique style and personality. That's why
        we created a platform where fashion meets creativity, allowing customers
        to design their own T-shirts and create one-of-a-kind pieces. Our
        mission is to provide high-quality clothing that you can personalize,
        empowering you to express yourself in your way.
      </div>

      <div className="grid grid-cols-2 ">
        <div className="text-center text-3xl text-purpleColor ">
          Our Values :{" "}
        </div>
        <div className="text-start">
          <div>
            {" "}
            Quality : We use premium materials and advanced printing techniques
            to ensure each custom design is vibrant, durable, and crafted with
            care.
          </div>
          <div>
            {" "}
            Sustainability : We prioritize eco-friendly practices, using organic
            cotton and non-toxic, water-based inks to reduce our environmental
            impact.
          </div>
          <div>
            {" "}
            Customer-Centered : We focus on providing an easy, enjoyable design
            process and reliable delivery, with customer satisfaction as our top
            priority.
          </div>
        </div>
      </div>
    </div>
  );
}
