

import ProductItem from "../components/ProductItem";
import Hero from './../components/Hero';
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
      <section className="py-10 font-serif ">
        <div className="text-center mb-6">
          <p className="text-gray-500">FEATURED PRODUCTS</p>
          <h2 className="text-2xl font-bold">EDITOR'S PICK</h2>
          <p className="text-gray-500">
            Problems trying to resolve the conflict between
          </p>
        </div>
      </section>
      <div className="w-full  font-serif flex justify-center">
        <div className="grid w-4/5 grid-cols-1 md:grid-cols-3 gap-4">
          <ProductItem className="h-72" ></ProductItem>
        </div>
      </div>

      {/* slider section5 */}
      <Slider></Slider>
     
    </>
  );
}

export default Landing;
