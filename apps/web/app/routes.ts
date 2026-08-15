import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("movie/archetype-result", "routes/movie.archetype-result.tsx"),
  route("api/movies/search", "routes/api.movies.search.ts"),
] satisfies RouteConfig
