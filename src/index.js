import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const rootContainer = document.getElementById('app') || document.body;
const root = createRoot(rootContainer);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
