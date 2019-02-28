import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Cars } from "./../bd/cars";
import 'antd/dist/antd.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageError: ''
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                if (Cars.user === values.userName && Cars.pass === values.password){
                    message.success('Inicio de sesión ok!');
                    this.props.handleLogin(values.userName);
                }else{
                    message.error('Error de inicio de sesión');
                }
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Por favor ingrese su nombre de usuario!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Usuario" className="boxshadow-002" />
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Por favor ingrese su contraseña!' }],
                })(
                    <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña" className="boxshadow-002" />
                )}
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button boxshadow-002"><span className="font-Carter-One textshadow-002">Iniciar sesión</span> <Icon type="login" /></Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;