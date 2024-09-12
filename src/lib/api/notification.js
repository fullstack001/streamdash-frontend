import axios from 'axios';

const requestAddress = import.meta.env.VITE_BASE_URL;

export async function getNotification() {
  try {
    const res = await axios.get(`${requestAddress}/api/notification/`);
    return res.data;
  } catch (err) {
    return 500;
  }
}
export async function putNotification(data) {
  try {
    const res = await axios.post(`${requestAddress}/api/notification/`, data);
    return res.data;
  } catch (err) {
    return 500;
  }
}
