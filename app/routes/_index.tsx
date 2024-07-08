// app/routes/index.tsx
import { useLoaderData, json } from '@remix-run/react';
import { popularURL } from '~/config/api';
import MovieList from '~/components/MovieList';
import '../styles/App.css';

// Define the type for a movie
type Movie = {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
};

// Loader function to fetch popular movies
export async function loader(){
  const response = await fetch(popularURL);
  const data = await response.json();
  return json(data.results);
};

// Component to display popular movies
export default function Index() {
  const movies = useLoaderData<Movie[]>();

  return (
    <div>
      <h1 className="text-center">Popular Movies</h1>
      <MovieList movies={movies} />
      
    </div>
  );
}
