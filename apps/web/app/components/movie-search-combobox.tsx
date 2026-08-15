import { useEffect, useRef, useState } from "react"
import { Loader2Icon } from "lucide-react"

import type { MovieSuggestion } from "../lib/imdb"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/command"
import { Input } from "@workspace/ui/components/input"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@workspace/ui/components/popover"

type MovieSearchComboboxProps = {
  disabled?: boolean
  onSelect: (movie: MovieSuggestion) => void
}

export function MovieSearchCombobox({
  disabled = false,
  onSelect,
}: MovieSearchComboboxProps) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<MovieSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const trimmed = query.trim()

    if (trimmed.length < 2) {
      abortRef.current?.abort()
      setSuggestions([])
      setIsLoading(false)
      setOpen(false)
      return
    }

    setOpen(true)
    setIsLoading(true)

    const timeoutId = window.setTimeout(async () => {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      try {
        const response = await fetch(
          `/api/movies/search?q=${encodeURIComponent(trimmed)}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          setSuggestions([])
          return
        }

        const data = (await response.json()) as { movies: MovieSuggestion[] }
        setSuggestions(data.movies)
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return
        }
        setSuggestions([])
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }, 300)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [query])

  function handleSelect(movie: MovieSuggestion) {
    onSelect(movie)
    setQuery("")
    setSuggestions([])
    setOpen(false)
  }

  return (
    <Popover open={open && query.trim().length >= 2} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <div className="relative w-full">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search movies..."
            disabled={disabled}
            aria-label="Search movies"
            aria-expanded={open}
            aria-autocomplete="list"
            role="combobox"
            className="pr-9"
          />
          {isLoading && (
            <Loader2Icon className="absolute top-1/2 right-2.5 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
          )}
        </div>
      </PopoverAnchor>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <Command shouldFilter={false}>
          <CommandList>
            {isLoading ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Searching...
              </div>
            ) : (
              <>
                <CommandEmpty>No movies found.</CommandEmpty>
                <CommandGroup>
                  {suggestions.map((movie) => (
                    <CommandItem
                      key={movie.id}
                      value={movie.id}
                      onSelect={() => handleSelect(movie)}
                    >
                      <MovieSuggestionRow movie={movie} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function MovieSuggestionRow({ movie }: { movie: MovieSuggestion }) {
  return (
    <>
      {movie.posterUrl ? (
        <img
          src={movie.posterUrl}
          alt=""
          className="size-10 shrink-0 rounded object-cover"
        />
      ) : (
        <div className="flex size-10 shrink-0 items-center justify-center rounded bg-muted text-xs text-muted-foreground">
          N/A
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">{movie.title}</div>
        {movie.year && (
          <div className="text-xs text-muted-foreground">{movie.year}</div>
        )}
      </div>
    </>
  )
}
