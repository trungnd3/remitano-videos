import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';
import { WebSocketContextProvider } from './context';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <WebSocketContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WebSocketContextProvider>
    </Provider>
  </React.StrictMode>
);
