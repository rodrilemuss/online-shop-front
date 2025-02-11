
import { useEffect, useState } from "react";
import { translateStatus } from "../utils/translateStatus"
import api from "../utils/axiosInstance";

function GeneratedOrder({ orderId }) {
    const [orderItem, setOrder] = useState([]);

    async function getOrderById(id) {
        try {
            const response = await api.get(`order/${id}`);
            console.log(response.data);
            setOrder(response.data);
        } catch (error) {
            console.error(`Error fetching order with ID: ${id}`, error);
        }
    };

    useEffect(() => {
        getOrderById(orderId);
    }, [])

    const total = () => {
        return orderItem.productList?.reduce((sum, item) => sum + item.product.price * item.purchased_quantity, 0).toFixed(2);
    }

    return (
        <div className="generatedOrder" style={{ margin: 15 }}>
            <div className="order-details">
                <h1>Orden #{orderItem.id}</h1>
                <p>Estado: <strong>{translateStatus(orderItem.status)}</strong></p>

                <div className="user-details">
                    <h3>Información del Usuario</h3>
                    <p><strong>Nombre completo:</strong> {orderItem.user?.first_name} {orderItem.user?.last_name}</p>
                    <p><strong>Correo electrónico:</strong> {orderItem.user?.email}</p>
                    <p><strong>Dirección de envío:</strong> {orderItem.user?.shipping_address}</p>
                </div>

                <div className="product-list">
                    <h3>Lista de productos</h3>
                    {orderItem.productList?.map((item) => (
                        <div key={item.id.product} className="product-item">
                            <img src={item.product.image_url} alt={item.product.name} className="product-image" />
                            <div className="product-info">
                                <h4>{item.product.name}</h4>
                                <p><strong>Precio:</strong> Q.{item.product.price.toFixed(2)}</p>
                                <p><strong>Cantidad Comprada:</strong> {item.purchased_quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="order-total">
                    <h3>Total: Q.{total()}</h3>
                </div>
            </div>
        </div>
    )
}

export default GeneratedOrder;