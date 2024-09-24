import { fabric } from "fabric";
import { takeScreenShotFunc } from "./screenshot";

//resize canva in responsive
export const resizeCanvas = (fabricCanvas) => {
  let width = 270;
  let height = 350;

  width =
    window.innerWidth < 576
      ? width * 0.58
      : window.innerWidth < 768
      ? width * 0.81
      : window.innerWidth < 992
      ? width * 0.88
      : width; // Default for extra large screens

  height =
    window.innerWidth < 576
      ? height * 0.51
      : window.innerWidth < 768
      ? 0.85 * height
      : window.innerWidth < 992
      ? height * 0.91
      : height;

  fabricCanvas.setWidth(width);
  fabricCanvas.setHeight(height);
  fabricCanvas.renderAll(); // Re-render the canvas to apply changes
};
//screenshot capture
export const captureScreenShot = async (fabricCanvas) => {
  fabricCanvas.discardActiveObject();
  fabricCanvas.renderAll();
  await takeScreenShotFunc(
    "divToTakeScreenshot",
    "MyImage",
    "image/jpeg",
    "#f5f5f5"
  );
};

// add text on canva
export const addText = (fabricCanvas, textProps) => {
  //const canvas = fabricCanvas.current;
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
  fabricCanvas.add(textbox); // Add the textbox to the canvas
  fabricCanvas.setActiveObject(textbox); // Make the new textbox the active object
  fabricCanvas.renderAll(); // Re-render the canvas to display the changes
};

//Function to update the properties of the selected text
export const updateTextProps = (selectedText, prop, value, fabricCanvas) => {
  if (selectedText) {
    selectedText.set(prop, value); // Update the specific property of the selected text
    fabricCanvas.renderAll(); // Re-render the canvas immediately to apply the change

    console.log("Text properties updated:", prop, value); // Debugging
  } else {
    console.warn("No text object selected"); // Debugging
  }
};
// save designer aas image
export const saveAsImage = (fabricCanvas) => {
  const dataURL = fabricCanvas.toDataURL({
    format: "png",
    quality: 1, // quality is a number between 0 and 1 for JPEGs, ignored for PNG
  });
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "canvas-image.png";
  link.click();
  console.log(dataURL);
};
// save designer as json
export const saveAsJSON = (fabricCanvas) => {
  return JSON.stringify(fabricCanvas.toJSON());

  // You can send this JSON to your backend to save it
};
//load from json
export const loadFromJSON = (fabricCanvas, savedCanvas) => {
  // Load the canvas from the JSON string
  fabricCanvas.loadFromJSON(savedCanvas, () => {
    fabricCanvas.renderAll(); // Render the canvas after loading
    console.log("Canvas loaded from JSON");
  });
};

//reset canva
export const resetCanvas = (fabricCanvas) => {
  // Clear all objects from the canvas
  fabricCanvas.clear();
};

//Function to handle adding an image to the canvas

export const handleAddImage = (e, fabricCanvas) => {
  let imgObj = e.target.files[0]; // Get the uploaded image file
  let reader = new FileReader();
  reader.readAsDataURL(imgObj); // Read the image file as a data URL
  reader.onload = (e) => {
    let imgElement = document.createElement("img");
    imgElement.src = e.target.result; // Set the image source to the data URL
    imgElement.onload = function () {
      const image = new fabric.Image(imgElement, {
        scaleX: 0.1, // Scale down the image for the canvas
        scaleY: 0.1,
      });
      fabricCanvas.add(image); // Add the image to the canvas
      fabricCanvas.centerObject(image); // Center the image on the canvas
      fabricCanvas.setActiveObject(image); // Make the image the active object
    };
  };
};

//remove selected object
export const removeSelectedObject = (fabricCanvas) => {
  const activeObject = fabricCanvas.getActiveObject(); // Get the selected object
  console.log(activeObject);

  if (activeObject) {
    // Check if the selected object is an image
    fabricCanvas.remove(activeObject); // Remove the selected object
    fabricCanvas.renderAll(); // Re-render the canvas to reflect the changes
    // console.log("Image removed"); // Debugging
  } else {
    console.warn("No object is selected to remove");
  }
};
