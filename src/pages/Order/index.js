import React, { useState } from 'react';

import './style.scss';

import { Table, Divider, Tag, Row, Col, List, Button } from 'antd';
import Dish from "../../components/Dish";


const prefixCls = 'order';



const dishes = Array.apply(null, Array(10)).map( (item, index) => {
    return {
        id: index+1,
        name: "Món " + (index+1)
    }
})


class Order extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.state = {
            data: []
        }

        this.columns = [
            { title: 'Món', dataIndex: 'name', key: 'name' },
            { title: 'Số lượng', dataIndex: 'sl', key: 'sl' },
            {
                title: '',
                dataIndex: '',
                key: 'x',
                render: (text, record) => <a onClick={(e) => this.deleteClick(record)}>Xoá</a>,
            },
        ];
    }

    deleteClick(dish) {
        var {data} = this.state

        data = data.filter(item => item.id !== dish.id)

        this.setState({data: data})
    }

    handleClick(dish) {
        var { data } = this.state
        console.log("Truoc", data)
        var isAdded = false
        data.forEach(item => {
            if (dish.id === item.id) {
                item.sl += 1
                isAdded = true
            }
        })
        if (!isAdded) {
            var newItem = {
                id: dish.id,
                name: dish.name,
                sl: 1
            }
            data.push(newItem)
        }
        this.setState({data : data})
    }


  render() {

    return (
        <div className={`${prefixCls}`}>
          <div className={`${prefixCls}-content`}>

            <h1>Order</h1>
              <h3>Bàn 1</h3>
              <div>
                  <Row>
                      <Col span={12}>
                          <Row>
                              <List
                                  grid={{ gutter: 16, column: 2 }}
                                  dataSource={dishes}
                                  renderItem={item => (
                                      <List.Item>
                                          <Dish dish={item} onClick={(e) => this.handleClick(item)}/>
                                      </List.Item>
                                  )}
                              />
                          </Row>
                      </Col>
                      <Col span={12}>
                          <div className='back-table'>
                              <Table
                                  columns={this.columns}
                                  dataSource={this.state.data}
                              />
                              <Button>Thanh toán</Button>
                          </div>
                      </Col>
                  </Row>
              </div>

          </div>
        </div>
    );
  }
}


export default Order;
