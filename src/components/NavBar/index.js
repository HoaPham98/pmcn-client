import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import { withPlatform } from '../../context/platform';

import LeftNav from './LeftNav';
import RightNav from './RightNav';
import SearchInput from './SearchInput';

import './style.scss';

const Navbar = ({ platform }) => {
  const [visible, setVisible] = useState(false);

  const mode = platform.isMobile ? 'vertical' : 'horizontal';

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  return (
    <nav
      className="menuBar"
      style={{
        position: 'sticky',
        top: '0',
        zIndex: '10',
        backgroundColor: '#fff',
      }}
    >
      <div className="logo">
        <Link to="/">Logo</Link>
      </div>
      <div className="menuCon">
        {/* <div className="leftMenu">
          <LeftNav />
        </div> */}
        <div className="rightMenu">
          <RightNav mode={mode} />
        </div>
        <Button className="barsMenu" type="primary" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title="Menu"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftNav />
          <RightNav mode={mode} />
        </Drawer>
      </div>
    </nav>
  );
};
export default withPlatform(Navbar);
