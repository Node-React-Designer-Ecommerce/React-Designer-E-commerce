/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import { useParams } from "react-router";
import RadioComponent from "../components/RadioComponent";
import SizeCharts from "../components/Charts/SizeCharts";
import XIcon from "../icons/XIcon";

export default function Designer() {
  const { id } = useParams();

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

    // Function to add a new text object to the canvas

    // Cleanup when the component unmounts
    return () => {
      fabricCanvas.current.dispose(); // Dispose of the Fabric.js canvas
      const addTextBtn = document.getElementById("addTextBtn");
      if (addTextBtn) {
        addTextBtn.removeEventListener("click", addText);
      }
    };
  }, [id]); // Only re-run this effect if textProps changes

  const addText = () => {
    const canvas = fabricCanvas.current;
    const textbox = new fabric.Textbox("Enter text here", {
      left: 100,
      top: 100,
      fontSize: textProps.fontSize, // Use the current font size from the state
      fill: textProps.fill, // Use the current text color from the state
      fontFamily: textProps.fontFamily, // Use the current font family from the state
      fontWeight: textProps.fontWeight,
      fontStyle: textProps.fontStyle,
      editable: true, // Allow the user to edit the text
    });
    canvas.add(textbox); // Add the textbox to the canvas
    canvas.setActiveObject(textbox); // Make the new textbox the active object
    canvas.renderAll(); // Re-render the canvas to display the changes
  };

  // Function to update the properties of the selected text
  const updateTextProps = (prop, value) => {
    setTextProps((prev) => ({
      ...prev, // Keep the existing properties
      [prop]: value, // Update the specific property that was changed
    }));
    console.log(textProps);
    if (selectedText) {
      selectedText.set(prop, value); // Update the specific property of the selected text
      fabricCanvas.current.renderAll(); // Re-render the canvas immediately to apply the change

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
    console.log(activeObject);

    if (activeObject) {
      // Check if the selected object is an image
      canvas.remove(activeObject); // Remove the selected object
      canvas.renderAll(); // Re-render the canvas to reflect the changes
      // console.log("Image removed"); // Debugging
    } else {
      console.warn("No object is selected to remove");
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
              <span className=" text-2xl text-green-800">EGP 100</span>
            </div>

            {/* Button to Add Text */}
            <div className="flex justify-between items-center">
              <button
                style={{ borderColor: "#4e7f62" }}
                className=" bg-white text-gray-700 py-2 px-4 rounded cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out mt-5 w-44 border border-indigo-600 "
                id="addTextBtn"
                onClick={addText}
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
              Remove Selected Object
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
              <label
                htmlFor="color_picker"
                className="text-sm font-medium mb-2 dark:text-white"
              >
                Color
              </label>
            </div>
            <div className="">
              <input
                id="color_picker"
                className="p-1 h-8 w-12 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                type="color"
                value={textProps.fill} // Bind the color picker to the current text color
                onChange={(e) => {
                  updateTextProps("fill", e.target.value);
                  console.log("Color changed to:", e.target.value); // Debugging
                  console.log(textProps);
                }} // Update the fill color when changed
              />
            </div>
          </div>

          {/* Font Size Input */}
          <div className="flex gap-9 items-center mt-3">
            <div className="">
              <label htmlFor="font-size">Font Size</label>
            </div>
            <div className="">
              <input
                id="font-size"
                type="range"
                min={1}
                max="50"
                value={textProps.fontSize} // Bind the input to the current font size
                className="range range-xs"
                onChange={(e) => {
                  if (parseInt(e.target.value) <= 0 || e.target.value === "") {
                    e.target.value = 1;
                  }
                  updateTextProps("fontSize", parseInt(e.target.value));
                  console.log("Font size changed to:", e.target.value); // Debugging
                  console.log(textProps);
                }}
              />

              {/* <input
                className="w-44"
                type="number"
                value={textProps.fontSize} // Bind the input to the current font size
                onChange={(e) => {
                  if (parseInt(e.target.value) <= 0 || e.target.value === "") {
                    e.target.value = 1;
                  }
                  updateTextProps("fontSize", parseInt(e.target.value));
                  console.log("Font size changed to:", e.target.value); // Debugging
                  console.log(textProps);
                }} // Update the font size when changed
                placeholder="Font Size"
              /> */}
            </div>
          </div>

          {/* Font Family Selector */}
          <div className="flex gap-9 items-center mt-3">
            <div className="">
              <label htmlFor="font-style">Font Style</label>
            </div>
            <div className="">
              <select
                id="font-style"
                className="select select-sm select-success w-full max-w-xs"
                value={textProps.fontFamily} // Bind the select dropdown to the current font family
                onChange={(e) => {
                  updateTextProps("fontFamily", e.target.value);
                  console.log("Font family changed to:", e.target.value); // Debugging
                  console.log(textProps);
                }} // Update the font family when changed
              >
                {/* Options for font family */}
                {/* <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option> */}
                <option value="arial">Arial</option>
                <option value="helvetica" selected>
                  Helvetica
                </option>
                <option value="verdana">Verdana</option>
                <option value="georgia">Georgia</option>
                <option value="courier">Courier</option>
                <option value="comic sans ms">Comic Sans MS</option>
                <option value="impact">Impact</option>
                <option value="monaco">Monaco</option>
              </select>
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
                onChange={(e) => {
                  updateTextProps(
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
                  updateTextProps(
                    "fontStyle",
                    textProps.fontStyle === "" ? "italic" : ""
                  );
                }}
                className="checkbox"
              />{" "}
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
