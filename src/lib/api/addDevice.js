import axios from 'axios';
import Cookies from 'js-cookie';

const requestAddress = import.meta.env.VITE_BASE_URL;

export default async function addDevice(credential) {
  try {
    // Send a POST request to add the device
    const res = await axios.post(`${requestAddress}/api/addDevice`, credential);
    if (res.data.taken) {
      Cookies.set('token', res.data.token, { expires: 6 / 24 });
    }
    // Return the data from the response
    return res.data;
  } catch (err) {
    // Log the error for debugging
    console.error('Error adding device:', err);

    // Return a more informative error object or message
    return 500;
  }
}
