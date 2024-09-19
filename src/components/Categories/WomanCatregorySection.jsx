
import { Link } from 'react-router-dom';
function WomanCatregorySection() {
  return (
    <div>
    
      <img src="/women2.jpg" alt="Women" className="w-full h-auto object-cover" />
      <div className="absolute bottom-4 left-4">
        <Link to="/products" className="bg-SecondaryColor text-white px-4 py-2">
          WOMEN
        </Link>
      </div>
    </div>
  );
}

export default WomanCatregorySection;
