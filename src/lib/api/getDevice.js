import axios from 'axios';

export default async function getDevice() {
  try {
    const res = await axios.get(`api/getDevices`);
    return res.data;
  } catch (err) {
    return 500;
  }
}
