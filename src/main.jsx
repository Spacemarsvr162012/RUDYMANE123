import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './index.css';

console.log('RUDYMANE: Initializing...');

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  console.log('RUDYMANE: Rendered successfully');
} catch (error) {
  console.error('RUDYMANE: Initialization failed', error);
  document.body.innerHTML = `<div style="color: white; background: red; padding: 20px;"><h1>Initialization Error</h1><p>${error.message}</p></div>`;
}
