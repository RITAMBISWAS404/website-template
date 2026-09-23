import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/site.css';
import './styles/detail.css';
import './styles/overlays.css';
import './styles/themes/shared.css';
import './styles/themes/essential.css';
import './styles/themes/modern.css';
import './styles/themes/premium.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
