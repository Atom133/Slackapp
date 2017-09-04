import React, { Component, PropTypes } from 'react';

export default class Message extends Component {
  render() {
    return (
      <li>{this.props.message.text}</li>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
};
