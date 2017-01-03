import React from 'react';
const jupyter = require('rx-jupyter');
import { poll } from '../App';
const serverConfig = {
  endpoint: "http://127.0.0.1:8888",
  crossDomain: true,
};

export default class  Directory extends React.Component {

  constructor() {
    super();
    this.showContents = this.showContents.bind(this);
  };

  showContents(path) {
    const content$ = poll(jupyter.contents.get(serverConfig, path), 500);
    return content$;
  }

  render() {
    return (<ul>
    {
      this.props.content.map(entry => {
        let icon = ".";
        switch(entry.type) {
          case "notebook":
            icon = "📔";
            break;
          case "file":
            icon = "📋";
            break;
          case "directory":
            icon = "📁";
            break;
          default:
            icon = "❓";
            break;
        }
        return (
          <li onClick={this.showContents} key={entry.name}>{icon} {entry.name}</li>
        );
      }
      )
    }
    </ul>);
  }
}
