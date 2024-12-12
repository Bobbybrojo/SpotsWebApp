import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function SearchResults({ searchResults }: any) {
  const navigate = useNavigate();

  useEffect(() => {}, [searchResults]);

  return (
    <>
      {searchResults.length != 0 && (
        <>
          <div className="container bg-light h-75 border border-4 rounded border-light p-2">
            <h1>Search Results</h1>
            <div className="">
              {searchResults.map((result: any) => {
                return (
                  <div
                    className="card d-flex flex-row align-items-center mb-2 text-start ps-3 pt-2"
                    key={result.place_id}
                  >
                    <h2>{result.name}</h2>
                    <Button
                      className="ms-auto me-3 mb-1"
                      variant="secondary"
                      onClick={() => navigate(`/details/${result.place_id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
          <br />
        </>
      )}
    </>
  );
}
