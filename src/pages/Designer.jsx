import { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import { useParams } from "react-router";
import RadioComponent from "../components/RadioComponent";
import SizeCharts from "../components/SizeCharts";
import XIcon from "../icons/XIcon";
import ArrowLeft from "../icons/ArrowLeft";

export default function Designer() {
  const { id } = useParams();

  const canvasRef = useRef(); // Reference to the canvas element
  const fabricCanvas = useRef(null); // Reference to the Fabric.js canvas
  const [selectedText, setSelectedText] = useState(null); // Track the currently selected text object

  const [textProps, setTextProps] = useState({
    fontSize: 24, // Initial font size
    fill: "#000000", // Initial text color (black)
    fontFamily: "Arial", // Initial font family
  });
  const [backgroundImage, setBackgroundImage] = useState(""); // State for background image
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const products = [
    {
      id: 1,
      title: "Short Sleeve T-Shirt",
      image: "T-SHIRT.png",
      price: "150",
    },
    { id: 2, title: "Hoodie", image: "hoodie.webp", price: "300" },
    {
      id: 3,
      title: "Long Sleeve T-Shirt",
      image: "sleevet-shirt.jpg",
      price: "200",
    },
  ];

  useEffect(() => {
    const product = products.find((product) => product.id === parseInt(id));
    if (product) {
      setBackgroundImage(`/public/${product.image}`); // Set the background image
      setTitle(product.title);
      setPrice(product.price);
    }

    // Initialize the Fabric.js canvas
    fabricCanvas.current = new fabric.Canvas(canvasRef.current);

    // Function to handle when text is selected or updated
    const handleSelection = (e) => {
      if (e.target && e.target.type === "textbox") {
        // Check if a textbox was selected
        setSelectedText(e.target); // Set the selected text
        setTextProps({
          fontSize: e.target.fontSize, // Set the current text properties in the state
          fill: e.target.fill, // Use the current text color from the state
          fontFamily: e.target.fontFamily,
        });
        console.log("Text selected:", e.target); // Debugging
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

    // Function to add a new text object to the canvas
    const addText = () => {
      const canvas = fabricCanvas.current;
      const textbox = new fabric.Textbox("Enter text here", {
        left: 100,
        top: 100,
        fontSize: textProps.fontSize, // Use the current font size from the state
        fill: textProps.fill, // Use the current text color from the state
        fontFamily: textProps.fontFamily, // Use the current font family from the state
        editable: true, // Allow the user to edit the text
      });
      canvas.add(textbox); // Add the textbox to the canvas
      canvas.setActiveObject(textbox); // Make the new textbox the active object
      canvas.renderAll(); // Re-render the canvas to display the changes
    };

    // Add the event listener for the "Add Text" button
    document.getElementById("addTextBtn").addEventListener("click", addText);

    // Cleanup when the component unmounts
    return () => {
      fabricCanvas.current.dispose(); // Dispose of the Fabric.js canvas
      const addTextBtn = document.getElementById("addTextBtn");
      if (addTextBtn) {
        addTextBtn.removeEventListener("click", addText);
      }
    };
  }, [id, textProps]); // Only re-run this effect if textProps changes

  // Function to update the properties of the selected text
  const updateTextProps = (prop, value) => {
    if (selectedText) {
      // Only proceed if a text object is selected
      selectedText.set(prop, value); // Update the property (e.g., font size or color) of the selected text
      selectedText.setCoords(); // Recalculate the text's coordinates in case of any changes
      fabricCanvas.current.renderAll(); // Re-render the canvas

      // Update the state with the new text properties
      setTextProps((prev) => ({
        ...prev, // Keep the existing properties
        [prop]: value, // Update the specific property that was changed
      }));
      console.log("Text properties updated:", prop, value); // Debugging
    } else {
      console.warn("No text object selected"); // Debugging
    }
  };

  // Function to handle adding an image to the canvas
  const handleAddImage = (e) => {
    const canvas = fabricCanvas.current;
    let imgObj = e.target.files[0]; // Get the uploaded image file
    let reader = new FileReader();
    reader.readAsDataURL(imgObj); // Read the image file as a data URL
    reader.onload = (e) => {
      let imgElement = document.createElement("img");
      imgElement.src = e.target.result; // Set the image source to the data URL
      imgElement.onload = function () {
        const image = new fabric.Image(imgElement, {
          scaleX: 0.2, // Scale down the image for the canvas
          scaleY: 0.2,
        });
        canvas.add(image); // Add the image to the canvas
        canvas.centerObject(image); // Center the image on the canvas
        canvas.setActiveObject(image); // Make the image the active object
      };
    };
  };

  const removeSelectedObject = () => {
    const canvas = fabricCanvas.current;
    const activeObject = canvas.getActiveObject(); // Get the selected object

    if (activeObject && activeObject.type === "image") {
      // Check if the selected object is an image
      canvas.remove(activeObject); // Remove the selected object
      canvas.renderAll(); // Re-render the canvas to reflect the changes
      console.log("Image removed"); // Debugging
    } else {
      console.warn("No image is selected to remove");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-2/4 p-4 bg-base-200 text-base-content">
        <div
          style={{ width: "100%", height: "100%", borderColor: "#4e7f62" }}
          className="flex flex-col border border-indigo-600 rounded-lg p-5"
        >
          <div className="flex justify-between">
            <div className="mb-5 font-bold text-3xl text-black">{title}</div>
            <div className="mb-5 font-bold text-3xl text-green-800">
              EGP {price}
            </div>
          </div>
          <div className="flex flex-col justify-center mb-5">
            {/* Image Upload */}
            <div className="flex justify-between items-center">
              <input
                id="chooseImg"
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleAddImage} // Handle the image upload
              />

              {/* Custom Button */}
              <label
                style={{ borderColor: "#4e7f62" }}
                htmlFor="chooseImg" // Triggers the hidden file input
                className=" bg-white text-gray-700 py-2 px-4 rounded cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out mt-5 w-44 border border-indigo-600 text-center"
              >
                Choose Image
              </label>

              <button
                style={{ borderColor: "#4e7f62" }}
                className="btn btn-sm btn-error hover:bg-red-200 transition duration-300 ease-in-out"
                onClick={removeSelectedObject} // Handle image removal
              >
                X
              </button>
              <span className=" text-2xl text-green-800">EGP 100</span>
            </div>

            {/* Button to Add Text */}
            <div className="flex justify-between items-center">
              <button
                style={{ borderColor: "#4e7f62" }}
                className=" bg-white text-gray-700 py-2 px-4 rounded cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out mt-5 w-44 border border-indigo-600 "
                id="addTextBtn"
              >
                Add Text
              </button>
              <span className=" text-2xl text-green-800">EGP 50</span>
            </div>
          </div>
          <div>
            <button
              style={{ borderColor: "#4e7f62" }}
              className="inline-block bg-white text-gray-700 py-2 px-4 rounded cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out mt-5 w-44 border border-indigo-600 mb-5"
              onClick={removeSelectedObject} // Handle image removal
            >
              Remove Image
            </button>
          </div>
          {/*chart */}

          <div className="flex flex-col justify-between mb-5">
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
            <RadioComponent />
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
              {/* <h3 className="font-bold text-2xl ">Size Charts</h3> */}
              {/* <p className="py-4">Choose your size carfully ..</p> */}
              <div className="modal-action justify-center">
                <form method="dialog">
                  <SizeCharts />
                </form>
              </div>
            </div>
          </dialog>

          {/* Color Picker for Text */}
          <div className="flex gap-9 items-center mt-3">
            <div className="">
              Color
            </div>
            <div className="">
              <input
                className="w-20 mt-3"
                type="color"
                value={textProps.fill} // Bind the color picker to the current text color
                onChange={(e) => {
                  updateTextProps("fill", e.target.value);
                  console.log("Color changed to:", e.target.value); // Debugging
                }} // Update the fill color when changed
              />
            </div>
          </div>

          {/* Font Size Input */}
          <div className="flex gap-9 items-center mt-3">
            <div className="">
              Font Size
            </div>
            <div className="">
              <input
                className="w-44"
                type="number"
                value={textProps.fontSize} // Bind the input to the current font size
                onChange={(e) => {
                  updateTextProps("fontSize", parseInt(e.target.value));
                  console.log("Font size changed to:", e.target.value); // Debugging
                }} // Update the font size when changed
                placeholder="Font Size"
              />
            </div>
          </div>

          {/* Font Family Selector */}
          <div className="flex gap-9 items-center mt-3">
            <div className="">
              Font Style
            </div>
            <div className="">
              <select
                className="w-44"
                value={textProps.fontFamily} // Bind the select dropdown to the current font family
                onChange={(e) => {
                  updateTextProps("fontFamily", e.target.value);
                  console.log("Font family changed to:", e.target.value); // Debugging
                }} // Update the font family when changed
              >
                {/* Options for font family */}
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
              </select>
            </div>

          </div>



          <div className="flex justify-end">
            <div className="inline-block bg-SecondaryColor text-white py-2 px-4 rounded cursor-pointer hover:bg-gray-700 transition duration-300 ease-in-out mt-5 w-44 text-center">
              Add to Cart
            </div>
          </div>
        </div>
      </div>

      {/* T-shirt Canvas */}
      <div className="w-full lg:w-3/4 flex justify-center items-center p-4">
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${backgroundImage})`,
            borderColor: "#4e7f62",
          }}
          className="flex flex-col justify-center items-center bg-center bg-contain bg-no-repeat bg-white relative rounded-lg border border-indigo-600 p-5"
        >
          {/* Fabric.js Canvas */}
          <canvas
            ref={canvasRef} // Reference to the canvas element
            width="270"
            height="400"
            style={{
              border: "1px dotted gray",
              position: "absolute",
              top: "30%",
              left: "30%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
//wak wak wak //

