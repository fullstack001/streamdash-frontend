import axios from 'axios';

const requestAddress = import.meta.env.VITE_BASE_URL;
export default async function getDevice(email) {
  console.log(email);
  try {
    const res = await axios.post(`${requestAddress}/api/getDevices`, { email });
    return res.data;
  } catch (err) {
    return 500;
  }
}
