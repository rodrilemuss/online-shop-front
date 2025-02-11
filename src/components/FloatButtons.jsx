import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, FloatButton } from "antd";
import { LogoutOutlined, UserOutlined, UnorderedListOutlined, ProductOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import AuthContext from '../store/AuthContext';
import CartContext from '../store/CartContext';
import UserProgressModal from './UserProgressModal';

function FloatButtons() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const cartCtx = useContext(CartContext);
    const [modalCart, setModalCart] = useState(false);
    const { pathname } = useLocation();
    const isAuthenticated = localStorage.getItem("tk") === null ? false : true;
    const isProductsPath = pathname === "/products" ? true : false;
    const isProfilePath = pathname === "/profile" ? true : false;
    const isOrdersPath = pathname === "/orders" ? true : false;
    const totalCartProducts = cartCtx.products.reduce((totalNumberOfProducts, product) => {
        return totalNumberOfProducts + product.cart_quantity;
    }, 0)

    const handleCancelCart = () => {
        setModalCart(false);
    };

    const reloadSteps = () => {
        setModalCart(false);
        navigate(0);
    }

    const goToProfile = () => {
        navigate("/profile");
    };

    const goToOrders = () => {
        navigate("/orders");
    };

    const goToProducts = () => {
        navigate("/products");
    };

    const handleLogout = () => {
        logout()
        navigate("/");
    };

    return (
        <div>
            {isAuthenticated ? (<FloatButton.Group shape="circle" style={{ insetInlineEnd: 45 }} >
                <FloatButton icon={<ShoppingCartOutlined />} type="default" tooltip={<div>Carrito</div>} badge={{ showZero: true, count: totalCartProducts, color: 'blue' }} onClick={() => setModalCart(true)} />
                {!isProfilePath ? (<FloatButton icon={<UserOutlined />} type="default" tooltip={<div>Ir al Perfil</div>} onClick={goToProfile} />) : ''}
                {!isOrdersPath ? (<FloatButton icon={<UnorderedListOutlined />} type="default" tooltip={<div>Ir a Mis Pedidos</div>} onClick={goToOrders} />) : ''}
                {!isProductsPath ? (<FloatButton icon={<ProductOutlined />} type="default" tooltip={<div>Ir al Catálogo de Productos</div>} onClick={goToProducts} />) : ''}
                <FloatButton icon={<LogoutOutlined />} type="default" tooltip={<div>Cerrar Sesión</div>} onClick={handleLogout} />
            </FloatButton.Group>) : ''}
            <Modal
                title=" "
                centered
                width={'820px'}
                closeIcon={true}
                footer={null}
                open={modalCart}
                onCancel={handleCancelCart}
            >
                <UserProgressModal onSubmit={() => reloadSteps()} />
            </Modal>
        </div>
    )
}

export default FloatButtons;