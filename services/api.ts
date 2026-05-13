import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

apiClient.interceptors.request.use((config) => {
  // Auth header will be attached here once NextAuth is wired
  return config
})

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API Error]', err.response?.data ?? err.message)
    return Promise.reject(err)
  }
)
