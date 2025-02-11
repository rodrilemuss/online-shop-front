import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/",
    headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("tk");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("tk");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export default api;