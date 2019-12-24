import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withCookies, useCookies } from 'react-cookie';
import { Menu, Avatar, Icon, Dropdown, Modal, message, Spin } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import {services} from '../../../services'
import { DELETE_USER, SIGN_IN } from '../../../constants/ActionTypes';
// import toastr from '../../../common/toastr'

import './style.scss';

import config from '../../../utils/config';
import { storeUser, signIn, deleteUser, signOut } from '../../../actions';

const Submenu = logOut => {
  return (
    <Menu>
      <Menu.Item key="4">
        <Link to="" onClick={logOut}>
          Đăng xuất
        </Link>
      </Menu.Item>
    </Menu>
  );
};

const RightMenu = ({ mode, user, accessTokenStore, dispatch}) => {
  console.log('mode: ', mode);
  // console.log(history)
  const [cookies, setCookie, removeCookie] = useCookies('cookies');

  const accessToken = accessTokenStore || cookies.accessToken;

  const [visibleRegForm, setVisibleRegForm] = useState(false);
  const [visibleLoginForm, setVisibleLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModalRegister = () => {
    setVisibleRegForm(true);
  };

  const showModalLogin = () => {
    setVisibleLoginForm(true);
  };

  const handleCancelRegForm = e => {
    setVisibleRegForm(false);
  };

  const handleCancelLoginForm = e => {
    setVisibleLoginForm(false);
  };

  const onLogin = (res) => {
    // console.log(data)
    setCookie('accessToken', res.data.results.token);
    setCookie('isAuth', true);
    message.success('Đăng nhập thành công !');
  }

  const logOut = () => {
    removeCookie('accessToken');
    dispatch({ type: DELETE_USER });
    // toastr.success("Đăng xuất thành công")
    // dispatch(signOut());
    // window.location.reload();
  };

  const onSignup = (res) => {
    // console.log(data)
    setCookie('accessToken', res.data.results.token);
    setCookie('isAuth', true);
    message.success('Đăng kí thành công !');
  }

  useEffect(() => {
    if (accessToken && Object.keys(user).length === 0) {
      setLoading(true);
      services.getUser(accessToken)
        .then(res => {
          console.log(res)
          if (res.data.results.user) {
            // console.log('user info after call axios: ', res.data.results.user);
            dispatch({type : SIGN_IN, data : res});
            setLoading(false);
            // dispatch(signIn(accessToken));
          }
        })
        .catch(() => {
          setLoading(false);
          logOut();
        });

      // window.location.reload();
    }
  }, [accessToken]);
  // console.log(user.data.results.user.avatar)
  return (
      <Spin spinning={loading} size="small">
    <Menu mode={mode} selectedKeys={[]}>
      {Object.keys(user).length > 0 && (
        <Menu.Item key="sign-out" className="avatar">
          <Avatar
            src={
              (user.data.results.user.avatar && "https://toeic-practice.herokuapp.com" + user.data.results.user.avatar) ||
              'https://cdn.eva.vn/upload/4-2019/images/2019-11-06/sinh-ra-trong-gia-dinh-viet-nhung-co-be-nay-lai-mang-ve-dep-tay-la-ky-untitled-19-1573053449-116-width600height750.jpg'
            }
            style={{marginRight : "10px"}}
          />
          {user.data.results.user.name}
          <Dropdown overlay={() => Submenu(logOut)}>
            <Link className="ant-dropdown-link" to="">
              {user.full_name} <Icon type="down" />
            </Link>
          </Dropdown>
        </Menu.Item>
      )}
      {!(Object.keys(user).length > 0) && (
        <Menu.Item key="log-in">
          <Link to="" className="auth-button">
            Đăng nhập
          </Link>
          {/* <Modal
            title="Đăng nhập"
            visible={visibleLoginForm}
            footer={null}
            onCancel={handleCancelLoginForm}
          >
            <Login login={onLogin}/>
          </Modal> */}
        </Menu.Item>
      )}
      {!(Object.keys(user).length > 0) && (
        <Menu.Item key="sign-up">
          <Link to="" className="auth-button" onClick={showModalRegister}>
            Đăng ký
          </Link>
          {/* <Modal
            title="Đăng ký"
            visible={visibleRegForm}
            footer={null}
            onCancel={handleCancelRegForm}
            width={'50vw'}
          >
            <Register signup={onSignup}/>
          </Modal> */}
        </Menu.Item>
      )}
    </Menu>
    </Spin>
  );
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withCookies(RightMenu));
