import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import 'rxjs/add/operator/map';

const jupyter = require('rx-jupyter');

window.jupyter = jupyter;

const serverConfig = {
  endpoint: "http://localhost:8888",
  crossDomain: true,
};

jupyter.kernelspecs.list(serverConfig)
  .subscribe(x => {
    ReactDOM.render(
      <App data={JSON.stringify(x.response, 2, 2)} />,
      document.getElementById('root')
    );
  })
