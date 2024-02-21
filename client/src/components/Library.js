import React from "react";
import LibrarySong from "./LibrarySong";
import { v4 as uuidv4 } from "uuid";

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  setLibraryStatus,
  libraryStatus,
}) => {
  const addSongs = (newSongs) => {

  console.log([...newSongs].length);
   let filesArr = [...newSongs].map((song) => {
       return  {
        name: `${song.name}`,
        cover: '',
        artist: `${song.name}`,
        audio: URL.createObjectURL(song),
        color: ["#EF8EA9", "#ab417f"],
        id: uuidv4(),
        active: false,
      }
    });

    setSongs([...songs, ...filesArr]);

  };

  return (
    <div className={`library ${libraryStatus ? "active" : ""}`}>
      <h2 style={{ color: "white" }}>All songs</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            setSongs={setSongs}
            isPlaying={isPlaying}
            audioRef={audioRef}
            songs={songs}
            song={song}
            setCurrentSong={setCurrentSong}
            id={song.id}
            key={song.id}
          />
        ))}
      </div>
      <p>
        <h3>Load Audio file:</h3>
        <input multiple onChange={(e) => { addSongs(e.target.files)}} id="audio_file" type="file" accept="audio/*" />
      </p>
    </div>
  );
};

export default Library;
