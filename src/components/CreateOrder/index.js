import React from 'react';
import {
	Form,
	Select,
	Button,
	message,
	Spin,
	Table, Tag, Divider
} from 'antd';
import { Link } from 'react-router-dom';

import './style.scss';
import { services } from '../../services'
import { SIGN_IN } from '../../constants/ActionTypes'
import { connect } from 'react-redux';
// import toastr from '../../common/toastr'

const { Option } = Select;

const NormalCreateOrderForm = (props) => {
	var sorted = props.data.sort((a, b) => a.isDone - b.isDone || b.canFinish - a.canFinish)

	const columns = [
		{
			title: 'Tên món',
			dataIndex: 'dish.name',
			key: 'dish',
			render: text => <a>{text}</a>,
		},
		{
			title: 'Số lượng',
			dataIndex: 'quantity',
			key: 'quantity',
		},
		{
			title: 'Xác nhận đã phục vụ',
			key: 'action',
			render: (text, record) => {
				if (record.isDone) {
					console.log("món này đã xong", record)
					return <Button disabled>Đã phục vụ</Button>
				} else {
					if (record.canFinish) {
						return <Button onClick={() => props.onServe(record)}>Phục vụ</Button>
					} else {
						return <Button disabled>Đang chờ nhà bếp</Button>
					}
				}
			},
		},
	];

	console.log(props.currentTable)

	return (
		<Spin spinning={props.loading} tip="Loading...">
			<Table columns={columns} dataSource={sorted} pagination={{ defaultPageSize: 5 }} tableLayout='auto' />
			<span>
				<Link to={`/order/${props.currentTable.currentBill}`}>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						Tạo hoá đơn
          </Button>
				</Link>
				<Divider type='vertical' />
				<Link to={`/pre_payment/${props.currentTable.currentBill}`}>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						Thanh toán
          </Button>
				</Link>
			</span>

		</Spin>
	);
}

export default NormalCreateOrderForm
