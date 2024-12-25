import axios from "axios";
export const SERVER_API = import.meta.env.VITE_SERVER_URL;  

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `${SERVER_API}`;
export default axios;
