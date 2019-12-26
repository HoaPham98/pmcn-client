import React from "react";
import './style.scss';
import {List, Avatar, Row, Col, Table, Form, Input, Button, Checkbox, Icon, Divider, InputNumber, Popconfirm, notification} from 'antd';
import { services } from "../../services";
import io from "socket.io-client";

const prefixCls = 'payment';

const columns = [
    {
        title: 'Món ăn',
        dataIndex: 'dish.name',
        key: 'item',
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'count',
    },
    {
        title: 'Giá',
        dataIndex: 'dish.price',
        key: 'cost',
    },
];

class Payment extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            bills: [],
            currentBill: null
        }

        this.socket = io('localhost:4000/cashier')

        this.socket.on('done', (message) => {
            this.openNotificationWithIcon(message)
        }) 
    }

    openNotificationWithIcon = message => {
        this.requestPending()
        notification['success']({
          message: 'Có một món đã chuẩn bị xong',
          description:
            message,
        });
      };

    componentDidMount() {
        this.requestPending()
    }

    requestPending() {
        services.getPendingBills().then(res => {
            this.setState({bills: res.results, currentBill: null})
        })
    }

    completeBill(id) {
        services.completeBill(id).then(res => {
            this.requestPending()
        })
    }

    onClickBill = () => {
        const bill = this.state.currentBill
        if (bill != null) {
            this.completeBill(bill._id)
        }
    }

    render() {
        var order = []
        var total_price = 0
        if (this.state.currentBill != null) {
            order = this.state.currentBill.finalOrder
            total_price = this.state.currentBill.totalPrice
        }
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
                        dataSource={this.state.bills}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://p7.hiclipart.com/preview/933/591/825/cafe-restaurant-eat.jpg" />}
                                    title={<a>{item.tables.map(item => item.name).join(', ')}</a>}
                                    description=""
                                    onClick={() => this.setState({currentBill: item})}
                                />
                            </List.Item>
                        )}
                    />
                    <Divider/>
                    <Row>
                        <Col xs={{ span: 11}}> <h2 style={{background: '#d9d9d9', textAlign: 'center'}}>Hóa đơn hiện tại</h2>
                            <h3>Bàn số 1</h3>
                            <Table dataSource={order} columns={columns}/>
                            <Row>
                                <Col span={8}>
                                    <div>Tổng tiền (Chưa VAT):</div>
                                    <div>Thuế (VAT):</div>
                                    <div>Tổng tiền:</div></Col>
                                <Col span={8} offset={8}>
                                    <div>{total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} VND</div>
                                    <div>{(total_price * 0.1).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} VND</div>
                                    <div>{(total_price * 1.1).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} VND</div>
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
                        <Col span={4}><Popconfirm
                                title="Bạn chắc chắn muốn thanh toán chứ?"
                                onConfirm={this.onClickBill}
                                onCancel={null}
                                okText="Yes"
                                cancelText="No"
                                disabled={this.state.currentBill == null}
                            ><Button disabled={this.state.currentBill == null} type="primary">Xác nhận </Button></Popconfirm>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Payment;