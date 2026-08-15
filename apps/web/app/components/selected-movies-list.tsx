import { XIcon } from "lucide-react"

import type { MovieSuggestion } from "../lib/imdb"
import { Button } from "@workspace/ui/components/button"

const MAX_MOVIES = 10

type SelectedMoviesListProps = {
  movies: MovieSuggestion[]
  onRemove: (id: string) => void
}

export function SelectedMoviesList({
  movies,
  onRemove,
}: SelectedMoviesListProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="text-sm text-muted-foreground">
        Selected movies ({movies.length}/{MAX_MOVIES})
      </div>

      {movies.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No movies selected yet. Search and pick a movie to add it here.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="flex items-center gap-3 rounded-lg border border-border p-2"
            >
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  alt=""
                  className="size-12 shrink-0 rounded object-cover"
                />
              ) : (
                <div className="flex size-12 shrink-0 items-center justify-center rounded bg-muted text-xs text-muted-foreground">
                  N/A
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{movie.title}</div>
                {movie.year && (
                  <div className="text-sm text-muted-foreground">
                    {movie.year}
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Remove ${movie.title}`}
                onClick={() => onRemove(movie.id)}
              >
                <XIcon />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { MAX_MOVIES }
