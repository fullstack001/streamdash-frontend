import axios from 'axios';
import Cookies from 'js-cookie';

export const signIn = async (user) => {
  try {
    const records = await axios.post(`api/auth/signin`, user);
    Cookies.set('token', records.data.token);
    return 200;
  } catch (error) {
    return error.response.data;
  }
};
