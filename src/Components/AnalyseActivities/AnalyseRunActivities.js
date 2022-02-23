import "../Songs/GenrePieChart/GenrePieChart.css";

import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { Button, Spinner, Dropdown } from "react-bootstrap";
import {
  handleFetchActivitiesData,
  handleFetchActivitiesDataWithReturn,
} from "../../Utils/StravaFunctions";
import ActivitySongsList from "../Songs/ActivitySongsList/ActivitySongsList";
import GenrePieChart from "../Songs/GenrePieChart/GenrePieChart";
import FastestSegmentEffort from "../SegmentEfforts/FastestSegmentEffort";
import SlowestSegmentEffort from "../SegmentEfforts/SlowestSegmentEffort";
import HighestAverageHeartRateSegment from "../SegmentEfforts/HighestAverageHeartRateSegment";
import LowestAverageHeartRateSegment from "../SegmentEfforts/LowestAverageHeartRateSegment";

export default function AnalyseRunActivities({
  lastFmUserData,
  accessToken,
  selectedActivities,
  setSelectedActivities,
}) {
  const [songs, setSongs] = useState([]);
  const [completeSongs, setCompleteSongs] = useState([]);
  const [activities, setActivities] = useState();
  const [sort, setSort] = useState(false);
  const [segmentFilter, setSegmentFilter] = useState("Fastest");
  const [segmentEfforts, setSegmentEfforts] = useState();

  useEffect(() => {
    const fetchData = async (username, from, to) => {
      const response = await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&from=${from}&to=${to}&limit=200&format=json`
      );
      const data = await response.json();
      const newSongs = await data.recenttracks.track;
      setSongs((songs) => [...songs, ...newSongs]);
    };

    // Fetch the songs for the activity here and link them as an object
    const getSongs = async () => {
      selectedActivities.map((activity, i) => {
        var from = DateTime.fromISO(activity.start_date).toSeconds();
        var to =
          DateTime.fromISO(activity.start_date).toSeconds() +
          activity.elapsed_time;

        fetchData(lastFmUserData.name, from, to);
      });
    };

    getSongs().then(() => setSort(!sort));

    const getActivityData = async (selectedActivities) => {
      //Use the selected activityID's to fetch more data on the chosen activities
      var activityResponse = await handleFetchActivitiesDataWithReturn(
        accessToken,
        selectedActivities
      );
      setActivities(activityResponse);
      getSegments(activityResponse);
    };

    function getSegments(activities) {
      let segmentEfforts = [];

      if (activities) {
        activities.map((activity, i) => {
          activity.segment_efforts.map((segmentEffort, i) => {
            segmentEfforts.push(segmentEffort);
          });
        });
      }
      setSegmentEfforts(segmentEfforts);
    }

    getActivityData(selectedActivities);
  }, []);

  //Sort the songs array and save it to the completeSongs state to be passed to the song list component
  useEffect(() => {
    let sortedSongs = songs;
    sortedSongs.sort(function (a, b) {
      var dateA = DateTime.fromSeconds(parseInt(a.date.uts)).toMillis();
      var dateB = DateTime.fromSeconds(parseInt(b.date.uts)).toMillis();
      return dateB - dateA;
    });
    setCompleteSongs(sortedSongs);
  }, [songs, sort]);

  return (
    <>
      {!songs || !activities || !completeSongs ? (
        <div className="row justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="container">
          <div className="row pt-1">
            <Button
              variant="secondary"
              className="col-2 col-md-1 "
              onClick={() => setSelectedActivities(null)}
            >
              Back
            </Button>

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
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {segmentEfforts && (
              <>
                {segmentFilter === "Fastest" && (
                  <FastestSegmentEffort
                    segmentEfforts={segmentEfforts}
                    lastFmUserData={lastFmUserData}
                  />
                )}
                {segmentFilter === "Highest average heartrate" && (
                  <HighestAverageHeartRateSegment
                    segmentEfforts={segmentEfforts}
                    lastFmUserData={lastFmUserData}
                  />
                )}
                {segmentFilter === "Lowest average heartrate" && (
                  <LowestAverageHeartRateSegment
                    segmentEfforts={segmentEfforts}
                    lastFmUserData={lastFmUserData}
                  />
                )}
                {segmentFilter === "Slowest" && (
                  <SlowestSegmentEffort
                    segmentEfforts={segmentEfforts}
                    lastFmUserData={lastFmUserData}
                  />
                )}
              </>
            )}

            {!completeSongs ? (
              <Spinner animation="border" />
            ) : (
              <>
                {completeSongs.length > 0 && (
                  <>
                    <div className="container">
                      <h5 className="pt-4">
                        During these activities you listened to these genres:
                      </h5>
                      <div className="row pt-4 pb-4 pie-chart-div ">
                        <GenrePieChart songs={completeSongs} />
                      </div>
                    </div>
                  </>
                )}
                <h5 className="pt-4">
                  During these activities you listened to these songs:
                </h5>
                <div className="container pt-3">
                  <ActivitySongsList
                    lastFmUserData={lastFmUserData}
                    songs={completeSongs}
                    setSongs={setSongs}
                  />
                </div>
              </>
            )}

            {songs.length === 0 && (
              <p>There is no listening history for this activity </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
