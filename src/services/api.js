import axios from "axios";

const api = axios.create({
    baseURL: "https://desafio.pontue.com.br",
})

export default api;