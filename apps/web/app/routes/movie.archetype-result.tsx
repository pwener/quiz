import { Link } from "react-router"

import { Button } from "@workspace/ui/components/button"

const RESULT = {
  primaryImage: "/images/theworldbuilder.jpg",
  primaryAlt: "Primary movie-watcher archetype",
  secondaryImage: "/images/theromantic.jpg",
  secondaryAlt: "Secondary movie-watcher archetype",
  description:
    "This persona possesses a captivating dual nature: they are driven by deep emotional vulnerability and passionate romance, but they insist that it be paired with high-stakes dramatic intrigue, nostalgic beauty, or time/reality-bending concepts. They don't just want a standard love story; they want love tested by extraordinary circumstances—time travel, tragic fate, societal barriers, or surreal worlds.",
}

export default function MovieArchetypeResult() {
  return (
    <div className="bg-pastel-mesh min-h-svh">
      <article className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4 pt-8 pb-12">
        <header className="text-center">
          <h1 className="text-3xl leading-tight font-semibold text-pastel-slate">
            This is your{" "}
            <span className="text-pastel-teal">Movie-Watcher</span> Archetype
          </h1>
        </header>

        <div className="flex flex-col gap-6">
          <div className="relative pb-4">
            <figure className="relative rounded-2xl bg-card p-2 shadow-md">
              <img
                src={RESULT.primaryImage}
                alt={RESULT.primaryAlt}
                className="aspect-[2/3] w-full rounded-xl object-cover"
              />
              <figcaption className="absolute top-4 left-4">
                <span className="rounded-full bg-pastel-teal-light px-2.5 py-0.5 text-xs font-medium tracking-wide text-accent-foreground uppercase">
                  Primary
                </span>
              </figcaption>
            </figure>
            <figure className="absolute right-3 bottom-2 w-[38%]">
              <img
                src={RESULT.secondaryImage}
                alt={RESULT.secondaryAlt}
                className="aspect-[2/3] w-full rounded-xl object-cover shadow-md ring-8 ring-card"
              />
              <figcaption className="absolute top-3 left-3">
                <span className="rounded-full bg-pastel-teal-light px-2.5 py-0.5 text-xs font-medium tracking-wide text-accent-foreground uppercase">
                  Secondary
                </span>
              </figcaption>
            </figure>
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
    </div>
  )
}
