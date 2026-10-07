export type MovieSuggestion = {
  id: string
  title: string
  year?: number
  posterUrl?: string
  stars?: string
}

type ImdbSuggestionItem = {
  id?: string
  l?: string
  y?: number
  qid?: string
  s?: string
  i?: {
    imageUrl?: string
  }
}

type ImdbSuggestionResponse = {
  d?: ImdbSuggestionItem[]
}

function imdbSuggestionBaseUrl() {
  const baseUrl = process.env.IMDB_SUGGESTION_BASE_URL?.trim().replace(/\/$/, "")
  if (!baseUrl) {
    throw new Error(
      "IMDB_SUGGESTION_BASE_URL is not set. Add it to apps/web/.env."
    )
  }
  return baseUrl
}

export async function searchMovies(query: string): Promise<MovieSuggestion[]> {
  const trimmed = query.trim()
  if (trimmed.length < 2) {
    return []
  }

  const firstLetter = trimmed[0]?.toLowerCase() ?? "a"
  const searchTerm = trimmed.replace(/\s+/g, "").toLowerCase()
  const url = `${imdbSuggestionBaseUrl()}/suggestion/${firstLetter}/${encodeURIComponent(searchTerm)}.json`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`IMDB suggestion request failed: ${response.status}`)
  }

  const data = (await response.json()) as ImdbSuggestionResponse

  return (data.d ?? [])
    .filter(
      (item): item is ImdbSuggestionItem & { id: string; l: string } =>
        typeof item.id === "string" &&
        item.id.startsWith("tt") &&
        item.qid === "movie" &&
        typeof item.l === "string"
    )
    .map((item) => ({
      id: item.id,
      title: item.l,
      year: item.y,
      posterUrl: item.i?.imageUrl,
      stars: item.s,
    }))
}
