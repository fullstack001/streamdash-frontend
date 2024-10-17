import axios from 'axios';

const requestAddress = import.meta.env.VITE_BASE_URL;

export default async function assignDevice(data) {
  try {
    // Send a POST request to add the device
    const res = await axios.post(`${requestAddress}/api/assign-device`, data);
    // Return the data from the response
    return res.data;
  } catch (err) {
    // Log the error for debugging
    console.error('Error adding device:', err);

    // Return a more informative error object or message
    return 500;
  }
}
