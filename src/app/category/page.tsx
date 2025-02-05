"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function Category() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const pages = searchParams.get("page");

  const [movies, setMovies] = useState();
  const [page, setPage] = useState(Number(pages));

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
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          options
        );
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
    router.push(`./category?category=${category}&page=${page}`);
  }, [page]);

  console.log(movies);

  const [dark, setDark] = useState(true);

  return (
    <div
      className="w-screen flex flex-col justify-center"
      style={
        dark === true
          ? { background: "black", color: "white" }
          : { background: "white", color: "black" }
      }
    >
      <Header dark={dark} setDark={setDark} pre={"/detail/"} />
      <div className="w-screen min-h-screen flex justify-center">
        <div className="w-[1300px] mt-[100px]">
          <div className="capitalize font-bold text-[35px] ml-[50px] mb-[50px]">
            {category?.split("_").join(" ")}
          </div>
          <div className="flex flex-wrap justify-center gap-y-[30px] gap-x-[20px] mb-[50px]">
            {movies?.results.map((element) => (
              <div
                className="w-[230px] h-[440px] bg-gray-500/20 rounded-[10px] overflow-hidden"
                key={element.id}
              >
                <Link href={`./details/${element.id}`}>
                  <div className="w-[230px] h-[340px]">
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${element.poster_path}`}
                      alt=""
                    />
                  </div>
                  <div className="flex gap-[6px] mt-[15px] ml-[13px]">
                    <img
                      src="./star.svg"
                      className="w-[20px] h-[20px] mt-[2px]"
                    />
                    <p className="font-bold text-[16px]">
                      {Math.round(element.vote_average * 10) / 10}
                      <span className="font-semibold text-[14px] text-gray-500">
                        /10
                      </span>
                    </p>
                  </div>
                  <p className="ml-[13px] mt-[5px] line-clamp-2">
                    {element.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex mb-[100px] ml-[50px] gap-[30px]">
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
                {page < 10 &&<PaginationItem>
                  <PaginationLink onClick={()=>{setPage(page+1)}}>{page+1}</PaginationLink>
                </PaginationItem>}
                {page < 9 && <PaginationItem>
                  <PaginationLink onClick={()=>{setPage(page+2)}}>{page+2}</PaginationLink>
                </PaginationItem>}

                {page < 7 && <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>}
                {page < 8 && <PaginationItem>
                  <PaginationLink onClick={()=>setPage(10)}>10</PaginationLink>
                </PaginationItem>}
                {page !== 10 && <PaginationItem>
                  <PaginationNext onClick={()=>{setPage(page+1)}} />
                </PaginationItem>}
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
