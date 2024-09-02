import axios from 'axios';

const requestAddress = import.meta.env.VITE_BASE_URL;

export async function getUserHistory(email) {
  try {
    const res = await axios.post(`${requestAddress}/api/credit/getuserhistory`, { email });
    return res.data;
  } catch (err) {
    return 500;
  }
}
export async function getAllHistory() {
  try {
    const res = await axios.get(`${requestAddress}/api/credit/`);
    return res.data;
  } catch (err) {
    return 500;
  }
}
