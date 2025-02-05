import { Dispatch, SetStateAction, useState } from "react";

type props = {
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  source: string;
}

export default function Video(props:props){
    const {playing, setPlaying, source} = props;
    
    return(
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 bg-gray-600/50" onClick={()=>setPlaying(false)}>
        <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${source}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
        </div>
    )
}