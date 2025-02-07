"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


const GenrePage = () => {

  const resp = localStorage.getItem('dark');
  const res = JSON.parse(resp);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const pages = searchParams.get('page');
  const [dark, setDark] = useState(res!==null ? res : true);
  const [list, setList] = useState([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(Number(pages) || 1);
  const [loading, setLoading] = useState(true);
  
  const [genres, setGenres] = useState(id != 0 ? id?.split(',').map(Number) : []);


  useEffect(() => {
  
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
        setList(data.genres || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchList();
  }, []);

  useEffect(() => {
    setLoading(true);
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
          `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genres.join(',')}&page=${page}`,
          options
        );
        const data = await response.json();
        setMovies(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, [genres, page]);

  const total_pages = Math.ceil(movies?.total_results/20) >= 500 ? 500 : Math.ceil(movies?.total_results/20);

  const genreChange = (genreId: number) => {
    setGenres((prevGenres) =>
      prevGenres.includes(genreId)
        ? prevGenres.filter((id) => id !== genreId)
        : [...prevGenres, genreId]
    );
    setPage(1);
  };

  useEffect(() => {
    router.push(`/genres?id=${genres.join('%2C')}&page=${page}`, {scroll: false});
  }, [genres, page]);

  return(
    <div
      className="w-screen flex flex-col justify-center"
      style={
        dark === true
          ? { background: "black", color: "white" }
          : { background: "white", color: "black" }
      }
    >
      <Header dark={dark} setDark={setDark} pre={"/details/"} />
      <div className="w-screen mt-[60px] flex justify-center">
        <div className="w-[1200px]">
          <div className="text-[35px] font-bold mb-[30px]">Search filter</div>
          <div className="flex">
            <div className="min-w-[335px] max-w-[335px] sticky top-[60px] h-fit">
              <div className="font-bold text-[28px]">Genres</div>
              <div className="font-semibold text-[18px mb-[40px]">
                See lists of movies by genre
              </div>
              <div className="flex flex-wrap gap-[10px]">
                {list?.map((el) => (
                  <div
                    key={el.id}
                    className="text-[14px] font-semibold px-[10px] border border-gray-400/75 rounded-full cursor-pointer"
                    onClick={() => genreChange(el.id)}
                    style={
                      genres?.includes(el.id) && dark === true
                        ? { background: 'white', color: 'black' }
                        : genres?.includes(el.id) && !dark
                        ? { background: 'black', color: 'white' }
                        : {}
                    }
                  >
                    {el.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="border-l border-gray-400/25 pl-[15px] min-h-screen">
              <div className="font-bold text-[25px]">
                {movies?.total_results ? movies.total_results : 'No'} movies
              </div>
              {loading ? 
                <div className="flex flex-wrap gap-[30px]">
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                  <Skeleton className="w-[165px] h-[344px]"/>
                </div>
              :<div className="flex flex-wrap gap-[30px]">
                {movies?.results?.map((element, index) => (
                  <div
                    className="w-[165px] h-[344px] bg-gray-500/20 rounded-[10px] overflow-hidden mb-[40px]"
                    key={element.id}
                  >
                    <Link href={`/../details/${element.id}`}>
                      <div className="w-[165px] h-[244px]">
                        <img
                          src={`https://image.tmdb.org/t/p/original/${element.poster_path}`}
                          alt=""
                        />
                      </div>
                      <div className="flex gap-[6px] mt-[15px] ml-[13px]">
                        <img
                          src="/../star.svg"
                          className="w-[20px] h-[20px] mt-[2px]"
                        />
                        <p className="font-bold text-[16px]">
                          {Math.round(element.vote_average * 10) / 10}
                          <span className="font-semibold text-[14px] text-gray-500">
                            /10
                          </span>
                        </p>
                      </div>
                      <p className="ml-[13px] mt-[5px] line-clamp-2 font-semibold">
                        {element.title}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>}
              <div className="flex gap-[10px] mt-[10px] mb-[60px]">
              <Pagination>
              <PaginationContent>
                {page !== 1 && <PaginationItem>
                  <PaginationPrevious onClick={()=>{setPage(page-1)}} />
                </PaginationItem>}
                {page > 2 &&
                <PaginationItem>
                  <PaginationLink onClick={()=>setPage(1)}>1</PaginationLink>
                </PaginationItem>}
                {page > 3 &&
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>}

                {page !==1 &&
                <PaginationItem>
                  <PaginationLink onClick={()=>{setPage(page-1)}}>{page-1}</PaginationLink>
                </PaginationItem>}

                <PaginationItem>
                  <PaginationLink className="border ">{page}</PaginationLink>
                </PaginationItem>
                {page < total_pages &&<PaginationItem>
                  <PaginationLink onClick={()=>{setPage(page+1)}}>{page+1}</PaginationLink>
                </PaginationItem>}
                {page < total_pages-1 && <PaginationItem>
                  <PaginationLink onClick={()=>{setPage(page+2)}}>{page+2}</PaginationLink>
                </PaginationItem>}

                {page < total_pages-3 && <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>}
                {page < total_pages-2 && <PaginationItem>
                  <PaginationLink onClick={()=>setPage(total_pages || 10)}>{total_pages || 10}</PaginationLink>
                </PaginationItem>}
                {page !== total_pages && <PaginationItem>
                  <PaginationNext onClick={()=>{setPage(page+1)}} />
                </PaginationItem>}
              </PaginationContent>
            </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GenrePage;
