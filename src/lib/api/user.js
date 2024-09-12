import axios from 'axios';
import Cookies from 'js-cookie';

const requestAddress = import.meta.env.VITE_BASE_URL;

export const signIn = async (user) => {
  try {
    const records = await axios.post(`${requestAddress}/api/auth/signin`, user);
    Cookies.set('token', records.data.token, { expires: 6 / 24 });
    return 200;
  } catch (error) {
    return error.response.data;
  }
};

export const getUser = async (email) => {
  try {
    const records = await axios.post(`${requestAddress}/api/auth/getUserData`, email);
    Cookies.set('token', records.data.token, { expires: 6 / 24 });
    return 200;
  } catch (error) {
    return error.response.data;
  }
};

export const signup = async (user) => {
  try {
    const records = await axios.post(`${requestAddress}/api/auth/signup`, user);
    Cookies.set('token', records.data.token, { expires: 6 / 24 });
    return 200;
  } catch (error) {
    return error.response.data;
  }
};
