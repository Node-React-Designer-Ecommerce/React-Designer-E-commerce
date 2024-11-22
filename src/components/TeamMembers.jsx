import Mail from "../icons/Mail";

export default function TeamMembers() {
  const teamMembers = [
    {
      name: "  Rwan Adel Omar",
      role: "Software Engineer",
      imgSrc: "/rwan.jpg",
      email: "rwan32310@gmail.com",
      linkedIn: "https://www.linkedin.com/in/rwan-adel-7315bb23b/",
    },

    {
      name: "Shady Mohamed Radwan",
      role: "Software Engineer",
      imgSrc: "/shady.jpeg",
      email: "yd.radwan@gmail.com",
      linkedIn: "https://www.linkedin.com/in/shady-radwan-8b0003196/",
    },

    {
      name: "Fatma Elzahraa Abdelaleem",
      role: "Software Engineer",
      imgSrc: "/zahra.jpeg",
      email: "fatmaabdelaleem24@gmail.com",
      linkedIn:
        "https://www.linkedin.com/in/zahra-abdelaleem-%F0%93%82%86-1a56a4139/",
    },

    {
      name: "Yasser Ahmed Salem",
      role: "Software Engineer",
      imgSrc: "/yasser.jpg",
      email: "yassersalem9099@gmail.com",
      linkedIn: "https://www.linkedin.com/in/yasser-salem-118b7b214/",
    },
    {
      name: "Farah Mahmoud Mahfouz",
      role: "Software Engineer",
      imgSrc: "/farah.jpeg",
      email: "farahmahfouz11@gmail.com",
      linkedIn: "https://www.linkedin.com/in/farahmahfouz/",
    },
  ];

  return (
    <div className="flex justify-center items-center  py-10 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 px-5 lg:px-20 ">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="card bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105"
            style={{ height: "450px" }}
          >
            <figure className="px-8 pt-10  ">
              <img
                src={member.imgSrc}
                alt={member.name}
                className="rounded object-cover w-full"
                style={{ height: "250px" }}
              />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title text-lg font-bold mx-auto">
                {member.name}
              </h2>
              <p className="text-gray-600">{member.role}</p>
              <div className="card-actions flex justify-center space-x-4 mt-4">
                <a href={`mailto:${member.email}`} className="text-green-500">
                  <Mail />
                </a>
                <a href={member.linkedIn}>
                  <img src="/linkdIn.png" alt="LinkedIn" className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
