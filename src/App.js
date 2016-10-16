import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <pre>
        {this.props.data}
        </pre>
      </div>
    );
  }
}

export default App;
