import React from 'react';
import Directory from './directory.js';

export default class Content extends React.Component {
  constructor() {
    super();
    this.showContents = this.showContents.bind(this);
  };

  showContents() {
    console.log('Click!')
  }

  render() {
    switch(this.props.contents.type) {
      case "directory":
        return (
          <Directory onClick={this.showContents()} content={this.props.contents.content} />
        );
      default:
        return (
          <pre>{JSON.stringify(this.props.contents, 2, 2)}</pre>
        );
    }
  }
}
