import "./ActivitySongsList.css";

import React, { useEffect, useState } from "react";

import { DateTime } from "luxon";
import { Spinner, Button } from "react-bootstrap";

export default function ActivitySongsList({ lastFmUserData, songs, setSongs }) {
  return (
    <>
      {!songs ? (
        <Spinner animation="border" />
      ) : songs.length > 0 ? (
        <>
          {songs.map((song, i) =>
            song["@attr"] ? null : (
              <div className="row song-div pt-1 pb-1 " key={`song-${i}`}>
                <img
                  className="d-block col-2 col-md-1"
                  height="20%"
                  width="50%"
                  src={song.image[3]["#text"]}
                  alt={`song-${i}`}
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
        </>
      ) : (
        <p>There is no song data for this segment.</p>
      )}
    </>
  );
}
