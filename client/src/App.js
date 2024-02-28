import React, { useState, useRef, useEffect } from "react";
import { FastAverageColor } from "fast-average-color";
import data from "./data.js";
import Nav from "./components/Navb.js";
import Song from "./components/Song.js";
import Player from "./components/PlayerSong.js";
import Library from "./components/Library.js";
import "./styles/app.scss";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [autoplay, setAutoplay] = useState(true);
  const [loop, setLoop] = useState(false);

  const [backgroundColor, setBackgroundColor] = useState(() => {
    let img = new Image();
    img.src = currentSong.cover;
    const fac = new FastAverageColor();
    fac.getColorAsync(img).then((color) => {
      //console.log("init-bgcolor:" + color.hex);
      return setBackgroundColor(color.hex);
    });
  });

  const updateColor = () => {
    const body = document.querySelector("body");
    const fac = new FastAverageColor();
    fac
      .getColorAsync(body.querySelector(".song_cover"))
      .then((color) => {
        setBackgroundColor(color.hex);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (backgroundColor) {
      const body = document.querySelector("body");
      body.style.background = `linear-gradient(${backgroundColor}1A, ${backgroundColor})`;
      body.style.color = backgroundColor.isDark ? "#fff" : "#000";
    }
  }, [backgroundColor]);


  //updates the autoplay state to continue through the list
  useEffect(() => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (currentIndex === songs.length - 1) {setAutoplay(false) }
    updateColor();
  }, [currentSong, songs]);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };

  const songEndHandler = async () => {
    // check to see whether the queue has reached the end
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (currentIndex === songs.length-1 ) {
      return setIsPlaying(!isPlaying);
    }
    setCurrentSong(songs[(currentIndex + 1) % songs.length]);
  };

  let navProps = {
    libraryStatus: libraryStatus,
    setLibraryStatus: setLibraryStatus,
  };

  let libraryProps = {
    songs: songs,
    isPlaying: isPlaying,
    libraryStatus: libraryStatus,
    setLibraryStatus: setLibraryStatus,
    setSongs: setSongs,
    setCurrentSong: setCurrentSong,
    audioRef: audioRef,
  };

  let playerProps = {
    id: songs.id,
    songs: songs,
    setSongs: setSongs,
    songInfo: songInfo,
    setSongInfo: setSongInfo,
    isPlaying: isPlaying,
    setIsPlaying: setIsPlaying,
    currentSong: currentSong,
    setCurrentSong: setCurrentSong,
    audioRef: audioRef,
    updateColor: updateColor,
    loop: loop
  };

  return (
    <div>
      <Nav {...navProps} />
      <Song currentSong={currentSong} />
      <Library {...libraryProps} />
      <Player {...playerProps} />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        autoPlay={isPlaying}
        onEnded={() => {
          songEndHandler();
        }}
        src={currentSong.audio}
        ref={audioRef}
      ></audio>

      <button onClick={updateColor}>Cover Colour</button>
    </div>
  );
}

export default App;
