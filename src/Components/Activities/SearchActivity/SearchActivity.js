import "./SearchActivity.css";

import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { DateTime } from "luxon";

import { handleFetchActivitiesByDate } from "../../../Utils/StravaFunctions";

export default function SearchActivity({
  accessToken,
  setSelectedActivity,
  selectedActivities,
  setSelectedActivities,
  setSearchedActivities,
}) {
  const [after, setAfter] = useState("");
  const [before, setBefore] = useState("");
  // const [searchedActivities, setSearchedActivities] = useState();

  useEffect(() => {}, []);

  //Strava takes dates in Epoch format so need to convert the dates to seconds before sending them
  function handleBeforeDateChange(evt) {
    setBefore(DateTime.fromISO(evt.target.value).toSeconds().toString());
  }

  function handleAfterDateChange(evt) {
    setAfter(DateTime.fromISO(evt.target.value).toSeconds().toString());
  }

  //Call on search button click
  function handleSearchByDate() {
    handleFetchActivitiesByDate(
      accessToken,
      setSearchedActivities,
      after,
      before
    );
  }

  return (
    <>
      <div className="container pt-2 div-background">
        <div className="row">
          <h2>Search for activities by date:</h2>
        </div>
        <div className="row">
          <Form>
            <Form.Control
              onChange={handleAfterDateChange}
              type="date"
              name="activity_after_date"
            />
            <Form.Control
              onChange={handleBeforeDateChange}
              type="date"
              name="activity_before_date"
            />
          </Form>
        </div>

        <div className="row pt-3 justify-content-center">
          <Button
            className="col-4 rounded btn-primary"
            onClick={() => handleSearchByDate()}
          >
            Search
          </Button>
        </div>
      </div>
    </>
  );
}
