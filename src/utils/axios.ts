/* eslint-disable promise/prefer-await-to-callbacks */
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030',
  withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  console.dir(config)
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  },
)

export const setHeader = (key: string, value: string) => {
  axiosInstance.defaults.headers[key] = value
}

export const removeHeader = (key: string) => {
  delete axiosInstance.defaults.headers[key]
}
