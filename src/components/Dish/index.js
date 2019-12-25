import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';
import {Button, Radio, Icon} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faUtensilSpoon } from '@fortawesome/free-solid-svg-icons'

import changeToSlug from '../../utils/changeToSlug';

const prefixCls = 'dish';

class ButtonSize extends React.Component {
    state = {
        size: 'large',
    };

    handleSizeChange = e => {
        this.setState({ size: e.target.value });
    };

    render() {
        const { size } = this.state;
        const { name } = this.props;
        console.log(this.props.onClick)
        return (
            <div className='pad'>
                <Button shape="round" size={size}  block onClick={this.props.onClick}>{name}</Button>
            </div>
        );
    }
}

const Dish = (data) => {
  const {dish} = data;

  console.log('Dish', data.onClick)

  return (
      <ButtonSize name={dish.name} onClick={data.onClick} />
  );
};

export default Dish;
