import { useState } from "react"

import { MovieSearchCombobox } from "../components/movie-search-combobox"
import {
  MAX_MOVIES,
  SelectedMoviesList,
} from "../components/selected-movies-list"
import type { MovieSuggestion } from "../lib/imdb"

export default function Home() {
  const [selectedMovies, setSelectedMovies] = useState<MovieSuggestion[]>([])
  const isFull = selectedMovies.length >= MAX_MOVIES

  function handleSelect(movie: MovieSuggestion) {
    if (selectedMovies.length >= MAX_MOVIES) {
      return
    }

    if (selectedMovies.some((selected) => selected.id === movie.id)) {
      return
    }

    setSelectedMovies((current) => [...current, movie])
  }

  function handleRemove(id: string) {
    setSelectedMovies((current) =>
      current.filter((movie) => movie.id !== id)
    )
  }

  return (
    <div className="flex min-h-svh items-start justify-center px-4 pt-[20vh]">
      <div className="flex w-full max-w-lg flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-2xl font-medium">Movie Search</h1>
          <p className="text-center text-sm text-muted-foreground">
            Search for the top 10 movies to your list.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <MovieSearchCombobox disabled={isFull} onSelect={handleSelect} />
          {isFull && (
            <p className="text-sm text-muted-foreground">
              Maximum 10 movies reached. Remove one to add another.
            </p>
          )}
        </div>

        <SelectedMoviesList movies={selectedMovies} onRemove={handleRemove} />
      </div>
    </div>
  )
}
