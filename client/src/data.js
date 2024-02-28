import { v4 as uuidv4 } from "uuid";
import cloudkicker_audio from "./audio/cloudkicker_to_scale_not_painted.mp3";
import cloudkicker_cover from "./covers/to_scale_not_painted.jpg";
import mutiny_on_the_bounty_audio from "./audio/Mutiny On The Bounty - Mutiny on the Bounty - Digital Tropics - 10 Sonars.mp3";
import mutiny_on_the_bounty_cover from "./covers/digital_tropics.jpeg";
import toe_audio from './audio/toe - For Long Tomorrow - 10 グッドバイ (Album Version).mp3';
import toe_cover from './covers/for_long_tomorrow.jpeg';
import russian_circles_audio from './audio/Russian Circles - Memorial - 06 Ethel.mp3';
import russian_circles_cover from './covers/memorial.jpeg';

function Audio() {
  return [
    {
      name: "To Scale Not Painted",
      cover: cloudkicker_cover,
      artist: "Cloudkicker",
      audio: cloudkicker_audio,
      color: ["#205950", "#2ab3bf"],
      id: uuidv4(),
      active: true,
    },
    {
      name: "Sonars",
      cover: mutiny_on_the_bounty_cover,
      artist: "Mutiny on the Bounty",
      audio: mutiny_on_the_bounty_audio,
      color: ["#EF8EA9", "#ab417f"],
      id: uuidv4(),
      active: false,
    },
    {
      name: "グッドバイ",
      cover: toe_cover,
      artist: "Toe",
      audio: toe_audio,
      color: ["#CD607D", "#c94043"],
      id: uuidv4(),
      active: false,
    },
    {
      name: "Ethel",
      cover:
        russian_circles_cover,
      artist: "Russian Circles",
      audio: russian_circles_audio,
      color: ["#EF8EA9", "#ab417f"],
      id: uuidv4(),
      active: false,
    },
  ];
}

export default Audio;
