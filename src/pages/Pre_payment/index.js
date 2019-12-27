import React, { useState } from 'react';

import './style.scss';

import { Table, Modal, Button, Form, InputNumber, Popconfirm } from 'antd';
import { services } from '../../services';

const prefixCls = 'order';

class Pre_payment extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.onCheckout = this.onCheckout.bind(this)
        this.billId = this.props.match.params.id

        this.state = {
            data: [],
            currentDish: null
        }

        this.columns = [
            { title: 'Món', dataIndex: 'dish.name', key: 'name' },
            { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
            {
                title: '',
                dataIndex: '',
                key: 'x',
                render: (text, record) => <Button disabled={!record.dish.isAvailable} onClick={(e) => this.handleClick(record)}>Trả</Button>,
            },
        ];
    }

    componentDidMount() {
        this.requestGetFinalBill(this.billId)
    }

    requestGetFinalBill(billId) {
        services.requestPayment(billId).then(res => {
            console.log(res)
            this.setState({ data: res.results.finalOrder })
        })
    }

    handleClick(dish) {

        this.showModal(dish)
    }

    showModal = (dish) => {
        console.log("click on dish", dish.id)
        this.setState({ visible: true, currentDish: dish })
    };

    handleOk = e => {
        this.setState({ visible: false, currentDish: null })
    };

    handleCancel = e => {
        this.setState({ visible: false, currentDish: null })
    };

    onCheckout = () => {
        services.confirmPayment(this.billId).then(res => {
            this.props.history.goBack();
        })
    }

    render() {
        const { visible } = this.state
        const SubForm = Form.create({ name: 'coordinated' })((props) => {
            const handleSubmit = e => {
                e.preventDefault();
                props.form.validateFields((err, values) => {
                    if (!err) {
                        const number = values['username']
                        this.setState({ loading: true })
                        services.returnDish(this.billId, this.state.currentDish.dish._id, number)
                            .then(
                                res => {
                                    this.setState({ visible: false, loading: false, data: res.results.finalOrder })
                                }
                            )
                            .catch(err => {
                                this.setState({ loading: false })
                                throw err;
                            })
                    }
                });
            };

            return (
                <Form onSubmit={handleSubmit}>
                    <Form.Item>
                        {props.form.getFieldDecorator('username', {
                            rules: [{ required: true, type: "number", min: 1, max: 12, message: "Lỗi rồi" }],
                        })(
                            <InputNumber min={1} max={12} value={1} />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Trả lại
                    </Button>
                    </Form.Item>
                </Form>)
        })
        return (
            <div className={`${prefixCls}`}>
                <div className={`${prefixCls}-content`}>

                    <h1>Payment</h1>
                    <h3>Bàn 1</h3>
                    <div>
                        <div className='back-table'>
                            <Table
                                columns={this.columns}
                                dataSource={this.state.data}
                            />
                            <Popconfirm
                                title="Bạn chắc chắn muốn thanh toán chứ?"
                                onConfirm={this.onCheckout}
                                onCancel={null}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type={"primary"}>Thanh toán</Button>
                            </Popconfirm>

                            <Modal
                                title="Menu"
                                visible={visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                footer={null}
                            >
                                <SubForm />
                            </Modal>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


export default Pre_payment;
