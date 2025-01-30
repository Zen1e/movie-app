import { useEffect } from "react";
import BigPoster from "./BigPoster";
import FetchNowPlaying from "./fetch/FetchNowPlaying";
import Upcoming from "./Upcoming";
import Popular from "./Popular";
import TopRated from "./TopRated";

type props = {
  dark: boolean
}

export default function Intro(props:props) {
  const { dark } = props;
  const nowPlaying = FetchNowPlaying();


  return (
    <div className="mt-[60px] flex flex-col items-center">
      <BigPoster nowPlaying={nowPlaying} dark={dark} />
      <Upcoming />
      <Popular />
      <TopRated />
    </div>
  );
}
