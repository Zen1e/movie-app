import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import Link from 'next/link'; 
import { useEffect, useState } from "react";
import Video from "./Video";
import { Skeleton } from "@/components/ui/skeleton"
  


type el = {
    backdrop_path: string
    vote_average: number
    title: string
    id: number
    overview: string
}

type props = {
    nowPlaying: Array<el>
    dark: boolean
}


export default function BigPoster(props:props){
    const {nowPlaying, dark} = props;
    const [playing, setPlaying] = useState(false);
    const [source, setSource] = useState('');
    const [video, setVideo] = useState([]);

    const fetchvideo = (id) =>{

        const fetchMovies = async () => {
            const options = {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTIxNWM0ZWQ0NTI1NjQwNWFkMzQwNmI5MGI0YTBjZSIsIm5iZiI6MTczNzk2MzQ4OC4zMjksInN1YiI6IjY3OTczN2UwOWEzMGE4NWIyNzIzZTRlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WHLjZvCpp3RzmN6uvCgR2EKPfyADZapmWydkEkobJgg",
              },
            };
            try {
              const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
                options
              );
              const data = await response.json();
              setVideo(data);
            } catch (err) {
              console.error(err);
            }
        };
        fetchMovies();
    }

    useEffect(()=>{
        if(video.results){
            const trailer = video?.results?.filter((el) => el.type === "Trailer");
            if (trailer) setSource(trailer[0]?.key);
            else setSource(video?.results[0].key);
            setPlaying(true);
        }
    },[video])
    
    
    return(!nowPlaying.length ? <div>
        <Skeleton className="w-screen h-[600px]"/>
    </div> :
        <div>
            {playing && <Video playing = {playing} setPlaying = {setPlaying} source = {source}/>}
        <Carousel className="w-screen h-[600px]">
            <CarouselContent>
            {nowPlaying.map((element: el, index:number)=>(
                <CarouselItem className="w-screen h-[600px] overflow-hidden" key={element.id}>
                    <Link href={`./details/${element.id}`} className="relative z-10 flex">
                    <div className="w-screen lg:h-[600px] h-[300px] overflow-hidden"><img src={`https://image.tmdb.org/t/p/original/${element.backdrop_path}`} alt="" className="w-full h-full object-cover"/></div>
                    <div className="absolute top-[340px] ml-[70px] flex flex-col w-3/4 lg:w-[300px] lg:top-[200px] lg:text-white lg:ml-[170px]">
                        <p>Now playing:</p>
                        <p className="font-bold text-[25px] line-clamp-1">{element.title}</p>
                        <div className="flex gap-[10px]">
                            <img src="./star.svg"/>
                            <p className="font-bold text-[16px]">{Math.round(element.vote_average*10)/10}<span className="font-semibold text-[14px] text-gray-300">/10</span></p>
                        </div>
                        <p className="font-medium text-[15px] leading-[20px] line-clamp-5">{element.overview}</p>
                    </div>
                    </Link>
                        <button className="border border-gray-300 w-[130px] p-[5px] rounded-xl font-semibold absolute z-20 top-[550px] ml-[80px] lg:top-[420px] lg:ml-[180px]" style={{background: dark === true ? 'black' : 'white', color: dark === true ? 'white' : 'black'}} onClick={()=>fetchvideo(element.id)}>Watch trailer</button>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[50px] bg-white hidden lg:flex text-black"/>
            <CarouselNext className="absolute right-[50px] bg-white hidden lg:flex text-black"/>
        </Carousel>
        </div>
    )
}