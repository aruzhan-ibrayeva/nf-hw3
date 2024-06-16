// app/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchPosts = async () => {
  const response = await axiosInstance.get('posts');
  return response.data.posts;
};

export const fetchPostById = async (id: string) => {
  const response = await axiosInstance.get(`posts/${id}`);
  return response.data;
};

export const loginUser = async (username: string, password: string) => {
  const response = await axiosInstance.post('auth/login', { username, password });
  const { token, ...user } = response.data;
  const userData = { id: user.id, firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email };
  return { token, user: userData };
};

export default axiosInstance;
