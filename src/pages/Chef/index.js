import React, { useState } from 'react';
import { Table, Divider, Tag, Row, Col , Button, notification} from 'antd';
import './style.scss';
import Item from 'antd/lib/list/Item';
import io from "socket.io-client";

import { services } from '../../services'
const prefixCls = 'chef';
const dataDoing = [];
  const dataTodo = [];
  const dataDish = [];
  
  
  
class Chef extends React.Component {

  constructor(props){
    super(props);
    this.startClick = this.startClick.bind(this);
    this.finishClick = this.finishClick.bind(this);
    this.state = {
        dataDish: [],
        dataDoing: [],
        dataTodo: [],
    }

    this.columns = [
        {
          title: 'Tên món ăn',
          dataIndex: 'dish.name',
          key: 'dish.name',
          
        },
        {
          title: 'Số lượng',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
          title: 'Thời gian bắt đầu',
          dataIndex: 'startAt',
          key: 'startAt',
        },
        {
            title: 'Hoàn thành',
            dataIndex: 'action',
            render: (text, record) => <Button onClick = {(e)=> this.finishClick(record)}>Hoàn thành</Button>,
     
          },
      ];

      this.columns1 = [
        {
          title: 'Tên món ăn',
          dataIndex: 'dish.name',
          key: 'dish.name',
          
        },
        {
          title: 'Số lượng',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
            title: 'Bắt đầu',
            dataIndex: 'action',
            render: (text, record) => <Button onClick = {(e)=>this.startClick(record)}>Bắt đầu</Button>,
     
          },
      ];

      this.socket = io('localhost:4000/chef')

        this.socket.on('onChange', (message) => {
            this.openNotificationWithIcon(message)
        }) 
    
}

openNotificationWithIcon = message => {
  this.requestTablesStatus()
  notification['success']({
    message: 'Có một món đã chuẩn bị xong',
    description:
      message,
  });
};

  componentDidMount() {
    this.requestTablesStatus()
  }

  requestTablesStatus() {
    services.getListDishDoing().then(data => {
        console.log("get dish doing", data.results)
        this.setState({dataDish: data.results, visible: false})

        var {dataTodo} = this.state;
        var {dataDoing} = this.state;
        var {dataDish} = this.state;
        
        dataDoing = dataDish.filter(item => item.status === "preparing");
        dataTodo = dataDish.filter(item => item.status === "pending")

        this.setState({
          dataDoing : dataDoing,
          dataTodo : dataTodo,
          visible: false
        })

       
    })
  } 

    
    finishClick(dish){
        console.log(dish._id)
        services.getFinishDish(dish._id).then(res => {
          var {dataDoing} = this.state;
    
          dataDoing.forEach(element => {
              if(element.id === dish.id)
              dataDoing.pop(element)
          });

          this.setState({dataDoing : dataDoing})
        })
        

      }
 
    startClick(dish){
        console.log(dish)
        services.getStartDish(dish._id).then(res => {
          services.getListDishDoing().then(data => {
            console.log("get dish doing", data.results)
            this.setState({dataDish: data.results, visible: false})
    
            var {dataTodo} = this.state;
            var {dataDoing} = this.state;
            var {dataDish} = this.state;
            
            dataDoing = dataDish.filter(item => item.status === "preparing");
            dataTodo = dataDish.filter(item => item.status === "pending")
    
            this.setState({
              dataDoing : dataDoing,
              dataTodo : dataTodo,
              visible: false
            })
    
           
        })
        })
         
    }
    render() {
      
        return(
            <div className={`${prefixCls}`}>
            <div className={`${prefixCls}`}>
                <div className={`${prefixCls}-content`}>
                <h1> Danh sách các món ăn đang nấu</h1>
                    
                        <Table dataSource={this.state.dataDoing} columns={this.columns}  className="table-color"/>;
                    
                </div>
            </div>
            <div className={`${prefixCls}`}>
                <div className={`${prefixCls}-content`}>
                <h1> Danh sách các món ăn sẽ nấu</h1>
                    
                        <Table dataSource={this.state.dataTodo} columns={this.columns1}  className="table-color"/>;
                    
                </div>
            </div>
            </div>
            
            
        )
    }
}

export default  Chef;
