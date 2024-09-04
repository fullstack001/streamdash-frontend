import axios from 'axios';
import Cookies from 'js-cookie';

export const signIn = async (user) => {
  try {
    const records = await axios.post(`api/auth/signin`, user);
    Cookies.set('token', records.data.token, { expires: 6 / 24 });
    return 200;
  } catch (error) {
    return error.response.data;
  }
};

export const getUser = async (email) => {
  try {
    const records = await axios.post(`api/auth/getUserData`, email);
    Cookies.set('token', records.data.token, { expires: 6 / 24 });
    return 200;
  } catch (error) {
    return error.response.data;
  }
};

export const signup = async (user) => {
  try {
    const records = await axios.post(`api/auth/signup`, user);
    Cookies.set('token', records.data.token, { expires: 6 / 24 });
    return 200;
  } catch (error) {
    return error.response.data;
  }
};
