import axios from "axios"
import Cookies from "js-cookie"

const BaseURL = "http://localhost:3000"
const api = axios.create({ baseURL: BaseURL })

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => {
        return response.data
    } ,
    (error) => {
        return Promise.reject(error)
    }
)

export default api