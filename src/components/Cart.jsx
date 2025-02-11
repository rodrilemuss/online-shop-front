import { useContext } from 'react';
import { Avatar, List, Button, Row, Col } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import CartContext from '../store/CartContext';

function Cart() {
    const cartCtx = useContext(CartContext)
    const isCartEmpty = cartCtx.products.length === 0;
    const cartTotal = cartCtx.products.reduce((totalPrice, product) => totalPrice + product.cart_quantity * product.price, 0);

    return (
        <div className="cart" style={{ margin: 15 }}>
            {!isCartEmpty ? (
                <List
                    itemLayout="horizontal"
                    dataSource={cartCtx.products}
                    renderItem={(product) => (
                        <List.Item key={product.id} actions={[
                            <Button.Group>
                                <Button icon={(product.cart_quantity <= 1 ? <DeleteOutlined /> : <MinusOutlined />)} onClick={() => cartCtx.removeProduct(product.id)} />
                                <Button>{product.cart_quantity}</Button>
                                <Button icon={<PlusOutlined />} onClick={() => cartCtx.addProduct(product)} />
                            </Button.Group>
                        ]}>
                            <List.Item.Meta
                                avatar={<Avatar shape='square' size={50} src={product.image_url} />}
                                title={product.name.toUpperCase()}
                                description={(product.cart_quantity + ` x Q.` + product.price.toFixed(2))}
                            />
                        </List.Item>
                    )}
                />
            ) : (
                <Row>
                    <Col span={24} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <ShoppingCartOutlined style={{ fontSize: '32px', marginTop: 25 }} />
                    </Col>
                    <Col span={24} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <h2>Carrito vacío</h2>
                    </Col>
                </Row>
            )}
            {!isCartEmpty ? (<h2 className="cart-total" style={{ textAlign: 'right' }}><b>Total: Q.{cartTotal.toFixed(2)}</b></h2>) : <div></div>}
        </div>
    )
}

export default Cart;