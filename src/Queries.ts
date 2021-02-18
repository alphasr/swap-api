import { gql, useQuery } from "@apollo/client";

const GET_PERSON = gql`
  query GetCharacters {
    allPeople(first: 60) {
      people {
        id
        name
        birthYear
        height
        mass
      }

      pageInfo {
        endCursor
      }
    }
  }
`;
const GET_VEHICLE = gql`
  query GetVehicle {
    allVehicles {
      vehicles {
        __typename
        id
        name
        model
        crew
        cargoCapacity
        maxAtmospheringSpeed
      }
      pageInfo {
        endCursor
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
