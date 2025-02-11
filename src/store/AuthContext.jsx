import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from 'antd';
import { jwtDecode } from "jwt-decode";
import api from "../utils/axiosInstance"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("tk") || null);
    const [userLogged, setUserLogged] = useState({});
    const navigate = useNavigate();

    async function fetchUserByEmail(email) {
        const response = await api.get(`user?email=${email}`);
        const user = await response.data;
        setUserLogged(user);
    }

    useEffect(() => {
        if (token) {
            fetchUserByEmail(jwtDecode(token).sub);
            localStorage.setItem("tk", token);
        } else {
            localStorage.removeItem("tk");
        }
    }, [token]);

    const register = async (user) => {
        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            if (!response.ok) throw new Error("Register failed");
            notification.success({ message: 'Usuario registrado!' });
        } catch (error) {
            notification.error({ message: 'Error!' });
            console.error(error);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) throw new Error("Login failed");

            const data = await response.json();
            setToken(data.token);
            navigate("/products");
        } catch (error) {
            notification.error({ message: 'Error!' });
            console.error(error);
        }
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, userLogged, register, login, logout, fetchUserByEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;