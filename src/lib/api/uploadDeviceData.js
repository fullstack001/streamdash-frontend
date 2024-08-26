import axios from 'axios';

const requestAddress = import.meta.env.VITE_BASE_URL;

export default async function uploadDeviceData(credential) {
  console.log(credential);
  try {
    // Send a POST request to add the device
    const res = await axios.post(`${requestAddress}/api/edit-device`, credential);
    // Return the data from the response
    return res.data;
  } catch (err) {
    // Log the error for debugging
    console.error('Error adding device:', err);

    // Return a more informative error object or message
    return 500;
  }
}
