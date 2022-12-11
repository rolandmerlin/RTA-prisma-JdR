import axios from 'axios'
export const setToken = (token:string) => { axios.defaults.headers.Authorization = `Bearer ${token}` }
export default axios