import React, { useState } from 'react';

import './style.scss';

import { Table, Modal, Button, Form, InputNumber } from 'antd';




const prefixCls = 'order';



const dishes_order = Array.apply(null, Array(10)).map((item, index) => {
    return {
        id: index + 1,
        name: "Món " + (index + 1),
        sl: Math.floor(Math.random() * 10),
        isAvailable: Math.floor(Math.random() * 2)
    }
})


class Pre_payment extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            table: 1,
            data: dishes_order
        }

        this.columns = [
            { title: 'Món', dataIndex: 'name', key: 'name' },
            { title: 'Số lượng', dataIndex: 'sl', key: 'sl' },
            {
                title: '',
                dataIndex: '',
                key: 'x',
                render: (text, record) => <Button onClick={(e) => this.handleClick(record)}>Trả</Button>,
            },
        ];
    }

    handleClick(dish) {
        var { data } = this.state

        this.showModal(data)
    }

    showModal = (dish) => {
        console.log("click on dish", dish.id)
        this.setState({ visible: true })
    };

    handleOk = e => {
        this.setState({ visible: false })
    };

    handleCancel = e => {
        this.setState({ visible: false })
    };

    onCreateBill = (res) => {
        console.log(res)
        this.requestTablesStatus()
    }

    render() {
        const { visible } = this.state
        const SubForm = Form.create({ name: 'coordinated' })((props) => {
            console.log(props.form)
            return (
            <Form onSubmit={this.handleSubmit} className="login-form">
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
                    <h3>Bàn {this.state.table}</h3>
                    <div>
                        <div className='back-table'>
                            <Table
                                columns={this.columns}
                                dataSource={this.state.data}
                            />
                            <Button type={"primary"}>Thanh toán</Button>
                            <Modal
                                title="Menu"
                                visible={visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                footer={null}
                            >
                                <SubForm/>
                            </Modal>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


export default Pre_payment;
