import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ScreenProvider from './context/ScreenContext/ScreenCtx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ScreenProvider>
    <App />
  </ScreenProvider>
);

