import HeroSlider1 from "../HerosSlider/HeroSlider1";
import HeroSlider2 from "../HerosSlider/HeroSlider2";
import HeroSlider3 from "../HerosSlider/HeroSlider3";
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
