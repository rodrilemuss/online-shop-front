import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;