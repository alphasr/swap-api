import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
// import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  link: createHttpLink({ uri: "http://localhost:59214" }),
  cache: new InMemoryCache(),
});

const mainElement = document.createElement("div");
document.body.appendChild(mainElement);
ReactDOM.render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>,
  mainElement
);
