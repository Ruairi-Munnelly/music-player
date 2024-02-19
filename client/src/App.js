import React, {useState, useRef} from 'react'
import data from './data.js';
import Nav from './components/Navb.js'
import Song from './components/Song.js';
import Player from './components/PlayerSong.js';
import Library from './components/Library.js'
import './styles/app.scss';

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

  const timeUpdateHandler = (e) => { 
    const current = e.target.currentTime; 
    const duration = e.target.duration;  
    const roundedCurrent = Math.round(current); 
    const roundedDuration = Math.round(duration); 
    const animation = Math.round((roundedCurrent / roundedDuration) * 100); 
    console.log(); 
    setSongInfo({ 
      currentTime: current, 
      duration, 
      animationPercentage: animation, 
    }); 
  }; 
  const songEndHandler = async () => { 
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id); 
  
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]); 
  
    if (isPlaying) audioRef.current.play(); 
  }; 

  let navProps = {
    libraryStatus: libraryStatus,
    setLibraryStatus: setLibraryStatus,
  }

  let libraryProps = { 
    songs: songs,
    isPlaying: isPlaying,
    libraryStatus: libraryStatus,
    setLibraryStatus: setLibraryStatus,
    setSongs: setSongs,
    setCurrentSong: setCurrentSong,
    audioRef: audioRef
  }

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
  }

  fetch('/public/audio/cloudkicker_to_scale_not_painted.mp3')
  .then(res => {
    if (!res.ok) {
      throw Error('File not found');
    } 
    return res.blob();
  })
  .then( myBlob => {
    console.log(myBlob);
    const reader = new FileReader();
      reader.onload = e => {
        console.log(e.target.result);
      };
      reader.readAsDataURL(myBlob);
  })

  return (
    <div>
      <Nav {...navProps} />
      <Song currentSong={currentSong} />
        <Library {...libraryProps} />
      <Player {...playerProps} />
        <audio 
        onLoadedMetadata={timeUpdateHandler} 
        onTimeUpdate={timeUpdateHandler} 
        src={currentSong.audio} 
        ref={audioRef} 
        onEnded={songEndHandler} 
      ></audio> 
    </div>
  );
}

export default App;
