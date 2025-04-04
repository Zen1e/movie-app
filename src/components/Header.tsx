'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
// import FetchSearch from "./fetch/FetchSearch"

type props = {
  dark: boolean;
  setDark: Dispatch<SetStateAction<boolean>>;
  pre: string;
};

export default function Header(props: props) {
  const { dark, setDark, pre } = props;
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [movie, setMovie] = useState();
  const [showDropdown, setDropdown] = useState(false);
  const [list, setList] = useState([]);

  const darkModeSwitch = () => {
    if (dark === true) {
      return "/../moon.svg";
    } else {
      return "/../day.svg";
    }
  };

  const switchDark = () => {
    setDark(!dark);
    localStorage.setItem('dark', JSON.stringify(!dark));
  }

  const search = (e) => {
    setInputValue(e.target.value);
    if(inputValue){
      setShow(true);
    }
  }

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTIxNWM0ZWQ0NTI1NjQwNWFkMzQwNmI5MGI0YTBjZSIsIm5iZiI6MTczNzk2MzQ4OC4zMjksInN1YiI6IjY3OTczN2UwOWEzMGE4NWIyNzIzZTRlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WHLjZvCpp3RzmN6uvCgR2EKPfyADZapmWydkEkobJgg",
        },
      };
      try{
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${inputValue}&language=en-US&page=${1}`, options);
        const data = await response.json();
        if(data.results.length > 5)
          data.results.length = 5
        setMovie(data.results);
      }
      catch (err){
        console.error(err);
      }
    };

    setShow(true);
    if(!inputValue)
      setShow(false);
    else
      fetchMovies();
  }, [inputValue]);

  useEffect(()=>{
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

    fetchList();
  },[])

  const [respond, setRespond] = useState(false);


    const dropdown = () => {
      setDropdown(!showDropdown);
    }
    const responseBlock = () => {
      setRespond(true);
    }
  

  return (
    <div className="fixed top-0 w-full h-[60px] bg-inherit flex justify-center z-10">
      <div className="flex justify-between mt-[10px] w-[1200px] bg-inherit">
        <a href="../" className="flex gap-[10px] md:!flex" style={respond ? {display: 'none'} : {display: 'flex'}}>
          <img src="../../film.svg" className="w-[25px] h-[25px]" />
          <p className="text-indigo-700 italic font-bold">Movie film</p>
        </a>
        <div className="flex gap-[10px] h-[35px] bg-inherit">
          <input
            type="button"
            className="animate-moveDown w-[70px] outline-none border border-gray-400 rounded-[5px] hover:bg-gray-300/50 transition duration-[.3s] hidden md:!block w-[32px] md:w-[70px]"
            value={"Genre"}
            onClick={()=>dropdown()}
            style={respond ? {display: 'block'} : {display: "none"}}
          />
          {showDropdown && <div className="md:w-[500px] md:h-[350px] bg-inherit rounded-[5px] absolute mt-[50px] border w-screen left-0 md:left-auto">
            <div className="border-b-[2px] m-[20px] pb-[20px]">
              <div className="font-bold text-[28px]">Genres</div>
              <div>See lists of movies by genre</div>
            </div>
            <div className="m-[20px] flex flex-wrap gap-[10px]">
              {list?.genres?.map((el) => (
                <Link key={el.id} href={{ pathname: "/genres", query: { id: el.id, page: 1 } }}>
                  <div className="border rounded-full px-[10px] h-[28px]">{el.name}</div>
                </Link>
              ))}
            </div>
            </div>}
          <input
            type="text"
            className="animate-moveDown outline-none bg-inherit border border-gray-400 rounded-[5px] text-gray-400 px-[10px] w-[75vw] md:w-[300px] hidden md:!block"
            placeholder="Search..."
            onChange={()=>search(event)}
            value={inputValue}
            style={respond ? {display: 'block'} : {display: "none"}}
          />
          <button className="relative left-[-30px] block md:!hidden rotate-[45deg]" style={respond ? {display: 'block'} : {display: "none"}} onClick={()=>setRespond(!respond)}>+</button>
          {show && <div className="bg-inherit w-[450px] absolute ml-[-33px] mt-[40px] rounded-[5px] overflow-hidden">
            {movie?.map((el)=>(
                <Link href={`./${pre}${el.id}`} className="relative z-10" key={el.id}>
              <div className="w-full h-[150px] border-b border-gray-500/25 bg-inherit flex">
                <img src={`https://image.tmdb.org/t/p/original/${el.poster_path}`} alt="" className="m-[15px] w-[79px] h-[119px]"/>
                <div className="mt-[20px]">
                  <div className="font-bold line-clamp-1">{el.title}</div>
                  <div className="flex gap-[6px] mt-[5px]">
                    <img src="/../star.svg" alt="" className="w-[15px] h-[15px] mt-[5px]"/>
                    <div className="text-[15px] font-semibold mt-[1px]">{Math.round(el.vote_average*10)/10}<span className="text-[14px] text-gray-500/50 ">/10</span></div>
                  </div>
                  <div className="mt-[20px] text-[14px] text-gray-500/75">Release date: <span className="font-bold text-gray-500">{el.release_date?.split('-').at(0)}</span></div>
                </div>
              </div>
                </Link>
            ))}
          </div>}
          <button className="border border-gray-400 size-[35px] rounded md:!hidden absolute right-[50px] flex justify-center items-center" onClick={()=>{setRespond(!respond); setInputValue('')}} style={!respond ? {display: 'flex'}: {display: 'none'}}><img className="size-[22px]" src="/../search.svg" /></button>
        </div>
        <img
          src={darkModeSwitch()}
          className="w-[35px] h-[35px] border border-gray-400 rounded-[5px] p-[5px] min-[540px]:!block"
          onClick={() => switchDark()}
          style={respond ? {display: 'none'} : {display: 'block'}}
        />
      </div>
    </div>
  );
}
