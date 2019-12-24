import React from 'react';
import {
  Form,
  Select,
  Button,
  message,
  Spin
} from 'antd';
import './style.scss';
import {services} from '../../services'
import {SIGN_IN} from '../../constants/ActionTypes'
import { connect } from 'react-redux';
// import toastr from '../../common/toastr'

const { Option } = Select;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loading : true})
        services.login(values.email, values.password)
          .then(
            res => { 
              console.log(res);
              const {dispatch} = this.props;
              dispatch({type : SIGN_IN, data : res})
              this.props.login(res)
              this.setState({loading : false})
              // toastr.success("Đăng nhập thành công")
            }
          )
          .catch(err => {
            console.log(1)
            this.setState({loading : false})
            message.error("Đăng nhập thất bại")
            // toastr.error("Đăng nhập thất bại")
            throw err;
          })
      }
    });
  };

  render() {
    console.log(this.props);
    const { getFieldDecorator } = this.props.form;
    const { currentTable, tables } = this.props

    console.log(currentTable.id)

    return (
      <Spin spinning={this.state.loading} tip="Loading...">
      <Form
        onSubmit={this.handleSubmit}
        className="login-form"
        style={{ margin: '0 auto auto auto' }}
      >
        <Form.Item label="Danh sách bàn">
          {getFieldDecorator('select-multiple', {
            rules: [
              { required: true, message: 'Danh sách bàn không được để trống', type: 'array' },
            ],
            initialValue: [currentTable.id]
          })(
            <Select mode="multiple" placeholder="Chọn bàn" optionLabelProp="label">
              {tables.map(item => {
              return (<Option value={item.id} key={item.id} label={item.name}>{item.name}</Option>)
              })}
            </Select>,
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Tạo hoá đơn
          </Button>
        </Form.Item>
      </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'normal_login' })(NormalLoginForm));
