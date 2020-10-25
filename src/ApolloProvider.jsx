// This hooks up React to Apollos mongoDB server

import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from '@apollo/client/cache';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  // points to graphQL server
  uri: 'https://boiling-brook-72187.herokuapp.com/',
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
