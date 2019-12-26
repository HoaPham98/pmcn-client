import React, { useState } from 'react';

import './style.scss';

import { Table, Icon, Row, Col, List, Button } from 'antd';
import Dish from "../../components/Dish";
import { services } from '../../services';


const prefixCls = 'order';


class Order extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.state = {
            data: [],
            dishes: []
        }

        this.billId = this.props.match.params.id

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

    componentDidMount() {
        this.requestGetListDishes()
    }

    requestGetListDishes() {
        services.getListDishes().then(data => {
            console.log('DANH SACH MON AN', data)
            this.setState({dishes: data.results})
        })
    }

    deleteClick(dish) {
        var {data} = this.state

        data = data.filter(item => item.id !== dish.id)

        this.setState({data: data})
    }

    handleClick(dish) {
        var { data } = this.state
        var isAdded = false
        data.forEach(item => {
            if (dish._id.toString() === item.id.toString()) {
                item.sl += 1
                isAdded = true
            }
        })
        if (!isAdded) {
            var newItem = {
                id: dish._id,
                name: dish.name,
                sl: 1
            }
            data.push(newItem)
        }
        this.setState({data : data})
    }

    handleCreate() {
        const body = this.state.data.map(item => {
            return {
                dish: item.id,
                quantity: item.sl
            }
        })

        services.createOrder(this.billId, body).then(res => {
            console.log(res)
            this.props.history.goBack();
        }).catch(err => console.log('LỖI', err))
    }


  render() {
    const { dishes } = this.state

    return (
        <div className={`${prefixCls}`}>
          <div className={`${prefixCls}-content`}>

            <h1><Icon type="left" style={{alignContent:'left'}}/>Order</h1>
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
                              <Button onClick={this.handleCreate}>Thêm order</Button>
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
