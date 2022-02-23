import "./Home.css";

import React, { useState } from "react";

import RecentActivities from "../Activities/RecentActivities/RecentActivities";
import RecentSongs from "../Songs/RecentSongs/RecentSongs";
import SearchActivity from "../Activities/SearchActivity/SearchActivity";
import ActivitySearchResults from "../Activities/ActivitySearchResults/ActivitySearchResults";

export default function Home({
  stravaUserData,
  lastFmUserData,
  accessToken,
  selectedActivity,
  setSelectedActivity,
  selectedActivities,
  setSelectedActivities,
}) {
  function logData() {
    console.log(stravaUserData);
    console.log(lastFmUserData);
    console.log(accessToken);
    console.log(selectedActivity);
    console.log(selectedActivities);
  }

  const [searchedActivities, setSearchedActivities] = useState();

  return (
    <>
      <div className="container">
        <div className="row pt-2">
          <div className="col-12 col-lg-6">
            <RecentActivities
              accessToken={accessToken}
              setSelectedActivity={setSelectedActivity}
              lastFmUserData={lastFmUserData}
            />
          </div>
          <div className="col-12 col-lg-6 SearchActivity-div">
            <SearchActivity
              accessToken={accessToken}
              setSelectedActivity={setSelectedActivity}
              selectedActivities={selectedActivities}
              setSelectedActivities={setSelectedActivities}
              setSearchedActivities={setSearchedActivities}
            />
          </div>
        </div>
      </div>
      {searchedActivities && (
        <div className="pt-5 ">
          <ActivitySearchResults
            accessToken={accessToken}
            searchedActivities={searchedActivities}
            setSelectedActivity={setSelectedActivity}
            selectedActivities={selectedActivities}
            setSelectedActivities={setSelectedActivities}
          />
        </div>
      )}
      <div className="pt-5">
        <RecentSongs lastFmUserData={lastFmUserData} />
      </div>
    </>
  );
}
