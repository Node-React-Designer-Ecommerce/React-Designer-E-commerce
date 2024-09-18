
import { Link } from 'react-router-dom';
function MenCategorySection() {
  return (
    <div>
          <div className="relative">
            <img src="men.jpg" alt="Men" className="w-full h-auto object-cover" />
            <div className="absolute bottom-4 left-4">
              <Link to="/products" className="bg-SecondaryColor text-white  px-4 py-2">MEN</Link>
            </div>
          </div>
    </div>
  )
}

export default MenCategorySection