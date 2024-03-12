import React from 'react';

import reactDom from 'react-dom/client';
import App from './app';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}
reactDom.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
