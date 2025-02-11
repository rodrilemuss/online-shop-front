import { Button, Form, Input, DatePicker } from 'antd';
import AuthContext from '../store/AuthContext';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { useContext } from 'react';

dayjs.extend(customParseFormat);

function subtractYears(date) {
    date.setFullYear(date.getFullYear() - 18);
    const fixMonth = date.getMonth() + 1;
    const currentMonth = (fixMonth < 10 ? '0' : '') + fixMonth;
    const currentDay = (date.getDate() < 10 ? '0' : '') + date.getDate();
    return date.getFullYear() + '-' + currentMonth + '-' + currentDay;
}

function SignupModal({ onSubmit }) {
    const { register } = useContext(AuthContext);
    const [formSignup] = Form.useForm();
    const { TextArea } = Input;
    const dateFormat = 'YYYY-MM-DD';

    const onFinish = (values) => {
        console.log('Success:', values);
        formSignup.resetFields();
        const updatedFormValues = { ...values, date_of_birth: dayjs(values.date_of_birth).format(dateFormat) };
        register(updatedFormValues);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={formSignup}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Nombre"
                name="first_name"
                rules={[{ required: true, message: 'Ingresa tu nombre!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Apellido"
                name="last_name"
                rules={[{ required: true, message: 'Ingresa tu apellido!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Correo electrónico"
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

            <Form.Item
                label="Dirección de envío"
                name="shipping_address"
                rules={[{ required: true, message: 'Ingresa tu dirección de envío!' }]}
            >
                <TextArea rows={3} maxLength={255} />
            </Form.Item>

            <Form.Item
                label="Fecha de nacimiento"
                name="date_of_birth"
                rules={[{ required: true, message: 'Ingresa tu fecha de nacimiento!' }]}
            >
                <DatePicker maxDate={dayjs(subtractYears(new Date()), dateFormat)} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit" onClick={onSubmit}>
                    Registrarme
                </Button>
            </Form.Item>
        </Form>
    );
}

export default SignupModal;