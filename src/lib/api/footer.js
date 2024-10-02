import axios from 'axios';

const requestAddress = import.meta.env.VITE_BASE_URL;

export async function getFooter() {
  try {
    const res = await axios.get(`${requestAddress}/api/footer/`);
    return res.data;
  } catch (err) {
    return 500;
  }
}
export async function putFooter(data) {
  try {
    const res = await axios.post(`${requestAddress}/api/footer/`, data);
    return res.data;
  } catch (err) {
    return 500;
  }
}
