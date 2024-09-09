import React, { useEffect, useRef, useState } from "react";
import Search from "./search.svg";
import "./App.css";
import MovieCard from "./components/MovieCards";

//2f0abca2
const API_URL = "http://www.omdbapi.com?apikey=2f0abca2";

// const movie = {
//   Title: "Italian Spiderman",
//   Year: "2007",
//   imdbID: "tt2705436",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BZWQxMjcwNjItZjI0ZC00ZTc4LWIwMzItM2Q0YTZhNzI3NzdlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg",
// };

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSeachTerm] = useState('');

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  // useEffect(() => {
  //   searchMovie("Iron Man");
  // }, []);
  
  const handlekey = (a)=>{
    if(a.key === 'Enter'){
      searchMovie(searchTerm);
    }
  } 

  return (
    <>
      <div className="app">
        <h1>MOVIES LAND</h1>

        <div className="search">
          <input
            placeholder="Search for Movies"
            value={searchTerm}
            onKeyDown={handlekey}
            onChange={(e) => setSeachTerm(e.target.value) } />

          <img src={Search} alt="search" onClick={() => searchMovie(searchTerm)}/>
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>NO MOVIES FOUND</h2>
          </div>
        )}
      </div>
    </>
  );
};
export default App;
