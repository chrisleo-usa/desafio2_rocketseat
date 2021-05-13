import { useEffect, useState } from "react";
import { api } from "../services/api";
import { GenreResponseProps, MovieProps } from "../services/types";
import { MovieCard } from '../components/MovieCard';
import { Header } from "./Header";

interface ContentProps {
  onSelectedGenreId: number;
}

export function Content({ onSelectedGenreId }: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${onSelectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${onSelectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [onSelectedGenreId]);

  return (
    <div className="container">
      <Header onSelectedGenre={selectedGenre.title}/>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  );
}