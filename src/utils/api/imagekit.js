import axiosInstance from "./axiosInstance";

// Function to upload image (FormData) to your backend API
export const uploadToImageKit = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/upload-image", // The endpoint in your backend for handling image uploads to ImageKit
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
        },
      }
    );

    // Return the response data which includes the image URL from ImageKit
    return response.data;
  } catch (error) {
    console.error("Error uploading image to ImageKit:", error);
    throw new Error("Image upload failed");
  }
};
