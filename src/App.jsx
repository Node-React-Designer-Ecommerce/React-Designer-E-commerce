import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
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
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
