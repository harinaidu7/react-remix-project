// app/components/MovieCard.tsx
import { Link } from "@remix-run/react";
// import starSVG from '~/assets/star-svgrepo-com.svg';
import '../styles/App.css';
type Movie = {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
};

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="col-md-2 col-sm-3 col-6 mb-5">
      <Link to={`/movie-details/${movie.id}`} className="card-link" style={{ textDecoration: 'none' }}>
        <div className="card h-100">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
          <div className="card-body">
            <h5 className="card-title">{movie.title}</h5>
            <div className="card-details">
              <div className="card-date">{movie.release_date}</div>
              <div className="card-rating">
                {/* <img src={starSVG} alt="Star" className="star-icon" /> */}
                <span>{movie.vote_average}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
    </div>
    
  );
}
