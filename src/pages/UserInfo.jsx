import { useContext, useState } from 'react';
import { Row, Col, Divider, Form, Input, DatePicker, Button, Modal, notification } from 'antd';
import { EditOutlined, CheckOutlined, CloseOutlined, SecurityScanOutlined } from '@ant-design/icons';
import AuthContext from '../store/AuthContext';
import api from '../utils/axiosInstance';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import './Pages.css';

dayjs.extend(customParseFormat);

function subtractYears(date) {
    date.setFullYear(date.getFullYear() - 18);
    const fixMonth = date.getMonth() + 1;
    const currentMonth = (fixMonth < 10 ? '0' : '') + fixMonth;
    const currentDay = (date.getDate() < 10 ? '0' : '') + date.getDate();
    return date.getFullYear() + '-' + currentMonth + '-' + currentDay;
}

function UserInfo() {
    const { userLogged, fetchUserByEmail } = useContext(AuthContext);
    const [isFormDisabled, setFormDisabled] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formUserInfo] = Form.useForm();
    const [formResetPassword] = Form.useForm();
    const { TextArea } = Input;
    const dateFormat = 'YYYY-MM-DD';
    const initialValues = { ...userLogged, date_of_birth: dayjs(userLogged.date_of_birth?.substring(0, 10), dateFormat) };

    async function updateUser(updatedUser, message) {
        try {
            const response = await api.put(`user/${userLogged.id}`, updatedUser);
            console.log("User updated:", response.data);
            notification.success({ message });
            fetchUserByEmail(response.data.email)
        } catch (error) {
            notification.error({ message: 'Error!' });
            console.error("Error updating user:", error);
        }
    };

    const handleResetPassword = async (values) => {
        const { id, ...userWithoutId } = userLogged;
        try {
            updateUser({ ...userWithoutId, password: values.newPassword }, 'Contraseña Actualizada!');
            formResetPassword.resetFields();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error resetting password:", error);
        }
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        formUserInfo.setFieldValue({ ...values });
        setFormDisabled(true);
        const updatedFormValues = { ...values, date_of_birth: dayjs(values.date_of_birth).format(dateFormat) };
        updateUser(updatedFormValues, 'Usuario actualizado!');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const enableForm = () => {
        setFormDisabled(false);
    };

    const disableForm = () => {
        setFormDisabled(true);
        formUserInfo.resetFields();
    };

    return (
        <div className='full-page' style={{ padding: "20px" }}>
            <Row>
                <Col span={2}>
                    <h2>Perfil</h2>
                </Col>
            </Row>
            <Divider style={{ borderColor: '#5c5c5c' }} />
            <Form
                form={formUserInfo}
                name="formUserInfo"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ minWidth: 450, color: 'white' }}
                initialValues={initialValues}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Nombre"
                    name="first_name"
                    rules={!isFormDisabled ? [{ required: true, message: 'Ingresa tu nombre!' }] : []}
                >
                    <Input variant={isFormDisabled ? 'borderless' : 'outlined'} style={{ backgroundColor: '#242424', color: 'white' }} disabled={isFormDisabled} />
                </Form.Item>

                <Form.Item
                    label="Apellido"
                    name="last_name"
                    rules={!isFormDisabled ? [{ required: true, message: 'Ingresa tu apellido!' }] : []}
                >
                    <Input variant={isFormDisabled ? 'borderless' : 'outlined'} style={{ backgroundColor: '#242424', color: 'white' }} disabled={isFormDisabled} />
                </Form.Item>

                <Form.Item
                    label="Correo"
                    name="email"
                    rules={!isFormDisabled ? [{ required: true, message: 'Ingresa tu correo electrónico!' }] : []}
                >
                    <Input variant={isFormDisabled ? 'borderless' : 'outlined'} style={{ backgroundColor: '#242424', color: 'white' }} disabled={isFormDisabled} />
                </Form.Item>

                <Form.Item name="password" hidden>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Dirección de envío"
                    name="shipping_address"
                    rules={!isFormDisabled ? [{ required: true, message: 'Ingresa tu dirección de envío!' }] : []}
                >
                    <TextArea rows={3} maxLength={255} variant={isFormDisabled ? 'borderless' : 'outlined'} style={{ backgroundColor: '#242424', color: 'white' }} disabled={isFormDisabled} />
                </Form.Item>

                <Form.Item
                    label="Fecha de nacimiento"
                    name="date_of_birth"
                    rules={!isFormDisabled ? [{ required: true, message: 'Ingresa tu fecha de nacimiento!' }] : []}
                >
                    <DatePicker maxDate={dayjs(subtractYears(new Date()), dateFormat)} variant={isFormDisabled ? 'borderless' : 'outlined'} style={{ backgroundColor: '#242424', color: 'white', width: '100%' }} disabled={isFormDisabled} />
                </Form.Item>

                <Form.Item>
                    {isFormDisabled ? <Row>
                        <Col span={24} offset={6}>
                            <Button type='outlined' icon={<EditOutlined />} onClick={enableForm}>Editar mi Información</Button>
                        </Col>
                    </Row> : ''}
                    {!isFormDisabled ? <Row>
                        <Col span={24} offset={6}>
                            <Button type='text' icon={<CloseOutlined />} onClick={disableForm}>Cancelar</Button>
                            <Button type='text' icon={<CheckOutlined />} htmlType="submit">Actualizar</Button>
                        </Col>
                    </Row> : ''}
                </Form.Item>

            </Form>
            <Row>
                <Col span={24}>
                    <Button type='outlined' icon={<SecurityScanOutlined />} onClick={() => setIsModalOpen(true)}>Actualizar Contraseña</Button>
                </Col>
            </Row>

            <Modal title="Actualizar Contraseña" centered open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
                <Form form={formResetPassword} onFinish={handleResetPassword} labelCol={{ span: 8 }} wrapperCol={{ span: 18 }} style={{ maxWidth: 600 }}>
                    <Form.Item name="newPassword" label="Nueva Contraseña" rules={[{ required: true, message: 'Ingrese su nueva contraseña' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="confirmPassword" label="Confirmar Contraseña" dependencies={['newPassword']} rules={[{ required: true, message: 'Confirme su nueva contraseña' }, ({ getFieldValue }) => ({ validator(_, value) { return !value || getFieldValue('newPassword') === value ? Promise.resolve() : Promise.reject(new Error('Las contraseñas no coinciden')); } })]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Actualizar</Button>
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    )
}

export default UserInfo;