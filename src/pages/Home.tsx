import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { client } from "..";
import Queries from "../Queries";
// const client = ...

const Home: React.FC = () => {
  const [response, setResponse] = useState();
  const { loading, error, data } = useQuery(Queries.GET_VEHICLE);

  const getData = (data: any) => {
    return data ? JSON.stringify(data) : "sojmething";
  };

  return (
    <React.Fragment>{data ? JSON.stringify(data) : "some"}</React.Fragment>
  );
};

export default Home;
