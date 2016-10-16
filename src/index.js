import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import 'rxjs/add/operator/map';

const rxJupyter = require('rx-jupyter');

const jupyter = new rxJupyter.JupyterAPI("http://localhost:8888", true);

window.jupyter = jupyter;

jupyter.listKernelspecs()
  .subscribe(x => {
    ReactDOM.render(
      <App data={JSON.stringify(x.response, 2, 2)} />,
      document.getElementById('root')
    );
  })
