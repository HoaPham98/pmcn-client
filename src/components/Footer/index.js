import React from 'react';

import './style.scss';

import { withCookies, useCookies } from 'react-cookie';

const prefixCls = 'footer';

const Footer = () => {
  const [cookies, setCookie, removeCookie] = useCookies('cookies');

  const onLogout = () => {
    removeCookie('accessToken')
  }

  return (
    <div className={`${prefixCls}`}>
      © Nhóm 02 - PTPMCN 20191.{' '}
    </div>
  );
};

export default Footer;
