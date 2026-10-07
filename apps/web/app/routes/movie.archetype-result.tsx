import { useEffect, useRef, useState } from "react"
import { Link, Navigate } from "react-router"
import { Maximize2Icon, XIcon } from "lucide-react"

import { getArchetype } from "../archetypes"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import {
  QuizBackendError,
  moviesFromFormValue,
  scoreMovieArchetype,
} from "../lib/quiz-backend.server"
import type { Route } from "./+types/movie.archetype-result"

const HINT_PLAY_MS = 2500
const HINT_REPLAY_GAP_MS = 5000

type ArchetypeKey = "primary" | "secondary"

type DisplayArchetype = {
  title: string
  image: string | null
  alt: string
  coreMotivation: string | null
  keyMetadataSignals: string | null
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const movies = moviesFromFormValue(formData.get("movies"))

  if (!movies) {
    return {
      ok: false as const,
      error: "Choose between 5 and 10 movies with valid IMDb ids.",
    }
  }

  try {
    const result = await scoreMovieArchetype(movies)
    return { ok: true as const, result }
  } catch (error) {
    const message =
      error instanceof QuizBackendError
        ? error.message
        : "Something went wrong while scoring your movies."
    return { ok: false as const, error: message }
  }
}

function presentArchetype(name: string): DisplayArchetype {
  const archetype = getArchetype(name)
  if (!archetype) {
    return {
      title: name,
      image: null,
      alt: name,
      coreMotivation: null,
      keyMetadataSignals: null,
    }
  }

  return {
    title: archetype.alt,
    image: archetype.image,
    alt: archetype.alt,
    coreMotivation: archetype.coreMotivation,
    keyMetadataSignals: archetype.keyMetadataSignals,
  }
}

function ArchetypeClickHint() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center"
    >
      <img
        src="/images/pointer.png"
        alt=""
        className="w-[60%] animate-archetype-pointer mix-blend-screen motion-reduce:animate-none motion-reduce:opacity-70"
      />
      <p className="mt-1 max-w-[95%] animate-archetype-pointer-caption text-center text-xs leading-tight font-medium motion-reduce:animate-none">
        <span className="rounded-full bg-card/95 px-2.5 py-1 text-pastel-slate shadow-sm">
          Tap a figure to learn more
        </span>
      </p>
    </div>
  )
}

function ArchetypePortrait({
  archetype,
  className,
}: {
  archetype: DisplayArchetype
  className: string
}) {
  if (!archetype.image) {
    return <></>
  }
  return <img src={archetype.image} alt={archetype.alt} className={className} />
}

function ExplanationText({ text }: { text: string }) {
  const paragraphs = text.trim().split(/\n{2,}/)

  return (
    <div className="flex flex-col gap-3">
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p
          key={paragraphIndex}
          className="text-base leading-relaxed text-pretty text-pastel-slate-muted"
        >
          {paragraph.split(/(\*\*[^*]+\*\*)/g).map((part, partIndex) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={partIndex} className="font-medium text-pastel-slate">
                {part.slice(2, -2)}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      ))}
    </div>
  )
}

function ResultMessage({ title, body }: { title: string; body: string }) {
  return (
    <div className="min-h-svh bg-pastel-mesh">
      <article className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4 pt-8 pb-12">
        <header className="text-center">
          <h1 className="text-3xl leading-tight font-semibold text-pastel-slate">
            {title}
          </h1>
        </header>
        <section className="rounded-2xl border border-pastel-lavender/60 bg-card p-5 shadow-sm">
          <p className="text-base leading-relaxed text-pretty text-pastel-slate-muted">
            {body}
          </p>
        </section>
        <Button asChild variant="ghost" className="w-full">
          <Link to="/">Back to your list</Link>
        </Button>
      </article>
    </div>
  )
}

