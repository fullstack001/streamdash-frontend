import axios from 'axios';

export default async function addDevice(credential) {
  try {
    // Log the credential for debugging purposes
    console.log('Sending credential:', credential);

    // Send a POST request to add the device
    const res = await axios.post('api/addDevice', credential);
    // Return the data from the response
    return res.data;
  } catch (err) {
    // Log the error for debugging
    console.error('Error adding device:', err);

    // Return a more informative error object or message
    return 404;
  }
}
