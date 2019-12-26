import React, { useState } from 'react';

import './style.scss';

import Table from '../../components/Table';
import { Modal, notification } from 'antd';

import io from "socket.io-client";
import { getCookie } from '../../utils/authHeader'

import CreateBill from '../../components/CreateBill';
import CreateOrder from '../../components/CreateOrder'

import { services } from '../../services'
const prefixCls = 'tables';

class Tables extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            currentTable: null,
            tables: [],
            modalLoading: false,
            detailBill: []
        }
        this.showModal = this.showModal.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.onServe = this.onServe.bind(this)

        this.socket = io('localhost:4000/waiter')

        this.socket.on('done', (message) => {
            this.openNotificationWithIcon(message)
        }) 
    }

    // Đây là hàm gọi 1 lần duy nhất khi bắt đầu load trang => Nên call api để fill data vào UI
    componentDidMount() {
        this.requestTablesStatus()
    }

    // Đây là call API
    requestTablesStatus() {
        services.getTables().then(data => {
            this.setState({tables: data.results, visible: false})
        })
    }

    requestGetBillDetail(id) {
        this.setState({modalLoading: true, detailBill: []})
        services.getBillDetails(id).then(data => {
            
            const orders = data.results.orders
            var dishes = []
            orders.forEach((item) => {
                data = item.dishes.map(dish => {
                    dish.orderId = item._id

                    return dish
                })
                dishes = dishes.concat(item.dishes)
            })
            
            this.setState({modalLoading: false, detailBill: dishes})
        })
    }

    serveDish(orderId, dishId) {
        this.setState({modalLoading: true})

        services.serveDish(orderId, dishId).then(res => {
            console.log(res)
            this.requestGetBillDetail(this.state.currentTable.currentBill).then(res => {
                this.setState({modalLoading: false})
            })
        }).catch(err => console.log(err))
        
    }

    requestPayment(billID) {
        this.setState({modalLoading: true})
    }

    renderTable = lstTables => {
        let result = null;

        if (lstTables && lstTables.length > 0) {
            result = lstTables.map((table, index) => <Table key={index} onClick={() => this.showModal(table)} {...table} />);
        }

        return result;
    };

    openNotificationWithIcon = message => {
        notification['success']({
          message: 'Có một món đã chuẩn bị xong',
          description:
            message,
        });
      };

    showModal = (table) => {
        console.log("click on table", table)
        if (!table.isAvailable) {
            this.requestGetBillDetail(table.currentBill)
        }
        this.setState({currentTable: table, visible: true})
    };

    handleOk = e => {
        this.setState({visible: false})
    };

    handleCancel = e => {
        this.setState({visible: false})
    };

    onCreateBill = (res) => {
        console.log(res)
        this.requestTablesStatus()
    }

    onServe = (dish) => {
        console.log('PHUC VU', dish)
        this.serveDish(dish.orderId, dish.dish._id)
    }

    renderModal = (currentTable) => {
        const { tables } = this.state
        if (currentTable != null) {
            return currentTable.isAvailable ? <CreateBill currentTable={currentTable} tables={tables} createBill={this.onCreateBill} /> : <CreateOrder currentTable={currentTable} onServe={this.onServe} data={this.state.detailBill} loading={this.state.modalLoading} />
        }
        return <br />
    }

    render() {
        const { visible, currentTable, tables } = this.state;
        return (
            <div className={`${prefixCls}`}>
                <div className={`${prefixCls}-content`}>
                    <h1>Danh sách bàn</h1>
                    <div className={`${prefixCls}-wrapped-list`}>{this.renderTable(tables)}</div>
                    <Modal
                        title="Menu"
                        visible={visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={null}
                    >
                        {
                            this.renderModal(currentTable)
                        }
                    </Modal>
                </div>
            </div >
        );
    }
};

export default Tables;
