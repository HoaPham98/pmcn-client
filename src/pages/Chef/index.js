import React, { useState } from 'react';
import { Table, Divider, Tag, Row, Col , Button} from 'antd';
import './style.scss';
import Item from 'antd/lib/list/Item';
const prefixCls = 'chef';
const dataDoing = [
    {
     
      name: 'Mike',
      number: 32,
      time: '10 Downing Street',
      id: 1,
    },
    {
      name: 'John',
      number: 42,
      time: '10 Downing Street',
      id: 2,
    },
  ];
  
  const dataTodo = [
    {
      
      name: 'Mike',
      number: 32,
      time: '10 Downing Street',
      id: 3,
    },
    {
      
      name: 'John',
      number: 42,
      time: '10 Downing Street',
      id:4,
    },
  ];
  
  
  
class Chef extends React.Component {
    constructor(props){
        super(props);
        this.startClick = this.startClick.bind(this);
        this.finishClick = this.finishClick.bind(this);
        this.state = {
            dataDoing: dataDoing,
            dataTodo: dataTodo,
        }

        this.columns = [
            {
              title: 'Tên món ăn',
              dataIndex: 'name',
              key: 'name',
              
            },
            {
              title: 'Số lượng',
              dataIndex: 'number',
              key: 'number',
            },
            {
              title: 'Thời gian bắt đầu',
              dataIndex: 'time',
              key: 'time',
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
              dataIndex: 'name',
              key: 'name',
              
            },
            {
              title: 'Số lượng',
              dataIndex: 'number',
              key: 'number',
            },
            {
                title: 'Bắt đầu',
                dataIndex: 'action',
                render: (text, record) => <Button onClick={(e)=>this.startClick(record)}>Bắt đầu</Button>,
         
              },
          ];
        
    }
    finishClick(dish){
        console.log(dish)
        var {dataDoing} = this.state;
    
        dataDoing.forEach(element => {
            if(element.id === dish.id)
            dataDoing.pop(element)
        });

        this.setState({dataDoing : dataDoing})

    }

    startClick(dish){
        console.log(dish)
        var {dataTodo} = this.state;
        var {dataDoing} = this.state;

        dataTodo.forEach(element => {
            if(element.id === dish.id)
            dataTodo.pop(element)
        });
        var d = new Date();
        var timenow = d.getMinutes()+":" + d.getHours()+ " " + d.getDate() +"-" + d.getMonth() +"-"+ d.getFullYear();

        var newItem = {
            id: dish.id,
            number: dish.number,
            name: dish.name,
            time: timenow ,

        };

        dataDoing.push(newItem)
        this.setState({
            dataDoing : dataDoing,
            dataTodo: dataTodo
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
