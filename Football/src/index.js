import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { GlobalContextProvider } from './store/GlobalContext';

ReactDOM.render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>,
  document.getElementById('root')
);
