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
//  query GetVehicle {
//     allVehicles(first: 2, after: "YXJyYXljb25uZWN0aW9u0jI=") {
//       pageInfo {
//         hasNextPage
//       }
//       edges {
//         cursor
//         node {
//           id
//           name
//         }
//       }
//     }
//   }
