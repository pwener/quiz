import type { Route } from "./+types/api.movies.search"
import { searchMovies } from "../lib/imdb"

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const query = url.searchParams.get("q") ?? ""

  if (query.trim().length < 2) {
    return Response.json(
      { error: "Query must be at least 2 characters" },
      { status: 400 }
    )
  }

  try {
    const movies = await searchMovies(query)
    return Response.json({ movies })
  } catch {
    return Response.json({ error: "Failed to search movies" }, { status: 500 })
  }
}
