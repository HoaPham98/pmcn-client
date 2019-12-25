import React from "react";
import './style.scss';
import {List, Avatar, Row, Col, Table, Form, Input, Button, Checkbox, Icon, Divider, InputNumber} from 'antd';

const prefixCls = 'payment';

const dataSource = [
    {
        title: 'Hóa đơn bàn 1',
    },
    {
        title: 'Hóa đơn bàn 5',
    },
    {
        title: 'Hóa đơn bàn 3',
    },
    {
        title: 'Hóa đơn bàn 7',
    },
    {
        title: 'Hóa đơn bàn 2',
    },
];

const dataBill = [
    {
        key: '1',
        item: 'Khoai lang chiên',
        count: 2,
        cost: '20000 VND',
    },
    {
        key: '2',
        item: 'Nem chua rán',
        count: 2,
        cost: '30000 VND',
    },
];

const columns = [
    {
        title: 'Món ăn',
        dataIndex: 'item',
        key: 'item',
    },
    {
        title: 'Số lượng',
        dataIndex: 'count',
        key: 'count',
    },
    {
        title: 'Giá',
        dataIndex: 'cost',
        key: 'cost',
    },
];

class Payment extends React.Component {
    render() {
        return (
            <div className={`${prefixCls}`}>
                <div className={`${prefixCls}-content`}>
                    <h1>Danh sách thanh toán đang chờ</h1>
                    <List style={{paddingTop: '30px'}}
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 3,
                        }}
                        itemLayout="horizontal"
                        dataSource={dataSource}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://p7.hiclipart.com/preview/933/591/825/cafe-restaurant-eat.jpg" />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description=""
                                />
                            </List.Item>
                        )}
                    />
                    <Divider/>
                    <Row>
                        <Col xs={{ span: 11}}> <h2 style={{background: '#d9d9d9', textAlign: 'center'}}>Hóa đơn hiện tại</h2>
                            <h3>Bàn số 1</h3>
                            <Table dataSource={dataBill} columns={columns}/>
                            <Row>
                                <Col span={8}>
                                    <div>Tổng tiền (Chưa VAT):</div>
                                    <div>Thuế (VAT):</div>
                                    <div>Tổng tiền:</div></Col>
                                <Col span={8} offset={8}>
                                    <div>50000 VND</div>
                                    <div>5000 VND</div>
                                    <div>55000 VND</div>
                                </Col>
                            </Row>

                        </Col>
                        <Col xs={{ span: 12, offset: 1 }}> <h2 style={{background: '#d9d9d9', textAlign: 'center'}}>Thông tin khách hàng</h2>
                            <Divider/>
                            <div>
                                <Row style={{textAlign: 'center'}}>
                                    <Col span={8}><label>Họ tên khách hàng</label></Col>
                                    <Col span={12}><Input placeholder={'Nhập tên khách hàng'}/></Col>
                                </Row>
                                <Row style={{textAlign: 'center'}}>
                                    <Col span={8}><label>Số điện thoại</label></Col>
                                    <Col span={12}><Input placeholder={"Nhập số điện thoại"}/></Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col span={20}></Col>
                        <Col span={4}><Button type="primary">Xác nhận </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Payment;