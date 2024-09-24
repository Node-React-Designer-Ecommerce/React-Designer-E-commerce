import html2canvas from "html2canvas-pro";

// Function to take a screenshot of an element and download it as an image file
export const takeScreenShotFunc = async (
  elementId, // ID of the HTML element to capture
  fileName, // Desired filename for the downloaded image
  fileType = "image/png", // File type for the image (default is PNG)
  backgroundColor = "#000000" // Background color for the screenshot
) => {
  // Locate the element by its ID
  const element = document.getElementById(elementId);
  const allCanvas = element.querySelectorAll("canvas");

  allCanvas.forEach((el) => {
    el.style.border = "none";
  });

  // Check if the element exists
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return;
  }

  try {
    // Use html2canvas to capture the screenshot (returns a canvas object)
    const canvas = await html2canvas(element, {
      backgroundColor: backgroundColor,
    });

    // Convert the canvas to a data URL for the image file
    const image = canvas.toDataURL(fileType);
    console.log("Image is:", image); // Optional: Log the image URL for debugging

    // Create a temporary link element to trigger the download
    const a = document.createElement("a");
    a.href = image; // Set the image as the link's href (the download URL)
    a.download = fileName; // Set the desired filename for the download
    a.click(); // Simulate a click to start the download
    allCanvas.forEach((el) => {
      el.style.border = "1px dashed gray";
    });
  } catch (err) {
    // Handle any errors that occur during the screenshot process
    console.error("Error in taking screenshot:", err);
  }
};