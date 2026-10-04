import { useState } from "react"
import { Loader2Icon } from "lucide-react"
import { Form, useNavigation } from "react-router"

import { MovieSearchCombobox } from "../components/movie-search-combobox"
import { Button } from "@workspace/ui/components/button"
import {
  MAX_MOVIES,
  MIN_MOVIES,
  SelectedMoviesList,
} from "../components/selected-movies-list"
import type { MovieSuggestion } from "../lib/imdb"

export default function Home() {
  const [selectedMovies, setSelectedMovies] = useState<MovieSuggestion[]>([])
  const navigation = useNavigation()
  const isFull = selectedMovies.length >= MAX_MOVIES
  const canDiscover =
    selectedMovies.length >= MIN_MOVIES && selectedMovies.length <= MAX_MOVIES
  const isSubmitting =
    navigation.state !== "idle" &&
    navigation.formAction?.endsWith("/movie/archetype-result") === true
  const moviesField = JSON.stringify(
    selectedMovies.map((movie) => ({ id: movie.id, title: movie.title }))
  )

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
    setSelectedMovies((current) => current.filter((movie) => movie.id !== id))
  }

  return (
    <div className="flex min-h-svh items-start justify-center px-4 pt-[16vh]">
      <div className="flex w-full max-w-lg flex-col gap-8">
        <header className="flex flex-col items-center gap-3 text-center">
          <span className="rounded-full bg-pastel-gold-light px-3 py-1 text-xs font-medium tracking-wide text-accent-foreground uppercase">
            Top 10 Picks
          </span>
          <h1 className="text-3xl leading-tight font-semibold text-pastel-slate">
            Discover your{" "}
            <span className="text-pastel-teal">Movie-Watcher</span> Archetypes
          </h1>
          <p className="max-w-sm text-sm text-pastel-slate-muted">
            Search and pick 5 to 10 favorite films.
          </p>
        </header>

        <section className="rounded-2xl border border-pastel-lavender/60 bg-card p-5 shadow-sm">
          <div className="flex flex-col gap-2">
            <MovieSearchCombobox disabled={isFull} onSelect={handleSelect} />
            {isFull && (
              <p className="text-sm text-pastel-slate-muted">
                Maximum 10 movies reached. Remove one to add another.
              </p>
            )}
          </div>
        </section>

        <SelectedMoviesList movies={selectedMovies} onRemove={handleRemove} />

        <Form
          method="post"
          action="/movie/archetype-result"
          className="flex flex-col gap-3"
        >
          <input type="hidden" name="movies" value={moviesField} />
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={!canDiscover || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2Icon className="animate-spin" />
                Discovering
              </>
            ) : (
              "Discover"
            )}
          </Button>
          {!canDiscover ? (
            <p className="text-center text-sm text-pastel-slate-muted">
              Add at least {MIN_MOVIES} movies to discover your archetypes.
            </p>
          ) : null}
        </Form>
      </div>
    </div>
  )
}
