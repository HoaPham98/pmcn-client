import React from 'react';
import {
  Form,
  Select,
  Button,
  message,
  Spin,
  Table, Tag, Divider
} from 'antd';
import './style.scss';
import { services } from '../../services'
import { SIGN_IN } from '../../constants/ActionTypes'
import { connect } from 'react-redux';
// import toastr from '../../common/toastr'

const { Option } = Select;

const fieldSorter = (fields) => (a, b) => fields.map(o => {
  let dir = 1;
  if (o[0] === '-') { dir = -1; o=o.substring(1); }
  return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
}).reduce((p, n) => p ? p : n, 0);

const dishes = Array.apply(null, Array(20)).map((item, index) => {
  const isDone = Math.random() >= 0.5
  return {
    id: index + 1,
    name: "Món ăn " + (index + 1),
    quantity: Math.floor(Math.random() * 5) + 1,
    isDone: isDone,
    isCooked: isDone ? true : Math.random() >= 0.5
  }
}).sort((a,b) => a.isDone - b.isDone || b.isCooked - a.isCooked)

console.log("Dishes", dishes)

const columns = [
  {
    title: 'Tên món',
    dataIndex: 'name',
    key: 'name',
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
      }
      return (
      <span>
        {record.idDone ? <Button>Đã phục vụ</Button> : (record.isCooked ? <Button>Phục vụ</Button> : <Button>Đang chờ nhà bếp</Button>)}
      </span>
    )},
  },
];

class NormalCreateOrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true })
        services.login(values.email, values.password)
          .then(
            res => {
              console.log(res);
              const { dispatch } = this.props;
              dispatch({ type: SIGN_IN, data: res })
              this.props.login(res)
              this.setState({ loading: false })
              // toastr.success("Đăng nhập thành công")
            }
          )
          .catch(err => {
            console.log(1)
            this.setState({ loading: false })
            message.error("Đăng nhập thất bại")
            // toastr.error("Đăng nhập thất bại")
            throw err;
          })
      }
    });
  };



  render() {
    console.log(this.props);

    return (
      <Spin spinning={this.state.loading} tip="Loading...">
        <Table columns={columns} dataSource={dishes} pagination={{ defaultPageSize: 5}} tableLayout='auto'/>
        <span>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Tạo hoá đơn
          </Button>
          <Divider type='vertical'/>
          <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Thanh toán
          </Button>
        </span>
        
      </Spin>
    );
  }
}

const mapStateToProps = ({ user, auth }) => {
  return {
    user,
    accessTokenStore: auth.accessToken,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'normal_login' })(NormalCreateOrderForm));
