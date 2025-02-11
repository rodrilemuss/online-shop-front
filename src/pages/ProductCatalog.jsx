import { useState, useEffect } from "react";
import { Row, Col, Divider, Input, List } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Product from "../components/Product";
import api from "../utils/axiosInstance";

function ProductCatalog() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchProducts = async () => {
        try {
            const url = searchTerm
                ? `product?searchTerm=${searchTerm}`
                : "product/all";

            const response = await api.get(url);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            fetchProducts();
        }, 500);

        return () => clearTimeout(delaySearch);
    }, [searchTerm]);

    return (
        <div style={{ padding: "20px" }}>
            <Row>
                <Col span={6}>
                    <h2>Catálogo de Productos</h2>
                </Col>
                <Col span={18} style={{ display: "flex", alignItems: "center" }}>
                    <Input className="search-input" suffix={<SearchOutlined />} style={{ background: 242424, color: 'white', marginLeft: 35 }} variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </Col>
            </Row>
            <Divider style={{ borderColor: '#5c5c5c' }} />
            <Row className="full-list">
                {products.length > 0 ? (
                    <List
                        grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 4 }}
                        dataSource={products}
                        renderItem={product => (
                            <List.Item>
                                <Product key={product.id} product={product} />
                            </List.Item>
                        )}
                    />
                ) : (
                    <Col span={24} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <h2>No hay productos</h2>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default ProductCatalog;