import React, { useEffect } from "react";

import { stravaAuthentication } from "../../Utils/StravaFunctions";

import HomeNavbar from "../Navbar/HomeNavbar";
import ConnectStrava from "../ConnectStrava/ConnectStrava";
import ConnectLastFm from "../ConnectLastFm/ConnectLastFm";

export default function ConnectAccounts({
  stravaUserData,
  setStravaUserData,
  lastFmUserData,
  setLastFmUserData,
  accessToken,
  setAccessToken,
}) {
  useEffect(() => {
    //If the user has been redirected back to the page from Strava, run the authentication workflow
    if (window.location.href.includes("Redirect") && accessToken == "") {
      stravaAuthentication(setAccessToken, setStravaUserData);
    }
  }, []);

  return (
    <>
      {!stravaUserData && <ConnectStrava />}
      {stravaUserData && !lastFmUserData ? (
        <ConnectLastFm setLastFmUserData={setLastFmUserData} />
      ) : null}
    </>
  );
}
