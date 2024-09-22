import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import Components
import Navbar from './layouts/Navbar';
import Footer from "./layouts/Footer";



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
import Designer from "./pages/Designer";
import Error from './components/Error';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000
    }
  }
});


function App() {
  return (
    <div className="relative">
      <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
        <AuthProvider>
          <BrowserRouter>
            <Navbar className="sticky top-0 z-50" />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/customize" element={<CustomizePage />} />
              <Route path="/Designer/:id" element={<Designer />} />
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
               <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
