
import { Link } from 'react-router-dom';
function KidsCategorySection() {
  return (
    <div>
          <div className="relative" >
            <img src="/kid3.jpg"alt="Kids" className="w-full object-cover" />
            <div className="absolute bottom-4 md:top-4 left-6">
              <Link to="/products" className="  text-white px-4 py-2" style={{ background: 'linear-gradient(#73C3A0, #DC8DEA)' }}>KIDS</Link>
            </div>
          </div>
    </div>
  )
}

export default KidsCategorySection