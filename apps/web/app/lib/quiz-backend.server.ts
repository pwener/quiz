import {
  parseScoredMovies,
  type MovieArchetypeResponse,
  type ScoredMovie,
} from "./quiz-backend"

const DEFAULT_BACKEND_URL = "http://127.0.0.1:8000"

export class QuizBackendError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "QuizBackendError"
  }
}

export async function scoreMovieArchetype(
  movies: ScoredMovie[]
): Promise<MovieArchetypeResponse> {
  const baseUrl = (process.env.QUIZ_BACKEND_URL ?? DEFAULT_BACKEND_URL).replace(
    /\/$/,
    ""
  )

  let response: Response
  try {
    response = await fetch(`${baseUrl}/v1/movie/archetype`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language: "pt", movies }),
      signal: AbortSignal.timeout(60_000),
    })
  } catch {
    throw new QuizBackendError(
      "Could not reach the quiz service. Start quiz-backend and try again."
    )
  }

  if (!response.ok) {
    throw new QuizBackendError(await readError(response))
  }

  let body: unknown
  try {
    body = await response.json()
  } catch {
    throw new QuizBackendError("Quiz service returned an unexpected response.")
  }

  if (!isMovieArchetypeResponse(body)) {
    throw new QuizBackendError("Quiz service returned an unexpected response.")
  }

  return body
}

export function moviesFromFormValue(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return null
  }

  try {
    return parseScoredMovies(JSON.parse(value))
  } catch {
    return null
  }
}

function isMovieArchetypeResponse(
  value: unknown
): value is MovieArchetypeResponse {
  if (!value || typeof value !== "object") {
    return false
  }

  const record = value as Record<string, unknown>
  return (
    typeof record.primary_archetype === "string" &&
    record.primary_archetype.trim().length > 0 &&
    typeof record.secondary_archetype === "string" &&
    record.secondary_archetype.trim().length > 0 &&
    typeof record.explanation === "string" &&
    record.explanation.trim().length > 0
  )
}

async function readError(response: Response) {
  try {
    const body = (await response.json()) as { detail?: unknown }
    if (
      response.status === 422 &&
      typeof body.detail === "string" &&
      body.detail.trim()
    ) {
      return body.detail
    }
  } catch {
    // Fall through to a generic message when the body is not JSON.
  }

  if (response.status === 422) {
    return "One of those movies could not be scored. Try a different list."
  }

  return "The quiz service could not score these movies. Try again."
}
