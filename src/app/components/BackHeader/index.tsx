import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import './style.less';

interface Props {
  title: string;
  backHref: string;
}

export default class BackHeader extends React.Component<Props> {
  render() {
    const { backHref, title } = this.props;
    return (
      <div className="BackHeader">
        <Link className="BackHeader-back" to={backHref}>
          <Icon type="left" />
        </Link>
        <h2 className="BackHeader-title">
          {title}
        </h2>
      </div>
    );
  }
}