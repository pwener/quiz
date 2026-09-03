export default function MovieArchetypeResult() {
  return (
    <div className="bg-pastel-mesh flex min-h-svh items-center justify-center px-4 py-16">
      <article className="flex w-full max-w-3xl flex-col items-center gap-6 text-center">
        <header>
          <h1 className="text-3xl leading-tight font-semibold text-pastel-slate">
            This is your <span className="text-pastel-teal">Movie-Watcher</span> Archetype
          </h1>
        </header>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <figure className="flex w-full max-w-sm flex-col items-center gap-3">
            <img
              src="/images/theworldbuilder.jpg"
              alt="The Romantiker / Hopeless Romantic archetype"
              className="w-full rounded-2xl shadow-md"
            />
          </figure>

          <figure className="flex w-full max-w-48 flex-col items-center gap-3">
            <img
              src="/images/theromantic.jpg"
              alt="The Romantiker / Hopeless Romantic archetype"
              className="w-full rounded-2xl shadow-md"
            />
            <figcaption>
              <p className="text-lg font-medium text-pastel-teal">
                Secondary Archetype
              </p>
            </figcaption>
          </figure>
        </div>

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
