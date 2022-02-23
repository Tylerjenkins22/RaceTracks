import React, { useEffect } from "react";
import { DateTime } from "luxon";

export default function SegmentEffort({ segmentEffort }) {
  useEffect(() => {
    //Look at activity.segment_efforts, compare the average heart rate on each segment,
    //See what music they were listening to at that segment start_date, use the best segment
    // as their top song for the workout
  }, []);

  const startTime = DateTime.fromISO(segmentEffort.start_date).toSeconds();

  return (
    <>
      <div className="container">
        <div className="row">
          <p>Segment name:{segmentEffort.name}</p>
          <p>Average heart rate: {segmentEffort.average_heartrate}</p>
          <p>
            Segment Start Time:{" "}
            {DateTime.fromSeconds(startTime).toFormat("HH:mm:ss")}
          </p>
          <p>
            Elapsed Time:{" "}
            {DateTime.fromSeconds(segmentEffort.elapsed_time).toFormat("mm:ss")}
          </p>
        </div>
      </div>
    </>
  );
}
