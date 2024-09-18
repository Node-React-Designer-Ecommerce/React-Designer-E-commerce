import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//import pages

import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Landing from "./pages/Landing";

//import Home from './pages/Home';

import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomizePage from "./pages/CustomizePage";
// import ProductsProvider from './hooks/Products';

function App() {
  return (
    <div className="relative">
      <AuthProvider>
        <BrowserRouter>
          <Navbar className="sticky top-0 z-50" />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/customize" element={<CustomizePage />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route
              path="/sign-up"
              element={
                <ProtectedRoute isAuth={false}>
                  <Registration />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute isAuth={false}>
                  <Login />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
