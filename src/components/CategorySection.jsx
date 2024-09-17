import woman from "../images/woman.jpg";
import KidsCategorySection from './KidsCategorySection';
import MenCategorySection from './MenCategorySection';
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

        {/* Men Section */}
        <MenCategorySection></MenCategorySection>

          {/* Kids Section */}
        <KidsCategorySection></KidsCategorySection>

          {/* Women's Section */}
          <div className="relative">
            <img
              src={woman}
              alt="Women"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <button className="bg-SecondaryColor text-black px-4 py-2">WOMEN</button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default CategorySection