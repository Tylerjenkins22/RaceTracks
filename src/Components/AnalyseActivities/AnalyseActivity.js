import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { Button, Spinner, Dropdown } from "react-bootstrap";
import { handleFetchSongsBetweenDateRange } from "../../Utils/LastfmFunctions";
import { handleFetchActivity } from "../../Utils/StravaFunctions";
import ActivitySongsList from "../Songs/ActivitySongsList/ActivitySongsList";
import FastestSegmentEffort from "../SegmentEfforts/FastestSegmentEffort";
import HighestAverageHeartRateSegment from "../SegmentEfforts/HighestAverageHeartRateSegment";
import SlowestSegmentEffort from "../SegmentEfforts/SlowestSegmentEffort";
import LowestAverageHeartRateSegment from "../SegmentEfforts/LowestAverageHeartRateSegment";
import GenrePieChart from "../Songs/GenrePieChart/GenrePieChart";

export default function AnalyseActivity({
  lastFmUserData,
  accessToken,
  selectedActivity,
  setSelectedActivity,
}) {
  const [songs, setSongs] = useState();
  const from = DateTime.fromISO(selectedActivity.start_date).toSeconds();
  const to = from + selectedActivity.elapsed_time;

  const [activity, setActivity] = useState();

  const [segmentFilter, setSegmentFilter] = useState("Fastest");

  useEffect(() => {
    //Fetch the songs for the activity here and link them as an object
    const fetchSongs = async () => {
      const response = await handleFetchSongsBetweenDateRange(
        lastFmUserData.name,
        from,
        to
      );
      await setSongs(response);
    };

    fetchSongs();

    //Use the selected activityID to fetch more data on the chosen activity
    handleFetchActivity(accessToken, selectedActivity.id, setActivity);
  }, []);

  return (
    <>
      {!songs || !activity ? (
        <div className="row justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="container">
          <div className="row pt-1">
            <Button
              variant="secondary"
              className="col-2 col-md-1 "
              onClick={() => setSelectedActivity(null)}
            >
              Back
            </Button>

            <h3 className="col-10">
              {selectedActivity.name} -{" "}
              {DateTime.fromISO(activity.start_date)
                .toFormat("dd LLL yyyy")
                .toString()}
            </h3>

            <div className="row">
              <p className="col-4 ">Activity Type: {activity.type}</p>
              <p className="col-4 ">
                Average heart rate:{" "}
                {activity.average_heartrate
                  ? activity.average_heartrate
                  : "N/A"}
              </p>
              <p className="col-4 ">
                Max heart rate:{" "}
                {activity.max_heartrate ? activity.max_heartrate : "N/A"}{" "}
              </p>
            </div>

            {selectedActivity.type === "Run" && (
              <div className="row">
                <p className="col-5 col-md-2">Select Segment:</p>
                <Dropdown className="col-1 pb-2">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {segmentFilter}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSegmentFilter("Fastest")}>
                      Fastest
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSegmentFilter("Slowest")}>
                      Slowest
                    </Dropdown.Item>
                    {activity.has_heartrate && (
                      <>
                        {" "}
                        <Dropdown.Item
                          onClick={() =>
                            setSegmentFilter("Highest average heartrate")
                          }
                        >
                          Highest average heartrate
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            setSegmentFilter("Lowest average heartrate")
                          }
                        >
                          Lowest average heartrate
                        </Dropdown.Item>
                      </>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}

            {activity.type === "Run" ? (
              <>
                {segmentFilter === "Fastest" && (
                  <FastestSegmentEffort
                    segmentEfforts={activity.segment_efforts}
                    lastFmUserData={lastFmUserData}
                  />
                )}
                {segmentFilter === "Highest average heartrate" && (
                  <HighestAverageHeartRateSegment
                    segmentEfforts={activity.segment_efforts}
                    lastFmUserData={lastFmUserData}
                  />
                )}
                {segmentFilter === "Lowest average heartrate" && (
                  <LowestAverageHeartRateSegment
                    segmentEfforts={activity.segment_efforts}
                    lastFmUserData={lastFmUserData}
                  />
                )}
                {segmentFilter === "Slowest" && (
                  <SlowestSegmentEffort
                    segmentEfforts={activity.segment_efforts}
                    lastFmUserData={lastFmUserData}
                  />
                )}
              </>
            ) : (
              <h4>
                Sorry, this application currently does not support analysis of
                activities other than running.
              </h4>
            )}

            {songs.length > 0 && (
              <>
                <div className="container">
                  <h5 className="pt-4">
                    During this activity you listened to these genres:
                  </h5>
                  <div className="row pt-4 pb-4 pie-chart-div">
                    <GenrePieChart songs={songs} />{" "}
                  </div>
                </div>
              </>
            )}

            <div className="container pt-3">
              <h5 className="pt-4">
                During this activity you listened to these songs:
              </h5>
              <ActivitySongsList
                lastFmUserData={lastFmUserData}
                songs={songs}
                setSongs={setSongs}
              />
            </div>
            {songs.length === 0 && (
              <p>There is no listening history for this activity </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
