import { useContext, useEffect, useState } from 'react';
import { Row, Col, Divider, Table, Space, Button, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import GeneratedOrder from '../components/GeneratedOrder';
import AuthContext from '../store/AuthContext';
import api from '../utils/axiosInstance';

function OrdersInfo() {
    const { userLogged } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState(0);
    const [modalOrderDetails, setModalOrderDetails] = useState(false);

    const fetchOrders = async () => {
        try {
            const response = await api.get(`order?userId=${userLogged.id}`);
            const transformedList = response.data?.map(order => ({
                key: order.id,
                id: order.id,
                status: order.status,
            }));
            setOrders(transformedList);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleOpenOrderDetails = (id) => {
        setOrderId(id);
        setModalOrderDetails(true);
    };

    const handleCancelOrderDetails = () => {
        setModalOrderDetails(false);
    };

    const columns = [
        {
            title: '# Orden',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<EyeOutlined />} onClick={() => handleOpenOrderDetails(record.id)} />
                </Space>
            ),
        }
    ];

    return (
        <div className='full-page' style={{ padding: "20px" }}>
            <Row>
                <Col span={7}>
                    <h2>Mis Pedidos</h2>
                </Col>
            </Row>
            <Divider style={{ borderColor: '#5c5c5c' }} />
            <Table style={{ minWidth: 450 }} pagination={false} columns={columns} dataSource={orders} />
            <Modal
                title=" "
                centered
                closeIcon={true}
                footer={null}
                open={modalOrderDetails}
                onCancel={handleCancelOrderDetails}
            >
                <GeneratedOrder orderId={orderId} />
            </Modal>
        </div>
    )
}

export default OrdersInfo;