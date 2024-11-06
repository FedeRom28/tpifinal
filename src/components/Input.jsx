import React from 'react';

class Input extends React.Component {
  render() {
    return (
      <input
        className={`border p-2 rounded ${this.props.className}`}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default Input;
