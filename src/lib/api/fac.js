import axios from 'axios';

const requestAddress = import.meta.env.VITE_BASE_URL;
const API_BASE_URL = `${requestAddress}/api/facs`; // Adjust this base URL as needed

export const getFacs = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching FACs:', error);
    throw error;
  }
};

export const addFac = async (facData) => {
  try {
    const response = await axios.post(API_BASE_URL, facData);
    return response;
  } catch (error) {
    console.error('Error adding FAC:', error);
    throw error;
  }
};

export const updateFac = async (id, facData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, facData);
    return response;
  } catch (error) {
    console.error('Error updating FAC:', error);
    throw error;
  }
};

export const deleteFac = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/delete`, { id });
    return response;
  } catch (error) {
    console.error('Error deleting FAC:', error);
    throw error;
  }
};
