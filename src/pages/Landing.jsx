import Hero from "../components/Hero";
import MiniSection from "../components/MiniSection";
import CategorySection from "../components/CategorySection";
import Slider from "../components/Slider";

function Landing() {
  return (
    <>
      {/* Hero Section */}
      <Hero></Hero>

      {/*  Mini section2 */}
      <MiniSection></MiniSection>

      {/*CategorySection- section3 */}
      <CategorySection></CategorySection>

      {/*ProductItem- section4 */}
      <section className="py-10 ">
        <div className="text-center mb-6">
          <p className="text-gray-500">FEATURED PRODUCTS</p>
          <h2 className="text-2xl font-bold">BEST SELLER</h2>
          <p className="text-gray-500 text-2xl">
            Discover our best-selling clothing pieces <br /> that combine style and
            quality to complete your perfect look
          </p>
        </div>
      </section>

      <ProductItem className="h-72"></ProductItem>

      {/* slider section5 */}
      <Slider></Slider>
    </>
  );
}

export default Landing;
