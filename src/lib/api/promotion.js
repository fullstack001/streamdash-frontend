import axios from 'axios';

const requestAddress = import.meta.env.VITE_BASE_URL;

export async function getPromotion() {
  try {
    const res = await axios.get(`${requestAddress}/api/promotion/`);
    return res.data;
  } catch (err) {
    return 500;
  }
}
export async function putPromotion(data) {
  try {
    const res = await axios.post(`${requestAddress}/api/promotion/`, data);
    return res.data;  
  } catch (err) {
    return 500;
  }
}
