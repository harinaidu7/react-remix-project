import { useEffect, useState } from "react";
import { useLocation } from "@remix-run/react";
import { apiURL } from "~/config/api"; 
import { Link } from "react-router-dom";
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';
// import starIcon from '../assets/star-svgrepo-com.svg';
// import fallbackImage from '../assets/default-fallback-image.png';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery().get("query");
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    async function fetchSearchResults() {
      setStatus("loading");
      try {
        const response = await fetch(`${apiURL}${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSearchResults(data.results);
        setStatus("success");
      } catch (error) {
        setError(error.message);
        setStatus("error");
      }
    }

    fetchSearchResults();
  }, [query]);

  const handleError = (event) => {
    event.target.onerror = null;
    event.target.src = fallbackImage;
    event.target.classList.add('fallback-image');
  };

  if (!query) {
    return null; 
  }

  return (
    <div>
      <h1 className="text-center">Search Results for "{query}"</h1>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error: {error}</div>}
      {status === "success" && (
        <div className="container-fluid">
          <div className="row mb-10">
            {searchResults.map((movie) => (
              <div key={movie.id} className="col-md-2 col-sm-3 col-6 mb-5">
                <Link to={`/movie-details/${movie.id}`} className="card-link" style={{ textDecoration: 'none' }}>
                  <div className="card h-100">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      effect="blur"
                      className="card-img-top"
                      onError={handleError}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <div className="card-details">
                        <div className="card-date">{movie.release_date}</div>
                        <div className="card-rating">
                          
                          <span>{movie.vote_average}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
