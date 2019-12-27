import React, { useState } from 'react';
import {Form, Icon, Input, Button, Checkbox, InputNumber, Select, Row, Col, message, Table} from 'antd';
import { withCookies, useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom'

import './style.scss';

import { services } from '../../services'

const prefixCls = 'login';



  class Admin extends React.Component  {
    constructor(props) {
      super(props);

      this.editClick = this.editClick.bind(this);
      this.deleteClick = this.deleteClick.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
      this.state = {
        dishes: []
      }


      this.columns =  [
        {
          title: 'Món',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Đơn vị',
          dataIndex: 'unit.name',
          key: 'unit.name',
           render: (text, record) => <div>Suất</div>,
        },
        {
          title: 'Có sẵn',
          dataIndex: 'isAvailable',
          key: 'isAvailable',
          render: (text, record) => <div>Không có sẵn</div>,

        },
        {
          title: 'Giá',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: '',
          dataIndex: '',
          key: 'x',
          render: (text, record) => <div><Button onClick={(e) => this.editClick(record)} type='primary' >Sửa</Button> <Button onClick={(e) => this.deleteClick(record)} >Xoá</Button></div>,
        },
      ];
    }

    editClick() {

    }
    deleteClick (dish){
      services.deleteDish(dish._id)
          .then(res => {
            console.log('Create dishđaa')
            console.log(res)
            this.props.history.goBack();
          }).catch(err => console.log('LỖI', err))

    }
    handleCreate() {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Create dish')
          services.createDish(values.name, values.price, values.unit, 600000, values.type)
              .then(res => {
                console.log('Create dishđaa')
                console.log(res)
                this.props.history.goBack();
              }).catch(err => console.log('LỖI', err))
        }
      });

    }

    componentDidMount() {
      this.requestGetListDishes()
    }

    requestGetListDishes() {
      services.getListDishes().then(data => {
        console.log('DANH SACH MON AN', data.results)
        this.setState({dishes: data.results})
      })
    }


 render() {
   const { getFieldDecorator } = this.props.form
      const { Option } = Select
   return (
       <div className={`${prefixCls}`}>
         <div className={`${prefixCls}-content`}>
           <h1>Menu</h1>
           <div className={`${prefixCls}-wrapped-list`}>
             <Table
                 columns={this.columns}
                 dataSource={this.state.dishes}
             />
             <Form  onSubmit={this.handleCreate} className="login-form">
               <Form.Item>
                 <h3>Tên món</h3>
                 {getFieldDecorator('name', {
                   rules: [{ required: true, message: 'Hãy nhập tên món!' }],
                 })
                   (
                     <Input
                         placeholder="Nhập tên món"
                     />
                 )}
               </Form.Item>

               <Row>
                 <Col span={8}>
                   <Form.Item>
                     <h3>Giá</h3>
                     {getFieldDecorator('price', {
                       rules: [{ required: true, message: 'Nhập giá tiền!' }],
                     })
                     (
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
                       rules: [{ required: true, message: 'Chọn loại!' }],
                     })
                       (
                         <Select style={{ width: 220 }} >
                           <Option value="true">Có sẵn</Option>
                           <Option value="false">Không có sẵn</Option>

                         </Select>
                     )}
                   </Form.Item>
                 </Col>
                 <Col span={8}>
                   <Form.Item>
                     <h3>Đơn vị tính</h3>
                     {getFieldDecorator('unit', {
                       rules: [{ required: true, message: 'Chọn đơn vị tính!' }],
                     })
                       (
                         <Select  style={{ width: 220 }} >
                           <Option value="5e024658945cc536892a05b9">Đĩa</Option>
                           <Option value="5e02467a945cc536892a05ba">Bát</Option>
                           <Option value="5e024a0d1d7f4529643452c7">Set</Option>
                           <Option value="5e024f5e1d7f4529643452d4">Con</Option>
                           <Option value="5e024a191d7f4529643452c8">Chai</Option>
                         </Select>
                     )}
                   </Form.Item>
                 </Col>
               </Row>

               <Form.Item>
                 <Button type="primary" htmlType="submit" className="login-form-button">
                   Thêm món
                 </Button>
               </Form.Item>
             </Form>
           </div>
         </div>

         {/*  <div className={`${prefixCls}-content`}>*/}
         {/*    <h1>Thêm nhân viên mới</h1>*/}
         {/*    <div className={`${prefixCls}-wrapped-list`}>*/}
         {/*      <Form  className="login-form">*/}
         {/*        <Form.Item>*/}
         {/*          {getFieldDecorator('username', {*/}
         {/*            rules: [{ required: true, message: 'Please input your username!' }],*/}
         {/*          })(*/}
         {/*              <Input*/}
         {/*                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}*/}
         {/*                  placeholder="Username"*/}
         {/*              />,*/}
         {/*          )}*/}
         {/*        </Form.Item>*/}
         {/*        <Form.Item>*/}
         {/*          {getFieldDecorator('password', {*/}
         {/*            rules: [{ required: true, message: 'Please input your Password!' }],*/}
         {/*          })(*/}
         {/*              <Input*/}
         {/*                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}*/}
         {/*                  type="password"*/}
         {/*                  placeholder="Password"*/}
         {/*              />,*/}
         {/*          )}*/}
         {/*        </Form.Item>*/}
         {/*        <Form.Item>*/}
         {/*          {getFieldDecorator('remember', {*/}
         {/*            valuePropName: 'checked',*/}
         {/*            initialValue: true,*/}
         {/*          })(<Checkbox>Remember me</Checkbox>)}*/}
         {/*          <Button type="primary" htmlType="submit" className="login-form-button">*/}
         {/*            Log in*/}
         {/*          </Button>*/}
         {/*        </Form.Item>*/}
         {/*      </Form>*/}
         {/*    </div>*/}
         {/*  </div>*/}
       </div>



   );
 }


};
export default Form.create({ name: 'normal_login' })(Admin);

