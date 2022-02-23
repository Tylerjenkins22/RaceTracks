import React from "react";

export default function Post({ props }) {
  return (
    <div className="song-div">
      <div>{props.artist["#text"]}</div>
      <div>{props.name}</div>

      {/* If a song is playing currently then it does not have a date and causes an error */}
      {!props["@attr"] ? (
        <div>{props.date["#text"]}</div>
      ) : (
        <div>Now Playing</div>
      )}
      <div>
        <img src={props.image[2]["#text"]} />
      </div>
      <br />
    </div>
  );
}
