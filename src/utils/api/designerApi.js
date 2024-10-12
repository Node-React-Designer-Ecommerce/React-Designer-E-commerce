import axiosInstance from "./axiosInstance";

export const saveCanvasToBackend = async (formData) => {
  try {
    console.log(formData);
    const response = await axiosInstance.post("/designs", formData);

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

export const updateCanvasToBackend = async (designId, formData) => {
  try {
    console.log(formData);
    const response = await axiosInstance.patch(
      `/designs/${designId}`,
      formData
    );

    // Log the full response for debugging
    console.log("Full response:", response);

    if (response && response.data) {
      return response.data;
    } else {
      console.error("Unexpected response structure:", response);
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    // Log more details about the error
    console.error("Error in updateCanvasToBackend:", error);
    console.error("Error response:", error.response);

    if (error.response && error.response.data) {
      console.error("Error data:", error.response.data);
    }

    throw new Error("Error updating canvas: " + error.message);
  }
};

export const getdesignById = (id) => {
  return axiosInstance
    .get(`/designs/${id}`)
    .then((res) => res.data.data.design);
};




export const removeUserDesign = async (designId) => {
  try {
    const response = await axiosInstance.delete(`/designs/${designId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};