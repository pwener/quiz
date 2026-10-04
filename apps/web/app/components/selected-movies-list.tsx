import { XIcon } from "lucide-react"

import type { MovieSuggestion } from "../lib/imdb"
import { Button } from "@workspace/ui/components/button"

const MIN_MOVIES = 5
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
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-pastel-slate">
          Selected movies
        </h2>
        <span className="rounded-full bg-pastel-teal-light px-2.5 py-0.5 text-xs font-medium text-pastel-teal">
          {movies.length}/{MAX_MOVIES}
        </span>
      </div>

      {movies.length === 0 ? (
        <div className="rounded-xl border border-dashed border-pastel-lavender/70 bg-pastel-lavender-light/40 px-4 py-8 text-center">
          <p className="text-sm text-pastel-slate-muted">
            No movies selected yet. Search and pick a movie to add it here.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {movies.map((movie, index) => (
            <li
              key={movie.id}
              className="flex items-center gap-3 rounded-xl border border-pastel-lavender/50 bg-card p-2.5 shadow-sm"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-pastel-gold-light text-xs font-semibold text-accent-foreground">
                {index + 1}
              </span>
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  alt=""
                  className="size-12 shrink-0 rounded object-cover"
                />
              ) : (
                <div className="flex size-12 shrink-0 items-center justify-center rounded bg-pastel-lavender-light text-xs text-pastel-slate-muted">
                  N/A
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{movie.title}</div>
                {movie.year && (
                  <div className="text-sm text-pastel-slate-muted">
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
                className="text-pastel-slate-muted hover:bg-pastel-lavender-light hover:text-pastel-slate"
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

export { MAX_MOVIES, MIN_MOVIES }
