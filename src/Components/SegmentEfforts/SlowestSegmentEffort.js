import "./SegmentEfforts.css";

import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { Spinner, Button } from "react-bootstrap";
import { handleFetchSongsBetweenDateRange } from "../../Utils/LastfmFunctions";
import GenrePieChart from "../Songs/GenrePieChart/GenrePieChart";

//Best segment effort is defined by having the highest average heart rate
export default function SlowestSegmentEffort({
  lastFmUserData,
  segmentEfforts,
}) {
  const [segmentEffort, setSegmentEffort] = useState(segmentEfforts[0]);
  const [songs, setSongs] = useState();
  const [bestSpeedValue, setBestSpeedValue] = useState();

  const [fetchSongs, setFetchSongs] = useState(false);

  const [bestDistanceKm, setBestDistanceKm] = useState();
  const [bestTimeHours, setBestTimeHours] = useState();

  //UseEffect Which Runs When component loads
  useEffect(() => {
    findSegmentEffortByDistanceAndTime(segmentEfforts);
  }, [segmentEfforts]);

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
        await setSongs(response);
      };

      fetchSongs();

      setBestDistanceKm(segmentEffort.distance / 1000);
      setBestTimeHours(segmentEffort.elapsed_time / 60 / 60);
    }
  }, [fetchSongs]);

  //Find the best average speed for each segment and choose the best one
  function findSegmentEffortByDistanceAndTime(segmentEfforts) {
    var speed = 1000;
    var segment = {};
    segmentEfforts.map((segment, i) => {
      if (segment.distance / segment.elapsed_time < speed) {
        speed = segment.distance / segment.elapsed_time;

        //this setSegmentEffort is causing re-runs of the fetch music useEffect each time it is called
        setSegmentEffort(segment);
      }
    });
    setBestSpeedValue(speed);
    setFetchSongs(true);
  }

  return (
    <>
      <div className="container segment-effort-div pt-2">
        <h5>Your slowest segment was: {segmentEffort.name}</h5>
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
            {(bestDistanceKm / bestTimeHours).toFixed(2)}km/h
          </p>
        </div>
        <h5>During this segment you listened to:</h5>
        {!songs ? (
          <Spinner animation="border" />
        ) : songs.length > 0 ? (
          <>
            {songs.map((song, i) =>
              song["@attr"] ? null : (
                <div className="row pt-1 pb-1 border" key={`activity-${i}`}>
                  <img
                    className="d-block col-2 col-md-1"
                    height="20%"
                    width="50%"
                    src={song.image[3]["#text"]}
                    alt={`activity-${i}`}
                  />

                  <div className="col-6">
                    <p>
                      {song.artist["#text"]} - {song.name}
                    </p>
                  </div>

                  <div className="col-4 text-end">
                    <p className="text-right">{song.date["#text"]}</p>{" "}
                  </div>
                </div>
              )
            )}
            <div className="row pt-2 pb-2">
              <h5 className="col-5 col-lg-2">These Genres:</h5>
              <div className="col-7  col-lg-2 pie-chart-segment-effort-div">
                <GenrePieChart songs={songs} />
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
