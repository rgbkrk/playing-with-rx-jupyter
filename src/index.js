import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Rx = require('rxjs/Rx');
global.Rx = Rx;

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';

const uuid = require('uuid');

const session = uuid.v4();

export function createMessage(msg_type, fields) {
  const username = 'hokey';
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

window.jupyter = jupyter;
window.serverConfig = serverConfig;

// If using `npm link rx-jupyter`, the Observable and the one imported here do
// not match, which means we don't have all the operators we want
// To get around this, we wrap the Observables by creating a new Observable
const wrap = Rx.Observable.from;

const version = jupyter.apiVersion(serverConfig);
const kernels = jupyter.kernels.list(serverConfig);

const state$ = Rx.Observable.combineLatest(version, kernels,
  (version, kernels) => ({ version: version.response.version, kernels: kernels.response }));

const root = document.getElementById('root');

const App = (props) =>
  <div>
    <pre>Version: {props.version}</pre>
    <div>
      { props.kernels.map(kernel =>
        <pre key={kernel.id}>{kernel.id}</pre>
      )}
    </div>
  </div>

state$
  .subscribe(({ version, kernels }) => {
    console.log(version);
    ReactDOM.render(<App version={version} kernels={kernels} />, root);
  },
  () => console.error('hey'))
