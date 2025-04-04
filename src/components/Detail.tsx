import { useState, useEffect } from "react";
import Video from "./Video";
import More from "./MoreLikeThis";
import { Skeleton } from "./ui/skeleton";

export default function Detail(props) {
  const { movies } = props;

  const [video, setVideo] = useState({
    results : []
  });
  const [casts, setCasts] = useState({
    crew: [],
    cast: []
  });
  const [list, setList] = useState({
    genres : []
  });
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (movies.id === undefined) return;

    const fetchList = async () => {
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
          `https://api.themoviedb.org/3/genre/movie/list?language=en`,
          options
        );
        const data = await response.json();
        setList(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCast = async () => {
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
          `https://api.themoviedb.org/3/movie/${movies.id}/credits?language=en-US`,
          options
        );
        const data = await response.json();
        setCasts(data);
      } catch (err) {
        console.error(err);
      }
    };

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
          `https://api.themoviedb.org/3/movie/${movies.id}/videos?language=en-US`,
          options
        );
        const data = await response.json();
        setVideo(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchList();
    fetchCast();
    fetchMovies();
  }, [movies]);

  const source = () => {
    const trailer = video?.results?.filter((el) => el.type === "Trailer");
    if (trailer) return trailer[0]?.key;
    else return video?.results[0].key;
  };

  const findGenre = (x) => {
    const ind = list?.genres.find((el) => el.id === x);
    return ind?.name;
  };

  const findDirector = () => {
    const director = casts?.crew.find((el) => el.job === "Director");
    return director?.name;
  };
  const findProducer = () => {
    const producer = casts?.crew?.find((el) => el.job === "Producer");
    return producer?.name;
  };

    return loading ? (
      <div className="w-screen mt-[60px] flex justify-center">
        <div className="w-[1200px] flex flex-col">
          <div className="flex justify-between mb-[40px]">
            <Skeleton className="w-[350px] h-[60px]"/>
            <Skeleton className="w-[80px] h-[60px]"/>
          </div>
          <div className="flex justify-between mb-[50px]">
            <Skeleton className="w-[300px] h-[450px]"/>
            <Skeleton className="w-[800px] h-[450px]"/>
          </div>
          <Skeleton className="w-full h-[400px]"/>
        </div>
      </div>
    )
    : (
      <div className="w-screen mt-[60px] flex justify-center">
        {playing && (
          <Video playing={playing} setPlaying={setPlaying} source={source()} />
        )}
        <div className="max-w-[1200px] flex flex-col">
          <div className="h-fit flex justify-between">
            <div className="w-[calc(100vw-67px)] h-fit">
              <div className="font-bold text-[32px]">{movies.title}</div>
              <div className="text-[17px]">
                {movies.release_date} · PG · {movies.runtime} min
              </div>
            </div>
            <div className="text-[13px]">
              <div className="font-semibold ml-[10px]">Rating</div>
              <div className="flex gap-[5px]">
                <img src="../../star.svg" className="w-[22px] h-[22px]" />
                <p className="font-bold text-[16px]">
                  {Math.round(movies.vote_average * 10) / 10}
                  <span className="font-semibold text-[14px] text-gray-300">
                    /10
                  </span>
                </p>
              </div>
              <div className="ml-[20px]">{movies.vote_count}</div>
            </div>
          </div>
          <div className="flex gap-[40px] overflow-hidden flex-wrap">
            <div className="w-[100px] h-[148px] lg:w-[280px] lg:h-[428px] m-[30px] mt-[260px] lg:m-0 rounded-[5px] overflow-hidden absolute lg:static">
              <img
                src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                className="object-cover h-[100%] w-[100%]"
              />
            </div>
            <div className="max-[400px]:w-screen w-[380px] h-[214px] lg:left-0 lg:w-[760px] lg:h-[428px] rounded-[5px] overflow-hidden flex justify-center items-center">
              <button
                className="scale-50 lg:scale-100 absolute p-[20px] rounded-[30px] text-[20px] border text-white bg-gray-700/75"
                onClick={() => setPlaying(true)}
              >
                Play trailer
              </button>
              <img
                src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`}
                alt=""
              />
            </div>
          </div>
          <div className="flex gap-x-[25px] gap-y-[10px] mt-[50px] ml-[170px] lg:ml-0 flex-wrap">
            {movies.genres.map((el, index) => (
              <div
                key={index}
                className="border rounded-[30px] px-[10px] text-[13px] lg:text-[15px]"
              >
                {findGenre(el.id)}
              </div>
            ))}
          </div>
          <div className="mt-[10px] lg:mt-[50px] text-[15px] lg:text-[18px] tracking-wide ml-[170px] lg:ml-0">
            {movies.overview}
          </div>
          <div className="flex border-b border-gray-600/75 text-[15px] lg:text-[17px] mt-[40px] pb-[10px] mb-[30px]">
            <div className="w-[200px] font-black">Director</div>
            <div>{findDirector()}</div>
          </div>
          <div className="flex border-b border-gray-600/75 text-[15px] lg:text-[17px] pb-[10px] mb-[30px]">
            <div className="w-[200px] font-black">Producer</div>
            <div>{findProducer()}</div>
          </div>
          <div className="flex border-b border-gray-600/75 text-[15px] lg:text-[17px] pb-[10px] mb-[30px]">
            <div className="min-w-[200px] font-black">Stars</div>
            <div className="flex flex-wrap">{casts?.cast.slice(0,5).map((el,index) => (
              <div className="flex text-wrap" key={index}>{index ? <div className="mx-[20px]">·</div> : <></>}{el.name}</div>
            ))}</div>
          </div>
          <div className="mb-[150px]">
            <More id = {movies.id}/>
          </div>
        </div>
      </div>
    );
}
