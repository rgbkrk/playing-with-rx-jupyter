import React from 'react';
export default class  Directory extends React.Component {

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
          <li key={entry.name}>{icon} {entry.name}</li>
        );
      }
      )
    }
    </ul>);
  }
}
