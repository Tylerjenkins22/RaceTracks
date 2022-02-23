import React, { useState } from "react";
import lastFmLogo from "../../Assets/lastFmLogo.png";
import { handleFetchLastFmUserData } from "../../Utils/LastfmFunctions";

export default function ConnectLastFm({ setLastFmUserData }) {
  const [userName, setUserName] = useState("");

  function handleUsername(evt) {
    setUserName(evt.target.value);
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center pt-5">
          <img className="rounded col-8 col-md-5" src={lastFmLogo} />
        </div>
        <div className="row justify-content-center pt-5">
          <input
            type="text"
            className="col-8 col-md-4"
            id="lastFmUserInput"
            onChange={handleUsername}
          />
        </div>
        <div className="row justify-content-center pt-2">
          <button
            className="btn btn-primary col-6 col-md-3"
            disabled={userName === ""}
            onClick={() =>
              handleFetchLastFmUserData(userName, setLastFmUserData)
            }
          >
            Connect to Last.FM
          </button>
        </div>
      </div>
    </>
  );
}
