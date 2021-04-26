import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './css/LoginForm.css'

const LoginForm = () => {
    const onFinish = (values) => {
        //console.log('Received values of form: ', values);
        alert("Datos incorrectos")
    };

    return (
        <Form name="normal_login" className="login-form" initialValues={{ remember: true, }} onFinish={onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: 'Por favor, ingresa tu usuario', },]}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Por favor, ingresa tu contraseña', },]}>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Iniciar sesión
                </Button>
            </Form.Item>
        </Form>
    );
};


export default LoginForm