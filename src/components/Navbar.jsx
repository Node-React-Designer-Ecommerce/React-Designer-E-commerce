import { Link } from 'react-router-dom';


export default function Navbar() {


  return (
    <div className="">

      <div className="navbar bg-base-100 border-b-2 ">
        <div className="flex-1">
          <Link to="/" className=''>
            <img src="/drying-clothes-3d-icon-png.webp"  width={100} alt="logo" />
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
              <Link to="/login" className='px-5 py-1 font-bold text-sky-500 text-lg  hover:text-sky-400 hover:transition-all'>Login</Link>
              <Link to="/sign-up" className='px-5 py-1 font-bold text-sky-500 text-lg  hover:text-sky-400 hover:transition-all'>Register</Link>
              <Link to="/products" className='px-5 py-1 font-bold text-sky-500 text-lg  hover:text-sky-400 hover:transition-all'>Products</Link>
              <button className='btn-sm   text-lg bg-red-600 text-white rounded-lg font-bold hover:bg-red-500 hover:transition-all'>Logout</button>
          </ul>
        </div>
      </div>

    </div>
  );
}