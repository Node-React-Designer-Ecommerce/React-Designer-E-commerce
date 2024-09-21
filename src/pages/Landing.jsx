import Hero from "../components/Landing/Hero";
import Slider from "../components/Landing/Slider";
import CategorySection from './../components/Landing/CategorySection';
import MiniSection from '../components/Landing/MiniSection';
import LandingProductItem from './../layouts/LandingProductItem';

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

      <LandingProductItem className="h-72"></LandingProductItem>

      {/* slider section5 */}
      <Slider></Slider>
    </>
  );
}

export default Landing;
