export default function MovieArchetypeResult() {
  return (
    <div className="flex min-h-svh items-start justify-center px-4 py-16">
      <article className="flex w-full max-w-lg flex-col items-center gap-6 text-center">
        <img
          src="/images/theworldbuilder.jpg"
          alt="The Romantiker / Hopeless Romantic archetype"
          className="w-full max-w-sm rounded-2xl shadow-md"
        />

        <header className="flex flex-col gap-2">
          <h1 className="text-2xl leading-tight font-semibold text-pastel-teal">
            The Romantiker / Hopeless Romantic
          </h1>
          <p className="text-xl font-medium text-pastel-teal">
            The Cerebral Puzzle-Solver / Reality Bender
          </p>
        </header>

        <p className="max-w-md text-base text-justify leading-relaxed text-pastel-slate-muted">
          This persona possesses a captivating dual nature: they are driven by
          deep emotional vulnerability and passionate romance, but they insist
          that it be paired with high-stakes dramatic intrigue, nostalgic
          beauty, or time/reality-bending concepts. They don&apos;t just want a
          standard love story; they want love tested by extraordinary
          circumstances—time travel, tragic fate, societal barriers, or surreal
          worlds.
        </p>
      </article>
    </div>
  )
}
