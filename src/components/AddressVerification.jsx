import { useContext, useState } from 'react';
import { Row, Col, Form, Input, Button, notification } from 'antd';
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import AuthContext from '../store/AuthContext';
import api from '../utils/axiosInstance';

function AddressVerification() {
    const { userLogged, fetchUserByEmail } = useContext(AuthContext);
    const [isTextAreaDisabled, setTextAreaDisabled] = useState(true);
    const [formAddressVerification] = Form.useForm();
    const { TextArea } = Input;
    const initialValues = userLogged;

    async function updateUser(updatedUser) {
        try {
            const response = await api.put(`user/${userLogged.id}`, updatedUser);
            console.log("User updated:", response.data);
            notification.success({ message: 'Dirección actualizada!' });
            fetchUserByEmail(response.data.email)
        } catch (error) {
            notification.error({ message: 'Error!' });
            console.error("Error updating user:", error);
        }
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        formAddressVerification.setFieldValue({ shipping_address: values.shipping_address });
        setTextAreaDisabled(true);
        updateUser(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const enableTextArea = () => {
        setTextAreaDisabled(false);
    };

    const disableTextArea = () => {
        setTextAreaDisabled(true);
        formAddressVerification.resetFields();
    };

    return (
        <div className="addressVerification" style={{ margin: 15 }}>
            <Form
                form={formAddressVerification}
                name="formAddressVerification"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={initialValues}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Nombre"
                    name="first_name"
                >
                    <Input variant='borderless' disabled />
                </Form.Item>

                <Form.Item
                    label="Apellido"
                    name="last_name"
                >
                    <Input variant='borderless' disabled />
                </Form.Item>

                <Form.Item
                    label="Correo"
                    name="email"
                >
                    <Input variant='borderless' disabled />
                </Form.Item>

                <Form.Item name="password" hidden>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Dirección de envío"
                    name="shipping_address"
                    rules={!isTextAreaDisabled ? [{ required: true, message: 'Ingresa tu dirección de envío!' }] : []}
                >
                    <TextArea rows={3} maxLength={255} variant={isTextAreaDisabled ? 'borderless' : 'outlined'} disabled={isTextAreaDisabled} />
                </Form.Item>

                <Form.Item name="date_of_birth" hidden>
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Row>
                        <Col span={4} offset={17}>
                            {isTextAreaDisabled ? <Button type='default' icon={<EditOutlined />} onClick={enableTextArea}>Editar dirección de envío</Button> : ''}
                        </Col>
                        <Col span={4} offset={21}>
                            {!isTextAreaDisabled ? <div>
                                <Button type='text' icon={<CloseOutlined />} onClick={disableTextArea} />
                                <Button type='text' icon={<CheckOutlined />} htmlType="submit" />
                            </div> : ''}
                        </Col>
                    </Row>
                </Form.Item>

            </Form>
        </div>
    )
}

export default AddressVerification;