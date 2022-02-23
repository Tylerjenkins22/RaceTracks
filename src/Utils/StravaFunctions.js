//Redirect the user to the GET Endpoint to authorize their strava account
export function redirectToStrava() {
  window.location = `http://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=https://tylerjenkins22.github.io/RaceTracks//exchange_token&approval_prompt=force&scope=${process.env.REACT_APP_STRAVA_SCOPE}`;
}

//Strava Token Authentication workflow
export async function stravaAuthentication(setAccessToken, setStravaUserData) {
  //Get the auth code from the redirect url
  const authCode = getAuthCode();
  //Use this auth code to request an auth token
  const authToken = await getAuthToken(authCode);

  //Use the auth token to set the userId and accessToken
  try {
    // setUserId(authToken.athlete.id);
    setStravaUserData(authToken.athlete);
    setAccessToken(authToken.access_token);
  } catch (e) {
    console.log(e);
  }
}

//Get the auth code from the url
export function getAuthCode() {
  return window.location.search.split("&")[1].slice(5);
}

//POST the auth code to strava to obtain the users id and 6 hour access token
export const getAuthToken = async (authCode) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "React POST Request Example" }),
  };
  try {
    const response = await fetch(
      `https://www.strava.com/api/v3/oauth/token?client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}&client_secret=${process.env.REACT_APP_STRAVA_CLIENT_SECRET}&code=${authCode}&grant_type=authorization_code`,
      requestOptions
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.log(error);
  }
};

//GET all users activities, returns number of results given
export async function handleFetchActivities(
  accessToken,
  setActivities,
  numberOfResults
) {
  fetch(
    `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&per_page=${numberOfResults}`
  )
    .then((response) => response.json())
    .then((data) => setActivities(data));
}

//GET users activities between two dates
export async function handleFetchActivitiesByDate(
  accessToken,
  setSearchedActivities,
  after,
  before
) {
  fetch(
    `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&before=${before}&after=${after}`
  )
    .then((response) => response.json())
    .then((data) => setSearchedActivities(data));
}

//GET specific activity
export async function handleFetchActivity(
  accessToken,
  activityId,
  setActivity
) {
  fetch(
    `https://www.strava.com/api/v3/activities/${activityId}?access_token=${accessToken}`
  )
    .then((response) => response.json())
    .then((data) => setActivity(data));
}

//GET more specific activity data for activities within specific date range
export async function handleFetchActivitiesData(
  accessToken,
  selectedActivities,
  setActivities
) {
  let returnedActivities = [];

  selectedActivities.map((activity, i) => {
    fetch(
      `https://www.strava.com/api/v3/activities/${activity.id}?access_token=${accessToken}`
    )
      .then((response) => response.json())
      .then((data) => returnedActivities.push(data));
  });
  setActivities(returnedActivities);
}

export async function handleFetchActivitiesDataWithReturn(
  accessToken,
  selectedActivities
) {
  const activitiesArray = await Promise.all(
    selectedActivities.map(async (activity, i) => {
      const response = await fetch(
        `https://www.strava.com/api/v3/activities/${activity.id}?access_token=${accessToken}`
      );
      const data = await response.json();
      return data;
    })
  );
  return activitiesArray;
}
