import { useContext } from "react";
import { Button, Form, Input } from 'antd';
import AuthContext from "../store/AuthContext";

function LoginModal({ onSubmit }) {
    const [formLogin] = Form.useForm();
    const { login } = useContext(AuthContext);

    const onFinish = (values) => {
        console.log('Success:', values);
        login(values);
        formLogin.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={formLogin}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Correo"
                name="email"
                rules={[{ required: true, message: 'Ingresa tu correo electrónico!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Contraseña"
                name="password"
                rules={[{ required: true, message: 'Ingresa tu contraseña!' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item label={null}>
                <Button type="primary" htmlType="submit" onClick={onSubmit}>
                    Iniciar Sesión
                </Button>
            </Form.Item>
        </Form>
    );
}

export default LoginModal;