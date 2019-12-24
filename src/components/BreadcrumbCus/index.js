import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import './style.scss';

const breadcrumbsConst = [
  {
    to: '/grammar',
    key: 'hoc-ngu-phap',
    name: 'Học ngữ pháp',
  },
  {
    to: '/exam',
    key: 'thi-thu',
    name: 'Thi thử',
  },
  {
    to: '/exam/intro',
    key: 'intro',
    name: '',
  },
];

const renderBreadcrumb = breadcrumbsArr => {
  let result = null;

  if (breadcrumbsArr && breadcrumbsArr.length > 0) {
    result = breadcrumbsArr.map(({ to, name, key }, index) => (
      <Breadcrumb.Item key={key}>
        <Link to={to}>{name}</Link>
      </Breadcrumb.Item>
    ));
  }

  return result;
};

const BreadcrumbCus = ({ location }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([
    {
      to: '/',
      key: 'trang-chu',
      name: 'Trang chủ',
    },
  ]);

  useEffect(() => {
    const breadcrumb = breadcrumbsConst.find(
      page => page.to === location.pathname,
    );

    setBreadcrumbs([...breadcrumbs, breadcrumb]);
  }, []);

  return (
    <div className="breadcrumb-cus">
      <Breadcrumb>{renderBreadcrumb(breadcrumbs)}</Breadcrumb>
    </div>
  );
};

export default BreadcrumbCus;
