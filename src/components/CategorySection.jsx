import KidsCategorySection from "../components/Categories/KidsCategorySection";
import MenCategorySection from "../components/Categories/MenCategorySection";
import WomanCatregorySection from "../components/Categories/WomanCatregorySection";
function CategorySection() {
  return (
    <section className="py-10 ">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">CATEGORY SECTION</h2>
        <p className="text-gray-500 mb-11">
        Explore our diverse categories to find the perfect styles <br /> that suit your taste and needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Men Section */}
        <MenCategorySection></MenCategorySection>

        {/* Kids Section */}
        <KidsCategorySection></KidsCategorySection>

        {/* Women's Section */}
        <div className="relative">
          <WomanCatregorySection></WomanCatregorySection>
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
