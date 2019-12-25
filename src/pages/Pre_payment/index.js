import React, { useState } from 'react';

import './style.scss';

import { Table, Modal, Button } from 'antd';




const prefixCls = 'order';



const dishes_order = Array.apply(null, Array(10)).map( (item, index) => {
    return {
        id: index+1,
        name: "Món " + (index+1),
        sl: Math.floor(Math.random() * 10),
        isAvailable: Math.floor(Math.random() * 2 )
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

        this.setState({data : data})
    }


  render() {

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
                      {/*<Modal*/}
                      {/*    title="Trả hàng"*/}
                      {/*    visible={visible}*/}
                      {/*    onOk={handleOk}*/}
                      {/*    onCancel={handleCancel}*/}
                      {/*    footer={null}*/}
                      {/*>*/}
                      {/*    {*/}
                      {/*        renderModal()*/}
                      {/*    }*/}
                      {/*</Modal>*/}
                  </div>
              </div>

          </div>
        </div>
    );
  }
}


export default Pre_payment;
