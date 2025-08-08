import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const searchProductNearby = async (query, latitude, longitude, radius = 100) => {
  try {
    const response = await api.get('/search', {
      params: {
        query,
        lat: latitude,
        lng: longitude,
        radius,
      },
    });

    // Transform Spring Boot response to match frontend expectations
    const transformedData = response.data.map(item => ({
      id: item.id,
      name: item.name,
      address: item.address,
      latitude: item.latitude,
      longitude: item.longitude,
      product_name: item.productName,
      quantity: item.quantity,
      distance_km: item.distanceKm
    }));

    return transformedData;
  } catch (error) {
    console.error('Error searching for products:', error);
    throw error.response?.data || error;
  }
};

export const getStoreDetails = async (storeId) => {
  try {
    const response = await api.get(`/stores/${storeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching store details:', error);
    throw error.response?.data || error;
  }
};

export const getProductDetails = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error.response?.data || error;
  }
};

export default api;