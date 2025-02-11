import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartContextProvider } from './store/CartContext.jsx';
import Home from './pages/Home.jsx'
import ProductCatalog from './pages/ProductCatalog.jsx';
import UserInfo from "./pages/UserInfo.jsx";
import OrdersInfo from "./pages/OrdersInfo.jsx";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import FloatButtons from './components/FloatButtons.jsx';
import './App.css'

function App() {

  return (
    <CartContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={
          <ProtectedRoute>
            <ProductCatalog />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <UserInfo />
          </ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute>
            <OrdersInfo />
          </ProtectedRoute>
        } />
      </Routes>
      <FloatButtons />
    </CartContextProvider>
  )
}

export default App;