import { gql, useQuery } from "@apollo/client";

const GET_PERSON = gql`
  query GetPerson {
    allVehicles {
      vehicles {
        id
        name
        model
        vehicleClass
      }
    }
  }
`;
const GET_VEHICLE = gql`
  query GetVehicle {
    allVehicles {
      vehicles {
        id
        name
        model
        vehicleClass
      }
    }
  }
`;

const Queries = { GET_PERSON, GET_VEHICLE };
export default Queries;
