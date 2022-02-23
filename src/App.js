import "./App.css";
import React, { useState } from "react";
import Home from "./Components/Home/Home";
import ConnectAccounts from "./Components/ConnectAccounts/ConnectAccounts";
import HomeNavbar from "./Components/Navbar/HomeNavbar";
import AnalyseActivity from "./Components/AnalyseActivities/AnalyseActivity";
import AnalyseActivitiesRange from "./Components/AnalyseActivities/AnalyseActivitiesRange";
import AnalyseRunActivities from "./Components/AnalyseActivities/AnalyseRunActivities";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [stravaUserData, setStravaUserData] = useState();
  const [lastFmUserData, setLastFmUserData] = useState();
  const [selectedActivity, setSelectedActivity] = useState();
  const [selectedActivities, setSelectedActivities] = useState();

  return (
    <>
      <div className="App-background">
        <HomeNavbar
          stravaUserData={stravaUserData}
          lastFmUserData={lastFmUserData}
        />
        {selectedActivities ? (
          <AnalyseActivitiesRange
            accessToken={accessToken}
            stravaUserData={stravaUserData}
            lastFmUserData={lastFmUserData}
            selectedActivities={selectedActivities}
            setSelectedActivities={setSelectedActivities}
          />
        ) : selectedActivity ? (
          <AnalyseActivity
            accessToken={accessToken}
            stravaUserData={stravaUserData}
            lastFmUserData={lastFmUserData}
            selectedActivity={selectedActivity}
            setSelectedActivity={setSelectedActivity}
          />
        ) : !stravaUserData || !lastFmUserData ? (
          <ConnectAccounts
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            stravaUserData={stravaUserData}
            setStravaUserData={setStravaUserData}
            lastFmUserData={lastFmUserData}
            setLastFmUserData={setLastFmUserData}
          />
        ) : (
          <Home
            accessToken={accessToken}
            stravaUserData={stravaUserData}
            lastFmUserData={lastFmUserData}
            selectedActivity={selectedActivity}
            setSelectedActivity={setSelectedActivity}
            selectedActivities={selectedActivities}
            setSelectedActivities={setSelectedActivities}
          />
        )}
      </div>
    </>
  );
}

export default App;
