import html2canvas from "html2canvas-pro";
/////////////////////////////////////////////////////////original code/////////////////////////////////////////////////

// // Function to take a screenshot of an element and download it as an image file
// export const takeScreenShotFunc = async (
//   elementId, // ID of the HTML element to capture
//   fileName, // Desired filename for the downloaded image
//   fileType = "image/png" // File type for the image (default is PNG)
// ) => {
//   // Locate the element by its ID
//   const element = document.getElementById(elementId);
//   const allCanvas = element.querySelectorAll("canvas");

//   allCanvas.forEach((el) => {
//     el.style.border = "none";
//   });

//   // Check if the element exists
//   if (!element) {
//     console.error(`Element with id ${elementId} not found`);
//     return null;
//   }

//   try {
//     // Use html2canvas to capture the screenshot (returns a canvas object)
//     const canvas = await html2canvas(element, {
//       allowTaint: true,
//       useCORS: true,
//     });

//     // Convert the canvas to a data URL for the image file
//     const image = canvas.toDataURL(fileType);
//     console.log("Image is:", image); // Optional: Log the image URL for debugging

//     // Create a temporary link element to trigger the download
//     const a = document.createElement("a");
//     a.href = image; // Set the image as the link's href (the download URL)
//     a.download = fileName; // Set the desired filename for the download
//     a.click(); // Simulate a click to start the download
//     allCanvas.forEach((el) => {
//       el.style.border = "1px dashed gray";
//     });
//     return image;
//   } catch (err) {
//     // Handle any errors that occur during the screenshot process
//     console.error("Error in taking screenshot:", err);
//     return null;
//   }
// };
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////// code using formdata//////////////////////////////////////////////
export const takeScreenShotFunc = async (elementId, fileName) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return null;
  }

  try {
    // Capture the screenshot
    const canvas = await html2canvas(element, {
      allowTaint: true,
      useCORS: true,
    });

    // Compress the image
    const compressedImage = canvas.toDataURL("image/jpeg", 0.7); // 0.7 is the quality

    // Convert the compressed image to a blob
    const blob = await (await fetch(compressedImage)).blob();

    // Create FormData and append the image
    const formData = new FormData();
    formData.append("image", blob, fileName);

    return formData; // Return the FormData object
  } catch (err) {
    console.error("Error in taking screenshot:", err);
    return null;
  }
};
