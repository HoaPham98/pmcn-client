import React, { useState } from 'react';

import './style.scss';

import Table from '../../components/Table';
import { Modal } from 'antd';

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
            tables: []
        }
        this.showModal = this.showModal.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    // Đây là hàm gọi 1 lần duy nhất khi bắt đầu load trang => Nên call api để fill data vào UI
    componentDidMount() {
        this.requestTablesStatus()
    }

    // Đây là call API
    requestTablesStatus() {
        services.getTables().then(data => {
            console.log("Da get xong ban", data.results)
            this.setState({tables: data.results, visible: false})
        })
    }

    renderTable = lstTables => {
        let result = null;

        if (lstTables && lstTables.length > 0) {
            result = lstTables.map((table, index) => <Table key={index} onClick={() => this.showModal(table)} {...table} />);
        }

        return result;
    };

    showModal = (table) => {
        console.log("click on table", table.id)
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

    renderModal = (currentTable) => {
        const { tables } = this.state
        if (currentTable != null) {
            return currentTable.isAvailable ? <CreateBill currentTable={currentTable} tables={tables} createBill={this.onCreateBill} /> : <CreateOrder currentTable={currentTable} tables={tables} createBill={this.onCreateBill} />
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
