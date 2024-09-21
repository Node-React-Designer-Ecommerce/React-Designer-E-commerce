import HeroSection from '../components/CustomizePage/HeroSection';
import HowItWorks from '../components/CustomizePage/HowItWorks';
import CardOfDesigner from './../components/CustomizePage/CardOfDesigner';

export default function CustomizePage() {
  return (
    <div className="mb-44">

      {/* Her Section  */}
      <HeroSection />

      {/* how it work section */}
      <HowItWorks />
      {/* cards */}
      <CardOfDesigner />
    </div>
  );
}
