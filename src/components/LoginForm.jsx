import React from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './css/LoginForm.css'
import axios from 'axios';
import md5 from 'md5';

const LoginForm = () => {
    const urlBase = 'https://neuromedicall-backend.onrender.com'


    const onFinish = async (values) => {
        console.log( values);
        let usuario = values.username;
        let password = values.password;
        console.log(usuario);
        await axios.get(`${urlBase}/iniciarSesion`, {params: {usuario, contrasena: md5(password)}})
        .then(response => {
            return response.data
        })
        .then(response =>{
            if (response.dato === "1") {
                localStorage.setItem('id', response.id)
                alert("Bienvenido")
                window.location.href = "./panel/registro-consulta";
            } else if (response.dato === "0") {
                alert("Datos incorrectos")
            }
        })
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