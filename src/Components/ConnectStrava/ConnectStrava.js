import React from "react";
import stravaLogo from "../../Assets/stravaLogo.png";

import { redirectToStrava } from "../../Utils/StravaFunctions";

export default function ConnectStrava() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center pt-5">
          <img className="rounded col-6 col-md-4" src={stravaLogo} />
        </div>
        <div className="row justify-content-center pt-5">
          <button
            className="btn btn-primary col-6 col-md-4"
            onClick={redirectToStrava}
          >
            Connect to Strava
          </button>
        </div>
      </div>
    </>
  );
}
