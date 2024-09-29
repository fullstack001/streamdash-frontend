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

export const getAllUser = async () => {
  try {
    const records = await axios.get(`${requestAddress}/api/auth/get-all-user-data`);
    return records.data;
  } catch (error) {
    return error.response.data;
  }
};

export const sendPasswordReset = async (email) => {
  try {
    const res = await axios.post(`${requestAddress}/api/auth/reset-password-request`, email);
    console.log(res);
    return 200;
  } catch (error) {
    return error.response.data;
  }
};

export const resetPassword = async (data) => {
  try {
    const res = await axios.post(`${requestAddress}/api/auth/reset-password`, data);
    console.log(res);
    return 200;
  } catch (error) {
    return error.response.data;
  }
};

export const signup = async (data) => {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return { status: response.status, ...resData };
  } catch (error) {
    console.error('Error signing up:', error);
    return { status: 500, msg: 'Server error' };
  }
};

export const signupDirectly = async (data) => {
  try {
    const response = await axios.post(`${requestAddress}/api/auth/signup-direct`, data);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    return { status: 500, msg: 'Server error' };
  }
};

export const verifyEmail = async (data) => {
  try {
    const records = await axios.post(`${requestAddress}/api/auth/verify-email`, data);
    console.log(records.data.token);
    Cookies.set('token', records.data.token, { expires: 6 / 24 });
    return 200;
  } catch (error) {
    console.error('Error verifying email:', error);
    return { status: 500, msg: 'Server error' };
  }
};

export const addUserByAdmin = async (newUser) => {
  try {
    const res = await axios.post(`${requestAddress}/api/auth/add-user-by-admin`, newUser);
    return res.data;
  } catch (error) {
    console.error('Error verifying email:', error);
    return 500;
  }
};

export const addCreditByAdmin = async (data) => {
  try {
    const res = await axios.post(`${requestAddress}/api/auth/add-credit-by-admin`, data);
    return res.data;
  } catch (error) {
    console.error('Error verifying email:', error);
    return 500;
  }
};

export const tryFree = async (data) => {
  try {
    const res = await axios.post(`${requestAddress}/api/auth/try-free`, data);
    return res.data;
  } catch (error) {
    console.error('Error verifying email:', error);
    return 500;
  }
};

export const updateProfile = async (data) => {
  try {
    const res = await axios.post(`${requestAddress}/api/auth/update-profile`, data);
    return res.data;
  } catch (error) {
    console.log('Error update profile', error);
    return 500;
  }
};

export const updatePassword = async (data) => {
  try {
    const res = await axios.post(`${requestAddress}/api/auth/update-password`, data);
    return res.data;
  } catch (error) {
    console.log('Error update password', error);
    return 500;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.post(`${requestAddress}/api/auth/delete-user/`, { id });
    return res.data;
  } catch (error) {
    console.log('Error delete user', error);
    return 500;
  }
};
