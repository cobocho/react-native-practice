/* eslint-disable no-console */
/* eslint-disable promise/prefer-await-to-callbacks */
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030',
  withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error)
    return Promise.reject(error)
  },
)
