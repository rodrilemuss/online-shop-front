import { useContext } from "react";
import { Card, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CartContext from "../store/CartContext";

function Product({ product }) {
    const cartCtx = useContext(CartContext);
    const { Meta } = Card;

    function handleAddProductToCart() {
        cartCtx.addProduct(product);
    }

    return (
        <Card
            hoverable
            style={{ minWidth: 300 }}
            cover={
                <img
                    alt={product.description}
                    src={product.image_url}
                    style={{ height: 250, objectFit: "scale-down" }}
                />
            }
            actions={[
                <Button type="primary" icon={<ShoppingCartOutlined />} onClick={handleAddProductToCart} >
                    Agregar al carrito
                </Button>
            ]}
        >
            <Meta
                style={{ height: 100 }}
                title={product.name.toUpperCase()}
                description={product.description.toUpperCase()}
            />
            <p>Precio: Q.{product.price.toFixed(2)}</p>
            <p>Disponibles: {product.stock_quantity}</p>
        </Card>
    )
}

export default Product;