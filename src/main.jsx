// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify"; // Import ToastContainer

// import ProductsProvider from "./context/ProductsContext.jsx"

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <>
    {/* <ProductsProvider> */}
    <App />
    <ToastContainer
      className="fixed top-16 right-4 z-50" // Updated for top-right positioning
      toastClassName="bg-white bg-opacity-70 text-black rounded-lg shadow-lg p-4"
      closeOnClick
    />
  </>
  // </StrictMode>
);
