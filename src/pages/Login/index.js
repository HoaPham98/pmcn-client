import React, { useState } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { withCookies, useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom'

import './style.scss';

import { services } from '../../services'

const prefixCls = 'login';

const Login = (props) => {

  const [cookies, setCookie, removeCookie] = useCookies('cookies');
  const [loading, setLoading] = useState(false)
  const onLogin = (res) => {
    console.log(res)
    setCookie('accessToken', res.results.token);
    setCookie('isAuth', true);
    message.success('Đăng nhập thành công !');
    
    props.history.push('/')
  }

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setLoading(true)
        services.login(values.username, values.password)
          .then(res => res.json()).then( res => {
            onLogin(res)
            setLoading(false)
            // toastr.success("Đăng nhập thành công")
          })
          .catch(err => {
            console.log(1)
            setLoading(false)
            message.error("Đăng nhập thất bại")
            // toastr.error("Đăng nhập thất bại")
            throw err;
          })
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-content`}>
        <h1>Đăng nhập</h1>
        <div className={`${prefixCls}-wrapped-list`}>
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
          </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Form.create({ name: 'normal_login' })(Login);;
