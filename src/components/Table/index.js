import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faUtensilSpoon } from '@fortawesome/free-solid-svg-icons'

import changeToSlug from '../../utils/changeToSlug';

const prefixCls = 'table';

const Table = (data) => {
  console.log(data)
  const {name, isAvailable} = data
  var classTableDiv = `${prefixCls}-wrap-image ${isAvailable ? '' : 'isAvailable'}`
  
  return (
    <div className={`${prefixCls}`} onClick={data.onClick}>
      <div className={classTableDiv}>
        {/* <img src={image} alt={title} /> */}
        <FontAwesomeIcon icon={faUtensils}/>
      </div>
      <h4>{name}</h4>
    </div>
  );
};

export default Table;
