// src/routes/movie-details.$movieId.tsx

import { LoaderFunction, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { popularURL } from '~/config/api';
import '~/styles/movie-details.css'; // Import the CSS file
type LoaderData = {
  movieDetails: {
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    popularity: number;
    release_date: string;
    vote_average: number;
    backdrop_path: string;
    poster_path: string;
    overview: string;
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const { movieId } = params;
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=5e999b2d6beaadc6a81d80f6bc17beb7`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const movieDetails = await response.json();
  return json<LoaderData>({ movieDetails });
};

export default function MovieDetails() {
  const { movieDetails } = useLoaderData<LoaderData>();

  if (!movieDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="backdrop-container" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path})` }}>
      <div className="movie-details-section">
        <div className="movie-details-poster">
          <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt={movieDetails.title} className="movie-details-poster" />
        </div>
        <div className="movie-details-info">
          <h2>{movieDetails.title}</h2>
          <div>Language: {movieDetails.original_language}</div>
          <div>Original Title: {movieDetails.original_title}</div>
          <div>Popularity: {movieDetails.popularity}</div>
          <div>Release Date: {movieDetails.release_date}</div>
          <div>Vote Average: {movieDetails.vote_average}</div>
          <p>Overview: {movieDetails.overview}</p>
        </div>
      </div>
    </div>
  );
}
