import axios from 'axios';

export default async function deleteDevice(username) {
  try {
    // Send a POST request to add the device
    const res = await axios.post('api/deleteDevice', username);
    console.log(res.data);
    // Return the data from the response
    return 200;
  } catch (err) {
    // Log the error for debugging
    console.error('Error adding device:', err);

    // Return a more informative error object or message
    return 404;
  }
}