interface HeaderProps {
  onSelectedGenre: string;
}

export function Header({ onSelectedGenre }: HeaderProps) {
  return (
    <header>
      <span className="category">Categoria:<span> {onSelectedGenre}</span></span>
    </header>
  );
}