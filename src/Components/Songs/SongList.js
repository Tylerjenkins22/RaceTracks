import React from "react";
import Song from "../Song/Song.js";

export default function SongList({ songs }) {
  return (
    <div>
      {songs.map((song, i) =>
        song["@attr"] ? null : (
          <React.Fragment key={"song-" + i}>
            <Song props={song} />
            <hr />
          </React.Fragment>
        )
      )}
    </div>
  );
}
