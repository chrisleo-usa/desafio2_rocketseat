import { useEffect, useState } from "react";
import { GenreResponseProps } from "../services/types";
import { Button } from '../components/Button';
import { api } from "../services/api";

interface SideBarProps {
  onClickButton: (id: number) => void;
  selectedGenreId: number;
}

export function SideBar({ onClickButton, selectedGenreId }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => onClickButton(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>
  </nav>
  );
}