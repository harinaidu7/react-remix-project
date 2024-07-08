
import { useLoaderData, json } from '@remix-run/react';
import { popularURL } from '~/config/api';
import MovieList from '~/components/MovieList';
import '../styles/App.css';

type Movie = {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
};


export async function loader(){
  const response = await fetch(popularURL);
  const data = await response.json();
  return json(data.results);
};


export default function Index() {
  const movies = useLoaderData<Movie[]>();

  return (
    <div>
      <h1 className="text-center">Popular Movies</h1>
      <MovieList movies={movies} />
      
    </div>
  );
}
