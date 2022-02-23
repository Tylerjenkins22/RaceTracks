import "./GenrePieChart.css";

import React, { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { Spinner, SplitButton } from "react-bootstrap";

export default function GenrePieChart({ songs }) {
  const [data, setData] = useState();
  const [songGenres, setSongGenres] = useState([]);

  const chartColours = [
    "#e3446d",
    "#43b0e9",
    "#8142ba",
    "#0a7ecb",
    "#d8d5e7",
    "#2c2e89",
    "#293dc9",
    "#3e2553",
  ];

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getPieData(songGenres) {
    //If we have song genres
    if (songGenres.length > 0) {
      var occurences = [];
      //Create an array of unique genres with the "noGenre" flag removed
      let uniqueGenres = Array.from(new Set(songGenres));
      let filteredArray = uniqueGenres.filter(function (e) {
        return e !== "noGenre";
      });

      //For each unique genre, count how many times it occurs in the complete array
      for (let genre of filteredArray) {
        var genreOccurence = 0;
        for (var i = 0; i < songGenres.length; i++) {
          if (songGenres[i] === genre) {
            genreOccurence = genreOccurence + 1;
          }
        }
        occurences.push(genreOccurence);
      }

      //Build the dataset for the pie chart
      //Use the set colours until too many genres then pick random colours
      let pieData = [];
      filteredArray.forEach((genre, i) => {
        pieData.push({
          title: filteredArray[i],
          value: occurences[i],
          color: i < chartColours.length ? chartColours[i] : getRandomColor(),
        });
      });

      setData(pieData);
    }
  }

  useEffect(() => {
    //Call theAudioDb to get data on a given song
    const getAudioDb = async (song) => {
      let songName = song.name;
      //Most songs including (feat. ) another artist in the song title would not return anything from theAudioDb
      //This if statement checks for songs containing the (feat. ) string and removes it
      if (song.name.includes("(feat.")) {
        let newSongName = song.name.split(" (feat.");
        songName = newSongName[0];
      }
      const link = `https://theaudiodb.com/api/v1/json/${process.env.REACT_APP_AUDIO_DB_API_KEY}/searchtrack.php?s=${song.artist["#text"]}&t=${songName}`;
      const response = await fetch(link);
      const data = await response.json();
      //If data on the track exists then return it
      if (data.track) {
        return data.track[0];
      }
    };

    const getSongGenresMappingPromise = async (songs) => {
      //Create a promise, wait for all of the fetch requests to be done before returning from this function
      const songGenresArray = await Promise.all(
        songs.map(async (song, i) => {
          //Get the information for each song, if it has a genre then add it to the songGenresArray, if not then add "noGenre"
          var songInformation = await getAudioDb(song);
          if (songInformation) {
            if (songInformation.strGenre) {
              return songInformation.strGenre;
            }
            return "noGenre";
          }
          return "noGenre";
        })
      );
      //Once all of the calls have been made and the array has been created, return it
      return songGenresArray;
    };

    if (songs) {
      getSongGenresMappingPromise(songs).then((genreArray) =>
        setSongGenres(genreArray)
      );
    }
  }, [songs]);

  useEffect(() => {
    getPieData(songGenres);
  }, [songGenres]);

  return (
    <>
      {songs.length === 0 ? null : !data ? (
        <div className="row justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : data.length ? (
        <>
          <PieChart
            data={data}
            label={(data) => {
              return data.dataEntry.title;
            }}
            labelPosition={80}
            lengthAngle={360}
            lineWidth={60}
            paddingAngle={data.length > 1 ? 0 : 0}
            radius={50}
            startAngle={0}
            viewBoxSize={[100, 100]}
          />
        </>
      ) : (
        <div className="row">
          <p>Sorry! No genre data is available for these songs.</p>
        </div>
      )}
    </>
  );
}

//https://www.npmjs.com/package/react-minimal-pie-chart
