import React from 'react';
import Directory from './directory.js';

export default class Content extends React.Component {

  render() {
    switch(this.props.contents.type) {
      case "directory":
        return (
          <Directory content={this.props.contents.content} />
        );
      default:
        return (
          <pre>{JSON.stringify(this.props.contents, 2, 2)}</pre>
        );
    }
  }
}
