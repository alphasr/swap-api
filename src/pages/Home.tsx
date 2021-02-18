import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { client } from "..";
import Queries from "../Queries";
import produce from "immer";
import ReactPaginate from "react-paginate";

// const client = ...
const GET_VEHICLE = gql`
  query GetVehicle($after: String) {
    allVehicles(first: 10, after: $after) {
      vehicles {
        __typename
        id
        name
        model
        vehicleClass
      }
      pageInfo {
        endCursor
      }
    }
  }
`;
const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // const { loading, error, data } = useQuery(Queries.GET_VEHICLE);

  const { loading, data, error, fetchMore } = useQuery(GET_VEHICLE, {
    variables: { after: null },
  });
  if (error) return <div>errors ...</div>;
  if (loading || !data) return <div>loading ...</div>;

  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;
  const currentPageData = data.allVehicles.vehicles
    .slice(offset, offset + PER_PAGE)
    .map(({ name, model }: { name: string; model: string }) => (
      <div>
        <p>{name}</p>
        <p>{model}</p>
      </div>
    ));

  const pageCount = Math.ceil(data.allVehicles.vehicles.length / PER_PAGE);
  console.log("Page count", pageCount);

  function handlePageClick({ selected: selectedPage }: { selected: any }) {
    console.log("selectd = ", selectedPage);
    setCurrentPage(selectedPage);
    console.log(currentPage);
    console.log("page data", currentPageData[selectedPage]);
  }
  return (
    <React.Fragment>
      <div>{JSON.stringify(data.allVehicles.vehicles[0].name)}</div>
      <div>
        {data.allVehicles.vehicles.map((vehicle: any) => (
          <div>{vehicle.name}</div>
        ))}
      </div>
      {/* <div>{data.allVehicles.pageInfo.endCursor}</div> */}
      <button
        onClick={() => {
          const { endCursor } = data.allVehicles.pageInfo;
          fetchMore({
            variables: { after: endCursor },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              fetchMoreResult = produce(fetchMoreResult, (draft: unknown) => {
                draft.allVehicles.vehicles = [
                  ...prevResult.allVehicles.vehicles,
                  ...fetchMoreResult.allVehicles.vehicles,
                ];
              });
              console.log(fetchMoreResult);
              return fetchMoreResult;
            },
          });
        }}
      >
        Load More
      </button>
      <ReactPaginate
        previousLabel={"← Previous"}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      {currentPageData}
    </React.Fragment>
  );
};

export default Home;