export default function MovieArchetypeResult({
  actionData,
}: Route.ComponentProps) {
  const [highlighted, setHighlighted] = useState<ArchetypeKey | null>(null)
  const [hintDismissed, setHintDismissed] = useState(false)
  const [hintVisible, setHintVisible] = useState(true)
  const [hintCycle, setHintCycle] = useState(0)
  const lastHighlightedRef = useRef<ArchetypeKey>("primary")
  if (highlighted) {
    lastHighlightedRef.current = highlighted
  }

  useEffect(() => {
    if (hintDismissed) return
    const hideId = window.setTimeout(() => {
      setHintVisible(false)
    }, HINT_PLAY_MS)
    const replayId = window.setTimeout(() => {
      setHintVisible(true)
      setHintCycle((cycle) => cycle + 1)
    }, HINT_PLAY_MS + HINT_REPLAY_GAP_MS)
    return () => {
      window.clearTimeout(hideId)
      window.clearTimeout(replayId)
    }
  }, [hintDismissed, hintCycle])

  if (!actionData) {
    return <Navigate to="/" replace />
  }

  if (!actionData.ok) {
    return (
      <ResultMessage
        title="Could not score your movies"
        body={actionData.error}
      />
    )
  }

  const archetypes = {
    primary: presentArchetype(actionData.result.primary_archetype),
    secondary: presentArchetype(actionData.result.secondary_archetype),
  }
  const highlightedArchetype =
    archetypes[highlighted ?? lastHighlightedRef.current]
  const showHint = !hintDismissed && hintVisible

  function openArchetype(key: ArchetypeKey) {
    setHintDismissed(true)
    setHintVisible(false)
    setHighlighted(key)
  }

  return (
    <div className="min-h-svh bg-pastel-mesh">
      <article className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4 pt-8 pb-12">
        <header className="text-center">
          <h1 className="text-3xl leading-tight font-semibold text-pastel-slate">
            <span className="text-pastel-teal">{archetypes.primary.title}</span>
            <small className="block text-lg font-normal text-pastel-slate-muted">
              <span>{archetypes.secondary.title}</span>
            </small>
          </h1>
        </header>

        <div className="flex flex-col gap-6">
          <div className="relative pb-4">
            <button
              type="button"
              className="group relative w-full cursor-pointer rounded-2xl bg-card p-2 text-left shadow-md transition-shadow outline-none hover:shadow-lg focus-visible:ring-3 focus-visible:ring-ring/50"
              onClick={() => openArchetype("primary")}
              aria-label={`View ${archetypes.primary.title}`}
            >
              <ArchetypePortrait
                archetype={archetypes.primary}
                className="aspect-[2/3] w-full rounded-xl object-cover"
              />
              <span className="pointer-events-none absolute inset-2 rounded-xl bg-black/0 transition-colors group-hover:bg-black/15 group-focus-visible:bg-black/15" />
              <span className="absolute top-4 left-4 rounded-full bg-pastel-teal-light px-2.5 py-0.5 text-xs font-medium tracking-wide text-accent-foreground uppercase">
                Primary
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-card/95 px-2.5 py-1 text-xs font-medium text-pastel-slate shadow-sm"
              >
                <Maximize2Icon className="size-3.5" />
                View
              </span>
              {showHint ? <ArchetypeClickHint key={hintCycle} /> : null}
            </button>
            <button
              type="button"
              className="group absolute right-3 bottom-2 w-[38%] cursor-pointer text-left transition-transform outline-none hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-ring/50"
              onClick={() => openArchetype("secondary")}
              aria-label={`View ${archetypes.secondary.title}`}
            >
              <ArchetypePortrait
                archetype={archetypes.secondary}
                className="aspect-[2/3] w-full rounded-xl object-cover shadow-md ring-8 ring-card"
              />
              <span className="pointer-events-none absolute inset-0 rounded-xl bg-black/0 transition-colors group-hover:bg-black/15 group-focus-visible:bg-black/15" />
              <span className="absolute top-3 left-3 rounded-full bg-pastel-teal-light px-2.5 py-0.5 text-xs font-medium tracking-wide text-accent-foreground uppercase">
                Secondary
              </span>
              <span
                aria-hidden="true"
                className="absolute right-2.5 bottom-2.5 flex size-7 items-center justify-center rounded-full bg-card/95 text-pastel-slate shadow-sm"
              >
                <Maximize2Icon className="size-3.5" />
              </span>
              {showHint ? <ArchetypeClickHint key={hintCycle} /> : null}
            </button>
          </div>
          <section className="rounded-2xl border border-pastel-lavender/60 bg-card p-5 shadow-sm">
            <ExplanationText text={actionData.result.explanation} />
          </section>
        </div>

        <Button asChild variant="ghost" className="w-full">
          <Link to="/">Try again</Link>
        </Button>
      </article>

      <Dialog
        open={highlighted !== null}
        onOpenChange={(open) => {
          if (!open) {
            setHighlighted(null)
          }
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="fixed inset-0 top-0 left-0 flex h-svh max-h-svh w-full max-w-none translate-x-0 translate-y-0 flex-col items-center justify-center gap-4 rounded-none border-0 bg-black/50 p-4 pt-14 shadow-none ring-0 sm:max-w-none"
          onClick={() => setHighlighted(null)}
        >
          <div className="pointer-events-none flex h-full max-h-[calc(100svh-4rem)] w-full max-w-lg flex-col items-center gap-4">
            <div
              className="pointer-events-auto flex min-h-0 flex-1 items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <ArchetypePortrait
                archetype={highlightedArchetype}
                className="max-h-full max-w-full rounded-xl object-contain shadow-lg"
              />
            </div>
            <div
              className="pointer-events-auto w-full shrink-0 rounded-xl bg-card/95 px-4 py-3 text-center shadow-sm"
              onClick={(event) => event.stopPropagation()}
            >
              <DialogTitle className="text-lg font-semibold text-pastel-slate">
                {highlightedArchetype.title}
              </DialogTitle>
              {highlightedArchetype.coreMotivation ||
              highlightedArchetype.keyMetadataSignals ? (
                <DialogDescription asChild>
                  <div className="mt-2 space-y-1 text-sm leading-relaxed text-pretty text-pastel-slate-muted">
                    {highlightedArchetype.coreMotivation ? (
                      <p>
                        <span className="font-medium text-pastel-slate">
                          Core Motivation:
                        </span>{" "}
                        {highlightedArchetype.coreMotivation}
                      </p>
                    ) : null}
                    {highlightedArchetype.keyMetadataSignals ? (
                      <p>
                        <span className="font-medium text-pastel-slate">
                          Key Metadata Signals:
                        </span>{" "}
                        {highlightedArchetype.keyMetadataSignals}
                      </p>
                    ) : null}
                  </div>
                </DialogDescription>
              ) : (
                <DialogDescription className="sr-only">
                  {highlightedArchetype.alt}
                </DialogDescription>
              )}
            </div>
          </div>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-4 right-4 z-50 bg-card/90 text-pastel-slate shadow-sm hover:bg-card"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}
