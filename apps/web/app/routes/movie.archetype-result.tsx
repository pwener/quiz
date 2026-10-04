import { useRef, useState } from "react"
import { Link } from "react-router"
import { Maximize2Icon, XIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@workspace/ui/components/dialog"

const ARCHETYPES = {
  primary: {
    image: "/images/theworldbuilder.jpg",
    alt: "Primary movie-watcher archetype",
    title: "The World-Builder (Escapist)",
    coreMotivation:
      "Immersion into rich, expansive fictional universes and high stakes.",
    keyMetadataSignals:
      "Fantasy, Sci-Fi, Adventure, Animation, High Budget / VFX, Franchise/Series tags.",
  },
  secondary: {
    image: "/images/theromantic.jpg",
    alt: "Secondary movie-watcher archetype",
    title: "The Heart-Led Romantic / Humanist",
    coreMotivation:
      "Emotional resonance, character-driven relationships, and human connection.",
    keyMetadataSignals:
      "Romance, Rom-Com, Drama, Coming-of-Age, Character Study.",
  },
} as const

type ArchetypeKey = keyof typeof ARCHETYPES

const RESULT = {
  description:
    "This persona possesses a captivating dual nature: they are driven by deep emotional vulnerability and passionate romance, but they insist that it be paired with high-stakes dramatic intrigue, nostalgic beauty, or time/reality-bending concepts. They don't just want a standard love story; they want love tested by extraordinary circumstances—time travel, tragic fate, societal barriers, or surreal worlds.",
}

export default function MovieArchetypeResult() {
  const [highlighted, setHighlighted] = useState<ArchetypeKey | null>(null)
  const lastHighlightedRef = useRef<ArchetypeKey>("primary")
  if (highlighted) {
    lastHighlightedRef.current = highlighted
  }
  const highlightedArchetype = ARCHETYPES[highlighted ?? lastHighlightedRef.current]

  return (
    <div className="bg-pastel-mesh min-h-svh">
      <article className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4 pt-8 pb-12">
        <header className="text-center">
          <h1 className="text-3xl leading-tight font-semibold text-pastel-slate">
            This is your{" "}
            <span className="text-pastel-teal">Movie-Watcher</span> Archetype
          </h1>
          <p className="mt-2 text-sm text-pastel-slate-muted">
            Tap a figure to learn more
          </p>
        </header>

        <div className="flex flex-col gap-6">
          <div className="relative pb-4">
            <button
              type="button"
              className="group relative w-full cursor-pointer rounded-2xl bg-card p-2 text-left shadow-md outline-none transition-shadow hover:shadow-lg focus-visible:ring-3 focus-visible:ring-ring/50"
              onClick={() => setHighlighted("primary")}
              aria-label={`View ${ARCHETYPES.primary.title}`}
            >
              <img
                src={ARCHETYPES.primary.image}
                alt={ARCHETYPES.primary.alt}
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
            </button>
            <button
              type="button"
              className="group absolute right-3 bottom-2 w-[38%] cursor-pointer text-left outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-ring/50"
              onClick={() => setHighlighted("secondary")}
              aria-label={`View ${ARCHETYPES.secondary.title}`}
            >
              <img
                src={ARCHETYPES.secondary.image}
                alt={ARCHETYPES.secondary.alt}
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
            </button>
          </div>
          <section className="rounded-2xl border border-pastel-lavender/60 bg-card p-5 shadow-sm">
            <p className="text-pretty text-base leading-relaxed text-pastel-slate-muted">
              {RESULT.description}
            </p>
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
              <img
                src={highlightedArchetype.image}
                alt={highlightedArchetype.alt}
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
              <DialogDescription asChild>
                <div className="mt-2 space-y-1 text-pretty text-sm leading-relaxed text-pastel-slate-muted">
                  <p>
                    <span className="font-medium text-pastel-slate">
                      Core Motivation:
                    </span>{" "}
                    {highlightedArchetype.coreMotivation}
                  </p>
                  <p>
                    <span className="font-medium text-pastel-slate">
                      Key Metadata Signals:
                    </span>{" "}
                    {highlightedArchetype.keyMetadataSignals}
                  </p>
                </div>
              </DialogDescription>
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
