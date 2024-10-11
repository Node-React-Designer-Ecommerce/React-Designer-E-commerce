/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState, useContext } from "react";
import { fabric } from "fabric";
import { useLocation, useNavigate, useParams } from "react-router";
import RadioComponent from "../components/RadioComponent";
import SizeCharts from "../components/Charts/SizeCharts";
import XIcon from "../icons/XIcon";

import {
  addText,
  calculateTotalPrice,
  captureScreenShot,
  handleAddImage,
  loadFromJSON,
  removeSelectedObject,
  resetCanvas,
  resizeCanvas,
  saveAsJSON,
  updateTextProps,
} from "../utils/helpers/canvasTools.js";
import { getIsDesignableProductById } from "../utils/api/productsapi.js";
import {
  getdesignById,
  saveCanvasToBackend,
  updateCanvasToBackend,
} from "../utils/api/designerApi.js";
import AuthContext from "../context/AuthContext.jsx";
import { toast } from "react-toastify";

import { useCart } from "../context/CartContext.jsx";

export default function Designer() {
  const { addToCart } = useCart();

  const { id } = useParams();
  const { userId } = useContext(AuthContext);
  const [savedCanvas, setSavedCanvas] = useState(null);
  const canvasRef = useRef(null); // Reference to the canvas element
  const fabricCanvas = useRef(null); // Reference to the Fabric.js canvas
  const [selectedText, setSelectedText] = useState(null); // Track the currently selected text object
  const [textProps, setTextProps] = useState({
    fontSize: 24, // Initial font size
    fill: "#000000", // Initial text color (black)
    fontFamily: "Arial", // Initial font family
    fontWeight: "",
    fontStyle: "",
    textBackgroundColor: "transparent", // Initial background color (transparent)
  });
  const [backgroundImage, setBackgroundImage] = useState(""); // State for background image
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [canvasWidth, setCanvasWidth] = useState(0); // State for canvas width
  const [canvasHeight, setCanvasHeight] = useState(0); // State for canvas height
  const [selectedSize, setSelectedSize] = useState(""); // State for size
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [dragImages, setDragImages] = useState([]);

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  //@@
  const [designId, setDesignId] = useState(null);
  //@@

  const fetchProductAndDesign = async () => {
    if (!id) return;

    setIsLoading(true);
    setIsError(false);

    try {
      // Fetch the product
      const fetchedProduct = await getIsDesignableProductById(id);
      setProduct(fetchedProduct);

      // Fetch the design if 'edit' parameter exists
      const params = new URLSearchParams(window.location.search);
      const editDesignId = params.get("edit");

      if (editDesignId) {
        setDesignId(editDesignId);
        const fetchedDesign = await getdesignById(editDesignId);
        console.log(fetchedDesign);
        setSavedCanvas(fetchedDesign.canvas);
        loadFromJSON(fabricCanvas.current, fetchedDesign.canvas);
        setSelectedSize(fetchedDesign.size);
        setDragImages(fetchedDesign.dragImages || []);
      }
    } catch (err) {
      setIsError(true);
      setError(err);
      console.error("Failed to fetch product or design:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductAndDesign();
    if (savedCanvas) {
      loadFromJSON(fabricCanvas.current, savedCanvas);
    }
  }, []);

  ///@@@@@@@@

  const navigateToLogin = () => {
    navigate(`/login?redirect=product-details/${id}`);
  };

  const stockAvailable = new Set(
    product?.stock?.map((el) => {
      if (el.quantity > 0) {
        return el.size;
      }
    })
  );

  //screenshot capture//////////////////////////////////////////////////////////////////////
  const handleCaptureScreenShot = async () => {
    try {
      const imageOfDesign = await captureScreenShot(fabricCanvas.current);
      return imageOfDesign; // Return the image data
    } catch (error) {
      console.log("screenshoterror", error);
      return null;
    }
  };

  // useeffect/////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (product && canvasRef.current) {
      setBackgroundImage(product.image); // Set the background image
      setName(product.name);
      setPrice(product.price);
      setCanvasWidth(product.canvasWidth); // Set canvas width from product
      setCanvasHeight(product.canvasHeight); // Set canvas height from product
    }

    // Initialize the Fabric.js canvas

    fabricCanvas.current = new fabric.Canvas(canvasRef.current);

    // Function to handle when text is selected or updated
    const handleSelection = (e) => {
      if (e.selected[0].type === "textbox") {
        // Check if a textbox was selected
        setSelectedText(e.selected[0]); // Set the selected text
        setTextProps({
          fontSize: e.selected[0].fontSize, // Set the current text properties in the state
          fill: e.selected[0].fill, // Use the current text color from the state
          fontFamily: e.selected[0].fontFamily,
          fontWeight: e.selected[0].fontWeight,
          fontStyle: e.selected[0].fontStyle,
          // textBackgroundColor: e.selected[0].backgroundColor, // Use the current background color from the state
        });

        console.log("Text selected:", e.selected[0]); // Debugging
      }
    };

    // Listen for text selection and update events
    fabricCanvas.current.on("selection:created", handleSelection);
    fabricCanvas.current.on("selection:updated", handleSelection);

    // Handle clearing of the selection
    fabricCanvas.current.on("selection:cleared", () => {
      setSelectedText(null); // No text is selected
      console.log("Selection cleared"); // Debugging
    });

    // Run resizeCanvas when the component is mounted
    resizeCanvas(fabricCanvas, canvasWidth, canvasHeight);

    // Add event listener for window resizing
    window.addEventListener("resize", () =>
      resizeCanvas(fabricCanvas, canvasWidth, canvasHeight)
    );

    // Function to add a new text object to the canvas

    // Cleanup when the component unmounts
    return () => {
      window.removeEventListener("resize", () =>
        resizeCanvas(fabricCanvas.current, canvasWidth, canvasHeight)
      );
      fabricCanvas.current.dispose(); // Dispose of the Fabric.js canvas
      const addTextBtn = document.getElementById("addTextBtn");
      if (addTextBtn) {
        addTextBtn.removeEventListener("click", addText);
      }
    };
  }, [product, id, canvasHeight, canvasWidth]); // Only re-run this effect if textProps changes

  // add text
  const handleAddText = () => {
    addText(fabricCanvas.current, textProps);
  };

  // Function to update the properties of the selected text
  const handleUpdateTextProps = (prop, value) => {
    setTextProps((prev) => ({ ...prev, [prop]: value }));
    updateTextProps(selectedText, prop, value, fabricCanvas.current);
  };
  // save design
  const handleSaveDesign = async () => {
    try {
      const canvasJSON = saveAsJSON(fabricCanvas.current);
      setSavedCanvas(canvasJSON);
      // console.log("Canvas JSON:", canvasJSON);

      // Get the image data
      const imageOfDesign = await handleCaptureScreenShot();
      // console.log("screenshot", imageOfDesign);

      const basePrice = product.price; // Assuming you have a product object with a price
      const totalPrice = calculateTotalPrice(basePrice, fabricCanvas.current);

      // Convert base64 to blob
      const base64Response = await fetch(imageOfDesign);
      const blob = await base64Response.blob();

      // Create a File object
      const imageFile = new File([blob], "design.jpg", { type: "image/jpeg" });
      // console.log(imageFile.name);

      // Create FormData object
      const formData = new FormData();
      formData.append("productId", id);
      formData.append("userId", userId);
      formData.append("canvas", canvasJSON);
      formData.append("image", imageFile);
      formData.append("totalPrice", totalPrice.toString());
      formData.append("isGamed", "false");
      dragImages.forEach((image) => {
        formData.append(`dragImages`, image); // Append each image to FormData
      });

      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Make the API call to save the design
      //const params = new URLSearchParams(window.location.search);
      let saveResponse;
      //const designId = params.get("edit");
      if (designId) {
        saveResponse = await updateCanvasToBackend(designId, formData);
        toast.success("Your Design updated successfully");
        console.log("Canvas updated successfully:", saveResponse);
        return saveResponse;
      } else {
        saveResponse = await saveCanvasToBackend(formData);
        toast.success("Your Design saved successfully");
        console.log("Canvas saved successfully:", saveResponse);
        // Add the designId to the URL
        const newDesignId = saveResponse.data.design._id;
        setDesignId(newDesignId);
        console.log(newDesignId);
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("edit", newDesignId);
        window.history.pushState({}, "", currentUrl.toString());
        console.log(saveResponse);
        return saveResponse;
      }
      //   const saveResponse = await saveCanvasToBackend(formData);
      //   toast.success("Your Design saved successfully");
      //   console.log("Canvas saved successfully:", saveResponse);
      //   return saveResponse;
    } catch (error) {
      console.error("Error saving canvas:", error);
    }
  };

  //reset canva
  const handleResetCanva = () => resetCanvas(fabricCanvas.current);

  // Function to handle adding an image to the canvas
  const handleAddImageOnCanva = (e) =>
    handleAddImage(e, fabricCanvas.current, setDragImages);

  //remove selected object
  const handleRemoveSelectedObj = () =>
    removeSelectedObject(fabricCanvas.current);

  // add to cart
  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.warn("Please choose your size");
      return;
    }

    const res = await handleSaveDesign();

    console.log(res.data.design._id);

    const cartItem = {
      designId: res.data.design._id,
      quantity: 1,
      size: selectedSize,
      type: "Design",
    };
    try {
      const response = await addToCart(cartItem);
      if (response.status === "Not-Modified") {
        toast.warn(response.message);
      } else if (response.status === "success") {
        toast.success("Item added to cart successfully");
      }
      setIsAdding(false);
    } catch (error) {
      setIsAdding(false);
      toast.error(`${error.message}`);
    }
  };

  return (
    <div className="mb-20">
      <div className="text-textColor text-4xl text-center my-10 font-bold">
        Customize your design
      </div>
      <div className="flex flex-col lg:flex-row mx-20 ">
        {/* T-shirt Canvas */}
        {/* Display the captured screenshot if available */}

        <div className="w-full lg:w-3/4 flex justify-center items-center p-4 ">
          <div
            id="divToTakeScreenshot"
            style={{
              width: "100%",
              height: "600px",
              backgroundImage: `url(${backgroundImage})`,
            }}
            className="flex flex-col justify-center items-center bg-center bg-no-repeat bg-white relative rounded-lg  bg-cover xs:bg-contain mdplus:bg-cover lgplus:bg-contain p-5 "
          >
            {/* Fabric.js Canvas */}
            <canvas
              id="canvasBorder"
              ref={canvasRef} // Reference to the canvas element
              style={{
                border: "1px dashed gray",
              }}
            />
          </div>
        </div>
        {/* Sidebar */}
        <div className="w-full lg:w-2/4 p-4 shadow-md rounded-lg border border-gray-300 text-base-content">
          <div
            style={{ width: "100%", height: "100%" }}
            className="flex flex-col   p-5"
          >
            <div className="flex justify-between">
              <div className="mb-5 font-bold text-2xl text-black">{name}</div>
              <div className="mb-5 font-bold text-2xl ">{price} EG</div>
            </div>
            <div className="flex flex-col justify-center mb-5">
              {/* Image Upload */}
              <div className="flex justify-between mt-5 mb-2">
                <div className="text-xl font-bold">Choose Image </div>
                <span className=" text-xl 0">+ 100EG</span>
              </div>

              <div className="flex justify-between items-center">
                <input
                  id="chooseImg"
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={handleAddImageOnCanva} // Handle the image upload
                />

                {/* Custom Button */}
                <label
                  htmlFor="chooseImg" // Triggers the hidden file input
                  className=" bg-white text-buttonColor py-4 px-4 rounded cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out  w-full border border-buttonColor text-center "
                >
                  Choose Image
                </label>
              </div>

              {/* Button to Add Text */}
              <div className="mt-5">
                <div className="flex justify-between mb-2">
                  <div className="text-xl font-bold">Add Text</div>
                  <span className=" text-xl ">+ 50EG</span>
                </div>
                <button
                  className=" bg-white text-buttonColor py-4 px-4 rounded cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out  w-full border border-buttonColor "
                  id="addTextBtn"
                  onClick={handleAddText}
                >
                  Add Text
                </button>
              </div>
            </div>
            <div className="text-xl font-bold">Text Control</div>
            <div className="bg-lightBackGround p-3 mt-3 rounded ">
              <div className="flex justify-between">
                {/* Font Size Input */}
                <div className="flex  items-center mt-3">
                  <div className="">
                    <label htmlFor="font-size">Font Size</label>
                  </div>
                  <span className="ml-1 text-sm">{textProps.fontSize}</span>
                  <div className="">
                    <input
                      id="font-size"
                      type="range"
                      min={1}
                      max="50"
                      value={textProps.fontSize} // Bind the input to the current font size
                      className="range range-xs"
                      onChange={(e) => {
                        if (
                          parseInt(e.target.value) <= 0 ||
                          e.target.value === ""
                        ) {
                          e.target.value = 1;
                        }
                        handleUpdateTextProps(
                          "fontSize",
                          parseInt(e.target.value)
                        );
                        console.log("Font size changed to:", e.target.value); // Debugging
                        console.log(textProps);
                      }}
                    />
                  </div>
                </div>

                {/* Font Family Selector */}
                <div className="flex gap-3 items-center mt-3 ">
                  <div className="">
                    <label htmlFor="font-style">Font Style</label>
                  </div>
                  <div className="">
                    <select
                      id="font-style"
                      className="select select-sm select-success w-full max-w-xs"
                      value={textProps.fontFamily} // Bind the select dropdown to the current font family
                      onChange={(e) => {
                        handleUpdateTextProps("fontFamily", e.target.value);
                        console.log("Font family changed to:", e.target.value); // Debugging
                        console.log(textProps);
                      }} // Update the font family when changed
                    >
                      <option defaultValue value="arial">
                        Arial
                      </option>
                      <option value="helvetica">Helvetica</option>
                      <option value="verdana">Verdana</option>
                      <option value="georgia">Georgia</option>
                      <option value="courier">Courier</option>
                      <option value="comic sans ms">Comic Sans MS</option>
                      <option value="impact">Impact</option>
                      <option value="monaco">Monaco</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                {/* Color Picker for Text */}
                <div className="flex gap-9 items-center mt-3">
                  <div className="">
                    <label
                      htmlFor="color_picker"
                      className="text-sm font-medium mb-2"
                    >
                      Color
                    </label>
                  </div>
                  <div className="">
                    <input
                      id="color_picker"
                      className="p-1 h-8 w-12 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                      type="color"
                      value={textProps.fill} // Bind the color picker to the current text color
                      onChange={(e) => {
                        handleUpdateTextProps("fill", e.target.value);
                        console.log("Color changed to:", e.target.value); // Debugging
                        console.log(textProps);
                      }} // Update the fill color when changed
                    />
                  </div>
                </div>

                {/* Button to make text Bold */}
                <div className="flex gap-9 items-center mt-3">
                  <div>
                    <label htmlFor="bold-button">Bold</label>
                  </div>
                  <div>
                    <input
                      id="bold-button"
                      type="checkbox"
                      onChange={() => {
                        handleUpdateTextProps(
                          "fontWeight",
                          textProps.fontWeight === "" ? "bold" : ""
                        );
                        console.log("Bold changed to:", textProps.fontWeight); // Debugging
                      }}
                      className="checkbox"
                    />{" "}
                  </div>
                </div>

                <div className="flex gap-9 items-center mt-3">
                  <div>
                    <label htmlFor="italic-button">Italic</label>
                  </div>
                  <div>
                    <input
                      id="italic-button"
                      type="checkbox"
                      value={textProps.italic}
                      onChange={() => {
                        handleUpdateTextProps(
                          "fontStyle",
                          textProps.fontStyle === "" ? "italic" : ""
                        );
                      }}
                      className="checkbox"
                    />{" "}
                  </div>
                </div>
              </div>
            </div>

            {/*chart */}

            <div className="flex flex-col justify-between my-5">
              <div className="flex gap-3">
                <button
                  className="font-bold underline"
                  onClick={() =>
                    document.getElementById("my_modal_5").showModal()
                  }
                >
                  Sizes table
                </button>
              </div>
              <RadioComponent
                setSize={setSelectedSize}
                stock={stockAvailable}
              />
            </div>
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <form method="dialog">
                  <div className="p-3">
                    <button className="float-right rounded-full">
                      <XIcon />
                    </button>
                  </div>
                </form>
                <h3 className="font-bold text-2xl ">Size Charts</h3>
                <p className="py-4">Choose your size carfully ..</p>
                <div className="modal-action justify-center">
                  <form method="dialog">
                    <SizeCharts />
                  </form>
                </div>
              </div>
            </dialog>

            {/*<div className="p-5 flex justify-around">

            <button className="btn btn-error" onClick={handleCaptureScreenShot}>
              {" "}
              screenshot.js{" "}
            </button>
          </div> */}
          </div>
        </div>
      </div>
      <div className="flex justify-end me-32">
        <button
          className="me-5 bg-white text-buttonColor py-2 px-4 rounded cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out mt-5 w-44 border border-buttonColor"
          onClick={handleSaveDesign} // FIXME:
        >
          {/* {isEditing ? "Saved" : "Save Design"} */}
          Save Design
        </button>
        {isLoggedIn ? (
          <button
            onClick={handleAddToCart}
            style={{
              background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
            }}
            className="py-2 px-4 rounded cursor-pointer  hover:bg-green-900 transition duration-700 ease-in-out  text-white btn  mt-5 w-44 me-10 "
            disabled={isAdding}
          >
            {isAdding ? (
              <span className="loading loading-ring loading-md"></span>
            ) : (
              "ADD TO CART"
            )}
          </button>
        ) : (
          <button
            onClick={navigateToLogin}
            className="bg-red-500 hover:bg-red-600 transition duration-700 ease-in-out rounded-2xl w-full text-white py-2 px-14"
          >
            Login to Add to Cart
          </button>
        )}
      </div>

      <div>
        <button
          style={{ borderColor: "#4e7f62" }}
          className="inline-block bg-white text-gray-700 py-2 px-4 rounded cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out mt-5 w-44 border border-indigo-600 mb-5"
          onClick={handleRemoveSelectedObj} // Handle image removal
        >
          Remove Selected Element
        </button>
      </div>
    </div>
  );
}
//wak wak wak //
