import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import Components
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

//import pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomizePage from "./pages/CustomizePage";
import Designer from "./pages/Designer";
import Error from "./components/Error";
import CartPage from "./pages/CartPage";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import { FavoriteProductsProvider } from "./context/FavoriteProductsContext";
import SuccessPayment from "./pages/SuccessPayment";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <div className="relative">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <CartProvider>
          <AuthProvider>
            <BrowserRouter>
              <ProductsProvider>
                <FavoriteProductsProvider>
                  {/* Conditionally render Navbar and Footer */}
                  <Routes>
                    <Route
                      path="/success-payment"
                      element={
                        <ProtectedRoute>
                          <SuccessPayment />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="*"
                      element={
                        <>
                          <Navbar className="sticky top-0 z-50" />
                          <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route path="/products" element={<ProductsPage />} />
                            <Route path="/customize" element={<CustomizePage />} />
                            <Route path="/Designer/:id" element={<Designer />} />
                            <Route
                              path="/product-details/:id"
                              element={<ProductDetails />}
                            />
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
                            <Route
                              path="/cart"
                              element={
                                <ProtectedRoute>
                                  <CartPage />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/forget-password"
                              element={
                                <ProtectedRoute isAuth={false}>
                                  <ForgetPassword />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/reset-password/:token"
                              element={
                                <ProtectedRoute isAuth={false}>
                                  <ResetPassword />
                                </ProtectedRoute>
                              }
                            />
                            <Route path="*" element={<Error />} />
                          </Routes>
                          <Footer />
                        </>
                      }
                    />
                  </Routes>
                </FavoriteProductsProvider>
              </ProductsProvider>
            </BrowserRouter>
          </AuthProvider>
        </CartProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;