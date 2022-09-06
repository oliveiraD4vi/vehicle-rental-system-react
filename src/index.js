import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
