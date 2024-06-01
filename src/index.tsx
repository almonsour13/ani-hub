import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UrlProvider } from './hooks/UrlContext';

import {client, ApolloProvider} from './api/config';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UrlProvider>
      <ApolloProvider client={client}>
      <App />
    </ApolloProvider> 
    </UrlProvider>
  </React.StrictMode>
);

