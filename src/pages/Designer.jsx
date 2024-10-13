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
  const [totalPrice, setTotalPrice] = useState("");
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
  const [designId, setDesignId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [canvasObjects, setCanvasObjects] = useState([]);

  const fetchProductAndDesign = async () => {
    if (!id) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const fetchedProduct = await getIsDesignableProductById(id);
      setProduct(fetchedProduct);

      const params = new URLSearchParams(window.location.search);
      const editDesignId = params.get("edit");

      if (editDesignId) {
        setDesignId(editDesignId);
        const fetchedDesign = await getdesignById(editDesignId);
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

  const handleCaptureScreenShot = async () => {
    try {
      const imageOfDesign = await captureScreenShot(fabricCanvas.current);
      return imageOfDesign;
    } catch (error) {
      console.log("screenshoterror", error);
      return null;
    }
  };

  useEffect(() => {
    if (product && canvasRef.current) {
      setBackgroundImage(product.image);
      setName(product.name);
      setPrice(product.price);
      setCanvasWidth(product.canvasWidth);
      setCanvasHeight(product.canvasHeight);
    }

    fabricCanvas.current = new fabric.Canvas(canvasRef.current);

    const handleObjectAdded = (e) => {
      console.log("Object added:", e.target.type);
      setCanvasObjects((prevObjects) => [...prevObjects, e.target]);
    };

    const handleObjectRemoved = (e) => {
      console.log("Object removed:", e.target.type);
      setCanvasObjects((prevObjects) =>
        prevObjects.filter((obj) => obj !== e.target)
      );
    };

    fabricCanvas.current.on("object:added", handleObjectAdded);
    fabricCanvas.current.on("object:removed", handleObjectRemoved);

    updateTotalPrice();

    const handleSelection = (e) => {
      if (e.selected[0].type === "textbox") {
        setSelectedText(e.selected[0]);
        setTextProps({
          fontSize: e.selected[0].fontSize,
          fill: e.selected[0].fill,
          fontFamily: e.selected[0].fontFamily,
          fontWeight: e.selected[0].fontWeight,
          fontStyle: e.selected[0].fontStyle,
        });
        console.log("Text selected:", e.selected[0]);
      }
    };

    fabricCanvas.current.on("selection:created", handleSelection);
    fabricCanvas.current.on("selection:updated", handleSelection);

    fabricCanvas.current.on("selection:cleared", () => {
      setSelectedText(null);
      console.log("Selection cleared");
    });

    resizeCanvas(fabricCanvas, canvasWidth, canvasHeight);

    window.addEventListener("resize", () =>
      resizeCanvas(fabricCanvas, canvasWidth, canvasHeight)
    );

    return () => {
      if (fabricCanvas.current) {
        const canvas = fabricCanvas.current;
        canvas.off("selection:created");
        canvas.off("selection:cleared");
        fabricCanvas.current.off("object:added", handleObjectAdded);
        fabricCanvas.current.off("object:removed", handleObjectRemoved);
      }
      window.removeEventListener("resize", () =>
        resizeCanvas(fabricCanvas.current, canvasWidth, canvasHeight)
      );
      fabricCanvas.current.dispose();
      const addTextBtn = document.getElementById("addTextBtn");
      if (addTextBtn) {
        addTextBtn.removeEventListener("click", addText);
      }
    };
  }, [product, id, canvasHeight, canvasWidth]);

  useEffect(() => {
    updateTotalPrice();
  }, [canvasObjects]);

  const updateTotalPrice = () => {
    if (product && fabricCanvas.current) {
      const basePrice = parseFloat(product.price);
      const newTotalPrice = calculateTotalPrice(
        basePrice,
        fabricCanvas.current
      );
      setTotalPrice(newTotalPrice);
    }
  };

  const handleAddText = () => {
    addText(fabricCanvas.current, textProps);
  };

  const handleUpdateTextProps = (prop, value) => {
    if (selectedText) {
      setTextProps((prev) => ({ ...prev, [prop]: value }));
      updateTextProps(selectedText, prop, value, fabricCanvas.current);
    } else {
      console.warn("No text object selected");
    }
  };

  const handleSaveDesign = async () => {
    setIsSaving(true);
    try {
      const canvasJSON = saveAsJSON(fabricCanvas.current);
      setSavedCanvas(canvasJSON);

      const imageOfDesign = await handleCaptureScreenShot();

      const basePrice = product.price;
      const totalPrice = calculateTotalPrice(basePrice, fabricCanvas.current);

      const base64Response = await fetch(imageOfDesign);
      const blob = await base64Response.blob();

      const imageFile = new File([blob], "design.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("productId", id);
      formData.append("userId", userId);
      formData.append("canvas", canvasJSON);
      formData.append("image", imageFile);
      formData.append("totalPrice", totalPrice.toString());
      formData.append("isGamed", "false");
      dragImages.forEach((image) => {
        formData.append(`dragImages`, image);
      });

      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      setTotalPrice(totalPrice);
      console.log(totalPrice);

      let saveResponse;
      if (designId) {
        saveResponse = await updateCanvasToBackend(designId, formData);
        toast.success("Your Design updated successfully");
        console.log("Canvas updated successfully:", saveResponse);
        return saveResponse;
      } else {
        saveResponse = await saveCanvasToBackend(formData);
        const newDesignId = saveResponse.data.design._id;
        setDesignId(newDesignId);
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("edit", newDesignId);
        window.history.pushState({}, "", currentUrl.toString());
        console.log(saveResponse);
        return saveResponse;
      }
    } catch (error) {
      console.error("Error saving canvas:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // const handleResetCanva = () => resetCanvas(fabricCanvas.current);
  const handleResetCanva = () => {
    resetCanvas(fabricCanvas.current);
    setSelectedText(null); // Reset selected text
    setTextProps({
      fontSize: 24,
      fill: "#000000",
      fontFamily: "Arial",
      fontWeight: "",
      fontStyle: "",
      textBackgroundColor: "transparent",
    }); // Reset text properties
  };

  const handleAddImageOnCanva = (e) => {
    handleAddImage(e, fabricCanvas.current, setDragImages);
  };

  const handleRemoveSelectedObj = () =>
    removeSelectedObject(fabricCanvas.current);

  const handleAddToCart = async () => {
    if (!designId) {
      toast.warn("Please save your design before adding to cart");
      return;
    }
    if (!selectedSize) {
      toast.warn("Please choose your size");
      return;
    }

    const cartItem = {
      designId: designId,
      quantity: 1,
      size: selectedSize,
      type: "Design",
    };
    try {
      setIsAdding(true);
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

  const isRemoveButtonDisabled = () => {
    return (
      selectedText === null &&
      textProps.fontSize === 24 &&
      textProps.fill === "#000000" &&
      textProps.fontFamily === "Arial" &&
      textProps.fontWeight === "" &&
      textProps.fontStyle === "" &&
      textProps.textBackgroundColor === "transparent" &&
      (fabricCanvas.current
        ? fabricCanvas.current.getObjects().length === 0
        : true)
    );
  };

  return (
    <div className="container mx-auto px-4 mb-20 ">
      <div className="text-textColor text-3xl sm:text-4xl text-center my-5 sm:my-8 md:my-10 font-bold">
        Customize your design
      </div>
      <div className="flex flex-col lg:flex-row gap-6  justify-between  lg:mx-24 ">
        <div className="w-full lg:w-3/5 flex flex-col justify-start items-center ">
          <div className="flex flex-col">
            <div className="flex sm:justify-between justify-evenly  w-full">
              <button
                className="bg-red-700 text-white py-2 px-2 rounded w-32 sm:w-1/4 md:w-32 lg:w-32 cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out "
                onClick={handleResetCanva}
              >
                Clear Design
              </button>

              <button
                className={`bg-white  text-gray-700 py-2 px-4 rounded w-44 sm:w-1/4 md:w-44 lg:w-44 transition duration-300 ease-in-out border border-buttonColor ${
                  isRemoveButtonDisabled()
                    ? "bg-secondary-content border-none"
                    : ""
                }`}
                onClick={handleRemoveSelectedObj}
                disabled={isRemoveButtonDisabled()}
              >
                Remove Selected
              </button>
            </div>

            <div
              id="divToTakeScreenshot"
              style={{
                backgroundImage: `url(${backgroundImage})`,
              }}
              className="flex flex-col justify-center items-center bg-center bg-no-repeat bg-white relative rounded-lg bg-cover sm:bg-contain xs:bg-contain mdplus:bg-cover lgplus:bg-contain p-5 w-[400px] h-[500px] md:w-[600px] md:h-[600px]"
            >
              <canvas
                id="canvasBorder"
                ref={canvasRef}
                style={{
                  border: "1px dashed gray",
                }}
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/4 p-4 shadow-md rounded-lg border border-gray-300 text-base-content">
          <div className="flex flex-col p-5">
            <div className="flex justify-between">
              <div className="mb-5 font-bold text-xl sm:text-2xl text-black">
                {name}
              </div>
              <div className="mb-5 font-bold text-xl sm:text-2xl ">
                {totalPrice} EG
              </div>
            </div>
            <div className="flex flex-col justify-center mb-5">
              <div className="flex justify-between mt-5 mb-2">
                <div className="text-lg sm:text-xl font-bold">
                  Choose Image{" "}
                </div>
                <span>+ 100EG</span>
              </div>

              <div className="flex justify-between items-center">
                <input
                  id="chooseImg"
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={handleAddImageOnCanva}
                />

                <label
                  htmlFor="chooseImg"
                  className=" bg-white text-buttonColor py-4 px-4 rounded cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out  w-full border border-buttonColor text-center "
                >
                  Choose Image
                </label>
              </div>

              <div className="mt-5">
                <div className="flex justify-between mb-2">
                  <div className="text-lg sm:text-xl font-bold">Add Text</div>
                  <span>+ 50EG</span>
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
            <div className="text-lg sm:text-xl font-bold">Text Control</div>
            <div className="bg-lightBackGround p-3 mt-3 rounded ">
              <div className="">
                <div className="flex gap-8  items-center mt-3">
                  <div className="">
                    <label htmlFor="font-size">Font Size</label>
                  </div>
                  <span className="ml-4 text-sm">{textProps.fontSize}</span>
                  <div className="">
                    <input
                      id="font-size"
                      type="range"
                      min={1}
                      max="50"
                      value={textProps.fontSize}
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
                        console.log("Font size changed to:", e.target.value);
                        console.log(textProps);
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-12 items-center mt-3 ">
                  <div className="">
                    <label htmlFor="font-style">Font Style</label>
                  </div>
                  <div className="">
                    <select
                      id="font-style"
                      className="select select-sm border-buttonColor select-success w-full max-w-xs"
                      value={textProps.fontFamily}
                      onChange={(e) => {
                        handleUpdateTextProps("fontFamily", e.target.value);
                        console.log("Font family changed to:", e.target.value);
                        console.log(textProps);
                      }}
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
              <div className="lg:flex justify-between">
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
                      value={textProps.fill}
                      onChange={(e) => {
                        handleUpdateTextProps("fill", e.target.value);
                        console.log("Color changed to:", e.target.value);
                        console.log(textProps);
                      }}
                    />
                  </div>
                </div>

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
                        console.log("Bold changed to:", textProps.fontWeight);
                      }}
                      className="checkbox"
                    />
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
                    />
                  </div>
                </div>
              </div>
            </div>

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
          </div>
        </div>
      </div>
      <div className="lg:flex justify-end mx-5 sm:mx-40 mt-5">
        <button
          className={`me-5 bg-white text-buttonColor py-2 px-4 rounded cursor-pointer 
              hover:bg-gray-100 transition duration-300 ease-in-out mt-5 w-full sm:w-44 
              border border-buttonColor ${
                isSaving ? "opacity-50 cursor-not-allowed" : ""
              }`}
          onClick={handleSaveDesign}
          disabled={isSaving}
        >
          {isSaving ? (
            <span className="loading loading-ring loading-md"></span>
          ) : (
            "Save Design"
          )}
        </button>
        {isLoggedIn ? (
          <button
            onClick={handleAddToCart}
            style={{
              background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
            }}
            className="py-2 px-4 rounded cursor-pointer  transition duration-700 ease-in-out  text-white btn  mt-5 w-full sm:w-44 me-8 "
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
    </div>
  );
}
// wak wak wak
