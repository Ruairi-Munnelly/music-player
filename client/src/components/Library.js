import React from "react";
import LibrarySong from "./LibrarySong";
import { v4 as uuidv4 } from "uuid";
import parse from "id3-parser";
import { convertFileToBuffer } from "id3-parser/lib/util";

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  setLibraryStatus,
  libraryStatus,
}) => {
  const addSongs = async (newSongs) => {
    [...newSongs].forEach(async (song) => {
      await convertFileToBuffer(song)
        .then(parse)
        .then((tag) => {

          let buffer = tag.image.data;
          let blob = new Blob([new Uint8Array(buffer)], {type: tag.image.mime});

          setSongs([...songs, {
            name: `${tag.title}`,
            cover: URL.createObjectURL(blob),
            artist: `${tag.artist}`,
            audio: URL.createObjectURL(song),
            color: ["#EF8EA9", "#ab417f"],
            id: uuidv4(),
            active: false,
          }]);
        });
    });
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
        <input
          multiple
          onChange={(e) => {
            addSongs(e.target.files);
          }}
          id="audio_file"
          type="file"
          accept="audio/*"
        />
      </p>
    </div>
  );
};

export default Library;
