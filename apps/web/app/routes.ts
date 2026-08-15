import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("api/movies/search", "routes/api.movies.search.ts"),
] satisfies RouteConfig
