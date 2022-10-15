import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [imgConfig, setImgConfig] = useState({
    baseImgUrl: "",
    posterImgWidth: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //POSTER : imgConfig.baseImgUrl/imgConfig.posterImgWidth/posterPath

  const configurl =
    "https://api.themoviedb.org/3/configuration?api_key=72e2ed255c67202cd20a51ec3b44f2fa";
  const url =
    "https://api.themoviedb.org/3/movie/popular?api_key=72e2ed255c67202cd20a51ec3b44f2fa&language=en-US&page=1";

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(url);
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.log("ERROR FETCHING: ", error);
        setError(error);
        setLoading(false);
      }
    };

    const fetchImgConfig = async () => {
      try {
        let { data } = await axios.get(configurl);
        data = data.images;
        setImgConfig({
          baseImgUrl: data.base_url,
          posterImgWidth: data.poster_sizes[4]
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
    fetchImgConfig();
  }, []);

  //send title to embedded app
  const getTitle = (title) => {
    console.log(title);
  };

  let movieCards;
  movieCards = movies.map((movie) => {
    return (
      <div
        key={movie.id}
        className="movie-card"
        onClick={() => getTitle(movie.title)}
      >
        <h2>{movie.title}</h2>
        <img
          src={`${imgConfig.baseImgUrl}${imgConfig.posterImgWidth}${movie.poster_path}`}
          alt="movie poster"
        />
      </div>
    );
  });
  // console.log(movies);
  // console.log(imgConfig);

  return (
    <div className="App">
      <div className="container">
        <section className="movies-section">
          {movies.length > 0 || loading ? (
            movieCards
          ) : (
            <div>No movies available...</div>
          )}
        </section>
        <section className="embedded-list">
          <ul>
            <li>movie title 1</li>
            <li>title of movie 2</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
