import { useState, useEffect, useRef } from "react";
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
  const iFrameRef = useRef(null);

  // For the purposes of this demonstration, urls to call moviesdb are below.
  // Normally api keys would go in an env file and we could construct the links from a base
  // as needed using string interpolation. Other values such as language and page number could be selected
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

    // Movie poster images in the data is just a path. Looking at the movies API, 
    // I found that getting this data from the config url will help get the movie 
    // poster links. 
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

  // function to send a title to the embedded app on click
  const getTitle = (title) => {
    if(!iFrameRef.current){
      return 
    }
    // if running locally, change link below e.g., "http://localhost:3001/"
    iFrameRef.current.contentWindow.postMessage(title, "https://csb-v9xs7u.netlify.app/")
  };

  let movieCards;
  movieCards = movies.map((movie) => {
    return (
      <div
        key={movie.id}
        className="movie-card"
        onClick={() => getTitle(movie.title)}
      >
        <h2 className="movie-title">{movie.title}</h2>
        <img
          src={`${imgConfig.baseImgUrl}${imgConfig.posterImgWidth}${movie.poster_path}`}
          alt="movie poster"
        />
        <p className="movie-overview">{movie.overview}</p>
      </div>
    );
  });
  
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
          <iframe 
            ref={iFrameRef} 
            src="https://csb-v9xs7u.netlify.app/" 
            title="embedded-app" 
          ></iframe>
        </section>
      </div>
    </div>
  );
}
