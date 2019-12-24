import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import './styles.scss';

const LeftNav = ({ mode = 'horizontal' }) => {
  return (
    <Menu mode={mode} defaultSelectedKeys={['trang-chu']}>
      <Menu.Item key={'1'}>
        <Link to="/">Trang chủ</Link>
      </Menu.Item>
      <Menu.Item key={'2'}>
        <Link to="/new-word">Học từ mới</Link>
      </Menu.Item>
      <Menu.Item key={'3'}>
        <Link to="/grammar">Học ngữ pháp</Link>
      </Menu.Item>
      <Menu.Item key={'4'}>
        <Link to="/exam">Thi thử</Link>
      </Menu.Item>
    </Menu>
  );
};
export default LeftNav;
