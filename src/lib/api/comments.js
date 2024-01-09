import axios from "axios";

const BASE_URL = "http://localhost:3000";

// Function to load comments for a specific post
export const loadComments = async (postId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/posts/${postId}/comments`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Add other comment-related API functions as needed

export const addComment = async (postId, commentData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/posts/${postId}/comments`,
      commentData
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
