import axios from 'axios';

const axiosApiInstance = axios.create({
  baseURL: "http://192.168.0.106:8000/api"
})

axiosApiInstance.interceptors.request.use(
  async config => {
    const token = localStorage.getItem("TOKEN")
    if (token)
      config.headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application.json',
        'Content-Type': 'application/json'
      }
    return config;
  }
)

export default axiosApiInstance
