import { ApolloProvider } from "@apollo/client";
import React from "react";
import { client } from ".";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <React.Fragment>
        <Home />
      </React.Fragment>
    </ApolloProvider>
  );
};

export default App;
