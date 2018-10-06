import React from 'react';
import { Link } from 'react-router-dom';

export default class AddressesPage extends React.Component {
  render() {
    return (
      <>
        <h1>Addresses</h1>
        <Link to="/settings">Edit settings</Link>
      </>
    );
  }
}
