
import { Link } from 'react-router-dom';
function KidsCategorySection() {
  return (
    <div>
          <div className="relative">
            <img src="kids.jpg"alt="Kids" className="w-full object-cover" />
            <div className="absolute top-4 left-6">
              <Link to="/products" className="bg-SecondaryColor text-white px-4 py-2">KIDS</Link>
            </div>
          </div>
    </div>
  )
}

export default KidsCategorySection