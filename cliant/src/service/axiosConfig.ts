import axios from "axios";
const SERVER_API = import.meta.env.VITE_API_URL;  

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `${SERVER_API}`;
export default axios;
