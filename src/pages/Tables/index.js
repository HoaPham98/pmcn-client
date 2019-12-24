import React, { useState } from 'react';

import './style.scss';

import Table from '../../components/Table';
import { Modal } from 'antd';

import CreateBill from '../../components/CreateBill';
import CreateOrder from '../../components/CreateOrder'

const prefixCls = 'tables';

const lstTables =Array.apply(null, Array(10)).map( (item, index) => {
  return {
    id: index+1,
    name: "Bàn " + (index+1),
    isAvailable: Math.random() >= 0.5
  }
})

const Tables = ({}) => {

  const renderTable = lstTables => {
    let result = null;
  
    if (lstTables && lstTables.length > 0) {
      result = lstTables.map((table, index) => <Table key={index} onClick={() => showModal(table)} {...table} />);
    }
  
    return result;
  };

  const showModal = (table) => {
    console.log("click on table", table.id)
    setCurrentTable(table)
    setVisible(true)
  };
  
  const handleOk = e => {
    console.log(e);
    setVisible(false)
  };
  
  const handleCancel = e => {
    console.log(e);
    setVisible(false)
  };

  const onCreateBill = (res) => {

  }

  const renderModal = () => {
    if (currentTable != null) {
      return currentTable.isAvailable ? <CreateBill currentTable={currentTable} tables={lstTables} createBill={onCreateBill}/> : <CreateOrder currentTable={currentTable} tables={lstTables} createBill={onCreateBill}/>
    }
    return <br/>
  }

  
  const [visible, setVisible] = useState(false);
  const [currentTable, setCurrentTable] = useState(null);
  console.log(lstTables)
  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-content`}>
        <h1>Danh sách bàn</h1>
        <div className={`${prefixCls}-wrapped-list`}>{renderTable(lstTables)}</div>
        <Modal
          title="Menu"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          {
            renderModal()
          }
        </Modal>
      </div>
    </div>
  );
};

export default Tables;
