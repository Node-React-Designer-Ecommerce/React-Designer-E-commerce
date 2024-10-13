import Hero from "../components/Landing/Hero";
// import Slider from "../components/Landing/Slider";
import CategorySection from "./../components/Landing/CategorySection";
import MiniSection from "../components/Landing/MiniSection";
import LandingProductItem from "./../layouts/LandingProductItem";
import Heroo from "../components/Landing/Heroo";
// import Heroo from '../components/Landing/Heroo';

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
      <section className="mt-5 ">
        <div className="text-center mb-6">
          <p className="text-gray-500">FEATURED PRODUCTS</p>
          <h2 className="text-2xl font-bold text-textColor">BEST SELLER</h2>
          <p className="text-gray-500 text-l">
            Discover our best-selling clothing pieces <br /> that combine style
            and quality to complete your perfect look
          </p>
        </div>
      </section>

      <LandingProductItem className="h-72"></LandingProductItem>

      {/* slider section5 */}
      <Heroo/>
    </>
  );
}

export default Landing;
