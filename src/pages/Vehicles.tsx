import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { client } from "..";
import Queries from "../Queries";
import produce from "immer";
import ReactPaginate from "react-paginate";
import { Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

// const client = ...

const Vehicles: React.FC = () => {
  let history = useHistory();

  const [currentPage, setCurrentPage] = useState(0);

  // const { loading, error, data } = useQuery(Queries.GET_VEHICLE);

  const { loading, data, error, fetchMore } = useQuery(Queries.GET_VEHICLE, {
    variables: { after: null },
  });
  if (error) return <div>errors ...</div>;
  if (loading || !data) return <div>loading ...</div>;

  const PER_PAGE = 30;
  const offset = currentPage * PER_PAGE;
  const currentPageData = data.allVehicles.vehicles.slice(
    offset,
    offset + PER_PAGE
  );

  const pageCount = Math.ceil(data.allVehicles.vehicles.length / PER_PAGE);
  console.log("Page count", pageCount);

  function handlePageClick({ selected: selectedPage }: { selected: any }) {
    console.log("selectd = ", selectedPage);
    setCurrentPage(selectedPage);
    console.log(currentPage);
    console.log("page data", currentPageData[selectedPage]);
  }

  //   if (sorted && data) {
  //     const tempVehicles: any[] = data.allVehicles.vehicles;
  //     const sortedVehicles = tempVehicles.sort((a, b) =>
  //       a.name > b.name ? 1 : -1
  //     );
  //     console.log(JSON.stringify(sortedVehicles));
  //   }

  return (
    <React.Fragment>
      {/* <div>{data.allVehicles.pageInfo.endCursor}</div> */}
      <div className="m-3">
        {" "}
        <Button onClick={history.goBack}> &#8592; Go Back</Button>
      </div>

      <div className="p-3">
        <div className="card center pt-3 shadow-sm">
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
        </div>
      </div>
      <div className="align-right mr-3">
        {" "}
        <Button
          className="mb-3 ml-3 "
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
        </Button>
      </div>

      <div className="m-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Model</th>
              <th>Minimum Crew Capactiy</th>
              <th>Cargo Capacity</th>
              <th>Max Speed</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map(
              ({
                id,
                name,
                model,
                crew,
                cargoCapacity,
                maxAtmospheringSpeed,
              }: {
                id: string;
                name: string;
                model: string;
                crew: string;
                cargoCapacity: Float;
                maxAtmospheringSpeed: Int;
              }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{model}</td>
                  <td>{crew}</td>
                  <td>{cargoCapacity}</td>
                  <td>{maxAtmospheringSpeed}</td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default Vehicles;
