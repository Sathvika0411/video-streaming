import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://video-streaming-qb0h.onrender.com/api',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
