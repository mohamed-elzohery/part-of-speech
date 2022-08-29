import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ScreenProvider from './context/ScreenContext/ScreenCtx';
import UserProvieder from './context/UserContext/UserCtx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <UserProvieder>
    <ScreenProvider>
      <App />
    </ScreenProvider>
  </UserProvieder>
);

