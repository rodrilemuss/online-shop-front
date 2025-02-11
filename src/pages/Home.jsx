import { useState } from 'react'
import { Modal, Divider, Button } from "antd";
import { ShoppingOutlined, UserAddOutlined, LoginOutlined } from '@ant-design/icons';
import SignupModal from '../components/SignupModal.jsx'
import LoginModal from '../components/LoginModal.jsx';

function Home() {
    const [modalSignup, setModalSignup] = useState(false);
    const [modalLogin, setModalLogin] = useState(false);

    const handleCancelSignup = () => {
        setModalSignup(false);
    };

    const handleCancelLogin = () => {
        setModalLogin(false);
    };

    return (
        <div>
            <ShoppingOutlined style={{ fontSize: '175px', color: '#08c' }} />
            <h1>Tienda Online</h1>
            <div className="card">
                <Button type="primary" shape="round" icon={<UserAddOutlined />} size="large" onClick={() => setModalSignup(true)}>
                    Crear cuenta
                </Button>
                <Divider style={{ borderColor: '#5c5c5c' }} />
                <p className="alredy">
                    ¿Ya tienes una cuenta?
                </p>
                <Button type="default" shape="round" icon={<LoginOutlined />} size="large" onClick={() => setModalLogin(true)}>
                    Iniciar Sesión
                </Button>

                <Modal
                    title="Crea tu cuenta"
                    centered
                    closeIcon={true}
                    footer={null}
                    open={modalSignup}
                    onCancel={handleCancelSignup}
                >
                    <SignupModal onSubmit={() => setModalSignup(false)} />
                </Modal>

                <Modal
                    title="Inicia sesión"
                    centered
                    closeIcon={true}
                    footer={null}
                    open={modalLogin}
                    onCancel={handleCancelLogin}
                >
                    <LoginModal onSubmit={() => setModalLogin(false)} />
                </Modal>
            </div>
        </div>
    )
}

export default Home;