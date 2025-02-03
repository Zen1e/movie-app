"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Detail from "@/components/Detail";

const DetailPage = () => {
  const [movies, setMovies] = useState([]);
  const [dark, setDark] = useState(true);

  const router = useRouter();
  const params = useParams();
  const { id } = params;

useEffect(() => {
    const dark = localStorage.getItem("dark");
    if (dark !== null) {
      const darkQ = JSON.parse(dark);
      setDark(darkQ);
    }
  // if (!) return;

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
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options
        );
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, []);


  return (
    <div
      className="w-screen flex flex-col justify-center"
      style={
        dark === true
          ? { background: "black", color: "white" }
          : { background: "white", color: "black" }
      }
    >
      <Header dark={dark} setDark={setDark} pre = {''}/>
      <Detail movies={movies}/>
      <Footer />
    </div>
  );
};

export default DetailPage;
