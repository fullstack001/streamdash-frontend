import axios from 'axios'; // or whatever HTTP client you're using

const requestAddress = import.meta.env.VITE_BASE_URL;

export const fetchProducts = async () => {
  const response = await axios.get(`${requestAddress}/api/product`);
  return response.data;
};

export const updatePrices = async (id, newPriceCAD, newPriceUSD) => {
  try {
    const response = await axios.put(`${requestAddress}/api/product/${id}`, {
      priceCAD: newPriceCAD,
      priceUSD: newPriceUSD,
    });
    return { statue: 200, msg: response.data };
  } catch (err) {
    return { statue: 500, msg: err.message };
  }
};
