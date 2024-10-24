import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Error handling for GraphQL and network errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Create the HTTP link for Apollo Client
const httpLink = new HttpLink({
  uri: "http://192.168.178.36:5000/",
});

// Combine the error link and HTTP link
const link = from([errorLink, httpLink]);

// Set up Apollo Client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

// Render the root component
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
