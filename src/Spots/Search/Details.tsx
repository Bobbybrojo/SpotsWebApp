import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as searchClient from "./client";

export default function Details({ navbarDimensions }: any) {
  const [details, setDetails] = useState<any>({});
  const { did } = useParams();

  const fetchDetails = async (detailsId: any) => {
    const details = await searchClient.getDetails(detailsId);
    setDetails(details.result);
    console.log(details);
  };

  useEffect(() => {
    fetchDetails(did);
  }, [did]);

  return (
    <div>
      <div
        className="content-spacer"
        style={{ paddingBottom: navbarDimensions.clientHeight }}
      />
      <div className="card">
        <h2>{details.name}</h2>
        {details.formatted_address && (
          <p>
            Address: <a>{details.formatted_address}</a>
          </p>
        )}
        {details.url && (
          <p>
            Maps:{" "}
            <a href={details.url} target="_blank">
              Link
            </a>
          </p>
        )}
        {details.website && (
          <p>
            Website:
            <a href={details.website} target="_blank">
              Link
            </a>
          </p>
        )}

        {details.formatted_phone_number && (
          <p>Phone: {details.formatted_phone_number}</p>
        )}
        {details.rating && <p>Ratings: {details.rating}</p>}
        {details.opening_hours && details.opening_hours.open_now && (
          <p>Open Now: {details.opening_hours.open_now}</p>
        )}
      </div>
    </div>
  );
}
