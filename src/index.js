import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';

const uuid = require('uuid');

import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/observable/dom/webSocket';

window.webSocket = webSocket;
window.WebSocketSubject = WebSocketSubject;

const session = uuid.v4();

export function createMessage(msg_type, fields) {
  const username = 'kylek';
  return Object.assign({
    header: {
      username,
      session,
      msg_type,
      msg_id: uuid.v4(),
      date: new Date(),
      version: '5.0',
    },
    metadata: {},
    parent_header: {},
    content: {},
  }, fields);
}


export function createExecuteRequest(code) {
  const executeRequest = createMessage('execute_request');
  executeRequest.content = {
    code,
    silent: false,
    store_history: true,
    user_expressions: {},
    allow_stdin: false,
    stop_on_error: false,
  };
  executeRequest.msg_type = executeRequest.header.msg_type;
  executeRequest.msg_id = executeRequest.header.msg_id;
  executeRequest.channel = 'shell';
  executeRequest.buffers = [] ;

  return executeRequest;
}

window.createExecuteRequest = createExecuteRequest;

window.createMessage = createMessage;

const jupyter = require('rx-jupyter');

const serverConfig = {
  endpoint: "http://127.0.0.1:8888",
  crossDomain: true,
};

const formWebSocketURL = (id) => {
  return `${serverConfig.endpoint}/api/kernels/${id}/channels`;
}

window.formWebSocketURL = formWebSocketURL;
window.jupyter = jupyter;
window.serverConfig = serverConfig;

jupyter.kernels.list(serverConfig)
  .map(x => x.response)
  .subscribe(kernels => {
    ReactDOM.render(
      <div>
        { kernels.map(kernel =>
          <pre key={kernel.id}>{formWebSocketURL(kernel.id)}</pre>
        )}
      </div>,
      document.getElementById('root')
    );
  },
  () => console.error('hey'))
