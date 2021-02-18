import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { client } from "..";
import Queries from "../Queries";
import produce from "immer";
import ReactPaginate from "react-paginate";
import { Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

// const client = ...

const Characters: React.FC = () => {
  let history = useHistory();

  const [currentPage, setCurrentPage] = useState(0);

  const { loading, data, error, fetchMore } = useQuery(Queries.GET_PERSON, {
    variables: { after: null },
  });
  const [sorted, setSorted] = useState(false);
  const [sortedCurrentPageData, setSortedCurrentPageData] = useState<any[]>();
  if (error) return <div>errors ...</div>;
  if (loading || !data) return <div>loading ...</div>;

  const PER_PAGE = 30;
  const offset = currentPage * PER_PAGE;
  const currentPageData = data.allPeople.people.slice(
    offset,
    offset + PER_PAGE
  );
  const sortedData = sortedCurrentPageData?.slice(offset, offset + PER_PAGE);

  const pageCount = Math.ceil(data.allPeople.people.length / PER_PAGE);
  console.log("Page count", pageCount);

  function handlePageClick({ selected: selectedPage }: { selected: any }) {
    console.log("selectd = ", selectedPage);
    setCurrentPage(selectedPage);
    console.log(currentPage);
    console.log("page data", currentPageData[selectedPage]);
  }

  const sortByAge = () => {
    if (sorted) {
      setSorted(false);
      return setSortedCurrentPageData(undefined);
    }
    const rows = Array.from(data.allPeople.people);
    console.log("length of array =", rows.length);
    rows.sort((a: any, b: any) => {
      if (a.birthYear > b.birthYear) return 1;
      else return -1;
    });
    setSorted(true);
    setSortedCurrentPageData(rows);
    // console.log(JSON.stringify(rows));
  };
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
        <Button className="mb-3 ml-3 " onClick={sortByAge}>
          Sort by Age
        </Button>
        <Button
          className="mb-3 ml-3 "
          onClick={() => {
            const { endCursor } = data.allPeople.pageInfo;
            fetchMore({
              variables: { after: endCursor },
              updateQuery: (prevResult, { fetchMoreResult }) => {
                fetchMoreResult = produce(fetchMoreResult, (draft: unknown) => {
                  draft.allPeople.people = [
                    ...prevResult.allPeople.people,
                    ...fetchMoreResult.allPeople.people,
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
              <th>Birth Year</th>
              <th>Height</th>
              <th>Mass</th>
            </tr>
          </thead>
          <tbody>
            {!sorted
              ? currentPageData.map(
                  ({
                    id,
                    name,
                    birthYear,
                    height,
                    mass,
                  }: {
                    id: string;
                    name: string;
                    birthYear: string;
                    height: number;
                    mass: number;
                  }) => (
                    // costInCredits: number;
                    // cargoCapacity: number;
                    <tr key={id}>
                      <td>{name}</td>
                      <td>{birthYear}</td>
                      <td>{height}</td>
                      <td>{mass}</td>
                    </tr>
                  )
                )
              : sortedData?.map(
                  ({
                    id,
                    name,
                    birthYear,
                    height,
                    mass,
                  }: {
                    id: string;
                    name: string;
                    birthYear: string;
                    height: number;
                    mass: number;
                  }) => (
                    // costInCredits: number;
                    // cargoCapacity: number;
                    <tr key={id}>
                      <td>{name}</td>
                      <td>{birthYear}</td>
                      <td>{height}</td>
                      <td>{mass}</td>
                    </tr>
                  )
                )}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default Characters;
