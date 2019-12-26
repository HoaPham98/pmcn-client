import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withCookies, useCookies } from 'react-cookie';
import { Menu, Avatar, Icon, Dropdown, Modal, message, Spin } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import { services } from '../../../services'
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

const RightMenu = ({ mode, user, accessTokenStore, dispatch }) => {
  console.log('mode: ', mode);
  // console.log(history)
  const [cookies, setCookie, removeCookie] = useCookies('cookies');

  const accessToken = accessTokenStore || cookies.accessToken;

  console.log('ACCESSTOKEN', accessToken)

  const [visibleRegForm, setVisibleRegForm] = useState(false);
  const [visibleLoginForm, setVisibleLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModalRegister = () => {
    setVisibleRegForm(true);
  };

  const logOut = () => {
    removeCookie('accessToken');
    dispatch({ type: DELETE_USER });
    setVisibleRegForm(true)
  };

  const onSignup = (res) => {
    // console.log(data)
    setCookie('accessToken', res.data.results.token);
    setCookie('isAuth', true);
    message.success('Đăng kí thành công !');
  }

  // useEffect(() => {
  //   if (accessToken && Object.keys(user).length === 0) {
  //     setLoading(true);
  //     services.getUser(accessToken)
  //       .then(res => {
  //         console.log(res)
  //         if (res.data.results.user) {
  //           // console.log('user info after call axios: ', res.data.results.user);
  //           dispatch({type : SIGN_IN, data : res});
  //           setLoading(false);
  //           // dispatch(signIn(accessToken));
  //         }
  //       })
  //       .catch(() => {
  //         setLoading(false);
  //         logOut();
  //       });

  //     // window.location.reload();
  //   }
  // }, [accessToken]);
  // console.log(user.data.results.user.avatar)
  return (
    <Spin spinning={loading} size="small">
      <Menu mode={mode} selectedKeys={[]}>
        {accessToken ? <Menu.Item key="log-in">
          <Link onClick={logOut} to="/login" className="auth-button">
            Đăng xuất
          </Link>
        </Menu.Item> : <Menu.Item></Menu.Item>
        }
        
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
