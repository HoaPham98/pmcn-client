import React, { useState } from 'react';
import { Form, Icon, Input, Button, Checkbox,InputNumber, Select, Row, Col, message } from 'antd';
import { withCookies, useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom'

import './style.scss';

import { services } from '../../services'

const prefixCls = 'login';

const Admin = (props) => {

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
  const { Option } = Select;

  return (
      <div className={`${prefixCls}`}>
        <div className={`${prefixCls}-content`}>
          <h1>Thêm món mới</h1>
          <div className={`${prefixCls}-wrapped-list`}>
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Item>
                <h3>Tên món</h3>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Hãy nhập tên món!' }],
                })(

                    <Input
                        placeholder="Nhập tên món"
                    />,
                )}
              </Form.Item>

              <Row>
                <Col span={8}>
                  <Form.Item>
                    <h3>Giá</h3>
                    {getFieldDecorator('price', {
                      rules: [{ required: true, message: 'Nhập giá tiền!' }],
                    })(
                        <InputNumber
                            style={{ width: 220 }}
                            min={0}
                            formatter={value => `${value}VNĐ`}
                            parser={value => value.replace('VNĐ', '')}

                        />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item>
                    <h3>Phân loại</h3>
                    {getFieldDecorator('type', {
                      rules: [{ required: true, message: 'Nhập giá tiền!' }],
                    })(
                        <Select defaultValue="Món chính" style={{ width: 220 }} >
                          <Option value="1">Món khai vị</Option>
                          <Option value="2">Món chính</Option>
                          <Option value="3">Món tráng miệng</Option>
                          <Option value="4">Đồ uống</Option>
                        </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item>
                    <h3>Đơn vị tính</h3>
                    {getFieldDecorator('unit', {
                      rules: [{ required: true, message: '!' }],
                    })(
                        <Select defaultValue="Đĩa" style={{ width: 220 }} >
                          <Option value="1">Đĩa</Option>
                          <Option value="2">Bát</Option>
                          <Option value="3">Set</Option>
                          <Option value="4">Con</Option>
                          <Option value="5">Chai</Option>
                        </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                 Tạo
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className={`${prefixCls}-content`}>
          <h1>Thêm nhân viên mới</h1>
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

export default Form.create({ name: 'normal_login' })(Admin);
