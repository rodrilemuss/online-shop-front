import { useContext, useState } from 'react';
import { Row, Col, Button, Steps, theme, notification } from 'antd';
import { ShoppingCartOutlined, TruckOutlined, LoadingOutlined, SolutionOutlined } from '@ant-design/icons';
import AuthContext from '../store/AuthContext';
import CartContext from '../store/CartContext';
import Cart from './Cart';
import AddressVerification from './AddressVerification';
import GeneratedOrder from './GeneratedOrder';
import api from '../utils/axiosInstance';

function UserProgressModal({ onSubmit }) {
    const { userLogged } = useContext(AuthContext);
    const cartCtx = useContext(CartContext);
    const [current, setCurrent] = useState(0);
    const [orderId, setOrderId] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const { token } = theme.useToken();
    const isCartEmpty = cartCtx.products.length === 0;

    const updateProduct = async ({ id, ...productData }) => {
        try {
            await api.put(`http://localhost:8080/product/${id}`, productData);
            console.log(`Updated product ID: ${id}`);
        } catch (error) {
            console.error(`Failed to update product ID: ${id}`, error);
        }
    };

    async function generateOrder() {
        const updatedProductList = cartCtx.products.map(({ cart_quantity, ...remainingData }) => ({
            ...remainingData,
            stock_quantity: remainingData.stock_quantity - cart_quantity
        }));
        const productList = cartCtx.products.map(({ id, cart_quantity }) => ({
            product: { id },
            purchased_quantity: cart_quantity
        }));
        const order = {
            user: { id: userLogged.id },
            productList
        }
        try {
            const response = await api.post(`order`, order);
            setOrderId(response.data.id);
            console.log("Order created:", response.data);
            notification.success({ message: 'Orden Generada!' });
            updatedProductList.forEach(product => {
                updateProduct(product);
            });
        } catch (error) {
            notification.error({ message: 'Error!' });
            console.error("Error creating order:", error);
        }
    };

    const next = () => {
        if (current === 1) {
            setLoading(true);
            generateOrder();
            setTimeout(() => {
                setLoading(false);
                cartCtx.clearCart();
                setCurrent(current + 1);
            }, 3000);
        } else {
            setCurrent(current + 1);
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: 'Carrito',
            content: <Cart />,
            icon: <ShoppingCartOutlined />

        },
        {
            title: 'Confirmar',
            content: <AddressVerification />,
            icon: isLoading ? <LoadingOutlined /> : <TruckOutlined />
        },
        {
            title: 'Orden',
            content: <GeneratedOrder orderId={orderId} />,
            icon: <SolutionOutlined />
        },
    ];

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
        icon: item.icon
    }));

    const contentStyle = {
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <div className="steps" style={{ marginTop: 25 }}>
            {!isCartEmpty ?
                (<Row>
                    <Col span={16} offset={4}>
                        <Steps current={current} items={items} />
                    </Col>
                </Row>) : ''}
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{ marginTop: 24, textAlign: 'right' }}>
                {current > 0 && current < 2 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Regresar
                    </Button>
                )}
                {current < steps.length - 1 && (!isCartEmpty ?
                    <Button type="primary" onClick={() => next()}>
                        {current === 0 ? 'Continuar' : 'Finalizar'}
                    </Button> : ''
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={onSubmit}>
                        Cerrar
                    </Button>
                )}
            </div>
        </div>
    );
}

export default UserProgressModal;