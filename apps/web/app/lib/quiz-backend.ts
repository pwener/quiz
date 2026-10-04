export type ScoredMovie = {
  id: string
  title: string
}

export type MovieArchetypeResponse = {
  primary_archetype: string
  secondary_archetype: string
  explanation: string
}

const IMDB_ID = /^tt\d{7,8}$/
const MIN_MOVIES = 5
const MAX_MOVIES = 10

export function parseScoredMovies(value: unknown): ScoredMovie[] | null {
  if (
    !Array.isArray(value) ||
    value.length < MIN_MOVIES ||
    value.length > MAX_MOVIES
  ) {
    return null
  }

  const movies: ScoredMovie[] = []

  for (const item of value) {
    if (!item || typeof item !== "object") {
      return null
    }

    const record = item as Record<string, unknown>
    if (typeof record.id !== "string" || !IMDB_ID.test(record.id)) {
      return null
    }

    if (typeof record.title !== "string") {
      return null
    }

    const title = record.title.trim()
    if (!title || movies.some((movie) => movie.id === record.id)) {
      return null
    }

    movies.push({ id: record.id, title })
  }

  return movies
}
