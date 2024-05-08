import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {client, ApolloProvider} from './api/config';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  </React.StrictMode>
);

