import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { Button, Spinner } from "react-bootstrap";
import { handleFetchActivitiesData } from "../../Utils/StravaFunctions";
import ActivitySongsList from "../Songs/ActivitySongsList/ActivitySongsList";
import GenrePieChart from "../Songs/GenrePieChart/GenrePieChart";
import AnalyseRunActivities from "./AnalyseRunActivities";

export default function AnalyseActivitiesRange({
  lastFmUserData,
  accessToken,
  selectedActivities,
  setSelectedActivities,
}) {
  return (
    <>
      {selectedActivities[0].type === "Run" ? (
        <AnalyseRunActivities
          lastFmUserData={lastFmUserData}
          accessToken={accessToken}
          selectedActivities={selectedActivities}
          setSelectedActivities={setSelectedActivities}
        />
      ) : (
        <>
          <Button
            variant="secondary"
            className="col-2 col-md-1 "
            onClick={() => setSelectedActivities(null)}
          >
            Back
          </Button>
          <h4>This app currently only supports analysis of run activities</h4>
        </>
      )}
    </>
  );
}
