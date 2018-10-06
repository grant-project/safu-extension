import React from 'react';
import { Link } from 'react-router-dom';

export default class SettingsPage extends React.Component {
  render() {
    return (
      <>
        <h1>Settings</h1>
        <Link to="/">Back to addresses</Link>
      </>
    );
  }
}