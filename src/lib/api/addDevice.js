import axios from 'axios';

export default async function addDevice(data) {
  try {
    const res = await axios.post(`api/addDevice`, data);
    return res.data;
  } catch (err) {
    return 500;
  }
}
