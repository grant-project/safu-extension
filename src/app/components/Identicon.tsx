import React from 'react';
import makeBlockie from 'ethereum-blockies-base64';

interface Props {
  address?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default class Identicon extends React.PureComponent<Props> {
  render() {
    const { address, className } = this.props;
    const blockie = address ? makeBlockie(address) : '';
    const style = {
      display: 'block',
      ...(this.props.style || {}),
    };

    return <img className={className} style={style} src={blockie} />;
  }
}
