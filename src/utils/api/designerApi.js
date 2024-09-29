import axiosInstance from "./axiosInstance";

export const saveCanvasToBackend = async (designData) => {
  try {
    const response = await axiosInstance.post("/designs", designData);

    // Check if the response is as expected
    if (response && response.data) {
      return response.data; // Return the response data
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    throw new Error("Error saving canvas: " + error.message); // Throw an error if saving fails
  }
};
