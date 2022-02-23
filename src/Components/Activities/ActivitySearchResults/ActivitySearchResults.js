import "./ActivitySearchResults.css";

import React, { useState } from "react";
import { Button, Card, Dropdown } from "react-bootstrap";
import { DateTime } from "luxon";

export default function ActivitySearchResults({
  searchedActivities,
  setSelectedActivity,
  setSelectedActivities,
}) {
  const [activityFilter, setActivityFilter] = useState("Run");

  //function for filtering searched activities by the selected filter
  function handleSetSelectedActivities() {
    let filteredActivities = [];
    searchedActivities.map((activity, i) => {
      if (activity.type === activityFilter) {
        filteredActivities.push(activity);
      }
    });
    setSelectedActivities(filteredActivities);
  }

  return (
    <>
      <div className="container">
        <div className="row pt-3 mb-3 pb-1 select-activity-type-bar justify-content-center">
          <h5 className="col-8 col-lg-3">
            Select the type of activity you would like to analyse:
          </h5>
          <Dropdown className="col-4 col-lg-2 pb-2">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {activityFilter}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setActivityFilter("Run")}>
                Run
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setActivityFilter("Workout")}>
                Workout
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setActivityFilter("WeightTraining")}
              >
                WeightTraining
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <button
            className="col-12 col-lg-5 analyse-date-range-button"
            onClick={() => handleSetSelectedActivities()}
          >
            Analyse all {activityFilter} activities between these dates
          </button>
        </div>
        <div className="row justify-content-center">
          {searchedActivities.map(
            (activity, i) =>
              activity.type === activityFilter && (
                <div className="col-5 col-md-3 col-lg-2 pb-3">
                  <Card
                    text={"dark"}
                    border="dark"
                    style={{ height: "100%", width: "10rem" }}
                  >
                    <Card.Body className="card-color">
                      <Card.Title>{activity.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {DateTime.fromISO(activity.start_date)
                          .toFormat("dd LLL yyyy")
                          .toString()}
                      </Card.Subtitle>
                      <Card.Text>Activity: {activity.type}</Card.Text>
                    </Card.Body>
                    <button
                      className="search-results-analyse-button"
                      onClick={() => setSelectedActivity(activity)}
                    >
                      Analyse
                    </button>
                  </Card>
                </div>
              )
          )}
          <p>
            Please note, there is a limit on how many activities can be loaded
            at once. If any activities are missing from the time period you have
            selected, please narrow down your date range.
          </p>
        </div>
      </div>
    </>
  );
}
