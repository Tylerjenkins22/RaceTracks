import "./SegmentEfforts.css";
import "../Songs/GenrePieChart/GenrePieChart.css";

import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { handleFetchSongsBetweenDateRange } from "../../Utils/LastfmFunctions";
import ActivitySongsList from "../Songs/ActivitySongsList/ActivitySongsList";
import { Spinner } from "react-bootstrap";
import GenrePieChart from "../Songs/GenrePieChart/GenrePieChart";

//Best segment effort is defined by having the highest average heart rate
export default function HighestAverageHeartRateSegment({
  lastFmUserData,
  segmentEfforts,
}) {
  const [segmentEffort, setSegmentEffort] = useState(segmentEfforts[0]);
  const [bestSongs, setBestSongs] = useState();

  const [fetchSongs, setFetchSongs] = useState(false);

  //UseEffect Which Runs When component loads
  useEffect(() => {
    findSegmentEffortByAverageHeartrate(segmentEfforts);
  }, [findSegmentEffortByAverageHeartrate, segmentEfforts]);

  //UseEffect which runs after segmentEffort is updated
  useEffect(() => {
    // Fetch the songs for the segment here and link them as an object
    if (fetchSongs) {
      const fetchSongs = async () => {
        const response = await handleFetchSongsBetweenDateRange(
          lastFmUserData.name,
          DateTime.fromISO(segmentEffort.start_date).toSeconds(),
          DateTime.fromISO(segmentEffort.start_date).toSeconds() +
            segmentEffort.elapsed_time
        );
        await setBestSongs(response);
      };

      fetchSongs();
    }
  }, [fetchSongs]);

  //Look at all segmentEfforts for average heartrate and find best one
  function findSegmentEffortByAverageHeartrate(segmentEfforts) {
    segmentEfforts.map((segment, i) =>
      segment.average_heartrate > segmentEffort.average_heartrate
        ? setSegmentEffort(segment)
        : null
    );
    setFetchSongs(true);
  }

  return (
    <>
      <div className="container pt-2 mt-2 segment-effort-div">
        <h5>
          Your average heart rate was highest in this segment:{" "}
          {segmentEffort.name}
        </h5>
        <div className="row">
          <p className="col-6 col-md-3 col-lg-2">
            Max heart rate:{" "}
            {segmentEffort.max_heartrate ? segmentEffort.max_heartrate : "N/A"}
          </p>
          <p className="col-6 col-md-3 col-lg-2">
            Average heart rate:{" "}
            {segmentEffort.average_heartrate
              ? segmentEffort.average_heartrate
              : "N/A"}
          </p>
        </div>
        <div className="row">
          <p className="col-6 col-md-3 col-lg-2">
            Segment Start:{" "}
            {DateTime.fromISO(segmentEffort.start_date).toFormat("HH:mm:ss")}
          </p>
          <p className="col-6 col-md-3 col-lg-2">
            Segment Finish:{" "}
            {DateTime.fromSeconds(
              DateTime.fromISO(segmentEffort.start_date).toSeconds() +
                segmentEffort.elapsed_time
            ).toFormat("HH:mm:ss")}
          </p>
        </div>
        <div className="row">
          <p className="col-6 col-md-3 col-lg-2">
            Elapsed Time:{" "}
            {DateTime.fromSeconds(segmentEffort.elapsed_time).toFormat("mm:ss")}
          </p>
          <p className="col-6 col-md-3 col-lg-2">
            Average speed:
            {/* {(bestDistanceKm / bestTimeHours).toFixed(2)}km/h */}
          </p>
        </div>
        <h5>During this segment you listened to:</h5>
        {!bestSongs ? (
          <Spinner animation="border" />
        ) : bestSongs.length > 0 ? (
          <>
            <ActivitySongsList songs={bestSongs} setSongs={setBestSongs} />
            <div className="row pt-2 pb-2">
              <h5 className="col-5 col-lg-2">These Genres:</h5>
              <div className="col-7  col-lg-2 pie-chart-segment-effort-div">
                <GenrePieChart songs={bestSongs} />
              </div>
            </div>
          </>
        ) : (
          <p>Sorry! There is no song data for this segment.</p>
        )}
      </div>
    </>
  );
}
