import axios from 'axios';

export default async function getDevice(email) {
  console.log(email);
  try {
    const res = await axios.post(`api/getDevices`, { email });
    return res.data;
  } catch (err) {
    return 500;
  }
}
