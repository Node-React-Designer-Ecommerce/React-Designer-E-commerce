import men from "../images/men.jpg";
import woman from "../images/woman.jpg";
import kids from "../images/kids.jpg";
function CategorySection() {
  return (
    <section className="py-10 font-serif">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">EDITORS PICK</h2>
          <p className="text-gray-500">
            Problems trying to resolve the conflict between
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


          <div className="relative">
            <img src={men} alt="Men" className="w-full h-auto object-cover" />
            <div className="absolute bottom-4 left-4">
              <button className="bg-white text-black px-4 py-2">MEN</button>
            </div>
          </div>

          {/* Kids Section */}
          <div className="relative">
            <img src={kids} alt="Kids" className="w-full object-cover" />
            <div className="absolute top-4 left-6">
              <button className="bg-white text-black px-4 py-2">KIDS</button>
            </div>
          </div>

          {/* Women's Section */}
          <div className="relative">
            <img
              src={woman}
              alt="Women"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <button className="bg-white text-black px-4 py-2">WOMEN</button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default CategorySection