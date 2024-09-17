import HeroSlider1 from "./HeroSlider1";
import HeroSlider2 from "./HeroSlider2";
import HeroSlider3 from "./HeroSlider3";
function Hero() {
  return (
    <div className="carousel font-serif w-full h-screen">
      <HeroSlider1></HeroSlider1>
      <HeroSlider2></HeroSlider2>
      <HeroSlider3></HeroSlider3>
    </div>
  );
}

export default Hero;
