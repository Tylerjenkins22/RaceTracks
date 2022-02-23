import "./RecentActivities.css";

import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

import { Carousel, Spinner, Button } from "react-bootstrap";
import { handleFetchActivities } from "../../../Utils/StravaFunctions";
import stravaOrange from "../../../Assets/stravaOrange.png";

export default function RecentActivities({ accessToken, setSelectedActivity }) {
  const [recentActivities, setRecentActivities] = useState("");

  useEffect(() => {
    //When the user has connected both profiles this component will load data
    handleFetchActivities(accessToken, setRecentActivities, 10);
  }, []);

  //Need to map recent activties and display them in the carousel
  //TODO: can i use the map ids to display map images?
  return (
    <>
      {!recentActivities ? (
        <div className="row justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <div className="row justify-content-center">
            <h4 className="text-center">Recent Activities</h4>
          </div>
          <Carousel variant="dark" className="recent-activities-div-background">
            {recentActivities.map((activity, i) => (
              <Carousel.Item className="col-3" key={`activity-${i}`}>
                <img
                  className="d-block"
                  height="185px"
                  width="0px"
                  src={stravaOrange}
                  alt={`activity-${i}`}
                />
                <Carousel.Caption>
                  <h3>{activity.name}</h3>
                  <p>
                    {DateTime.fromISO(activity.start_date)
                      .toFormat("dd LLL yyyy t")
                      .toString()}
                  </p>
                  <button
                    className="recent-activities-analyse-button "
                    onClick={() => setSelectedActivity(activity)}
                  >
                    Analyse
                  </button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      )}
    </>
  );
}
