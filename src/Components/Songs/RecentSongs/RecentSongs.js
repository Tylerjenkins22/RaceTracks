import "./RecentSongs.css";

import React, { useEffect, useState } from "react";
import { Carousel, Spinner } from "react-bootstrap";
import { handleFetchRecentSongs } from "../../../Utils/LastfmFunctions";
import GenrePieChart from "../GenrePieChart/GenrePieChart";

export default function RecentSongs({ lastFmUserData }) {
  const [recentSongs, setRecentSongs] = useState("");

  useEffect(() => {
    //When the user has connected both profiles this component will load data
    handleFetchRecentSongs(lastFmUserData.name, setRecentSongs);
  }, [lastFmUserData.name]);

  //Need to map recent activties and display them in the carousel
  //can i use the map ids to display map images?
  return (
    <>
      {!recentSongs ? (
        <div className="row justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <div className="container pt-3 color-back pb-3">
            <div className="row justify-content-center">
              <h4 className="text-center ">Recent Songs</h4>
            </div>

            <Carousel variant="dark">
              {recentSongs.map((song, i) => (
                <Carousel.Item className="col-3" key={`activity-${i}`}>
                  <img
                    className="d-block "
                    height="120px"
                    width="120px"
                    src={song.image[3]["#text"]}
                    alt={`activity-${i}`}
                  />
                  <Carousel.Caption>
                    <p>{song.artist["#text"]}</p>
                    <h4>{song.name}</h4>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </>
      )}
    </>
  );
}
