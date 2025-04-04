"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

function CategoryLoader() {
  return (
    <div className="w-screen min-h-screen flex justify-center">
      <div className="w-[1300px] mt-[100px]">
        <div className="capitalize font-bold text-[35px] ml-[50px] mb-[50px]">
          Loading...
        </div>
        <div className="flex flex-wrap justify-center gap-y-[30px] gap-x-[20px] mb-[50px]">
          {[...Array(20)].map((_, index) => (
            <Skeleton key={index} className="w-[230px] h-[440px]"/>
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const pages = searchParams.get("page");
  const id = searchParams.get("id");

  const [movies, setMovies] = useState({
    total_pages: 1,
    results: []
  });
  const [page, setPage] = useState(Number(pages) || 1);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(true); 

  useEffect(() => {
    try {
      const storedDarkMode = localStorage.getItem('dark');
      if (storedDarkMode !== null) {
        setDark(JSON.parse(storedDarkMode));
      }
    } catch (err) {
      console.error("Error accessing localStorage:", err);
    }
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
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          options
        );
        const data = await response.json();
        setMovies(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    
    const fetchSimilar = async () => {
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
          `https://api.themoviedb.org/3/movie/${id}/${category}?language=en-US&page=${page}`,
          options
        );
        const data = await response.json();
        setMovies(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    
    if(id){
      fetchSimilar();
      router.push(`./category?category=${category}&page=${page}&id=${id}`, { scroll: false });
    } else{
      fetchMovies();
      router.push(`./category?category=${category}&page=${page}`, { scroll: false });
    }
  }, [category, id, page, router]);

  const total_pages = movies?.total_pages > 500 ? 500 : movies?.total_pages;

  return loading ? (
    <div className={dark ? "bg-black" : "bg-white"}>
      <Header dark={dark} setDark={setDark} pre={"/details/"} />
      <CategoryLoader />
      <Footer />
    </div>
  ) : (
    <div
      className="w-screen flex flex-col justify-center"
      style={
        dark === true
          ? { background: "black", color: "white" }
          : { background: "white", color: "black" }
      }
    >
      <Header dark={dark} setDark={setDark} pre={"/details/"} />
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
              <PaginationContent className="flex flex-wrap">
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
      <Footer />
    </div>
  );
}

// Main export component with Suspense boundary
export default function Category() {
  return (
    <Suspense fallback={
      <div className="bg-black text-white">
        <CategoryLoader />
      </div>
    }>
      <CategoryContent />
    </Suspense>
  );
}