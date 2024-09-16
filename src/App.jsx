import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Components
import Navbar from "./components/Navbar";

//import pages

import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Landing from './pages/Landing';

//import Home from './pages/Home';

import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';
// import ProductsProvider from './hooks/Products';





function App() {
  return (

    <div className='m-2 relative'>
      <BrowserRouter>
        <Navbar className="sticky" />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<ProductsPage/>}/>
          <Route path="/product-details/:id" element={<ProductDetails/>}/>

          <Route path="/sign-up" element={<Registration />} />
           <Route path="/landing" element={<Landing />} />


        </Routes>
      </BrowserRouter>
    </div>

  )

}

export default App;
