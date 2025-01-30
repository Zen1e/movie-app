import React, { useEffect, useState } from 'react';

const FetchUpcoming = () => {
  const [movie,setMovie] = useState([]);
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
            const response = await fetch("https://api.themoviedb.org/3//movie/upcoming?language=en-US&page=1", options);
            const data = await response.json();
            setMovie(data.results);
          }
          catch (err){
            console.error(err);
          }
        };
        fetchMovies();
      }, []);
  return movie;
};

export default FetchUpcoming;